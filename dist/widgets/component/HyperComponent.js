"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(["<place-holder/>"], ["<place-holder/>"]),
    _templateObject2 = _taggedTemplateLiteral([""], [""]),
    _templateObject3 = _taggedTemplateLiteral(["", ""], ["", ""]);

var _hyperhtml = require("hyperhtml");

var _config = require("../../util/decorator/config");

var _config2 = _interopRequireDefault(_config);

require("../../util/hyper-intents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SYM_MODEL = Symbol("HyperModel");
var SYM_ATTRS = Symbol("HyperAttributes");
var SYM_RENDERED = Symbol("HyperComponentRendered");

var PLACEHOLDER = (0, _hyperhtml.hyper)(_templateObject);

/**
 * a generic proxy handler that watches for sets and forces a rerender
 */
var updateHandler = function updateHandler(self) {
	return {
		set: function set(obj, prop, value) {
			obj[prop] = isPrimitive(value) ? value : new Proxy(value, updateHandler(self));

			// TODO: keep from rendering too often
			self.rendered && self.render();

			return true;
		},
		deleteProperty: function deleteProperty(obj, prop, value) {
			obj[prop] = undefined;

			// TODO: keep from rendering too often
			self.rendered && self.render();

			return true;
		}
	};
};

function isPrimitive(v) {
	return v == null || typeof v !== 'function' && (typeof v === "undefined" ? "undefined" : _typeof(v)) !== 'object';
}

/**
 * Unlike an element, this is a view that can be rendered to a specific element
 */

var HyperComponent = function () {
	function HyperComponent() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, HyperComponent);

		this.placeholder = PLACEHOLDER;

		Object.assign(this, config);

		this.tpl = this.getTpl();
	}

	_createClass(HyperComponent, [{
		key: "getTpl",
		value: function getTpl() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
			var typeOrId = arguments[1];

			return (0, _hyperhtml.wire)(obj, typeOrId);
		}
	}, {
		key: "renderTemplate",
		value: function renderTemplate() {
			return (0, _hyperhtml.wire)(this)(_templateObject2);
		}
	}, {
		key: "render",
		value: function render(target) {
			var tpl = this.renderTemplate();

			this[SYM_RENDERED] = true;

			if (target) {
				(0, _hyperhtml.bind)(target)(_templateObject3, tpl);
			} else {
				return tpl;
			}
		}
	}, {
		key: "model",
		set: function set(model) {
			var _this = this;

			this[SYM_MODEL] && this[SYM_MODEL].revoke();

			var deepProxy = function deepProxy(x) {
				for (var key in x) {
					if (!isPrimitive(x[key])) x[key] = deepProxy(x[key]);
				}return new Proxy(x, updateHandler(_this));
			};

			this[SYM_MODEL] = Proxy.revocable(deepProxy(model || {}), updateHandler(this));
			this.rendered && this.render();
		},
		get: function get() {
			return this[SYM_MODEL].proxy;
		}
	}, {
		key: "rendered",
		set: function set(rendered) {},
		get: function get() {
			return this[SYM_RENDERED];
		}
	}], [{
		key: "attach",
		value: function attach(to) {
			for (var _len = arguments.length, config = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				config[_key - 1] = arguments[_key];
			}

			var instance = new (Function.prototype.bind.apply(this, [null].concat(config)))();
			instance.render(to);
			return instance;
		}
	}]);

	return HyperComponent;
}();

exports.default = HyperComponent;