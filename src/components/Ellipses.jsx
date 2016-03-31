import SVGSkeleton from './SVGSkeleton';
import React from 'react';

const attributes = {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0,
    style: {
    },
    transform: '',
};

const childrensTagName = 'Ellipse';

function Ellipses(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Ellipses, childrensTagName, attributes);
