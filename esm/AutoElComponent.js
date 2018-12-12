import HyperComponent from "./HyperComponent";
import config from "./util/decorator/config";
import { createComponentUpdateProxy } from "./util/updaterproxy";

@config({
	 style:{}
	,cls:[]
})
export default class AutoElComponent extends HyperComponent {
	static tag = "div";
	
	constructor(...args) {
		super(...args);

		this.autoElTpl = this.getTpl(this, ":autoel");

		this.autoElStrings = [`<${this.constructor.tag} hyper-attrs=`,`>`,`</${this.constructor.tag}>`];
	}

	get style() {return this._style;}
	set style(style) {this._style = createComponentUpdateProxy(this, style);}
	
	get cls() {return this._cls;}
	set cls(cls=[]) {
		if(!cls instanceof Array) cls = [];
		this._cls = createComponentUpdateProxy(this, cls);
	}

	addClass(cls) {
		if (!this.cls.includes(cls))
			this.cls.push(cls);
	}
	removeClass(cls) {
		if (this.cls.includes(cls))
			this.cls.splice(this.cls.indexOf(cls), 1);
	}

	render(target=this.__target) {
		let tpl = this.autoElTpl(
			 this.autoElStrings
			,{
				style:this.style, class:this.cls.join(" ")
			}

			,this.renderTemplate()
		);

		return super.render(target, tpl);
	}
}