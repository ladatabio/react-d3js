import SVGSkeleton from './SVGSkeleton';
import React from 'react';
import d3 from 'd3';

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

Paths.prototype = {
    getFormula(x, y, interpolation) {
        return d3.svg.line()
            .interpolate(interpolation)
            .x(x)
            .y(y);
    },
    getLength(data, x, y) {
        const coordinates = Object.entries(data).map((value, index) => ({ x: x(value, index), y: y(value, index) }));
        let totalLength = 0;
        for (const index of Object.keys(coordinates)) {
            if (index > 0) {
                totalLength += Math.sqrt(Math.pow(coordinates[index].x - coordinates[index - 1].x, 2) + Math.pow(coordinates[index].y - coordinates[index - 1].y, 2));
            }
        }
        return totalLength;
    },
};

export default SVGSkeleton(Paths, childrensTagName, attributes);
