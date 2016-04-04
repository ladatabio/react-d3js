'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SVGSkeleton = require('./SVGSkeleton.jsx');

var _SVGSkeleton2 = _interopRequireDefault(_SVGSkeleton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
    value: 0,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    style: {},
    transform: ''
};

var childrensTagName = 'Text';

function Texts(props) {
    return _react2.default.createElement(
        'g',
        null,
        props.children
    );
}

exports.default = (0, _SVGSkeleton2.default)(Texts, childrensTagName, attributes);