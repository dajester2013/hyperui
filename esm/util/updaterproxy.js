import HyperComponent from "../HyperComponent";
import { isPrimitive } from "util";
import Wire from "hyperhtml/esm/classes/Wire";

const defaultProxyOptions = {
	 revocable: false
	,isProxyable: (item) => {
		console.log(item, item instanceof Wire)
		return	!isPrimitive(item) 
				&&	!(item instanceof HTMLElement) 
				&&	!(item instanceof HyperComponent)
				&&	(
							item instanceof Object 
						|| Array.isArray(item)
				)
 }
}

function createUpdateHandler (self, options) { return self instanceof HyperComponent && {
	set(obj,prop,value) {
		obj[prop] = options.isProxyable(value) ? new Proxy(value,createUpdateHandler(self)) : value;

		if (obj instanceof Array && prop == "length") return true;

		self.rendered && self.render();

		return true;
	}
	,deleteProperty(obj,prop,value) {
		obj[prop] = undefined;

		if (self instanceof Array && prop == "length") return true;

		self.rendered && self.render();

		return true;
	}
} || {}};

export function createComponentUpdateProxy (targetComponent, proxyTarget, options) {
 options = Object.assign({}, defaultProxyOptions, options);
 for (let key in proxyTarget) if (options.isProxyable(proxyTarget[key]))
	 proxyTarget[key] = createComponentUpdateProxy(targetComponent, proxyTarget[key]);

 return options.revocable	? Proxy.revocable(proxyTarget, createUpdateHandler(targetComponent, options)) 
									 : new Proxy(proxyTarget, createUpdateHandler(targetComponent, options));
};