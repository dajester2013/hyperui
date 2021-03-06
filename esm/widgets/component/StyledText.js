import HyperComponent from "../../HyperComponent";

export default class StyledText extends HyperComponent {
	
	constructor(text, style={}) {
		super({
			model:{
				text:text
				,style:{}
			}
		});
		let self = this;
	}

	renderTemplate() {
		return this.html`<span style=${this.model.style}>${this.model.text}</span>`;
	}


}