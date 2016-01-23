import React, { Component, PropTypes } from 'react';

export default class SVGContainer extends Component {

    _displayContainer() {
        const { width, height, style, children } = this.props;
        switch (this.props.engine) {
        case 'viewBox':
            let viewBox = `0 0 ${width} ${height}`;
            if (this.props.contentPosition === 'center') {
                viewBox = `-${width / 2} -${height / 2} ${width} ${height}`;
            }
            return (
                <svg {...style}
                  width={width}
                  height={height}
                  viewBox={viewBox} >
                    <g>
                      {children}
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
