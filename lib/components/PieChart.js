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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d2 = require('d3');

var _d3 = _interopRequireDefault(_d2);

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var PieChart = _wrapComponent('PieChart')(function (_Component) {
    _inherits(PieChart, _Component);

    function PieChart(props) {
        _classCallCheck(this, PieChart);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PieChart).call(this, props));

        _this._pieBuilder = _d3.default.layout.pie().value(function (data) {
            return data.value;
        });

        _this._colors = _d3.default.scale.ordinal().range(_this.props.colors);
        _this.state = {
            pathsAttributes: _this._computePathsAttributes(),
            animate: true,
            legend: []
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
        value: function componentWillReceiveProps(nextProps) {
            this._colors = _d3.default.scale.ordinal().range(nextProps.colors);
            this.setState({
                pathsAttributes: this._computePathsAttributes(),
                animate: true
            });
        }
    }, {
        key: '_changeAllOtherPathsAttributes',
        value: function _changeAllOtherPathsAttributes(keysToKeep, attributeToChange, newAttribute) {
            var legend = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

            var newAttributes = this.state.pathsAttributes.slice();
            newAttributes.map(function (element) {
                if (keysToKeep.indexOf(element.key) === -1) {
                    element[attributeToChange] = Object.assign({}, element[attributeToChange], newAttribute);
                }
                return element;
            });
            this.setState({
                pathsAttributes: newAttributes,
                animate: false,
                legend: legend
            });
        }
    }, {
        key: '_computeNewPathsLayerAttributes',
        value: function _computeNewPathsLayerAttributes(layerData, layer) {
            var parentsKeys = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
            var outerRadius = arguments[3];
            var innerRadius = arguments[4];
            var startAngle = arguments[5];
            var endAngle = arguments[6];

            var childrensTotalValue = layerData.reduce(function (total, children) {
                return total + children.value;
            }, 0);
            var pathsAttributes = [];
            var stepAngle = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(this._pieBuilder(layerData))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var pathIndex = _step$value[0];
                    var pathData = _step$value[1];

                    var arc = _d3.default.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);

                    if (startAngle !== undefined && endAngle !== undefined) {
                        pathData.startAngle = startAngle + stepAngle;
                        stepAngle = pathData.value / childrensTotalValue * Math.abs(endAngle - startAngle);
                        pathData.endAngle = pathData.startAngle + stepAngle;
                    }

                    var pathAttributes = {
                        key: (parentsKeys.length > 0 ? parentsKeys[parentsKeys.length - 1] : '') + '/' + pathData.data.label,
                        d: arc(pathData),
                        style: {
                            fill: this._colors(pathIndex),
                            opacity: 1
                        }
                    };

                    var newParentsKeys = parentsKeys.slice();
                    newParentsKeys.push(pathAttributes.key);

                    pathAttributes.onMouseOver = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', { opacity: 0.3 }, pathAttributes.key.split('/').filter(Boolean));
                    pathAttributes.onMouseLeave = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', { opacity: 1 }, []);

                    pathsAttributes.push(pathAttributes);

                    if (pathData.data.childrens) {
                        pathsAttributes.push.apply(pathsAttributes, _toConsumableArray(this._computeNewPathsLayerAttributes(pathData.data.childrens, layer + 1, newParentsKeys, outerRadius + 25 - 2 * layer, outerRadius, pathData.startAngle, pathData.endAngle)));
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

            return pathsAttributes;
        }
    }, {
        key: '_computePathsAttributes',
        value: function _computePathsAttributes() {
            var numberOfLayers = 3; //Math.max.apply(null, this.props.data.map(data => data.layer));
            var outerRadius = Math.min(this.props.width, this.props.height) / 3 - numberOfLayers * 25;
            var innerRadius = this.props.margin;
            var pathsAttributes = this._computeNewPathsLayerAttributes(this.props.data, 1, [], outerRadius + 25, innerRadius);
            return pathsAttributes;
        }
    }, {
        key: '_renderLegend',
        value: function _renderLegend() {
            var _this2 = this;

            var legend = [];
            if (this.state.legend.length) {
                (function () {
                    var legendElements = _this2.state.legend;
                    var data = _this2.props.data;
                    var key = '';
                    var valueToDisplay = void 0;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        var _loop = function _loop() {
                            var _step2$value = _slicedToArray(_step2.value, 2);

                            var index = _step2$value[0];
                            var legendElement = _step2$value[1];

                            var targetedData = data.find(function (dataElement) {
                                return dataElement.label === legendElement;
                            });
                            valueToDisplay = targetedData.value;
                            key = key + ('/' + legendElement);
                            var targetedColor = _this2.state.pathsAttributes.find(function (dataElement) {
                                return dataElement.key === key;
                            }).style.fill;
                            legend.push(_react3.default.createElement(
                                'g',
                                { transform: 'translate(' + 76 * index + ', 0)' },
                                _react3.default.createElement('polygon', { points: '10,15 0,0 75,0 85,15 75,30 0,30', style: { fill: targetedColor } }),
                                _react3.default.createElement(
                                    'text',
                                    { textAnchor: 'middle', dy: '0.35em', y: '1.1em', x: '42.5', style: { fontFamily: 'Roboto', fontSize: '0.8em' } },
                                    legendElement
                                )
                            ));
                            if (targetedData.childrens) {
                                data = targetedData.childrens;
                            }
                        };

                        for (var _iterator2 = Object.entries(legendElements)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _loop();
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

                    legend.push(_react3.default.createElement(
                        'g',
                        { transform: 'translate(' + 76 * legendElements.length + ', 0)' },
                        _react3.default.createElement(
                            'text',
                            { textAnchor: 'start', dy: '0.35em', y: '1.1em', x: '10', style: { fontFamily: 'Roboto', fontSize: '0.8em' } },
                            _this2.props.legend.prefix + ' ' + valueToDisplay + ' ' + _this2.props.legend.suffix
                        )
                    ));
                })();
            }
            return legend;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                'div',
                null,
                _react3.default.createElement(
                    _index.SVGContainer,
                    { width: 400, height: 250, contentPosition: 'center' },
                    _react3.default.createElement(
                        _index.Animate,
                        _extends({}, this.animationProperties, { animate: this.state.animate ? this.props.animate : false }),
                        _react3.default.createElement(_index.Paths, { attrs: this.state.pathsAttributes })
                    )
                ),
                _react3.default.createElement(
                    _index.SVGContainer,
                    { width: 400, height: 50 },
                    this._renderLegend()
                )
            );
        }
    }]);

    return PieChart;
}(_react2.Component));

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
    animation: false,
    legend: {
        prefix: '',
        suffix: ''
    },
    animate: true
};