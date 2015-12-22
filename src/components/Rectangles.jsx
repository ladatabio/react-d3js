import SVGSkeleton from './SVGSkeleton.jsx';
import React from 'react';

class Rectangles extends React.Component {

    constructor() {
        super();
        this.attributes = {
            text: 0,
            fill: 'black',
            x: 0,
            y: 0,
            rx: 0,
            ry: 0,
            width: 0,
            height: 0,
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Rect';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Rectangles);
