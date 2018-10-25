import HyperComponent, { createComponentUpdateProxy } from "../component/HyperComponent";
import config from "../../util/decorator/config";
import AutoElementComponent from "../component/AutoElementComponent";
import isPrimitive from "../../util/is-primitive";
import { hyper } from "hyperhtml";

const SYM_ITEMS = Symbol("HyperContainerItems");

@config({
	items: []
})
export default class Container extends AutoElementComponent {

	static tag = "div";

	get items() {
		return this[SYM_ITEMS];
	}
	set items(items) {
		this[SYM_ITEMS] = createComponentUpdateProxy(this, items, false);
		return items;
	}

	renderTemplate(){
		return hyper`${this.renderChildren()}`;
	}

	renderChildren() {
		return this.items.map(item=>this.renderChild(item));
	}

	renderChild(item,ix) {
		let tplId = `:child-${this.id}`;

		if (item instanceof HyperComponent) {
			return item.render();//getTpl(tplId)`${item.render()}`;
		} else if (typeof item == "object" && !Array.isArray(item)) {
			return item;//this.getTpl(tplId, item)`${item}`
		} else if (isPrimitive) {
			return /* this.tpl(":childItem") */hyper`${{html:item}}`;
		}
	}

}