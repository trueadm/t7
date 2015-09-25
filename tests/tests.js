import t7Factory from '../src';
import { expect } from 'chai';

describe('t7 acceptance tests', () => {
	let t7 = null;

	beforeEach(function() {
		t7 = t7Factory.createInstance();
	})

	describe('Universal (default) transformer', () => {
		describe('parseTag - basic', () => {
			it('should handle a basic example #1', () => {
				let input = t7 `<div><div></div></div>`;

				expect(
					input
				).to.deep.equal({
					tag: 'div',
					children: {
						tag: 'div'
					}
				});
			});
			it('should handle a basic example #2', () => {
				let input = t7 `<div><span>Hello world</span></div>`;

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
			it('should handle a basic example #3', () => {
				let input = t7 `<div><span>Hello world</span> this is a test!</div>`;

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
			it('should handle custom attributes with quotes', () => {
				let input = t7 `<div foo="bar">`;

				expect(
					input
				).to.deep.equal({
					tag: 'div',
					attrs: {
						foo: 'bar'
					}
				});
			});
			it('should handle custom attributes without quotes', () => {
				let input = t7 `<div foo=bar something=54 quote='t7 '>`;

				expect(
					input
				).to.deep.equal({
					tag: 'div',
					attrs: {
						foo: 'bar',
						something: '54',
						quote: 't7 '
					}
				});
			});
			it('should handle void elements', () => {
				let input = t7 `<img src='xxx.jpg' alt='t7Pic'/>`;

				expect(
					input
				).to.deep.equal({
					tag: 'img',
					attrs: {
						src: 'xxx.jpg',
						alt: 't7Pic'
					}
				});
			});
		});
	});
});
