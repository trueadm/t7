/** @jsx t */
/* global describe it */
import t7 from '../src';
import { expect } from 'chai';

describe('t7 acceptance tests', () => {

	describe('parseTag - Component', () => {
		it('should handle a basic component example #1', () => {
			let input = t7 `<menu:div><div></div></menu>`;

			expect(
				input
			).to.deep.equal({
				tag: 'div',
				children: {
					tag: 'div'
				}
			});
		});

		it('should handle a basic component example #2', () => {
			let input = t7 `<menu:div><span>Hello world</span></menu>`;

			expect(
				input
			).to.deep.equal({
				tag: 'div',
				children: {
					tag: 'span',
					children: 'Hello world'
				}
			});
		});

		it('should handle a basic component example #3', () => {
			let input = t7 `<menu:div><span>Hello world</span> this is a test!</menu>`;

			expect(
				input
			).to.deep.equal({
				tag: 'div',
				children: [{
					tag: 'span',
					children: 'Hello world'
				}, ' this is a test!']
			});
		});
	});

	describe('parseTag - HTML5', () => {

		it('should handle custom attributes', () => {
			let input = t7 `<div other=stuff something=54 quote='me '>`;

			expect(
				input
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
			let input = t7 `<img src='something' alt='sweet picture'/>`;

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
