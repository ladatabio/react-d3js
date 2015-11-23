jest.autoMockOff();
let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');

let Circles = require('../../lib/components/Circles');

describe('Circles', () => {
    it('renders 3 circles', () => {
        let threeCirclesAttributes = [0,1,2].map((d, i) => {
            return {
                r: 5,
                className: 'circle',
                cx: 150,
                cy: 150,
                style: {
                    fill: 'blue'
                }
            };
        });

        let renderThreeCircles = TestUtils.renderIntoDocument(
            <Circles attrs={threeCirclesAttributes}/>
        );

        let childrensAreCircles = new Array();
        for (let circle of ReactDOM.findDOMNode(renderThreeCircles).childNodes) {
            childrensAreCircles.push(circle.localName === 'circle');
        }

        expect(childrensAreCircles.length).toEqual(3);
    });

    it('renders nothing', () => {
        let threeCirclesAttributes = [];

        let renderThreeCircles = TestUtils.renderIntoDocument(
            <Circles attrs={threeCirclesAttributes}/>
        );

        expect(ReactDOM.findDOMNode(renderThreeCircles).childNodes.length).toEqual(12);
    });

});
