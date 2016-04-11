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
            legend: [],
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

    _changeAllOtherPathsAttributes(keysToKeep, attributeToChange, newAttribute, legend = []) {
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
            legend,
        });
    }

    _computeNewPathsLayerAttributes(layerData, layer, parentsKeys = [], outerRadius, innerRadius, startAngle, endAngle) {
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
                key: `${parentsKeys.length > 0 ? parentsKeys[parentsKeys.length - 1] : ''}/${pathData.data.label}`,
                d: arc(pathData),
                style: {
                    fill: this._colors(pathIndex),
                    opacity: 1,
                },
            };

            const newParentsKeys = parentsKeys.slice();
            newParentsKeys.push(pathAttributes.key);

            pathAttributes.onMouseOver = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', {opacity: 0.3}, pathAttributes.key.split('/').filter(Boolean));
            pathAttributes.onMouseLeave = this._changeAllOtherPathsAttributes.bind(this, newParentsKeys, 'style', {opacity: 1}, []);

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
        const legend = [];
        if (this.state.legend.length) {
            const legendElements = this.state.legend;
            let data = this.props.data;
            let key = '';
            let valueToDisplay;
            for (const [index, legendElement] of Object.entries(legendElements)) {
                const targetedData = data.find(dataElement => dataElement.label === legendElement);
                valueToDisplay = targetedData.value;
                key = key + `/${legendElement}`;
                const targetedColor = this.state.pathsAttributes.find(dataElement => dataElement.key === key).style.fill;
                legend.push(
                    <g transform={`translate(${76 * index}, 0)`}>
                        <polygon points="10,15 0,0 75,0 85,15 75,30 0,30" style={{fill: targetedColor}} />
                        <text textAnchor="middle" dy="0.35em" y="1.1em" x="42.5" style={{fontFamily: 'Roboto', fontSize: '0.8em'}}>
                            {legendElement}
                        </text>
                    </g>
                );
                if (targetedData.childrens) {
                    data = targetedData.childrens;
                }
            }
            legend.push(
                <g transform={`translate(${76 * legendElements.length}, 0)`}>
                    <text textAnchor="start" dy="0.35em" y="1.1em" x="10" style={{fontFamily: 'Roboto', fontSize: '0.8em'}}>
                        {`${this.props.legend.prefix} ${valueToDisplay} ${this.props.legend.suffix}`}
                    </text>
                </g>
            );
        }
        return legend;
    }

    render() {
        return (
            <div>
                <SVGContainer width={400} height={250} contentPosition="center">
                    <Animate {...this.animationProperties} animate={this.state.animate ? this.props.animate : false}>
                        <Paths attrs={this.state.pathsAttributes}/>
                    </Animate>
                </SVGContainer>
                <SVGContainer width={400} height={50}>
                    {this._renderLegend()}
                </SVGContainer>
            </div>
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
    legend: {
        prefix: '',
        suffix: '',
    },
    animate: true,
};
