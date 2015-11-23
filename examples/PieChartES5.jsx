var React = require('react');
var d3 = require('d3');
var Paths = require('../node_modules/test/lib/index.js').Paths;

var PieChart = React.createClass({

    _renderPieChart: function() {
        var colors = d3.scale
            .ordinal()
            .range(['blue','green']);

        var pie = d3.layout
            .pie()
            .value(function(d) {
                return d;
            });

        var arc = d3.svg
                .arc()
                .outerRadius(Math.min(300, 400) / 3)
                .innerRadius(50);

        var data = [70,20,8,2,5,6,8,9,10,30,20,10];

        return pie(data).map(function(d, i) {
                return {
                    d: arc(d),
                    style: {
                        fill: colors(i)
                    }
                };
            }.bind(this));
    },

    render: function() {
        return (
                <svg width='100%' height='500px'>
                    <g transform='translate(300,150)'>
                            <Paths attrs={this._renderPieChart()}/>
                    </g>
                </svg>
        );
    }
});

React.render(<PieChart/>, document.body);
