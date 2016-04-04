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
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    style: {},
    transform: ''
};

var childrensTagName = 'Line';

function Lines(props) {
    return _react2.default.createElement(
        'g',
        null,
        props.children
    );
}

exports.default = (0, _SVGSkeleton2.default)(Lines, childrensTagName, attributes);