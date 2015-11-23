import React from 'react';
import d3 from 'd3';
import { Paths, Animate } from '../lib/index.js';

let myAnimation = {
    duration: 400,
    childrenPropsToAnimate: 'attrs',
    delay: 200,
    transformations: [
        {
            name: 'rotate',
            from: 0,
            to: 320
        },
        {
            name: 'scale',
            from: 0,
            to: 1
        }
    ]
};

export class PieChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 300,
            margin: 30
        };
    }

    _renderPieChart() {
        let colors = d3.scale
            .ordinal()
            .range(this.props.colors);

        let pie = d3.layout
            .pie()
            .value(function(d) {
                return d;
            });

        let arc = d3.svg
                .arc()
                .outerRadius(Math.min(this.state.width, this.state.height) / 3)
                .innerRadius(this.state.margin);

        let data = [70, 20, 8, 2, 5, 6, 8, 9, 10, 30, 20, 10];

        return pie(data).map((d, i) => {
                return {
                    d: arc(d),
                    style: {
                        fill: colors(i)
                    }
                };
            });
    }

    render() {
        return (
                <svg width='100%' height='500px'>
                    <g transform='translate(300,150)'>
                        <Animate {...myAnimation}>
                            <Paths attrs={this._renderPieChart()}/>
                        </Animate>
                    </g>
                </svg>
        );
    }
}

PieChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array,
    colorsDomain: React.PropTypes.array,
    animation: React.PropTypes.bool
};

PieChart.defaultProps = {
    colors: [
        '#2196F3', '#4CAF50', '#E91E63', '#FF9800', '#4DB6AC'
    ],
    colorsDomain: [],
    animation: false
};

React.render(<PieChart/>, document.body);
