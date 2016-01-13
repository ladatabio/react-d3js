import SVGSkeleton from './SVGSkeleton.jsx';
import React from 'react';

const attributes = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    style: {
    },
    transform: '',
};

const childrensTagName = 'Line';

function Lines(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Lines, childrensTagName, attributes);
