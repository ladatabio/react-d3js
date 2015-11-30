import SVGSkeleton from './SVGSkeleton';
import React from 'react';

class Rectangles extends React.Component {

    constructor() {
        super();
        this.attributes = {
            text: 0,
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

        this.childrensTagName = 'Rectangle';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Rectangles);
