import React from 'react';
import d3 from 'd3';
import { Rectangles, Animate } from '../src/index.js';

export class BarChart extends React.Component {

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
            <Rectangles attrs={[{}]}/>
        </svg>
    }

}

React.render(<BarChart/>, document.body);
