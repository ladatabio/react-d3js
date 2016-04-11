'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (data) {
    var newData = [];
    switch (true) {
        case isFlatArray(data):
            break;
        case isNestedArray(data):
            console.log('yo');
            break;
        case isCollection(data):
            console.log('yo');
            break;
        case isJSON(data):
            console.log('yo');
            break;
        default:
            console.log('yo');
    }

    // data = [
    //     {
    //         label: 1,
    //         value: 1,
    //         key:
    //     }
    // ]
    return data;
};

function isFlatArray(data) {
    return Array.isArray(data) && _typeof(data[0]) !== 'object';
}

function isNestedArray(data) {
    return Array.isArray(data) && Array.isArray(data[0]);
}

function isCollectionOfDict(data) {
    return Array.isArray(data) && _typeof(data[0]) === 'object';
}

function isDict(data) {
    return !Array.isArray(data) && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object';
}