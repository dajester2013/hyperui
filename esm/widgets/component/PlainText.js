import HyperComponent from "../../HyperComponent.js";

export default class PlainText extends HyperComponent {
	
	constructor(text) {
		super({
			model:{
				text:text
			}
		});
	}

	set text(text) {
		this.model.text = text;
	}

	get text() {
		return this.model.text;
	}

	renderTemplate() {
		return this.html`${this.model.text}`;
	}


}