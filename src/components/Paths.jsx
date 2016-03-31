import SVGSkeleton from './SVGSkeleton';
import React from 'react';

const attributes = {
    d: '',
    style: {
    },
    transform: '',
};

const childrensTagName = 'Path';

function Paths(props) {
    return (
        <g>{props.children}</g>
    );
}

export default SVGSkeleton(Paths, childrensTagName, attributes);
