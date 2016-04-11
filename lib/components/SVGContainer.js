'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformHmr3 = require('react-transform-hmr');

var _reactTransformHmr4 = _interopRequireDefault(_reactTransformHmr3);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    SVGContainer: {
        displayName: 'SVGContainer'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/SVGContainer.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/SVGContainer.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var SVGContainer = _wrapComponent('SVGContainer')(function (_Component) {
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
                    return _react3.default.createElement(
                        'svg',
                        _extends({}, style, { width: width, height: height, viewBox: viewBox }),
                        children
                    );
                case 'javascript' | 'js':
                    return _react3.default.createElement('div', null);
                default:
                    return _react3.default.createElement('div', null);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
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
}(_react2.Component));

exports.default = SVGContainer;


SVGContainer.propTypes = {
    width: _react2.PropTypes.number,
    height: _react2.PropTypes.number,
    style: _react2.PropTypes.object,
    engine: _react2.PropTypes.string,
    contentPosition: _react2.PropTypes.oneOfType([_react2.PropTypes.string, _react2.PropTypes.bool])
};

SVGContainer.defaultProps = {
    width: 450,
    height: 450,
    style: {},
    engine: 'viewBox',
    contentPosition: false
};