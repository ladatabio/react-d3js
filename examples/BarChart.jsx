import React from 'react';
import ReactDOM from 'react-dom';
import { BarChart } from '../src/index.js';

export class BarChartExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 300,
            margin: 30,
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

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <BarChart data={this.state.data} style={{fill: 'green', stroke: 'black'}}/>
                <button style={{width: '200px', marginTop: '2em'}} onClick={this._generateRandomData.bind(this)}>random data</button>
            </div>);
    }

}

ReactDOM.render(<BarChartExample/>, document.getElementById('app'));
