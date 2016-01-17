import React from 'react';
import d3 from 'd3';

import { Paths, Animate, SVGContainer } from '../index.js';

export default class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
        };
        this.animationProperties = {
            duration: 200,
            childrenPropsToAnimate: 'attrs',
            delay: 50,
            transformations: [
                {
                    name: 'rotate',
                    from: 0,
                    to: 320,
                },
                {
                    name: 'scale',
                    from: 0,
                    to: 1,
                },
            ],
        };
    }

    componentWillReceiveProps() {
        this.setState({
            animate: true,
        });
    }

    _renderPieChart() {
        const colors = d3.scale
            .ordinal()
            .range(this.props.colors);

        const pie = d3.layout
            .pie()
            .value((d) => {
                return d;
            });

        const arc = d3.svg
                .arc()
                .outerRadius(Math.min(this.props.width, this.props.height) / 3)
                .innerRadius(this.props.margin);

        return pie(this.props.data).map((d, i) => {
            return {
                key: i,
                d: arc(d),
                style: {
                    fill: colors(i),
                },
            };
        });
    }

    render() {
        return (
            <SVGContainer width={250} height={250} contentPosition="center">
                    <Animate {...this.animationProperties} animate={this.state.animate}>
                        <Paths attrs={this._renderPieChart()}/>
                    </Animate>
            </SVGContainer>
        );
    }
}

PieChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array,
    colorsDomain: React.PropTypes.array,
    animation: React.PropTypes.bool,
};

PieChart.defaultProps = {
    height: 300,
    width: 300,
    margin: 20,
    colors: [
        '#2196F3', '#4CAF50', '#E91E63', '#FF9800', '#4DB6AC',
    ],
    colorsDomain: [],
    animation: false,
};
