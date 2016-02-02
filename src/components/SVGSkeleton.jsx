import React, { Component } from 'react';

export default (InheritedComponent, childrensTagName, attributes) => class extends Component {

        constructor(props) {
            super(props);
            this.childrensTagName = childrensTagName;
            this.attributes = attributes;
        }

        static displayName = childrensTagName + 's';

        static utils = InheritedComponent.prototype;

        _childrensRenderer() {
            const Children = this.childrensTagName;
            const childrens = new Set();
            for (const [elementToRender, elementAttributes] of this.props.attrs.entries()) {
                childrens.add(
                    <Children key={`${Children}${elementToRender}`} {...elementAttributes}>
                        {elementAttributes.value}
                    </Children>
                );
            }
            return childrens;
        }

        render() {
            return (
                <InheritedComponent>
                        {this._childrensRenderer()}
                </InheritedComponent>
             );
        }
    };
