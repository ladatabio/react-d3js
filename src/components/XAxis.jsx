import React, { Component } from 'react';
import d3 from 'd3';

import { Lines } from '../index.js';

export default class Axis extends Component {

    _computeAttributes() {
        const { width, height, data, scale, style } = this.props;

        const axis = [
            {
                x1: 0,
                x2: width,
                y1: height,
                y2: height,
                style,
            },
        ];

        const ticks = data.map((d, i) => {
            return {
                x1: scale(i),
                x2: scale(i),
                y1: height,
                y2: height - 10,
                style,
            };
        });

        return ({
            axis,
            ticks,
        });
    }

    _renderElements() {
        const { axis, ticks } = this._computeAttributes();
        return (
            <g>
                <Lines attrs={axis} />
                <Lines attrs={ticks} />
            </g>
        );
    }

    render() {
        return (
            <g>
                {this._renderElements()}
            </g>
        );
    }
}

Axis.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    scale: React.PropTypes.function,
    style: React.PropTypes.object,
};

Axis.defaultProps = {
    width: 600,
    height: 300,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none',
    },
};
