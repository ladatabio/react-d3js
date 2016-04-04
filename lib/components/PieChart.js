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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    PieChart: {
        displayName: 'PieChart'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/PieChart.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/PieChart.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var PieChart = _wrapComponent('PieChart')((function (_Component) {
    _inherits(PieChart, _Component);

    function PieChart(props) {
        _classCallCheck(this, PieChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PieChart).call(this, props));

        _this.state = {
            animate: true
        };
        _this.animationProperties = {
            duration: 200,
            childrenPropsToAnimate: 'attrs',
            delay: 50,
            transformations: [{
                name: 'rotate',
                from: 0,
                to: 320
            }, {
                name: 'scale',
                from: 0,
                to: 1
            }]
        };
        return _this;
    }

    _createClass(PieChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.setState({
                animate: true
            });
        }
    }, {
        key: '_computeChildrensLayers',
        value: function _computeChildrensLayers(childrensData, layer, outerRadius, innerRadius, startAngle, endAngle) {
            console.log(childrensData);
            var colors = _d2.default.scale.ordinal().range(this.props.colors);

            var pie = _d2.default.layout.pie().value(function (data) {
                return data.value;
            });

            var parentAngle = Math.abs(endAngle - startAngle);
            var childrensTotalValue = childrensData.reduce(function (total, children) {
                return total + children.value;
            }, 0);
            var stepAngle = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(pie(childrensData))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var pathIndex = _step$value[0];
                    var pathData = _step$value[1];

                    var arc = _d2.default.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);

                    pathData.startAngle = startAngle + stepAngle;
                    stepAngle = pathData.value / childrensTotalValue * parentAngle;
                    pathData.endAngle = pathData.startAngle + stepAngle;

                    this.pathsData.push({
                        key: layer + '/' + pathIndex + '/' + pathData.data.label + '/' + startAngle,
                        d: arc(pathData),
                        style: {
                            fill: colors(pathIndex)
                        }
                    });

                    if (pathData.data.childrens) {
                        this._computeChildrensLayers(pathData.data.childrens, layer + 1, outerRadius + 25, outerRadius, pathData.startAngle, pathData.endAngle);
                    }
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
        }
    }, {
        key: '_renderPieChart',
        value: function _renderPieChart() {
            var numberOfLayers = 3; //Math.max.apply(null, this.props.data.map(data => data.layer));

            var colors = _d2.default.scale.ordinal().range(this.props.colors);

            var pie = _d2.default.layout.pie().value(function (data) {
                return data.value;
            });

            this.pathsData = [];
            var outerRadius = Math.min(this.props.width, this.props.height) / 3 - numberOfLayers * 25;
            var innerRadius = this.props.margin;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.entries(pie(this.props.data))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var pathIndex = _step2$value[0];
                    var pathData = _step2$value[1];

                    var arc = _d2.default.svg.arc().outerRadius(outerRadius + 25).innerRadius(innerRadius);

                    this.pathsData.push({
                        key: 1 + '/' + pathIndex,
                        d: arc(pathData),
                        style: {
                            fill: colors(pathIndex)
                        }
                    });

                    this._computeChildrensLayers(pathData.data.childrens, 1, outerRadius + 50, outerRadius + 25, pathData.startAngle, pathData.endAngle);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this.pathsData;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _index.SVGContainer,
                { width: 250, height: 250, contentPosition: 'center' },
                _react3.default.createElement(
                    _index.Animate,
                    _extends({}, this.animationProperties, { animate: this.state.animate }),
                    _react3.default.createElement(_index.Paths, { attrs: this._renderPieChart() })
                )
            );
        }
    }]);

    return PieChart;
})(_react2.Component));

exports.default = PieChart;

PieChart.propTypes = {
    data: _react3.default.PropTypes.array.isRequired,
    colors: _react3.default.PropTypes.array,
    colorsDomain: _react3.default.PropTypes.array,
    animation: _react3.default.PropTypes.bool
};

PieChart.defaultProps = {
    height: 300,
    width: 300,
    margin: 20,
    colors: ['#2196F3', '#4CAF50', '#E91E63', '#FF9800', '#4DB6AC'],
    colorsDomain: [],
    animation: false
};