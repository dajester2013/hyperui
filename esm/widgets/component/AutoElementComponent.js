import HyperComponent from "./HyperComponent";
import { createComponentUpdateProxy } from "../../util/updaterproxy";

/**
 * 
 */
@config({
	 attrs: {}
	,style: {}
	,cls: []
})
export default class AutoElementComponent extends HyperComponent {

	static tag = "div";

	set cls(cls=[]) {
		if (!(cls instanceof Array)) cls = [cls];

		this.cls = createComponentUpdateProxy(this, cls);

		return this.cls;
	}


	render(target) {
		var tpl = this.getTpl(this,":autoel")(
			 [
				 `<${this.constructor.tag} hyper-attrs="`,`">`
				,`</${this.constructor.tag}>`
			]

			,[
				 this.attrs||{}
				,this.renderTemplate()
			]
		);

		this[SYM_RENDERED] = true;

		if (target) {
			bind(target)`${tpl}`;
		} else {
			return tpl;
		}
	}

}