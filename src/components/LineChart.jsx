import React, { Component } from 'react';
import d3 from 'd3';

import { Paths, Animate, SVGContainer, XAxis, YAxis } from '../index.js';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            attributes: this._computeAttributes(props),
            animation: this._computeAnimation(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            attributes: this._computeAttributes(nextProps),
            animation: this._computeAnimation(nextProps),
        });
    }

    _computeAttributes(props) {
        const { width, height, data, style } = props;
        this.xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangePoints([50, width - 20]);
        this.yScale = d3.scale.linear().domain([d3.max(data), 0]).range([20, height - 50]);

        const pathFormula = Paths.utils().getFormula((value, index) => this.xScale(index), (value) => this.yScale(value));
        const totalLength = Paths.utils().getLength(data, (value, index) => this.xScale(index), (value) => this.yScale(value));

        return ([
            {
                d: pathFormula(data),
                strokeDasharray: totalLength + ' ' + totalLength,
                style,
            },
        ]);
    }

    _computeAnimation(props) {
        return {
            duration: 2000,
            childrenPropsToAnimate: 'attrs',
            delay: 50,
            style: [
                {
                    name: 'strokeDashoffset',
                    from: Paths.utils().getLength(props.data, (value, index) => this.xScale(index), (value, index) => this.yScale(value)),
                    to: () => {
                        return 0;
                    },
                    ease: 'linear',
                },
            ],
        };
    }

    _renderLine() {
        return (
            <Paths attrs={this.state.attributes}/>
        );
    }

    render() {
        const { width, height, style } = this.props;
        return (
            <SVGContainer width={width} height={height}>
                <XAxis style={style} verticalPosition={height - 50} scale={this.xScale}/>
                <YAxis style={style} horizontalPosition={50} scale={this.yScale}/>
                <Animate {...this.state.animation} animate={true}>
                    {this._renderLine()}
                </Animate>
            </SVGContainer>
        );
    }
}

LineChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        stroke: 'steelblue',
        strokeWidth: 2,
        fill: 'none',
    },
};
