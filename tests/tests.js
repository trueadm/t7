/** @jsx t */
/* global describe it beforeEach afterEach */
import t7 from '../src';
import { expect } from 'chai';

// expose t7 globally
global.t7 = t7;

describe('t7 acceptance tests', () => {
    it("should handle a basic example #1", () => {
        let input = t7`<menu:div><div></div></menu>`;

        expect(
            input
        ).to.deep.equal(
            {tag: "div", children: {tag: "div"}}
        );
    });

    it("should handle a basic example #2", () => {
        let input = t7`<menu:div><span>Hello world</span></menu>`;

        expect(
            input
        ).to.deep.equal(
            {tag: "div", children: {tag: "span", children: "Hello world"}}
        );
    });

    it("should handle a basic example #3", () => {
        let input = t7`<menu:div><span>Hello world</span> this is a test!</menu>`;

        expect(
            input
        ).to.deep.equal(
            {tag: "div", children: [{tag: "span", children: "Hello world"}, " this is a test!"]}
        );
    });
});
