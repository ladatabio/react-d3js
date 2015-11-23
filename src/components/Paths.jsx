import SVGSkeleton from './SVGSkeleton';
import React from 'react';

class Paths extends React.Component {

    constructor() {
        super();
        this.attributes = {
            d: '',
            style: {
            },
            transform: ''
        };

        this.childrensTagName = 'Path';
    }

    render() {
        return (
            <g>{this.props.children}</g>
        );
    }
}

export default SVGSkeleton(Paths);
