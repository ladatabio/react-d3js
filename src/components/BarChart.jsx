import React from 'react';

export default class BarChart extends React.Component {

    constructor(){
        super();
        this.xScale = d3.scale.ordinal().domain(d3.range(100)).rangeBands([0, 300]);
        this.yScale = d3.scale.linear().domain([0, 100]).range([0, 300]);
    }

    render(){
        return <div>Hello</div>;
    }

}
