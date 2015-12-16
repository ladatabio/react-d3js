'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _indexJs = require('../index.js');

var BarChart = (function (_React$Component) {
    _inherits(BarChart, _React$Component);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        _get(Object.getPrototypeOf(BarChart.prototype), 'constructor', this).call(this, props);
        this._defineScales();
        this.state = {
            formattedData: this._buildData(),
            xLabels: this._buildXLabels(),
            yLabels: this._buildYLabels()
        };
    }

    _createClass(BarChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this._defineScales();
            this.setState({
                formattedData: this._buildData(),
                xLabels: this._buildXLabels(),
                yLabels: this._buildYLabels()
            });
        }
    }, {
        key: '_defineScales',
        value: function _defineScales() {
            this.xScale = _d32['default'].scale.ordinal().domain(_d32['default'].range(this.props.data.length)).rangeBands([0, this.props.width]);
            this.yScale = _d32['default'].scale.linear().domain([0, _d32['default'].max(this.props.data)]).range([0, this.props.height - 50]);
        }
    }, {
        key: '_buildData',
        value: function _buildData() {
            var _this = this;

            return this.props.data.map(function (value, index) {
                return {
                    x: _this.xScale(index),
                    y: _this.props.height - _this.yScale(value) - 20,
                    width: _this.props.width / _this.props.data.length - 8,
                    height: _this.yScale(value),
                    style: _this.props.style,
                    value: value,
                    fill: 'green',
                    onMouseOver: (function (e) {
                        var newFormattedData = this.state.formattedData.slice();
                        newFormattedData[e] = Object.assign(newFormattedData[e], { style: { fill: 'purple' } });
                        this.setState({
                            formattedData: newFormattedData
                        });
                    }).bind(_this, index),
                    onMouseLeave: (function (e) {
                        var newFormattedData = this.state.formattedData.slice();
                        newFormattedData[e] = Object.assign(newFormattedData[e], { style: { fill: 'green', stroke: 'black' } });
                        this.setState({
                            formattedData: newFormattedData
                        });
                    }).bind(_this, index)
                };
            });
        }
    }, {
        key: '_buildXLabels',
        value: function _buildXLabels() {
            var _this2 = this;

            return this._buildData().map(function (field, index) {
                field.y = _this2.props.height;
                field.value = index;
                return field;
            });
        }
    }, {
        key: '_buildYLabels',
        value: function _buildYLabels() {
            return this._buildData().map(function (field) {
                field.dy = '-0.5em';
                return field;
            });
        }
    }, {
        key: '_changeColor',
        value: function _changeColor(e) {
            this.setState({ fill: 'red' });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'svg',
                { width: this.props.width, height: this.props.height },
                _react2['default'].createElement(_indexJs.Rectangles, { attrs: this.state.formattedData, onClick: this._changeColor.bind(this) }),
                _react2['default'].createElement(_indexJs.Texts, { attrs: this.state.xLabels }),
                _react2['default'].createElement(_indexJs.Texts, { attrs: this.state.yLabels })
            );
        }
    }]);

    return BarChart;
})(_react2['default'].Component);

exports['default'] = BarChart;
;

BarChart.propTypes = {
    data: _react2['default'].PropTypes.array.isRequired,
    width: _react2['default'].PropTypes.number,
    height: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
};

BarChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        fill: 'green'
    }
};
module.exports = exports['default'];