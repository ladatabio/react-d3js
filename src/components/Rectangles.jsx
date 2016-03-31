import SVGSkeleton from './SVGSkeleton';
import React from 'react';

const attributes = {
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
    transform: '',
};

const childrensTagName = 'Rect';

function Rectangles(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Rectangles, childrensTagName, attributes);
