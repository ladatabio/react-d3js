import React from 'react';
import d3 from 'd3';
import { Circles, Animate } from '../lib/index.js';

let colors = d3.scale.ordinal().range(['blue','green','red']).domain([0,2]);

let myAnimation = {
    duration: 3000,
    childrenPropsToAnimate: 'attrs',
    delay: 3,
    attributes: [
        {
            name: 'cx',
            from: 2000,
            to: function(elementAttributes, elementIndex) {
                return 6 * elementIndex;
            }
        }, {
            name: 'cy',
            from: -2000,
            to: function(elementAttributes, elementIndex) {
                return 800;
            },
            ease: 'bounce'
        }
    ]
};

export class Test extends React.Component {

    _circlesAttributes() {
        return d3.range(100).map((d, i) => {
            return {
                            r: 5,
                            cx: 150,
                            cy: 150,
                            style: {
                                fill: 'blue'
                            }
                        };
        });
    }

    render() {
        return (
                <svg height='100%' style={{
                    overflow: 'visible'
                }}>
                    <Animate {...myAnimation}>
                        <Circles attrs={this._circlesAttributes()}/>
                    </Animate>
                </svg>
        );
    }

};

React.render(<Test/>, document.getElementById('app'));
