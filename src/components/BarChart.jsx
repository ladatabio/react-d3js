import React from 'react';
import d3 from 'd3';
import { Rectangles, Animate, Texts } from '../index.js';

export default class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this._defineScales();
        this.state = {
            formattedData: this._buildData(),
            xLabels: this._buildXLabels(),
            yLabels: this._buildYLabels()
        }
    }

    componentWillReceiveProps(){
        this._defineScales();
        this.setState({
            formattedData: this._buildData(),
            xLabels: this._buildXLabels(),
            yLabels: this._buildYLabels()
        })
    }

    _defineScales() {
        this.xScale = d3.scale.ordinal().domain(d3.range(this.props.data.length)).rangeBands([0, this.props.width]);
        this.yScale = d3.scale.linear().domain([0, d3.max(this.props.data)]).range([0, this.props.height - 50]);
    }

    _buildData() {
        return this.props.data.map((value, index) => {
            return {
                x: this.xScale(index),
                y: this.props.height - this.yScale(value) - 20,
                width: this.props.width / this.props.data.length - 8,
                height: this.yScale(value),
                style: this.props.style,
                value: value,
                fill: 'green',
                onMouseOver: function(e) {
                    let newFormattedData = this.state.formattedData.slice();
                    newFormattedData[e] = Object.assign(newFormattedData[e], {style: {fill: 'purple'}})
                    this.setState({
                        formattedData: newFormattedData
                    })
                }.bind(this, index),
                onMouseLeave: function(e) {
                    let newFormattedData = this.state.formattedData.slice();
                    newFormattedData[e] = Object.assign(newFormattedData[e], {style: {fill: 'green', stroke: 'black'}})
                    this.setState({
                        formattedData: newFormattedData
                    })
                }.bind(this, index)
            }
        })
    }

    _buildXLabels() {
        return this._buildData().map((field, index) => {
            field.y = this.props.height;
            field.value = index;
            return field;
        })
    }

    _buildYLabels() {
        return this._buildData().map((field) => {
            field.dy = '-0.5em';
            return field;
        })
    }

    _changeColor(e) {
        this.setState({fill: 'red'})
    }

    render() {
        return (<svg width = {this.props.width} height = {this.props.height} >
            <Rectangles attrs={this.state.formattedData} onClick={this._changeColor.bind(this)}/>
            <Texts attrs={this.state.xLabels}/>
            <Texts attrs={this.state.yLabels}/>
        </svg>);
    }


};

BarChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    style: React.PropTypes.object
};

BarChart.defaultProps = {
    width: 600,
    height: 300,
    style: {
        fill: 'green'
    }
}
