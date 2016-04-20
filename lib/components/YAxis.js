'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YAxis = function (_Component) {
    _inherits(YAxis, _Component);

    function YAxis() {
        _classCallCheck(this, YAxis);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(YAxis).apply(this, arguments));
    }

    _createClass(YAxis, [{
        key: '_buildAttributes',
        value: function _buildAttributes() {
            var _props = this.props;
            var scale = _props.scale;
            var horizontalPosition = _props.horizontalPosition;
            var style = _props.style;
            var ticksNumber = _props.ticksNumber;


            var domain = scale.domain();

            var axis = [{
                x1: horizontalPosition,
                x2: horizontalPosition,
                y1: scale(domain[0]),
                y2: scale(domain[domain.length - 1]),
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

                    var x = horizontalPosition - 10;
                    var y = scale(d);

                    ticks.push({
                        x1: x,
                        x2: horizontalPosition,
                        y1: y,
                        y2: y,
                        style: style
                    });

                    labels.push({
                        x: x,
                        y: y,
                        dx: '-0.5em',
                        dy: '0.5em',
                        textLength: '100',
                        textAnchor: 'end',
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

            return _react2.default.createElement(
                'g',
                null,
                _react2.default.createElement(_index.Lines, { attrs: axis }),
                _react2.default.createElement(_index.Lines, { attrs: ticks }),
                _react2.default.createElement(_index.Texts, { attrs: labels })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'g',
                null,
                this._renderElements()
            );
        }
    }]);

    return YAxis;
}(_react.Component);

YAxis.propTypes = {
    ticksNumber: _react2.default.PropTypes.number,
    scale: _react2.default.PropTypes.func.isRequired,
    style: _react2.default.PropTypes.object
};
YAxis.defaultProps = {
    ticksNumber: 5,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none'
    }
};
exports.default = YAxis;