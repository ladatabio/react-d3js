'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SVGSkeleton = require('./SVGSkeleton');

var _SVGSkeleton2 = _interopRequireDefault(_SVGSkeleton);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
    d: '',
    style: {},
    transform: ''
};

var childrensTagName = 'Path';

function Paths(props) {
    return _react2.default.createElement(
        'g',
        null,
        props.children
    );
}

Paths.prototype = {
    getFormula: function getFormula(x, y, interpolation) {
        return _d2.default.svg.line().interpolate(interpolation).x(x).y(y);
    },
    getLength: function getLength(data, x, y) {
        var coordinates = data.map(function (value, index) {
            return { x: x(value, index), y: y(value, index) };
        });
        var totalLength = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(coordinates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var index = _step.value;

                if (index > 0) {
                    totalLength += Math.sqrt(Math.pow(coordinates[index].x - coordinates[index - 1].x, 2) + Math.pow(coordinates[index].y - coordinates[index - 1].y, 2));
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

        return totalLength;
    }
};

exports.default = (0, _SVGSkeleton2.default)(Paths, childrensTagName, attributes);