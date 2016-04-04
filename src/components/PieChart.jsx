import React, {Component} from 'react';
import d3 from 'd3';

import {Paths, Animate, SVGContainer} from '../index.js';

export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this._colors = d3
            .scale
            .ordinal()
            .range(this.props.colors);
        this.state = {
            pathsAttributes: this._computePathsAttributes(),
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
                }, {
                    name: 'scale',
                    from: 0,
                    to: 1,
                },
            ],
        };
    }

    componentWillReceiveProps(nextProps) {
        this._colors = d3
            .scale
            .ordinal()
            .range(nextProps.colors);
        this.setState({
            pathsAttributes: this._computePathsAttributes(),
            animate: true,
        });
    }

    _pieBuilder = d3
        .layout
        .pie()
        .value(data => data.value)

    _changeAllOtherPathsAttributes(keysToKeep, attributeToChange, newAttribute, legend) {
        const newAttributes = this.state.pathsAttributes.slice();
        newAttributes.map(element => {
            if (keysToKeep.indexOf(element.key) === -1) {
                element[attributeToChange] = Object.assign({}, element[attributeToChange], newAttribute);
            }
            return element;
        });
        this.setState({
            pathsAttributes: newAttributes,
            animate: false,
            legend
        });
    }

    _computeNewPathsLayerAttributes(layerData, layer, parentsKeys, outerRadius, innerRadius, startAngle, endAngle) {
        const childrensTotalValue = layerData.reduce((total, children) => total + children.value, 0);
        const pathsAttributes = [];
        let stepAngle = 0;
        for (const [pathIndex, pathData] of Object.entries(this._pieBuilder(layerData))) {
            const arc = d3.svg
                .arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

            if (startAngle !== undefined && endAngle !== undefined) {
                pathData.startAngle = startAngle + stepAngle;
                stepAngle = pathData.value / childrensTotalValue * Math.abs(endAngle - startAngle);
                pathData.endAngle = pathData.startAngle + stepAngle;
            }

            const pathAttributes = {
                key: `${parentsKeys.join('/')}/${pathData.data.label}`,
                d: arc(pathData),
                style: {
                    fill: this._colors(pathIndex),
                    opacity: 1,
                },
            };

            const newParentsKeys = parentsKeys.slice();
            newParentsKeys.push(pathAttributes.key);

            pathAttributes.onMouseOver = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', {opacity: 0.3}, newParentsKeys);
            pathAttributes.onMouseLeave = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', {opacity: 1});

            pathsAttributes.push(pathAttributes);

            if (pathData.data.childrens) {
                pathsAttributes.push(...this._computeNewPathsLayerAttributes(pathData.data.childrens, layer + 1, newParentsKeys, outerRadius + 25 - 2 * layer, outerRadius, pathData.startAngle, pathData.endAngle));
            }
        }

        return pathsAttributes;
    }

    _computePathsAttributes() {
        const numberOfLayers = 3; //Math.max.apply(null, this.props.data.map(data => data.layer));
        const outerRadius = Math.min(this.props.width, this.props.height) / 3 - numberOfLayers * 25;
        const innerRadius = this.props.margin;
        const pathsAttributes = this._computeNewPathsLayerAttributes(this.props.data, 1, [], outerRadius + 25, innerRadius);
        return pathsAttributes;
    }

    _renderLegend() {
        if (this.state.legend) {
            let legendData = this.props.data;
            return legendData.map((elementToDisplay, index) => {
                legendData.find(legendData => legendData.label === elementToDisplay)
                return (
                    <g transform={`translate(${78 * 0},0)`}>
                        <polygon style="fill: rgb(86, 135, 209);" points="0,0 75,0 85,15 75,30 0,30"></polygon>
                        <text text-anchor="middle" dy="0.35em" y="15" x="42.5">
                            {elementToDisplay + ':' +legendData.find(legendData => legendData.label === elementToDisplay)}
                        </text>
                    </g>
                )
            })
        }
    }

    render() {
        return (
            <SVGContainer width={250} height={250} contentPosition="center">
                <Animate {...this.animationProperties} animate={this.state.animate}>
                    <Paths attrs={this.state.pathsAttributes}/>
                </Animate>
                {this._renderLegend()}
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
        '#2196F3',
        '#4CAF50',
        '#E91E63',
        '#FF9800',
        '#4DB6AC',
    ],
    colorsDomain: [],
    animation: false,
};
