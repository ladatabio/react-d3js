import React, { Component } from 'react';
import d3 from 'd3';

import { Paths, Animate, SVGContainer, XAxis } from '../index.js';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            attributes: this._computeAttributes(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            attributes: this._computeAttributes(nextProps),
        });
    }

    _computeAttributes(props) {
        const { width, height, data, style } = props;
        this.xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangePoints([0, width]);
        this.yScale = d3.scale.linear().domain([0, d3.max(data)]).range([0, height - 50]);

        const valueline = d3.svg.line()
            .x((d, i) => this.xScale(i))
            .y((d) => this.yScale(d));

        return ([
            {
                d: valueline(data),
                style,
            },
        ]);
    }

    _renderElements() {
        return (
            <Paths attrs={this.state.attributes}/>
        );
    }

    render() {
        return (
            <SVGContainer width={this.props.width} height={this.props.height}>
                <XAxis {...this.props} scale={this.xScale}/>
                {this._renderElements()}
            </SVGContainer>
        );
    }
}

LineChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    style: React.PropTypes.object,
};

LineChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        stroke: 'steelblue',
        strokeWidth: 2,
        fill: 'none',
    },
};
