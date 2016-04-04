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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class, _temp;

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    XAxis: {
        displayName: 'XAxis'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/XAxis.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/XAxis.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var XAxis = _wrapComponent('XAxis')((_temp = _class = (function (_Component) {
    _inherits(XAxis, _Component);

    function XAxis() {
        _classCallCheck(this, XAxis);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(XAxis).apply(this, arguments));
    }

    _createClass(XAxis, [{
        key: '_buildAttributes',
        value: function _buildAttributes() {
            var _props = this.props;
            var scale = _props.scale;
            var verticalPosition = _props.verticalPosition;
            var style = _props.style;
            var ticksNumber = _props.ticksNumber;

            var domain = scale.domain();

            var axis = [{
                x1: scale(domain[0]),
                x2: scale(domain[domain.length - 1]),
                y1: verticalPosition,
                y2: verticalPosition,
                style: style
            }];

            if (scale.ticks) {
                domain = scale.ticks(ticksNumber);
            }

            var ticks = [];
            var labels = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.values(domain)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var d = _step.value;

                    var x = scale(d);
                    var y = verticalPosition + 10;

                    ticks.push({
                        x1: x,
                        x2: x,
                        y1: y,
                        y2: verticalPosition,
                        style: style
                    });

                    labels.push({
                        x: x,
                        y: y,
                        dy: '1em',
                        textAnchor: 'middle',
                        value: d,
                        style: style
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

            return {
                axis: axis,
                ticks: ticks,
                labels: labels
            };
        }
    }, {
        key: '_renderElements',
        value: function _renderElements() {
            var _buildAttributes2 = this._buildAttributes();

            var axis = _buildAttributes2.axis;
            var ticks = _buildAttributes2.ticks;
            var labels = _buildAttributes2.labels;

            return _react3.default.createElement(
                'g',
                null,
                _react3.default.createElement(_index.Lines, { attrs: axis }),
                _react3.default.createElement(_index.Lines, { attrs: ticks }),
                _react3.default.createElement(_index.Texts, { attrs: labels })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                'g',
                null,
                this._renderElements()
            );
        }
    }]);

    return XAxis;
})(_react2.Component), _class.propTypes = {
    ticksNumber: _react3.default.PropTypes.number,
    scale: _react3.default.PropTypes.func.isRequired,
    style: _react3.default.PropTypes.object
}, _class.defaultProps = {
    ticksNumber: 5,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none'
    }
}, _temp));

exports.default = XAxis;