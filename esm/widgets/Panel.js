import HyperComponent from "./component/HyperComponent.js"
import style from "./Panel.scss";
import config from "../util/decorator/config.js";

console.log("panel layout", style)

@config({
	title:null
})
export default class Panel extends HyperComponent {

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
		// window.panelLayout = panelLayout;
		return this.tpl`<div class=${style.panel} hyper-attrs=${{
				style:{
					height:100
					,width:600
					,margin:30
				}
			}}>${
				this.title?this.getTpl(this,":title")`<div class=${style.header}>${this.title}</div>`:null
				}<div class=${style.body}>${
					this.renderContent()
				}</div>
			</div>`;
	}

	renderContent() {
		return this.placeholder;
	}

}