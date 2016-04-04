import React, { Component } from 'react';
import d3 from 'd3';

import { Paths, Animate, SVGContainer } from '../index.js';

export default class PieChart extends Component {
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

    _computeChildrensLayers(childrensData, layer, outerRadius, innerRadius, startAngle, endAngle) {
        console.log(childrensData)
        const colors = d3.scale
            .ordinal()
            .range(this.props.colors);

        const pie = d3.layout
            .pie()
            .value((data) => {
                return data.value;
            });

        const parentAngle = Math.abs(endAngle - startAngle);
        const childrensTotalValue = childrensData.reduce((total, children) => total + children.value, 0);
        let stepAngle = 0;
        for (const [pathIndex, pathData] of Object.entries(pie(childrensData))) {

            const arc = d3.svg.arc()
                    .outerRadius(outerRadius)
                    .innerRadius(innerRadius);

            pathData.startAngle = startAngle + stepAngle;
            stepAngle = pathData.value / childrensTotalValue * parentAngle;
            pathData.endAngle = pathData.startAngle + stepAngle;

            this.pathsData.push({
                key: layer + '/' + pathIndex + '/' + pathData.data.label + '/' + startAngle,
                d: arc(pathData),
                style: {
                    fill: colors(pathIndex),
                },
            });

            if(pathData.data.childrens) {
                this._computeChildrensLayers(pathData.data.childrens, layer + 1, outerRadius + 25, outerRadius, pathData.startAngle, pathData.endAngle);
            }
        }
    }

    _renderPieChart() {
        const numberOfLayers = 3;//Math.max.apply(null, this.props.data.map(data => data.layer));

        const colors = d3.scale
            .ordinal()
            .range(this.props.colors);

        const pie = d3.layout
            .pie()
            .value((data) => {
                return data.value;
            });

        this.pathsData = [];
        const outerRadius = Math.min(this.props.width, this.props.height) / 3 - numberOfLayers * 25;
        const innerRadius = this.props.margin;
        for (const [pathIndex, pathData] of Object.entries(pie(this.props.data))) {
            const arc = d3.svg.arc()
                    .outerRadius(outerRadius + 25)
                    .innerRadius(innerRadius);

            this.pathsData.push({
                key: 1 + '/' + pathIndex,
                d: arc(pathData),
                style: {
                    fill: colors(pathIndex),
                },
            });

            this._computeChildrensLayers(pathData.data.childrens, 1, outerRadius + 50, outerRadius + 25, pathData.startAngle, pathData.endAngle);
        }

        return this.pathsData;
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
