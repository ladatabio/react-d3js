import React, { Component } from 'react';

import { Lines, Texts } from '../index.js';

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

        const ticks = [];
        const labels = [];

        for (const d of Object.values(domain)) {
            const x = horizontalPosition - 10;
            const y = scale(d);

            ticks.push({
                x1: x,
                x2: horizontalPosition,
                y1: y,
                y2: y,
                style,
            });

            labels.push({
                x,
                y,
                dx: '-0.5em',
                dy: '0.5em',
                textLength: '100',
                textAnchor: 'end',
                value: d,
                style,
            });
        }

        return ({
            axis,
            ticks,
            labels,
        });
    }

    _renderElements() {
        const { axis, ticks, labels } = this._computeAttributes();
        return (
            <g>
                <Lines attrs={axis} />
                <Lines attrs={ticks} />
                <Texts attrs={labels} />
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
    ticksNumber: React.PropTypes.number,
    scale: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
};

YAxis.defaultProps = {
    ticksNumber: 5,
    style: {
        stroke: 'black',
        strokeWidth: 2,
        fill: 'none',
    },
};
