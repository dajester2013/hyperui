import HyperComponent from "./component/HyperComponent";

export default class StyledText extends HyperComponent {
	
	constructor(text, style={}) {
		super({
			model:{
				text:text
				,style:new Proxy(style, {
					set: function(obj,prop,val) {
						obj[prop]=val;
						self.render();
						return true;
					}
					,enumerate(target) {
						return Object.keys(target)[Symbol.iterator]();
					}
				})
			}
		});
		let self = this;
	}

	renderTemplate() {
		return this.tpl`<span style=${this.model.style}>${this.model.text}</span>`;
	}


}