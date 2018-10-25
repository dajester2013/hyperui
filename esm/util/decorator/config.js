export default function config(cfg) {
	return function(target,key,descriptor) {
		if(!descriptor)  {
			return class extends target {

				static get name() {
					return target.name;
				}

				constructor(config, ...rest) {
					super(typeof config == "object" && Object.assign({}, cfg, config) || config, ...rest);
				}
			}
		}
	}
}