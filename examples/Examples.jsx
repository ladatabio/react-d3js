import React from 'react';
import ReactDOM from 'react-dom';
import { BarChart, PieChart, LineChart } from '../src/index.js';

const charts = {
    PieChart,
    BarChart,
    LineChart,
};

export class Examples extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartToDisplay: 'BarChart',
            data: [5, 10, 13, 58, 21, 25, 22, 18, 15, 13, 11, 12],
        };
    }

    _generateRandomData() {
        const arr = [];
        for (let i = 0, t = Math.round(Math.random() * 20 + 1); i < t; i++) {
            arr.push(Math.round(Math.random() * t));
        }
        this.setState({
            data: arr,
        });
    }

    _handleChartChange(event) {
        this.setState({chartToDisplay: event.target.value});
    }

    _displayChart() {
        const Chart = charts[this.state.chartToDisplay];
        return (
            <div>
                <Chart data={this.state.data}/>
            </div>
            );
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                    {this._displayChart()}
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <select onChange={this._handleChartChange.bind(this)} value={this.state.chartToDisplay} style={{width: '200px', margin: '1em auto 4em auto'}}>
                        <option value="PieChart">PieChart</option>
                        <option value="BarChart">BarChart</option>
                        <option value="LineChart">LineChart</option>
                    </select>
                    <button style={{width: '200px', margin: '2em auto 0em auto'}} onClick={this._generateRandomData.bind(this)}>random data</button>
                </div>
            </div>);
    }

}

ReactDOM.render(<Examples/>, document.getElementById('app'));
