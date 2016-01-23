import React, { Component } from 'react';

import { Lines } from '../index.js';

export default class YAxis extends Component {

    _computeAttributes() {
        const { scale, horizontalPosition, style, ticksNumber } = this.props;

        let domain = scale.domain();

        const axis = [
            {
                x1: horizontalPosition,
                x2: horizontalPosition,
                y1: scale(domain[0]),
                y2: scale(domain[domain.length - 1]),
                style,
            },
        ];

        if (scale.ticks) {
            domain = scale.ticks(ticksNumber);
        }

        const ticks = domain.map((d) => {
            return {
                x1: horizontalPosition - 10,
                x2: horizontalPosition,
                y1: scale(d),
                y2: scale(d),
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

YAxis.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    ticksNumber: React.PropTypes.number,
    scale: React.PropTypes.function,
    style: React.PropTypes.object,
};

YAxis.defaultProps = {
    width: 600,
    height: 300,
    ticksNumber: 5,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none',
    },
};
