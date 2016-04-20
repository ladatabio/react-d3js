'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d2 = require('d3');

var _d3 = _interopRequireDefault(_d2);

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = function (_Component) {
    _inherits(LineChart, _Component);

    function LineChart(props) {
        _classCallCheck(this, LineChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LineChart).call(this, props));

        _this.state = {
            animate: true,
            attributes: _this._buildAttributes(props),
            animation: _this._buildAnimations(props)
        };
        return _this;
    }

    _createClass(LineChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                attributes: this._buildAttributes(nextProps),
                animation: this._buildAnimations(nextProps)
            });
        }
    }, {
        key: '_buildAttributes',
        value: function _buildAttributes(props) {
            var _this2 = this;

            var width = props.width;
            var height = props.height;
            var data = props.data;
            var style = props.style;

            var attributes = {};
            this.xScale = _d3.default.scale.ordinal().domain(_d3.default.range(data.length)).rangePoints([50, width - 20]);
            this.yScale = _d3.default.scale.linear().domain([_d3.default.max(data), 0]).range([20, height - 50]);

            var pathFormula = _index.Paths.utils.getFormula(function (value, index) {
                return _this2.xScale(index);
            }, function (value) {
                return _this2.yScale(value);
            });
            var totalLength = _index.Paths.utils.getLength(data, function (value, index) {
                return _this2.xScale(index);
            }, function (value) {
                return _this2.yScale(value);
            });

            attributes.line = [{
                d: pathFormula(data),
                strokeDasharray: totalLength + ' ' + totalLength,
                style: style
            }];

            attributes.points = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var value = _step$value[1];

                    attributes.points.push({
                        cx: this.xScale(key),
                        cy: this.yScale(value),
                        r: '0.3em'
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return attributes;
        }
    }, {
        key: '_buildAnimations',
        value: function _buildAnimations(props) {
            var _this3 = this;

            var animations = {};
            animations.line = {
                duration: 2000,
                childrenPropsToAnimate: 'attrs',
                delay: 0,
                style: [{
                    name: 'strokeDashoffset',
                    from: _index.Paths.utils.getLength(props.data, function (value, index) {
                        return _this3.xScale(index);
                    }, function (value) {
                        return _this3.yScale(value);
                    }),
                    to: function to() {
                        return 0;
                    },
                    ease: 'linear'
                }]
            };

            animations.points = {
                duration: 2000 / props.data.length,
                childrenPropsToAnimate: 'attrs',
                delay: 2000 / props.data.length,
                style: [{
                    name: 'opacity',
                    from: 0,
                    to: function to() {
                        return 1;
                    }
                }]
            };
            return animations;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var style = _props.style;

            return _react2.default.createElement(
                _index.SVGContainer,
                { width: width, height: height },
                _react2.default.createElement(_index.XAxis, { style: style, verticalPosition: height - 50, scale: this.xScale }),
                _react2.default.createElement(_index.YAxis, { style: style, horizontalPosition: 50, scale: this.yScale }),
                _react2.default.createElement(
                    _index.Animate,
                    _extends({}, this.state.animation.line, { animate: true }),
                    _react2.default.createElement(_index.Paths, { attrs: this.state.attributes.line })
                ),
                _react2.default.createElement(
                    _index.Animate,
                    _extends({}, this.state.animation.points, { animate: true }),
                    _react2.default.createElement(_index.Circles, { attrs: this.state.attributes.points })
                )
            );
        }
    }]);

    return LineChart;
}(_react.Component);

LineChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        stroke: 'steelblue',
        strokeWidth: 2,
        fill: 'none'
    }
};
exports.default = LineChart;