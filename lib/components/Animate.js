'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _d3 = require('d3');

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    callback;
};

var Animate = (function (_Component) {
    _inherits(Animate, _Component);

    function Animate(props) {
        _classCallCheck(this, Animate);

        _get(Object.getPrototypeOf(Animate.prototype), 'constructor', this).call(this, props);
        this.state = {
            timer: 0
        };
    }

    _createClass(Animate, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._start();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this._start();
        }
    }, {
        key: '_nestedDefaultProps',
        value: function _nestedDefaultProps(propToMerge, defaultProp) {
            if (this.props[propToMerge].length > 0) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.props[propToMerge].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var propObjectToMerge = _step$value[0];
                        var propObjectContent = _step$value[1];

                        this.props[propToMerge][propObjectToMerge] = Object.assign({}, defaultProp, propObjectContent);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                ;
            }
        }
    }, {
        key: '_start',
        value: function _start() {
            this._nestedDefaultProps('attributes', { from: 0, ease: 'linear' });
            this._nestedDefaultProps('style', { from: 0, ease: 'linear' });
            this._nestedDefaultProps('transformations', { from: 0, ease: 'linear' });
            this.startTime = Date.now();
            window.requestAnimationFrame(this._tick.bind(this));
        }
    }, {
        key: '_tick',
        value: function _tick() {
            if (this.props) {
                if (this.state.timer < this.props.duration + this.props.delay * this.props.children.props[this.props.childrenPropsToAnimate].length) {
                    this.setState({
                        timer: Date.now() - this.startTime
                    });
                    window.requestAnimationFrame(this._tick.bind(this));
                }
            }
        }
    }, {
        key: '_animateElement',
        value: function _animateElement(elementAttributes, elementIndex) {
            var elementCanStartAnimation = this.state.timer - this.props.delay * elementIndex >= 0;
            var elementAnimationProgression = (this.state.timer - this.props.delay * elementIndex) / this.props.duration;
            var transform = '';

            if (elementCanStartAnimation) {

                // Animate by changing progressively the attributes
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.props.attributes.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2);

                        var attributeToChange = _step2$value[1];

                        elementAttributes[attributeToChange.name] = attributeToChange.from + (attributeToChange.to(elementAttributes, elementIndex) - attributeToChange.from) * (0, _d3.ease)(attributeToChange.ease)(elementAnimationProgression);
                    }

                    // Animate by executing transformations
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.props.transformations.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2);

                        var transformationsToExecute = _step3$value[1];

                        var transformationProperty = transformationsToExecute.from + (transformationsToExecute.to - transformationsToExecute.from) * (0, _d3.ease)(transformationsToExecute.ease)(elementAnimationProgression);
                        transform += ' ' + transformationsToExecute.name + '(' + transformationProperty + ')';
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } else {
                // Animate by changing progressively the attributes
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.props.attributes.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _step4$value = _slicedToArray(_step4.value, 2);

                        var attributeToChange = _step4$value[1];

                        elementAttributes[attributeToChange.name] = attributeToChange.from;
                    }

                    // Animate by executing transformations
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.props.transformations.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var _step5$value = _slicedToArray(_step5.value, 2);

                        var transformationsToExecute = _step5$value[1];

                        var transformationProperty = transformationsToExecute.from;
                        transform += ' ' + transformationsToExecute.name + '(' + transformationProperty + ')';
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                            _iterator5['return']();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }

            elementAttributes.transform = transform; //

            // Animate Style, for now, style animation is only change at end of the timer
            if (elementAnimationProgression >= 1) {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = this.props.style.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _step6$value = _slicedToArray(_step6.value, 2);

                        var styleToChange = _step6$value[1];

                        elementAttributes.style[styleToChange.name] = styleToChange.to;
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                            _iterator6['return']();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            }

            return elementAttributes;
        }
    }, {
        key: '_renderChildrens',
        value: function _renderChildrens() {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.props.children.props[this.props.childrenPropsToAnimate].entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _step7$value = _slicedToArray(_step7.value, 2);

                    var elementToAnimate = _step7$value[0];
                    var elementAttributes = _step7$value[1];

                    this.props.children.props[this.props.childrenPropsToAnimate][elementToAnimate] = this._animateElement(elementAttributes, elementToAnimate);
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                        _iterator7['return']();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return (0, _react.cloneElement)(this.props.children);
        }
    }, {
        key: 'render',
        value: function render() {
            return this._renderChildrens();
        }
    }]);

    return Animate;
})(_react.Component);

exports['default'] = Animate;
;

Animate.propTypes = {
    duration: _react.PropTypes.number,
    delay: _react.PropTypes.number,
    childrenPropsToAnimate: _react.PropTypes.string,
    attributes: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        name: _react.PropTypes.string.isRequired,
        start: _react.PropTypes.number,
        from: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]),
        to: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.func]).isRequired,
        ease: _react.PropTypes.string
    })),
    style: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        name: _react.PropTypes.string.isRequired
    })),
    transformations: _react.PropTypes.arrayOf(_react.PropTypes.object)
};

Animate.defaultProps = {
    wait: 0,
    duration: 800,
    delay: 0,
    childrenPropsToAnimate: '',
    attributes: [],
    style: [],
    transformations: []
};
module.exports = exports['default'];