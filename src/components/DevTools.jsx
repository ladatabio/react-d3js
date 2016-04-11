import React, { Component, PropTypes } from 'react';

import { Animate } from '../index.js';

export default class DevTools extends Component {

    _listComponentsAttributes(component) {
        if(component.type.displayName == 'Animate') {
            console.log(component.props.duration)
        }
        const attributes = new Set();
        for (const [attribute, value] of Object.entries(component.props)) {
            attributes.add(
                <div>
                    <div>{attribute + ' : ' + value.toString()}</div>
                </div>
            );
        }
        return attributes;
    }

    _listComponents(content) {
        const components = new Set();
        for (const component of Object.values(content)) {
            components.add(
                <div style={{
                    backgroundColor: '#21252b',
                    borderRadius: '1em',
                    border: '5px solid #353b45',
                    boxShadow: '1px 1px 1px 1px #272d34',
                }}>
                    <div>{component.type.displayName + ' : '}</div>
                    <div>{this._listComponentsAttributes(component)}</div>
                </div>
            );
        }
        return components;
    }

    _displayDevToolsContent() {
        let {content} = this.props;
        if (!Array.isArray(content)) {
            content = [content];
        }
        return (
            <div>
                {this._listComponents(content)}
            </div>
        );
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                {this.props.children}
                <div style={{
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
                    boxShadow: '4px 4px 4px 4px #272d34',
                }}>
                    <h2>Chart DevTools</h2>
                    {this._displayDevToolsContent()}
                </div>
            </div>
        );
    }
}
