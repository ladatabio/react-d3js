import SVGSkeleton from './SVGSkeleton';
import React from 'react';

const attributes = {
    r: 0,
    cx: 0,
    cy: 0,
    style: {
    },
    transform: '',
};

const childrensTagName = 'Circle';

function Circles(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Circles, childrensTagName, attributes);
