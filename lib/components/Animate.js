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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _d2 = require('d3');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    Animate: {
        displayName: 'Animate'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/Animate.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/Animate.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var Animate = _wrapComponent('Animate')((_temp = _class = function (_Component) {
    _inherits(Animate, _Component);

    function Animate(props) {
        _classCallCheck(this, Animate);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Animate).call(this, props));

        _this.state = {
            timer: 0
        };
        return _this;
    }

    _createClass(Animate, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.initialChildrenProps = this.props.children;
            if (this.props.animate) {
                this._initiateAnimations();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.animate) {
                this._initiateAnimations();
            }
        }
    }, {
        key: '_initiateAnimations',
        value: function _initiateAnimations() {
            this.setState({ timer: 0 });
            this.startTime = Date.now();
            window.requestAnimationFrame(this._tick.bind(this));
        }
    }, {
        key: '_tick',
        value: function _tick() {
            if (this._canContinueAnimation()) {
                this.setState({
                    timer: Date.now() - this.startTime
                });
                window.requestAnimationFrame(this._tick.bind(this));
            }
        }
    }, {
        key: '_canContinueAnimation',
        value: function _canContinueAnimation() {
            var _props = this.props;
            var delay = _props.delay;
            var children = _props.children;
            var childrenPropsToAnimate = _props.childrenPropsToAnimate;
            var duration = _props.duration;

            return this.state.timer <= duration + delay * (children.props[childrenPropsToAnimate].length + 1);
        }
    }, {
        key: '_updateAttributes',
        value: function _updateAttributes(attributes, index, progress) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.values(this.props.attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var attributeToChange = _step.value;
                    var _attributeToChange$fr = attributeToChange.from;
                    var from = _attributeToChange$fr === undefined ? 0 : _attributeToChange$fr;
                    var to = attributeToChange.to;
                    var name = attributeToChange.name;
                    var _attributeToChange$ea = attributeToChange.easeName;
                    var easeName = _attributeToChange$ea === undefined ? 'linear' : _attributeToChange$ea;

                    attributes[name] = from + (to(attributes, index) - from) * (0, _d2.ease)(easeName)(progress);
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
        key: '_updateTransformations',
        value: function _updateTransformations(progress) {
            var transformations = '';
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.values(this.props.transformations)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var transformationsToExecute = _step2.value;
                    var _transformationsToExe = transformationsToExecute.from;
                    var from = _transformationsToExe === undefined ? 0 : _transformationsToExe;
                    var to = transformationsToExecute.to;
                    var name = transformationsToExecute.name;
                    var _transformationsToExe2 = transformationsToExecute.easeName;
                    var easeName = _transformationsToExe2 === undefined ? 'linear' : _transformationsToExe2;

                    var transformationProperty = from + (to - from) * (0, _d2.ease)(easeName)(progress);
                    transformations += ' ' + name + '(' + transformationProperty + ')';
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

            return transformations;
        }
    }, {
        key: '_updateStyle',
        value: function _updateStyle(style, index, progress) {
            var newStyle = Object.assign({}, style);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.values(this.props.style)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var styleToChange = _step3.value;
                    var _styleToChange$from = styleToChange.from;
                    var from = _styleToChange$from === undefined ? 0 : _styleToChange$from;
                    var to = styleToChange.to;
                    var name = styleToChange.name;
                    var _styleToChange$easeNa = styleToChange.easeName;
                    var easeName = _styleToChange$easeNa === undefined ? 'linear' : _styleToChange$easeNa;

                    if (typeof styleToChange.to === 'string' && progress >= 1) {
                        newStyle[name] = to;
                    } else {
                        newStyle[name] = from + (to(newStyle, index) - from) * (0, _d2.ease)(easeName)(progress);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return newStyle;
        }
    }, {
        key: '_animateElement',
        value: function _animateElement(elementAttributes, elementIndex) {
            var _props2 = this.props;
            var duration = _props2.duration;
            var delay = _props2.delay;

            var progress = (this.state.timer - delay * elementIndex) / duration;
            elementAttributes = this._updateAttributes(elementAttributes, elementIndex, progress);
            elementAttributes.transform = this._updateTransformations(progress);
            elementAttributes.style = this._updateStyle(elementAttributes.style, elementIndex, progress);
            return elementAttributes;
        }
    }, {
        key: '_renderChildrens',
        value: function _renderChildrens() {
            var _props3 = this.props;
            var children = _props3.children;
            var childrenPropsToAnimate = _props3.childrenPropsToAnimate;


            if (this._canContinueAnimation()) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = Object.entries(children.props[childrenPropsToAnimate])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _step4$value = _slicedToArray(_step4.value, 2);

                        var elementToAnimate = _step4$value[0];
                        var elementAttributes = _step4$value[1];

                        children.props[childrenPropsToAnimate][elementToAnimate] = this._animateElement(elementAttributes, elementToAnimate);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return (0, _react2.cloneElement)(children);
            }
            return children;
        }
    }, {
        key: 'render',
        value: function render() {
            return this._renderChildrens();
        }
    }]);

    return Animate;
}(_react2.Component), _class.propTypes = {
    duration: _react2.PropTypes.number,
    delay: _react2.PropTypes.number,
    childrenPropsToAnimate: _react2.PropTypes.string,
    attributes: _react2.PropTypes.arrayOf(_react2.PropTypes.shape({
        name: _react2.PropTypes.string.isRequired,
        start: _react2.PropTypes.number,
        from: _react2.PropTypes.oneOfType([_react2.PropTypes.number, _react2.PropTypes.func]),
        to: _react2.PropTypes.oneOfType([_react2.PropTypes.number, _react2.PropTypes.func]).isRequired,
        easeName: _react2.PropTypes.string
    })),
    style: _react2.PropTypes.arrayOf(_react2.PropTypes.shape({
        name: _react2.PropTypes.string.isRequired
    })),
    transformations: _react2.PropTypes.arrayOf(_react2.PropTypes.object)
}, _class.defaultProps = {
    wait: 0,
    duration: 800,
    delay: 0,
    childrenPropsToAnimate: '',
    attributes: [],
    style: [],
    transformations: []
}, _temp));

exports.default = Animate;