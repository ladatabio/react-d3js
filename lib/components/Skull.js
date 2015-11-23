'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = function (Component) {
    return (function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this);
            this.defaultProps = new Component().defaultProps;
        }

        _createClass(_class, [{
            key: 'render',
            value: function render() {
                return _react2['default'].createElement(Component, this.props);
            }
        }]);

        return _class;
    })(_react2['default'].Component);
};

module.exports = exports['default'];