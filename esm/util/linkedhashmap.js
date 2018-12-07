export default class LinkedHashMap {

	constructor() {

		let values = [];
		let keyorder = [];
	
		return new Proxy(this, {

			// set or insert new value
			set(obj, prop, value) {
				let i = keyorder.indexOf(prop);
				if (i > -1) {
					values[i] = value;
				} else {
					keyorder.push(prop);
					values.push(value);
				}

				return value;
			}

			// get a value.
			,get(obj, prop) {
				// if looking for an iterator, return the key order iterator.
				if (prop === Symbol.iterator)
					return keyorder[Symbol.iterator].bind(keyorder);

				if (prop == "length")
					return keyorder.length;

				// try looking up a value from the tracked keys
				let i = keyorder.indexOf(prop);
				if (i > -1) return values[i];

				// 
				let val = this[prop] || obj[prop];

				if (typeof val == "function") return val.bind(this);
				
				return val;
			}

			,hasOwnProperty(key) {
				return keyorder.indexOf(key) > -1;
			}


			,size() {
				return keyorder.length;
			}
		});
		
	}

}