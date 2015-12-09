import React from 'react';

export default (InheritedComponent) => class extends React.Component {

        constructor(props) {
            super(props);
            const {childrensTagName, attributes} = new InheritedComponent();
            this.childrensTagName = childrensTagName;
            this.attributes = attributes;
        }

        _childrensRenderer() {
            const Children = this.childrensTagName;
            let childrens = new Set();
            for (let [elementToRender, elementAttributes] of this.props.attrs.entries()) {
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
