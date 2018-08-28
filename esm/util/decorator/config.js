import deepmerge from "deepmerge";

export default function config(cfg,defaultConfig) {
	return function(target,key,descriptor) {
		if(!descriptor)  {
			return class extends target {

				static get name() {
					return target.name;
				}

				constructor(config, ...rest) {
					let _cfg;
					
					if (typeof config == "object")
						_cfg = deepmerge(cfg, config);
					else {
						_cfg=deepmerge(cfg,{});
						_cfg[defaultConfig] = config;
					}

					return super(_cfg, ...rest);
				}
			}
		}
	}
}