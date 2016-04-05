import { findDOMNode, Component, PropTypes, cloneElement } from 'react';
import { ease } from 'd3';

window.requestAnimationFrame = window.requestAnimationFrame ||
 window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
   window.msRequestAnimationFrame;

export default class Animate extends Component {

    static propTypes = {
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
                easeName: PropTypes.string,
            })
        ),
        style: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
            })
        ),
        transformations: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        wait: 0,
        duration: 800,
        delay: 0,
        childrenPropsToAnimate: '',
        attributes: [],
        style: [],
        transformations: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
        };
    }

    componentWillMount() {
        this.initialChildrenProps = this.props.children;
        if (this.props.animate) {
            this._initiateAnimations();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.animate) {
            this._initiateAnimations();
        }
    }

    _isMounted() {
        try {
            findDOMNode(this);
            return true;
        } catch (e) {
          // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
            return false;
        }
    }

    _initiateAnimations() {
        this.setState({ timer: 0 });
        this.startTime = Date.now();
        window.requestAnimationFrame(this._tick.bind(this));
    }

    _tick() {
        if (this._canContinueAnimation() && this._isMounted()) {
            this.setState({
                timer: Date.now() - this.startTime,
            });
            window.requestAnimationFrame(this._tick.bind(this));
        }
    }

    _canContinueAnimation() {
        const { delay, children, childrenPropsToAnimate, duration } = this.props;
        return this.state.timer <= (duration + delay * (children.props[childrenPropsToAnimate].length + 1));
    }

    _updateAttributes(attributes, index, progress) {
        for (const attributeToChange of Object.values(this.props.attributes)) {
            const { from = 0, to, name, easeName = 'linear' } = attributeToChange;
            attributes[name] = from + (to(attributes, index) - from) * ease(easeName)(progress);
        }
        return attributes;
    }

    _updateTransformations(progress) {
        let transformations = '';
        for (const transformationsToExecute of Object.values(this.props.transformations)) {
            const { from = 0, to, name, easeName = 'linear' } = transformationsToExecute;
            const transformationProperty = from + (to - from) * ease(easeName)(progress);
            transformations += ` ${name}(${transformationProperty})`;
        }
        return transformations;
    }

    _updateStyle(style, index, progress) {
        const newStyle = Object.assign({}, style);
        for (const styleToChange of Object.values(this.props.style)) {
            const { from = 0, to, name, easeName = 'linear' } = styleToChange;
            if (typeof styleToChange.to === 'string' && progress >= 1) {
                newStyle[name] = to;
            } else {
                newStyle[name] = from + (to(newStyle, index) - from) * ease(easeName)(progress);
            }
        }
        return newStyle;
    }

    _animateElement(elementAttributes, elementIndex) {
        const { duration, delay } = this.props;
        const progress = (this.state.timer - delay * elementIndex) / duration;
        elementAttributes = this._updateAttributes(elementAttributes, elementIndex, progress);
        elementAttributes.transform = this._updateTransformations(progress);
        elementAttributes.style = this._updateStyle(elementAttributes.style, elementIndex, progress);
        return elementAttributes;
    }

    _renderChildrens() {
        const { children, childrenPropsToAnimate } = this.props;

        if (this._canContinueAnimation()) {
            for (const [elementToAnimate, elementAttributes] of Object.entries(children.props[childrenPropsToAnimate])) {
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
