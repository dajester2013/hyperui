import {hyper,bind,wire} from "hyperhtml";
import config from "../../util/decorator/config";
import "../../util/hyper-intents";

const SYM_MODEL = Symbol("HyperModel");
const SYM_ATTRS = Symbol("HyperAttributes");
const SYM_RENDERED = Symbol("HyperComponentRendered");


const PLACEHOLDER = hyper`<place-holder/>`;

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

/**
 * Unlike an element, this is a view that can be rendered to a specific element
 */
@config({})
export default class HyperComponent {

	constructor(config={}) {
		this.placeholder = PLACEHOLDER;

		Object.assign(this, config);

		this.tpl = this.getTpl();
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

	render(target) {
		var tpl = this.renderTemplate();

		this[SYM_RENDERED] = true;

		if (target) {
			bind(target)`${tpl}`;
		} else {
			return tpl;
		}
	}




	static attach(to, ...config) {
		var instance = new this(...config);
		instance.render(to);
		return instance;
	}
}