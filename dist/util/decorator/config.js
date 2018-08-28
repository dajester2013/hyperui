"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = config;

var _deepmerge = require("deepmerge");

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function config(cfg, defaultConfig) {
	return function (target, key, descriptor) {
		if (!descriptor) {
			return function (_target) {
				_inherits(_class, _target);

				function _class(config) {
					var _ref;

					var _this, _ret;

					_classCallCheck(this, _class);

					var _cfg = void 0;

					if ((typeof config === "undefined" ? "undefined" : _typeof(config)) == "object") _cfg = (0, _deepmerge2.default)(cfg, config);else {
						_cfg = (0, _deepmerge2.default)(cfg, {});
						_cfg[defaultConfig] = config;
					}

					for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						rest[_key - 1] = arguments[_key];
					}

					return _ret = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this, _cfg].concat(rest))), _this), _possibleConstructorReturn(_this, _ret);
				}

				return _class;
			}(target);
		}
	};
}