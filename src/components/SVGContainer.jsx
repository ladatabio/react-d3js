import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class SVGContainer extends Component {

    _displayContainer() {
        switch (this.props.engine) {
        case 'viewBox':
            let viewBox = `0 0 ${this.props.width} ${this.props.height}`;
            if (this.props.contentPosition === 'center') {
                viewBox = `-${this.props.width / 2} -${this.props.height / 2} ${this.props.width} ${this.props.height}`;
            }
            return (
                <svg {...this.props.style}
                  width={this.props.width}
                  height={this.props.height}
                  viewBox={viewBox} >
                    <g>
                      {this.props.children}
                    </g>
                </svg>
            );
        case 'javascript' | 'js':
            return (<div></div>);
        default:
            return (<div></div>);
        }
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {this._displayContainer()}
            </div>
        );
    }
}

SVGContainer.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    engine: PropTypes.string,
    contentPosition: PropTypes.string,
};

SVGContainer.defaultProps = {
    width: 450,
    height: 450,
    style: {},
    engine: 'viewBox',
    contentPosition: false,
};
