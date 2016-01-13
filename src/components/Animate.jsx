import { Component, PropTypes, cloneElement } from 'react';
import { ease } from 'd3';

import { handleNestedDefaultProps } from '../utils.js';

window.requestAnimationFrame = window.requestAnimationFrame ||
 window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
   window.msRequestAnimationFrame;

export default class Animate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
        };
    }

    componentWillMount() {
        this._start();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.animate === true) {
            this._start();
        }
    }

    _nestedDefaultProps(propToMerge, defaultProp) {
        if (this.props[propToMerge].length > 0) {
            for (const [propObjectToMerge, propObjectContent] of this.props[propToMerge].entries()) {
                this.props[propToMerge][propObjectToMerge] = Object.assign({}, defaultProp, propObjectContent);
            }
        }
    }

    _start() {
        //this.props = handleNestedDefaultProps(this.props, this.nestedDefaultProps)
        const nestedDefaultProps = {
            attributes: {from: 0, ease: 'linear'},
            style: {from: 0, ease: 'linear'},
            transformations: {from: 0, ease: 'linear'}
        }
        this._nestedDefaultProps('attributes', {from: 0, ease: 'linear'});
        this._nestedDefaultProps('style', {from: 0, ease: 'linear'});
        this._nestedDefaultProps('transformations', {from: 0, ease: 'linear'});
        this.setState({timer: 0 });
        this.startTime = Date.now();
        window.requestAnimationFrame(this._tick.bind(this));
    }

    _tick() {
        if (this.props) {
            if (this.state.timer < (this.props.duration + this.props.delay * this.props.children.props[this.props.childrenPropsToAnimate].length)) {
                this.setState({
                    timer: Date.now() - this.startTime,
                });
                window.requestAnimationFrame(this._tick.bind(this));
            }
        }
    }

    _animateElement(elementAttributes, elementIndex) {
        const elementCanStartAnimation = this.state.timer - (this.props.delay * elementIndex) >= 0;
        const elementAnimationProgression = (this.state.timer - this.props.delay * elementIndex) / this.props.duration;
        let transform = '';

        if (elementCanStartAnimation) {
            // Animate by changing progressively the attributes
            for (const [, attributeToChange] of this.props.attributes.entries()) {
                elementAttributes[attributeToChange.name] = attributeToChange.from +
                (attributeToChange.to(elementAttributes, elementIndex) - attributeToChange.from) *
                 ease(attributeToChange.ease)(elementAnimationProgression);
            }

            // Animate by executing transformations
            for (const [, transformationsToExecute] of this.props.transformations.entries()) {
                const transformationProperty = transformationsToExecute.from +
                (transformationsToExecute.to - transformationsToExecute.from) *
                ease(transformationsToExecute.ease)(elementAnimationProgression);
                transform += ` ${transformationsToExecute.name}(${transformationProperty})`;
            }
        } else {
            // Animate by changing progressively the attributes
            for (const [, attributeToChange] of this.props.attributes.entries()) {
                elementAttributes[attributeToChange.name] = attributeToChange.from;
            }

            // Animate by executing transformations
            for (const [, transformationsToExecute] of this.props.transformations.entries()) {
                const transformationProperty = transformationsToExecute.from;
                transform += ` ${transformationsToExecute.name}(${transformationProperty})`;
            }
        }

        elementAttributes.transform = transform; //

        // Animate Style, for now, style animation is only change at end of the timer
        if (elementAnimationProgression >= 1) {
            for (const [, styleToChange] of this.props.style.entries()) {
                elementAttributes.style[styleToChange.name] = styleToChange.to;
            }
        }
        return elementAttributes;
    }

    _renderChildrens() {
        const { delay, children, childrenPropsToAnimate, duration } = this.props;
        if (this.state.timer <= (duration + delay * (children.props[childrenPropsToAnimate].length + 1))) {
            for (const [elementToAnimate, elementAttributes] of children.props[childrenPropsToAnimate].entries()) {
                children.props[childrenPropsToAnimate][elementToAnimate] = this._animateElement(elementAttributes, elementToAnimate);
            }
            return cloneElement(children);
        }
        return children;
    }

    render() {
        return this._renderChildrens();
    }
}

Animate.propTypes = {
    duration: PropTypes.number,
    delay: PropTypes.number,
    childrenPropsToAnimate: PropTypes.string,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            start: PropTypes.number,
            from: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.func,
            ]),
            to: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.func,
            ]).isRequired,
            ease: PropTypes.string,
        })
    ),
    style: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ),
    transformations: PropTypes.arrayOf(PropTypes.object),
};

Animate.defaultProps = {
    wait: 0,
    duration: 800,
    delay: 0,
    childrenPropsToAnimate: '',
    attributes: [],
    style: [],
    transformations: [],
};

Animate.nestedDefaultProps = {
    attributes: {from: 0, ease: 'linear'},
    style: {from: 0, ease: 'linear'},
    transformations: {from: 0, ease: 'linear'}
}
