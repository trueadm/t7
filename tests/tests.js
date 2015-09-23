/** @jsx t */
/* global describe it beforeEach afterEach */
import t7 from '../src';
import { expect } from 'chai';

// expose t7 globally
global.t7 = t7;

describe('t7 acceptance tests', () => {
    it("should handle a basic example #1", () => {
        var input = t7`<menu:div><div></div></menu>`;

        expect(
            input
        ).to.deep.equal(
            {tag: "div", children: {tag: "div"}}
        );
    });

    it("should handle a basic example #2", () => {
        var input = t7`<menu:div><span>Hello world</span></menu>`;

        expect(
            input
        ).to.deep.equal(
            {tag: "div", children: {tag: "span", children: "Hello world"}}
        );
    });
});
