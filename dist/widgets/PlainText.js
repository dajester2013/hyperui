"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["", ""], ["", ""]);

var _HyperComponent2 = require("./component/HyperComponent");

var _HyperComponent3 = _interopRequireDefault(_HyperComponent2);

var _hyperhtml = require("hyperhtml");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlainText = function (_HyperComponent) {
	_inherits(PlainText, _HyperComponent);

	function PlainText(text) {
		_classCallCheck(this, PlainText);

		return _possibleConstructorReturn(this, (PlainText.__proto__ || Object.getPrototypeOf(PlainText)).call(this, {
			model: {
				text: text
			}
		}));
	}

	_createClass(PlainText, [{
		key: "renderTemplate",
		value: function renderTemplate() {
			return (0, _hyperhtml.wire)(this)(_templateObject, this.model.text);
		}
	}, {
		key: "text",
		set: function set(text) {
			this.model.text = text;
		},
		get: function get() {
			return this.model.text;
		}
	}]);

	return PlainText;
}(_HyperComponent3.default);

exports.default = PlainText;