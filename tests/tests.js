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
	

    describe('parse-tag', () => {
		
	it("should handle custom attributes", () => {
	    let input = t7 `<foo:div other=stuff something=54 quote="me ">`;
	    console.log(input)
	    expect(
	        input
	    ).to.deep.equal({ 
	         tag: 'div', 
         attrs: { 
             other: 'stuff', 
             something: '54', 
             quote: 'me ' 
         }
     } 
);
	});
		
	it("should handle void elements", () => {
	    let input = t7 `<foo:img src="something" alt="sweet picture"/>`;

	    expect(
	        input
	    ).to.deep.equal({
	        tag: 'img',
	        attrs: {
	            src: 'something',
	            alt: 'sweet picture'
	        }
	    });
	});
 });


});
