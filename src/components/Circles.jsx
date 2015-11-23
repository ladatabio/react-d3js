import SVGSkeleton from './SVGSkeleton';
import React from 'react';

class Circles extends React.Component {

    constructor() {
        super();
        this.attributes = {
            r: 0,
            cx: 0,
            cy: 0,
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Circle';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Circles);
