
import style from "./Panel.scss";
import config from "../../util/decorator/config.js";
import Container from "./Container";

console.log("panel layout", style)

@config({
	title:null

	,theme: style

	,cls: [style.panel]

	,style: {
		flex: 1
	}
})
export default class Panel extends Container {

	static style = style;

	constructor(...args) {
		super(...args);
	}

	set title(title) {
		this._title = title;
		this.rendered && this.render();
	}

	get title() {
		return this._title;
	}

	renderTemplate() {
		return this.html`${
			this.title?this.getTpl(this,":title")`<div class=${this.theme.header}>${this.title}</div>`:null
		}<div class=${this.theme.body}>${
			this.renderContent()
		}</div>`;
	}

}