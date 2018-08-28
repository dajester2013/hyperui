"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _hyperhtml = require("hyperhtml");

_hyperhtml.hyper.define('hyper-attrs', function () {

    var attrCache = new WeakMap();

    return function (el, dataAttrs) {
        var newAttrs = new Set();
        var prevAttrs = attrCache.get(el);

        Object.entries(dataAttrs).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                attr = _ref2[0],
                value = _ref2[1];

            if (value === undefined) return;
            newAttrs.add(attr);

            if (prevAttrs) prevAttrs.delete(attr);

            if (attr == "style" && (typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
                value = Object.keys(value).map(function (key) {
                    return key.replace(/[A-Z]/g, function (match) {
                        return "-" + match.toLowerCase();
                    }) + ":" + value[key];
                }).join(";");
            }

            el.setAttribute(attr, value);
        });

        if (prevAttrs) {
            prevAttrs.forEach(function (attr) {
                return el.removeAttribute(attr);
            });
        }

        attrCache.set(el, newAttrs);
    };
}());