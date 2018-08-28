"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.List = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _templateObject = _taggedTemplateLiteral(["<li hyper-attrs=", ">", "</li>"], ["<li hyper-attrs=", ">", "</li>"]),
    _templateObject2 = _taggedTemplateLiteral(["\n\t\t\t<ul>\n\t\t\t\t", "\n\t\t\t</ul>\n\t\t"], ["\n\t\t\t<ul>\n\t\t\t\t", "\n\t\t\t</ul>\n\t\t"]);

var _HyperComponent2 = require("../component/HyperComponent");

var _HyperComponent3 = _interopRequireDefault(_HyperComponent2);

var _config = require("../../util/decorator/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = exports.List = (_dec = (0, _config2.default)({
	model: {
		items: []
	}
}), _dec(_class = function (_HyperComponent) {
	_inherits(List, _HyperComponent);

	function List(config) {
		_classCallCheck(this, List);

		Object.assign(config);

		return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, config));
	}

	_createClass(List, [{
		key: "renderItem",
		value: function renderItem(item) {
			return this.getTpl(item)(_templateObject, item.attrs, item.text);
		}
	}, {
		key: "renderTemplate",
		value: function renderTemplate() {
			var _this2 = this;

			var makeNodes = function makeNodes(node) {
				return (typeof node === "undefined" ? "undefined" : _typeof(node)) == "object" ? node : {
					text: node,
					attrs: {}
				};
			};

			return this.tpl(_templateObject2, this.model.items.map(makeNodes).map(function () {
				return _this2.renderItem.apply(_this2, arguments);
			}));
		}
	}]);

	return List;
}(_HyperComponent3.default)) || _class);