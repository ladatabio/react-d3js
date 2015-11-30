import React from 'react';
import d3 from 'd3';
import { BarChart } from '../src/index.js';

let data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

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
            <BarChart/>
        </svg>
    }

}

React.render(<BarChartExample/>, document.body);
