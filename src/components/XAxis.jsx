import React, { Component } from 'react';

import { Lines } from '../index.js';

export default class XAxis extends Component {

    _computeAttributes() {
        const { scale, verticalPosition, style, ticksNumber } = this.props;

        let domain = scale.domain();

        const axis = [
            {
                x1: scale(domain[0]),
                x2: scale(domain[domain.length - 1]),
                y1: verticalPosition,
                y2: verticalPosition,
                style,
            },
        ];

        if (scale.ticks) {
            domain = scale.ticks(ticksNumber);
        }

        const ticks = domain.map((d) => {
            return {
                x1: scale(d),
                x2: scale(d),
                y1: verticalPosition + 10,
                y2: verticalPosition,
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

XAxis.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    ticksNumber: React.PropTypes.number,
    scale: React.PropTypes.function,
    style: React.PropTypes.object,
};

XAxis.defaultProps = {
    width: 600,
    height: 300,
    ticksNumber: 5,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none',
    },
};
