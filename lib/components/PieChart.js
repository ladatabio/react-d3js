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
            var newAttributes = this.state.pathsAttributes.slice();
            newAttributes.map(function (element) {
                if (keysToKeep.indexOf(element.key) === -1) {
                    element[attributeToChange] = Object.assign({}, element[attributeToChange], newAttribute);
                }
                return element;
            });
            this.setState({ pathsAttributes: newAttributes, animate: false });
        }
    }, {
        key: '_computeNewPathsLayerAttributes',
        value: function _computeNewPathsLayerAttributes(layerData, layer, parentsKeys, outerRadius, innerRadius, startAngle, endAngle) {
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

                    var newParentsKeys = parentsKeys.slice();
                    newParentsKeys.push(pathData.data.label);

                    var pathAttributes = {
                        key: newParentsKeys.join('/'),
                        d: arc(pathData),
                        style: {
                            fill: this._colors(pathIndex),
                            opacity: 1
                        }
                    };

                    pathAttributes.onMouseOver = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', { opacity: 0.3 });
                    pathAttributes.onMouseLeave = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', { opacity: 1 });

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
        value: function _renderLegend() {}
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                _index.SVGContainer,
                { width: 250, height: 250, contentPosition: 'center' },
                _react3.default.createElement(
                    _index.Animate,
                    _extends({}, this.animationProperties, { animate: this.state.animate }),
                    _react3.default.createElement(_index.Paths, { attrs: this.state.pathsAttributes })
                ),
                this._renderLegend()
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
    animation: false
};