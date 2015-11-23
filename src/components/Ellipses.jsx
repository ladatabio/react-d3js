import SVGSkeleton from './SVGSkeleton';
import { Component } from 'react';

class Ellipses extends Component {

    constructor() {
        super();
        this.attributes = {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Ellipse';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Ellipses);
