import HyperComponent from "../../HyperComponent.js";
import config from "../../util/decorator/config.js";
import { createComponentUpdateProxy } from "../../util/updaterproxy.js";
import AutoElComponent from "../../AutoElComponent.js";

@config({
	items: []
})
export default class Container extends AutoElComponent {

	constructor(...args) {
		super(...args);
		this.contentTpl = this.getTpl(this, ":container-contents");
	}

	set content(content) {
		this.items = [content];
	}
	get content() {
		return this.items.length && this.items[0] || null;
	}

	set items(items) {
		this._items = createComponentUpdateProxy(this, items);
		this.rendered && this.render();
	}
	get items() {
		return this._items;
	}

	get title() {
		return this._title;
	}

	renderTemplate() {
		// window.panelLayout = panelLayout;
		return this.renderContent();
	}

	renderContent() {
		return this.items.map((item,ix)=>this.renderItem(item,ix));
	}

	renderItem(item, ix) {
		if (typeof item == "object") {
			if (item instanceof HyperComponent)	
				return item.render();
			else
				return this.getTpl(item, ":"+this.instanceId)`${item}`;
		}
		return this.getTpl(this, `:child-${ix}`)`${item}`;
	}

}


function hashString(str){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
	