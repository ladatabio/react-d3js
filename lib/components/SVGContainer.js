'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SVGContainer = function (_Component) {
    _inherits(SVGContainer, _Component);

    function SVGContainer(props) {
        _classCallCheck(this, SVGContainer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SVGContainer).call(this, props));

        _this.state = {
            displayDevToolsPanel: false
        };
        return _this;
    }

    _createClass(SVGContainer, [{
        key: '_displaySVGContainer',
        value: function _displaySVGContainer() {
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var style = _props.style;
            var children = _props.children;

            switch (this.props.engine) {
                case 'viewBox':
                    var viewBox = '0 0 ' + width + ' ' + height;
                    if (this.props.contentPosition === 'center') {
                        viewBox = '-' + width / 2 + ' -' + height / 2 + ' ' + width + ' ' + height;
                    }
                    return _react2.default.createElement(
                        'svg',
                        _extends({}, style, { width: width, height: height, viewBox: viewBox }),
                        children
                    );
                case 'javascript' | 'js':
                    return _react2.default.createElement('div', null);
                default:
                    return _react2.default.createElement('div', null);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: {
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    } },
                this._displaySVGContainer()
            );
        }
    }]);

    return SVGContainer;
}(_react.Component);

exports.default = SVGContainer;


SVGContainer.propTypes = {
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    style: _react.PropTypes.object,
    engine: _react.PropTypes.string,
    contentPosition: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool])
};

SVGContainer.defaultProps = {
    width: 450,
    height: 450,
    style: {},
    engine: 'viewBox',
    contentPosition: false
};