import HyperComponent from "../component/HyperComponent";
import config from "../../util/decorator/config";

@config({
	model: {
		items: []
	}
})
export default class List extends HyperComponent {

	constructor(config) {
		Object.assign(config)
		
		super(config);
	}

	renderItem(item) {
		return this.getTpl(item)`<li hyper-attrs=${item.attrs}>${item.text}</li>`;
	}

	renderTemplate(){
		let makeNodes = node=>typeof node == "object" ? node : {
			text:node
			,attrs:{}
		};

		return this.tpl`
			<ul>${
				this.model.items.map(makeNodes).map(
					(...args)=>this.renderItem(...args)
				)
			}</ul>
		`;
	}

}