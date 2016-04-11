import React, { Component } from 'react';

import { Lines, Texts } from '../index.js';

export default class XAxis extends Component {

    static propTypes = {
        ticksNumber: React.PropTypes.number,
        scale: React.PropTypes.func.isRequired,
        style: React.PropTypes.object,
    };

    static defaultProps = {
        ticksNumber: 5,
        style: {
            stroke: 'black',
            strokeWidth: 2,
            fill: 'none',
        },
    };

    _buildAttributes() {
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

        const ticks = [];
        const labels = [];

        for (const d of Object.values(domain)) {
            const x = scale(d);
            const y = verticalPosition + 10;

            ticks.push({
                x1: x,
                x2: x,
                y1: y,
                y2: verticalPosition,
                style,
            });

            labels.push({
                x,
                y,
                dy: '1em',
                textAnchor: 'middle',
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
        const { axis, ticks, labels } = this._buildAttributes();
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
