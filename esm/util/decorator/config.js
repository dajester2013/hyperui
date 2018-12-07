import deepmerge from "deepmerge";

export default function config(cfg,defaultConfig) {
	return function(target,key,descriptor) {
		target._hyperConfig = cfg;

		if(!descriptor)  {
			return class extends target {
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