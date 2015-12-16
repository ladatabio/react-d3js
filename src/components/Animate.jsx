import { Component, PropTypes, cloneElement, unmountComponentAtNode, findDOMNode } from 'react';
import { ease } from 'd3';

window.requestAnimationFrame = window.requestAnimationFrame ||
 window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
   window.msRequestAnimationFrame || function(callback){callback;};

export default class Animate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        };
    }

    componentWillMount() {
        this._start();
    }

    componentWillReceiveProps() {
        this._start();
    }

    _nestedDefaultProps(propToMerge, defaultProp) {
        if (this.props[propToMerge].length > 0) {
            for (let [propObjectToMerge, propObjectContent] of this.props[propToMerge].entries()) {
                this.props[propToMerge][propObjectToMerge] = Object.assign({}, defaultProp, propObjectContent);
            };
        }
    }

    _start() {
        this._nestedDefaultProps('attributes', {from: 0, ease: 'linear'});
        this._nestedDefaultProps('style', {from: 0, ease: 'linear'});
        this._nestedDefaultProps('transformations', {from: 0, ease: 'linear'});

        this.startTime = Date.now();
        window.requestAnimationFrame(this._tick.bind(this));
    }

    _tick() {
        if (this.props) {
            if (this.state.timer < (this.props.duration + this.props.delay * this.props.children.props[this.props.childrenPropsToAnimate].length)) {
                this.setState({
                    timer: Date.now() - this.startTime
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
            for (let [, attributeToChange] of this.props.attributes.entries()) {
                console.log(attributeToChange)
                elementAttributes[attributeToChange.name] = attributeToChange.from +
                (attributeToChange.to(elementAttributes, elementIndex) - attributeToChange.from) *
                 ease(attributeToChange.ease)(elementAnimationProgression);
            }

            // Animate by executing transformations
            for (let [, transformationsToExecute] of this.props.transformations.entries()) {
                const transformationProperty = transformationsToExecute.from +
                (transformationsToExecute.to - transformationsToExecute.from) *
                ease(transformationsToExecute.ease)(elementAnimationProgression);
                transform += ` ${transformationsToExecute.name}(${transformationProperty})`;
            }
        } else {
            // Animate by changing progressively the attributes
            for (let [, attributeToChange] of this.props.attributes.entries()) {
                elementAttributes[attributeToChange.name] = attributeToChange.from;
            }

            // Animate by executing transformations
            for (let [, transformationsToExecute] of this.props.transformations.entries()) {
                const transformationProperty = transformationsToExecute.from;
                transform += ` ${transformationsToExecute.name}(${transformationProperty})`;
            }
        }

        elementAttributes.transform = transform; //

        // Animate Style, for now, style animation is only change at end of the timer
        if (elementAnimationProgression >= 1) {
            for (let [, styleToChange] of this.props.style.entries()) {
                elementAttributes.style[styleToChange.name] = styleToChange.to;
            }
        }
        return elementAttributes;
    }

    _renderChildrens() {
        for (let [elementToAnimate, elementAttributes] of
            this.props.children.props[this.props.childrenPropsToAnimate].entries()) {
            this.props.children.props[this.props.childrenPropsToAnimate][elementToAnimate] =  this._animateElement(elementAttributes, elementToAnimate);
        }
        return cloneElement(this.props.children);
    }

    render() {
        return this._renderChildrens();
    }
};

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
                PropTypes.func
            ]),
            to: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.func
            ]).isRequired,
            ease: PropTypes.string
        })
    ),
    style: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ),
    transformations: PropTypes.arrayOf(PropTypes.object)
};

Animate.defaultProps = {
    wait: 0,
    duration: 800,
    delay: 0,
    childrenPropsToAnimate: '',
    attributes: [],
    style: [],
    transformations: []
};
