import {
	hyper
} from "hyperhtml";

hyper.define('hyper-attrs', (() => {
	const attrCache = new WeakMap();

	return (el, dataAttrs={}) => {
		const newAttrs = new Set();
		const prevAttrs = attrCache.get(el);

		Object.entries(dataAttrs).forEach(([attr, value]) => {
			if (value === undefined) return;
			newAttrs.add(attr);

			if (prevAttrs) prevAttrs.delete(attr);

			if (attr == "style" && typeof value == "object") {
				value = Object.keys(value).map(
					key => `${key.replace(/[A-Z]/g, match=>`-${match.toLowerCase()}`)}:${typeof value[key] == "number" ? value[key]+"px" : value[key]}`
				).join(";");
			}

			el.setAttribute(attr, value);
		});

		if (prevAttrs) {
			prevAttrs.forEach(attr => el.removeAttribute(attr));
		}

		attrCache.set(el, newAttrs);
	};
})());