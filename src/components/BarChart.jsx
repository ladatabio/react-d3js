import React from 'react';
import d3 from 'd3';

import { Rectangles, Texts, Animate, SVGContainer } from '../index.js';

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this._defineScales();
        this.state = {
            animate: true,
            rectanglesAttributes: this._buildRectangles(),
            xLabelsAttributes: this._buildXLabels(),
            yLabelsAttributes: this._buildYLabels(),
        };
    }

    componentWillReceiveProps() {
        this._defineScales();
        this.setState({
            animate: true,
            rectanglesAttributes: this._buildRectangles(),
            xLabelsAttributes: this._buildXLabels(),
            yLabelsAttributes: this._buildYLabels(),
        });
    }

    _defineScales() {
        this.xScale = d3.scale.ordinal().domain(d3.range(this.props.data.length)).rangeBands([0, this.props.width]);
        this.yScale = d3.scale.linear().domain([0, d3.max(this.props.data)]).range([0, this.props.height - 50]);
    }

    _buildData() {
        return this.props.data.map((value, index) => {
            return {
                key: index,
                x: this.xScale(index),
                y: this.props.height - this.yScale(value) - 20,
                width: this.props.width / this.props.data.length - 8,
                height: this.yScale(value),
                style: this.props.style,
                value,
                fill: 'green',
            };
        });
    }

    _buildRectangles() {
        const newData = this._cloneNestedArray(this._buildData());
        return newData.map((field) => {
            field.onMouseOver = (e) => {
                const key = e.target.attributes['data-reactid'].value.split('$')[1];
                const newFormattedData = newData.slice();
                newFormattedData[key] = Object.assign(newFormattedData[key], {style: {fill: 'purple'}}, newFormattedData[key].style);
                this.setState({
                    animate: false,
                    rectanglesAttributes: newFormattedData,
                });
            };
            field.onMouseLeave = (e) => {
                const key = e.target.attributes['data-reactid'].value.split('$')[1];
                const newFormattedData = newData.slice();
                newFormattedData[key] = Object.assign(newFormattedData[key], {style: {fill: 'green', stroke: 'black'}});
                this.setState({
                    animate: false,
                    rectanglesAttributes: newFormattedData,
                });
            };
            return field;
        });
    }

    _buildXLabels() {
        const newData = this._cloneNestedArray(this._buildData());

        return newData.map((field, index) => {
            field.y = this.props.height;
            field.value = index;
            return field;
        });
    }

    _buildYLabels() {
        const newData = this._cloneNestedArray(this._buildData());

        return newData.map((field) => {
            field.dy = '-0.5em';
            field.x = field.x + field.width / 2;
            field.style.textAnchor = 'middle';
            return field;
        });
    }

    _cloneNestedArray(nestedArray) {
        const copyArray = nestedArray.slice();
        return copyArray.map((dataObject) => {
            dataObject = Object.assign({}, dataObject);
            for (const i in dataObject) {
                if (dataObject.hasOwnProperty(i) && typeof dataObject[i] === 'object') {
                    dataObject[i] = Object.assign({}, dataObject[i]);
                }
            }
            return dataObject;
        });
    }

    _changeColor() {
        this.setState({fill: 'red'});
    }

    _animations() {
        return {
            duration: 1000,
            childrenPropsToAnimate: 'attrs',
            delay: 10,
            attributes: [
                {
                    name: 'y',
                    from: this.props.height,
                    to: (elementAttributes) => {
                        return this.props.height - this.yScale(elementAttributes.value) - 20;
                    },
                },
                {
                    name: 'height',
                    from: this.yScale(0) - 20,
                    to: (elementAttributes) => {
                        return this.yScale(elementAttributes.value);
                    },
                },
            ],
        };
    }

    render() {
        return (
            <SVGContainer width={this.props.width} height={this.props.height} >
                <Animate {...this._animations()} animate={this.state.animate}>
                    <Rectangles attrs={this.state.rectanglesAttributes} onClick={this._changeColor.bind(this)}/>
                </Animate>
                <Texts attrs={this.state.xLabelsAttributes}/>
                <Texts attrs={this.state.yLabelsAttributes}/>
            </SVGContainer>);
    }
}

BarChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    style: React.PropTypes.object,
};

BarChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        fill: 'green',
    },
};
