import {hyper,bind,wire, Component} from "hyperhtml";
import isPrimitive from "../../util/is-primitive";
import "../../util/hyper-intents";

const SYM_ID					= Symbol("HyperComponentId")
const SYM_MODEL				= Symbol("HyperComponentModel");
const SYM_RENDERED		= Symbol("HyperComponentRendered");
const SYM_LAST_TARGET	= Symbol("HyperComponentLastTarget");

const PLACEHOLDER = hyper`<hc-placeholder/>`;

let ComponentCounter = 0;

/**
 * Unlike an element, this is a view that can be rendered to a specific element
 */
export default class HyperComponent {

	constructor(config={}) {
		this.placeholder = PLACEHOLDER;

		Object.assign(this, config);

		this.tpl = this.getTpl();
	}

	get id() { return this[SYM_ID] || (this.id = `hc-${ComponentCounter++}`); }
	set id(id) { return this[SYM_ID]=id;}

	getTpl(typeOrId=":default", obj=this) {
		return wire(obj, typeOrId);
	}

	set model(model) {
		this[SYM_MODEL] && this[SYM_MODEL].revoke();
		this[SYM_MODEL] = createComponentUpdateProxy(this, model||{}, {revocable: true});
		this.rendered && this.renderTemplate();
	}
	get model() {
		return this[SYM_MODEL] && this[SYM_MODEL].proxy || null;
	}

	set rendered(rendered) {}
	get rendered() {
		return this[SYM_RENDERED];
	}

	renderTemplate() {
		return PLACEHOLDER;
	}

	render(target=this[SYM_LAST_TARGET]/*this.getLastTarget()*/, tpl=this.renderTemplate()) {
		this.markRendered();
		if (target) {
			this[SYM_LAST_TARGET]=target;
			bind(target)`${tpl}`;
		}
		
		return tpl;
	}

	markRendered() {
		this[SYM_RENDERED] = true;
	}

	getLastTarget() {
		return this[SYM_LAST_TARGET];
	}


	static attach(to, ...config) {
		var instance = new this(...config);
		instance.renderTemplate(to);
		return instance;
	}
}




function createUpdateHandler (self) {return {
	set(obj,prop,value) {
		obj[prop] = isPrimitive(value) ? value : new Proxy(value,createUpdateHandler(self));

		self.render();

		return true;
	}
	,deleteProperty(obj,prop,value) {
		obj[prop] = undefined;

		self.render();

		return true;
	}
}};



const defaultProxyOptions = {
	 revocable: false
	,isProxyable: (item) =>
					!isPrimitive(item) 
			&&	!(item instanceof HTMLElement) 
			&&	!(item instanceof HyperComponent)
			&&	(
						item instanceof Object 
					|| Array.isArray(item)
			)
}

export function createComponentUpdateProxy (targetComponent, proxyTarget, options) {
	options = Object.assign({}, defaultProxyOptions, options);
	for (let key in proxyTarget) if (options.isProxyable(proxyTarget[key]))
		proxyTarget[key] = createComponentUpdateProxy(targetComponent, proxyTarget[key]);

	return options.revocable	? Proxy.revocable(proxyTarget, createUpdateHandler(targetComponent)) 
										: new Proxy(proxyTarget, createUpdateHandler(targetComponent));
};
