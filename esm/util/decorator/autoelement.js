import deepmerge from "deepmerge";
import HyperComponent from "../../widgets/component/HyperComponent";
import config from "./config";

export default function autoElement(tag, autoElConfig) {
	return function(target,key,descriptor) {
		
		// type check
		if (!(target.prototype instanceof HyperComponent))
			throw "autoElement can only be applied to a HyperComponent";

		// override the renderTemplate method to wrap the rendering with the auto element.
		let c = class extends target {
			renderTemplate(...args) {
				let rendering = super(...args);
				let autoElTpl = this.getTpl(this, ":autoel");
				
				return autoElTpl(
					 [`<${tag}>`,`</${tag}>`]
					,[super.renderTemplate(...args)]
				)
			}
		}

		return config({
			 style:{}
			
		})(c);
	}
}