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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _index = require('../index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    DevTools: {
        displayName: 'DevTools'
    }
};

var _reactTransformHmr2 = (0, _reactTransformHmr4.default)({
    filename: 'src/components/DevTools.jsx',
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
    filename: 'src/components/DevTools.jsx',
    components: _components,
    locals: [],
    imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _reactTransformHmr2(_reactTransformCatchErrors2(Component, id), id);
    };
}

var DevTools = _wrapComponent('DevTools')((function (_Component) {
    _inherits(DevTools, _Component);

    function DevTools() {
        _classCallCheck(this, DevTools);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DevTools).apply(this, arguments));
    }

    _createClass(DevTools, [{
        key: '_listComponentsAttributes',
        value: function _listComponentsAttributes(component) {
            if (component.type.displayName == 'Animate') {
                console.log(component.props.duration);
            }
            var attributes = new Set();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(component.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var attribute = _step$value[0];
                    var value = _step$value[1];

                    attributes.add(_react3.default.createElement(
                        'div',
                        null,
                        _react3.default.createElement(
                            'div',
                            null,
                            attribute + ' : ' + value.toString()
                        )
                    ));
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
        key: '_listComponents',
        value: function _listComponents(content) {
            var components = new Set();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.values(content)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var component = _step2.value;

                    components.add(_react3.default.createElement(
                        'div',
                        { style: {
                                backgroundColor: '#21252b',
                                borderRadius: '1em',
                                border: '5px solid #353b45',
                                boxShadow: '1px 1px 1px 1px #272d34'
                            } },
                        _react3.default.createElement(
                            'div',
                            null,
                            component.type.displayName + ' : '
                        ),
                        _react3.default.createElement(
                            'div',
                            null,
                            this._listComponentsAttributes(component)
                        )
                    ));
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

            return components;
        }
    }, {
        key: '_displayDevToolsContent',
        value: function _displayDevToolsContent() {
            var content = this.props.content;

            if (!Array.isArray(content)) {
                content = [content];
            }
            return _react3.default.createElement(
                'div',
                null,
                this._listComponents(content)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react3.default.createElement(
                'div',
                { style: { display: 'flex' } },
                this.props.children,
                _react3.default.createElement(
                    'div',
                    { style: {
                            position: 'fixed',
                            flexDirection: 'column',
                            zIndex: '1',
                            left: '70%',
                            width: '30%',
                            height: '100%',
                            fontFamily: 'Roboto',
                            textAlign: 'center',
                            fontSize: '1.4em',
                            boxSizing: 'border-box',
                            color: '#9da5b4',
                            backgroundColor: '#21252b',
                            boxShadow: '4px 4px 4px 4px #272d34'
                        } },
                    _react3.default.createElement(
                        'h2',
                        null,
                        'Chart DevTools'
                    ),
                    this._displayDevToolsContent()
                )
            );
        }
    }]);

    return DevTools;
})(_react2.Component));

exports.default = DevTools;