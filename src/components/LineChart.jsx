import React, {Component} from 'react';
import d3 from 'd3';

import {Paths, Circles, Animate, SVGContainer, XAxis, YAxis} from '../index.js';

export default class LineChart extends Component {

    static defaultProps = {
        width: 600,
        height: 300,
        style: {
            stroke: 'steelblue',
            strokeWidth: 2,
            fill: 'none',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            animate: true,
            attributes: this._buildAttributes(props),
            animation: this._buildAnimations(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            attributes: this._buildAttributes(nextProps),
            animation: this._buildAnimations(nextProps),
        });
    }

    _buildAttributes(props) {
        const {width, height, data, style} = props;
        const attributes = {};
        this.xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangePoints([
            50, width - 20,
        ]);
        this.yScale = d3.scale.linear().domain([d3.max(data), 0]).range([
            20, height - 50,
        ]);

        const pathFormula = Paths.utils.getFormula((value, index) => this.xScale(index), (value) => this.yScale(value));
        const totalLength = Paths.utils.getLength(data, (value, index) => this.xScale(index), (value) => this.yScale(value));

        attributes.line = [{
            d: pathFormula(data),
            strokeDasharray: totalLength + ' ' + totalLength,
            style,
        }];

        attributes.points = [];
        for (const [key, value] of Object.entries(data)) {
            attributes.points.push({
                cx: this.xScale(key),
                cy: this.yScale(value),
                r: '0.3em',
            });
        }

        return attributes;
    }

    _buildAnimations(props) {
        const animations = {};
        animations.line = {
            duration: 2000,
            childrenPropsToAnimate: 'attrs',
            delay: 0,
            style: [
                {
                    name: 'strokeDashoffset',
                    from: Paths.utils.getLength(props.data, (value, index) => this.xScale(index), (value) => this.yScale(value)),
                    to: () => {
                        return 0;
                    },
                    ease: 'linear',
                },
            ],
        };

        animations.points = {
            duration:  2000 / props.data.length,
            childrenPropsToAnimate: 'attrs',
            delay: 2000 / props.data.length,
            style: [
                {
                    name: 'opacity',
                    from: 0,
                    to: () => {
                        return 1;
                    },
                },
            ],
        };
        return animations;
    }

    render() {
        const {width, height, style} = this.props;
        return (
            <SVGContainer width={width} height={height}>
                <XAxis style={style} verticalPosition={height - 50} scale={this.xScale} />
                <YAxis style={style} horizontalPosition={50} scale={this.yScale} />
                <Animate {...this.state.animation.line} animate={true}>
                    <Paths attrs={this.state.attributes.line} />
                </Animate>
                <Animate {...this.state.animation.points} animate={true}>
                    <Circles attrs={this.state.attributes.points} />
                </Animate>
            </SVGContainer>
        );
    }
}
