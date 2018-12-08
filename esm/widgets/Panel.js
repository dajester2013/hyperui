import HyperComponent from "./component/HyperComponent.js"
import style from "./Panel.scss";
import config from "../util/decorator/config.js";
import Container from "./Container.js";

// console.log("panel layout", style)

@config({
	title:null
})
export default class Panel extends Container {

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
		return this.tpl`<div class=${style.panel} hyper-attrs=${{
				style:{margin:"5px"}
			}}>${
				this.title?this.getTpl(this,":title")`<div class=${style.header}>${this.title}</div>`:null
				}<div class=${style.body}>${
					this.renderContent()
				}</div>
			</div>`;
	}

}