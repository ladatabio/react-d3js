import React from 'react';
import { render } from 'react-dom';
import { PieChart } from '../src/index.js';

export class PieChartExample extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PieChart data={[70, 20, 8, 2, 5, 6, 8, 9, 10, 30, 20, 10]}/>
        );
    }
}


render(<PieChartExample/>, document.getElementById('app'));
