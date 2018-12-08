import deepmerge from "deepmerge";
import mergeable from "is-mergeable-object";
import Wire from "hyperhtml/esm/classes/Wire";
import HyperComponent from "../../HyperComponent";

const deepmergeConfig = {
	isMergeableObject(obj) {
		return	!(
						obj instanceof Wire
				||	obj instanceof HTMLElement
				||	obj instanceof HyperComponent
			)
			&&		mergeable(obj);
	}
};

/**
 * Define configuration data for a class
 * @param {Object} cfg 
 * @param {String} defaultConfig 
 */
export default function config(cfg,defaultConfig) {
	return function(target,key,descriptor) {
		target._hyperConfig = cfg;

		if(!descriptor)  {
			return class extends target {
				constructor(config, ...rest) {
					let _cfg;
					
					// deep merge objects with some exceptions
					if (typeof config == "object")
						_cfg = deepmerge(cfg, config, deepmergeConfig);
					else {
						_cfg=deepmerge(cfg, {}, deepmergeConfig);
						_cfg[defaultConfig] = config;
					}

					return super(_cfg, ...rest);
				}
			}
		}
	}
}