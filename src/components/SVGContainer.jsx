import React, {Component, PropTypes} from 'react';

export default class SVGContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayDevToolsPanel: false,
        };
    }

    _displaySVGContainer() {
        const {width, height, style, children} = this.props;
        switch (this.props.engine) {
            case 'viewBox':
                let viewBox = `0 0 ${width} ${height}`;
                if (this.props.contentPosition === 'center') {
                    viewBox = `-${width / 2} -${height / 2} ${width} ${height}`;
                }
                return (
                    <svg {...style} width={width} height={height} viewBox={viewBox}>
                        {children}
                    </svg>
                );
            case 'javascript' | 'js':
                return (
                    <div></div>
                );
            default:
                return (
                    <div></div>
                );
        }
    }

    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                {this._displaySVGContainer()}
            </div>
        );
    }
}

SVGContainer.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    engine: PropTypes.string,
    contentPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SVGContainer.defaultProps = {
    width: 450,
    height: 450,
    style: {},
    engine: 'viewBox',
    contentPosition: false,
};
