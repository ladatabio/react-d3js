import SVGSkeleton from './SVGSkeleton';
import React from 'react';

class Texts extends React.Component {

    constructor() {
        super();
        this.attributes = {
            value: 0,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Text';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Texts);
