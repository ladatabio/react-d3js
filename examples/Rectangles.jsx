import React from 'react';
import d3 from 'd3';
import { Rectangles, Animate } from '../src/index.js';

let data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

let xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeBands([0, 300]);
let yScale = d3.scale.linear().domain([0, 100]).range([0, 300]);

data = data.map(function(val, index) {
    return {
       x: xScale(index),
       y: 200 - yScale(val),
       width: 300/data.length - 8,
       height: yScale(val)
    }
});

export class BarChartExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 300,
            margin: 30
        }
    }

    render() {
        return <svg width={this.state.width} height={this.state.height}>
            <Rectangles attrs={data}/>
        </svg>
    }

}

React.render(<BarChartExample/>, document.body);
