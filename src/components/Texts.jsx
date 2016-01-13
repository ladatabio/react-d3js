import SVGSkeleton from './SVGSkeleton.jsx';
import React from 'react';

const attributes = {
    value: 0,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    style: {
    },
    transform: '',
};

const childrensTagName = 'Text';

function Texts(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Texts, childrensTagName, attributes);
