import SVGSkeleton from './SVGSkeleton';
import React from 'react';

class Lines extends React.Component {

    constructor() {
        super();
        this.attributes = {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0,
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Line';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Lines);
