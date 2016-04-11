'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SVGSkeleton = require('./SVGSkeleton');

var _SVGSkeleton2 = _interopRequireDefault(_SVGSkeleton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
    text: 0,
    fill: 'black',
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    width: 0,
    height: 0,
    style: {},
    transform: ''
};

var childrensTagName = 'Rect';

function Rectangles(props) {
    return _react2.default.createElement(
        'g',
        null,
        props.children
    );
}

exports.default = (0, _SVGSkeleton2.default)(Rectangles, childrensTagName, attributes);