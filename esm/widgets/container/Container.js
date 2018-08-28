import HyperComponent from "../component/HyperComponent";
import config from "../../util/decorator/config";
import AutoElementComponent from "../component/AutoElementComponent";
import { hyper } from "hyperhtml";

const SYM_ITEMS = Symbol("HyperContainerItems");

@config({
	items: []
})
export default class Container extends AutoElementComponent {

	get items() {
		return this[SYM_ITEMS];
	}
	set items(items) {
		this[SYM_ITEMS] = items;
		return items;
	}

	render(){
		return this.tpl`${this.items.map(item=>item instanceof HyperComponent && item.render() || item)}</div>`;
	}

}