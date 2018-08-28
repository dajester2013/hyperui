import {hyper,bind,wire} from "hyperhtml";
import config from "../../util/decorator/config";
import "../../util/hyper-intents";

const SYM_MODEL = Symbol("HyperModel");
const SYM_RENDERED = Symbol("HyperComponentRendered");
const SYM_LAST_TARGET = Symbol("HyperComponentLastTarget");

const PLACEHOLDER = hyper`<hc-placeholder/>`;

const createUpdateHandler = (self) => {return {
	set(obj,prop,value) {
		obj[prop] = isPrimitive(value) ? value : new Proxy(value,createUpdateHandler(self));

		self.update();

		return true;
	}
	,deleteProperty(obj,prop,value) {
		obj[prop] = undefined;

		self.update();

		return true;
	}
}};


export const createComponentUpdateProxy = (targetComponent, proxyTarget, revocable=false) => {
	for (let key in proxyTarget) if (!isPrimitive(proxyTarget[key]))
		proxyTarget[key] = createComponentUpdateProxy(targetComponent, proxyTarget[key]);
	return revocable	? Proxy.revocable(proxyTarget, createUpdateHandler(targetComponent)) 
										: new Proxy(proxyTarget, createUpdateHandler(targetComponent));
};


function isPrimitive(v) {
	return v == null || (typeof v !== 'function' && typeof v !== 'object');
}

/**
 * Unlike an element, this is a view that can be rendered to a specific element
 */
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
		this[SYM_MODEL] = Proxy.revocable(createComponentUpdateProxy(this, model||{}), createUpdateHandler(this));
		this.rendered && this.renderTo();
	}
	get model() {
		return this[SYM_MODEL] && this[SYM_MODEL].proxy || null;
	}

	set rendered(rendered) {}
	get rendered() {
		return this[SYM_RENDERED];
	}

	render() {
		return wire(this)``;
	}

	renderTo(target=this[SYM_LAST_TARGET]/*this.getLastTarget()*/, tpl=this.render()) {
		
		this.markRendered();
		if (target) {
			this[SYM_LAST_TARGET]=target;
			bind(target)`${tpl}`;
		}
		
		return tpl;
	}

	update() {
		this.renderTo();
	}

	markRendered() {
		this[SYM_RENDERED] = true;
	}

	getLastTarget() {
		return this[SYM_LAST_TARGET];
	}


	static attach(to, ...config) {
		var instance = new this(...config);
		instance.renderTo(to);
		return instance;
	}
}