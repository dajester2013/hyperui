import HyperComponent from "./component/HyperComponent";
import { wire } from "hyperhtml";

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
		return wire(this)`${this.model.text}`;
	}


}