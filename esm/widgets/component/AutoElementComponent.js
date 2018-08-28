import HyperComponent, { createComponentUpdateProxy } from "./HyperComponent";
import { wire, bind } from "hyperhtml";
import config from "../../util/decorator/config";

const SYM_CLASSES = Symbol("AutoElClassList");
const SYM_STYLE = Symbol("AutoElStyle");

@config({
	 classList: []
	,style:{}
	,attributes:{}
})
export default class AutoElementComponent extends HyperComponent {

	static tag = "div";

	constructor() {
		super(...arguments);
	}

	set classList(classList) {
		if (!classList instanceof Array) classList = [classList];
		this[SYM_CLASSES] && this[SYM_CLASSES].revoke();
		this[SYM_CLASSES] = createComponentUpdateProxy(this, classList, true);
		return this[SYM_CLASSES];
	}
	get classList() {
		return this[SYM_CLASSES] && this[SYM_CLASSES].proxy;
	}

	set style(style) {
		this[SYM_STYLE] && this[SYM_STYLE].revoke();
		this[SYM_STYLE] = createComponentUpdateProxy(this, style, true);
		return this[SYM_STYLE];
	}
	get style() {
		return this[SYM_STYLE] && this[SYM_STYLE].proxy;
	}

	renderTo(target) {
		let rendering = this.render();

		let autoEl = wire(this,":autoel")(
			[
				 `<${this.constructor.tag} hyper-attrs=`
				,`>`
				,`</${this.constructor.tag}>`
			]
			,{
				 style:this.style
				,class:this.classList.join(" ")
			}
			,rendering
		);

		return super.renderTo(target,autoEl);
	}

}