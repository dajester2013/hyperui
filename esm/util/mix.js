export default function mix(...supertypes) {
	let _class;
	for (let supertype of supertypes.reverse()) {
		console.log(supertype);
		_class = class extends supertype {};
	}

	return _class;
}