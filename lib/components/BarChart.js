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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    BarChart: {
        displayName: 'BarChart'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/BarChart.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/BarChart.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var BarChart = _wrapComponent('BarChart')(function (_React$Component) {
    _inherits(BarChart, _React$Component);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BarChart).call(this, props));

        _this._defineScales();
        _this.state = {
            animate: true,
            rectanglesAttributes: _this._buildRectangles(),
            xLabelsAttributes: _this._buildXLabels(),
            yLabelsAttributes: _this._buildYLabels()
        };
        return _this;
    }

    _createClass(BarChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this._defineScales();
            this.setState({
                animate: true,
                rectanglesAttributes: this._buildRectangles(),
                xLabelsAttributes: this._buildXLabels(),
                yLabelsAttributes: this._buildYLabels()
            });
        }
    }, {
        key: '_defineScales',
        value: function _defineScales() {
            this.xScale = _d2.default.scale.ordinal().domain(_d2.default.range(this.props.data.length)).rangeBands([0, this.props.width]);
            this.yScale = _d2.default.scale.linear().domain([0, _d2.default.max(this.props.data)]).range([0, this.props.height - 50]);
        }
    }, {
        key: '_buildData',
        value: function _buildData() {
            var _this2 = this;

            return this.props.data.map(function (value, index) {
                return {
                    key: index,
                    x: _this2.xScale(index),
                    y: _this2.props.height - _this2.yScale(value) - 20,
                    width: _this2.props.width / _this2.props.data.length - 8,
                    height: _this2.yScale(value),
                    style: _this2.props.style,
                    value: value,
                    fill: 'green'
                };
            });
        }
    }, {
        key: '_buildRectangles',
        value: function _buildRectangles() {
            var _this3 = this;

            var newData = this._cloneNestedArray(this._buildData());
            return newData.map(function (field) {
                field.onMouseOver = function (e) {
                    var key = e.target.attributes['data-reactid'].value.split('$')[1];
                    var newFormattedData = newData.slice();
                    newFormattedData[key] = Object.assign(newFormattedData[key], { style: { fill: 'purple' } }, newFormattedData[key].style);
                    _this3.setState({
                        animate: false,
                        rectanglesAttributes: newFormattedData
                    });
                };
                field.onMouseLeave = function (e) {
                    var key = e.target.attributes['data-reactid'].value.split('$')[1];
                    var newFormattedData = newData.slice();
                    newFormattedData[key] = Object.assign(newFormattedData[key], { style: { fill: 'green', stroke: 'black' } });
                    _this3.setState({
                        animate: false,
                        rectanglesAttributes: newFormattedData
                    });
                };
                return field;
            });
        }
    }, {
        key: '_buildXLabels',
        value: function _buildXLabels() {
            var _this4 = this;

            var newData = this._cloneNestedArray(this._buildData());

            return newData.map(function (field, index) {
                field.y = _this4.props.height;
                field.value = index;
                return field;
            });
        }
    }, {
        key: '_buildYLabels',
        value: function _buildYLabels() {
            var newData = this._cloneNestedArray(this._buildData());

            return newData.map(function (field) {
                field.dy = '-0.5em';
                field.x = field.x + field.width / 2;
                field.style.textAnchor = 'middle';
                return field;
            });
        }
    }, {
        key: '_cloneNestedArray',
        value: function _cloneNestedArray(nestedArray) {
            var copyArray = nestedArray.slice();
            return copyArray.map(function (dataObject) {
                dataObject = Object.assign({}, dataObject);
                for (var i in dataObject) {
                    if (dataObject.hasOwnProperty(i) && _typeof(dataObject[i]) === 'object') {
                        dataObject[i] = Object.assign({}, dataObject[i]);
                    }
                }
                return dataObject;
            });
        }
    }, {
        key: '_changeColor',
        value: function _changeColor() {
            this.setState({ fill: 'red' });
        }
    }, {
        key: '_animations',
        value: function _animations() {
            var _this5 = this;

            return {
                duration: 1000,
                childrenPropsToAnimate: 'attrs',
                delay: 10,
                attributes: [{
                    name: 'y',
                    from: this.props.height,
                    to: function to(elementAttributes) {
                        return _this5.props.height - _this5.yScale(elementAttributes.value) - 20;
                    }
                }, {
                    name: 'height',
                    from: this.yScale(0) - 20,
                    to: function to(elementAttributes) {
                        return _this5.yScale(elementAttributes.value);
                    }
                }]
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _index.SVGContainer,
                { width: this.props.width, height: this.props.height },
                _react3.default.createElement(
                    _index.Animate,
                    _extends({}, this._animations(), { animate: this.state.animate }),
                    _react3.default.createElement(_index.Rectangles, { attrs: this.state.rectanglesAttributes, onClick: this._changeColor.bind(this) })
                ),
                _react3.default.createElement(_index.Texts, { attrs: this.state.xLabelsAttributes }),
                _react3.default.createElement(_index.Texts, { attrs: this.state.yLabelsAttributes })
            );
        }
    }]);

    return BarChart;
}(_react3.default.Component));

exports.default = BarChart;


BarChart.propTypes = {
    data: _react3.default.PropTypes.array.isRequired,
    width: _react3.default.PropTypes.number,
    height: _react3.default.PropTypes.number,
    style: _react3.default.PropTypes.object
};

BarChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        fill: 'green'
    }
};