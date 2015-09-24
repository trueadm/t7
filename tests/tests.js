/** @jsx t */
/* global describe it */
import t7 from '../src';
import { expect } from 'chai';

describe('t7 acceptance tests', () => {
	it('should handle a basic example #1', () => {
		expect(
			t7`<menu:div><div></div></menu>`
		).to.deep.equal({
			tag: 'div',
			children: { tag: 'div' }
		});
	});

	it('should handle a basic example #2', () => {
		expect(
			t7`<menu:div><span>Hello world</span></menu>`
		).to.deep.equal({
			tag: 'div',
			children: { tag: 'span', children: 'Hello world' }
		});
	});

	it('should handle a basic example #3', () => {
		expect(
			t7`<menu:div><span>Hello world</span> this is a test!</menu>`
		).to.deep.equal({
			tag: 'div',
			children: [
				{ tag: 'span', children: 'Hello world' },
				' this is a test!'
			]
		});
	});

	describe('parse-tag', () => {
		it('should handle custom attributes', () => {
			expect(
				t7`<foo:div other=stuff something=54 quote='me '>`
			).to.deep.equal({
				 tag: 'div',
				 attrs: {
					 other: 'stuff',
					 something: '54',
					 quote: 'me '
				}
			});
		});

		it('should handle void elements', () => {
			expect(
				t7`<foo:img src='something' alt='sweet picture'/>`
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
