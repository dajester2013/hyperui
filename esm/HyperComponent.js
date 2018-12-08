import {bind,wire} from "./util/dom.js";
import config from "./util/decorator/config.js";
import "./util/hyper-intents.js";
import {SYM_MODEL,SYM_ATTRS,SYM_RENDERED, SYM_ID} from "./util/symbols.js";
import { EventEmitter } from "events";

const PLACEHOLDER = wire(null)`<place-holder/>`;

/**
 * a generic proxy handler that watches for sets and forces a rerender
 */
let updateHandler = (self) => {return {
	set(obj,prop,value) {
		obj[prop] = isPrimitive(value) ? value : new Proxy(value,updateHandler(self));

		// TODO: keep from rendering too often
		self.rendered && self.render();

		return true;
	}
	,deleteProperty(obj,prop,value) {
		obj[prop] = undefined;

		// TODO: keep from rendering too often
		self.rendered && self.render();

		return true;
	}
}};

function isPrimitive(v) {
	return v == null || (typeof v !== 'function' && typeof v !== 'object');
}

let instances = 0;

/**
 * Unlike an element, this is a view that can be rendered to a specific element
 */
@config({})
export default class HyperComponent extends EventEmitter {

	constructor(config={}) {
		super();
		this.placeholder = PLACEHOLDER;

		Object.assign(this, config);

		this.tpl = this.getTpl();
		this[SYM_ID] = `hc-${instances++}`;
	}

	set id(id) {
		this[SYM_ID] = id;
		this.rendered && this.render();
	}

	get id() {
		return this[SYM_ID];
	}

	getTpl(obj=this, typeOrId) {
		return wire(obj, typeOrId);
	}

	set model(model) {
		this[SYM_MODEL] && this[SYM_MODEL].revoke();

		let deepProxy = (x) => {
			for (let key in x) if (!isPrimitive(x[key]))
				x[key] = deepProxy(x[key]);
			return new Proxy(x, updateHandler(this));
		}

		this[SYM_MODEL] = Proxy.revocable(deepProxy(model||{}), updateHandler(this));
		this.rendered && this.render();
	}
	get model() {
		return this[SYM_MODEL].proxy;
	}

	set rendered(rendered) {}
	get rendered() {
		return this[SYM_RENDERED];
	}

	renderTemplate() {
		return wire(this)``;
	}

	render(target=this.__target, tpl) {
		if (!this.emit("beforerender")) {
			tpl = tpl || this.renderTemplate();

			this.emit("rendered", tpl);

			this[SYM_RENDERED] = true;
			
			if (target) {
				this.__target = target;
				bind(target)`${tpl}`;
			} else {
				return tpl;
			}
		}
	}




	static attach(to, ...config) {
		var instance = new this(...config);
		instance.render(to);
		return instance;
	}
}