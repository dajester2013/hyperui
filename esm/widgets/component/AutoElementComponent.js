import HyperComponent, { createComponentUpdateProxy } from "./HyperComponent";
import { wire, bind } from "hyperhtml";
import config from "../../util/decorator/config";
import clone from "clone";

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
		this[SYM_CLASSES] = createComponentUpdateProxy(this, classList, {revocable:true});
		return this[SYM_CLASSES];
	}
	get classList() {
		return this[SYM_CLASSES] && this[SYM_CLASSES].proxy;
	}

	set style(style) {
		this[SYM_STYLE] && this[SYM_STYLE].revoke();
		this[SYM_STYLE] = createComponentUpdateProxy(this, clone(style), {revocable:true});
		return this[SYM_STYLE];
	}
	get style() {
		return this[SYM_STYLE] && this[SYM_STYLE].proxy;
	}

	render(target) {
		console.log("rendering",this.id);
		let rendering = this.renderTemplate();
		console.log(this.id,"contained:",rendering)

		let autoEl = wire(this,":autoel")(
			[
				 `<${this.constructor.tag} id=`,` hyper-attrs=`
				,`>`
				,`</${this.constructor.tag}>`
			]
			,this.id
			,{
				 style:this.style
				,class:this.classList.join(" ")
			}
			,rendering
		);

		try {
		return super.render(target,autoEl);
		} catch(e) {
			console.log(this.constructor.name, this.id, "no super.render");
			debugger;
		}
	}

}