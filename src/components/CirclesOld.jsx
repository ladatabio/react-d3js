import Skull from './Skull.jsx';
import React from 'react';

class Circles extends React.Component {

    constructor() {
        super();
        this.availableAttributes = {
            r: 0,
            className: '',
            cx: 0,
            cy: 0,
            style: {},
            transform: ''
        };

    }

    _circlesRenderer() {
        let circles = new Set();
        for (let [elementToRender, elementAttributes] of this.props.attrs.entries()) {
            circles.add(<circle key={`circle${elementToRender}`} {...elementAttributes}/>);
        }
        return circles;
    }

    render() {
        return (
            <g>{this._circlesRenderer()}</g>
        );
    }
}

export default Skull(Circles);
