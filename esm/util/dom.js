import {wire as _wire, bind as _bind} from "hyperhtml";
import HyperComponent from "../widgets/component/HyperComponent";

const renderHyperComponents = (item)=> {
	if (item instanceof HyperComponent) return item.render();
	else return item;
}

export function wire(...args) {
	let tplFn = _wire(...args);

	return (strings,...interpolations)=>{
		// console.log(strings,interpolations)
		if (interpolations.length)
			return tplFn(strings, ...interpolations.map(renderHyperComponents));
		else
			return tplFn(strings);
	};
};

export function bind(...args) {
	let tplFn = _bind(...args);

	return (strings,...interpolations)=>{
		if (interpolations.length)
			return tplFn(strings, ...interpolations.map(renderHyperComponents));
		else
			return tplFn(strings);
	};
};