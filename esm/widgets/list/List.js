import HyperComponent from "../../HyperComponent";
import config from "../../util/decorator/config";
import Container from "../container/Container";

@config({
	model: {
		items: []
	}
})
export default class List extends Container {

	constructor(config) {
		Object.assign(config)
		
		super(config);
	}

	renderItem(item) {
		return this.getTpl(item)`<li hyper-attrs=${item.attrs}>${item.text}</li>`;
	}

	renderContent(){
		let makeNodes = node=>typeof node == "object" ? node : {
			text:node
			,attrs:{}
		};

		return this.html`
			<ul>${
				this.items.map(makeNodes).map(
					(...args)=>this.renderItem(...args)
				)
			}</ul>
		`;
	}

}