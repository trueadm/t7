import t7Factory from '../src';
import reactTransformer from '../src/transformers/react';
import { expect } from 'chai';
import React from 'react';

global.React = React;

describe('t7 acceptance tests', () => {
	let t7 = null;

	beforeEach(() => {
		t7 = t7Factory.createInstance();
	});

	afterEach(() => {
		t7Factory.clearTemplates();
	});

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
			it('should handle a basic example #1b', () => {
				let foo = "Hello world";
				let className = "bar";
				let input = t7 `<div className=${ className }><span className=${ className }>${ foo }</span></div>`;

				expect(
					input
				).to.deep.equal({
					tag: 'div',
					attrs: {
						className: className
					},
					children: {
						tag: 'span',
						attrs: {
							className: className
						},
						children: foo
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

	describe('React transformer', () => {
		beforeEach(() => {
			t7Factory.setTransformer(reactTransformer);
		});

		describe('parseTag - basic', () => {
			it('should handle a basic example #1', () => {
				let input = t7 `<div><div></div></div>`;
				let output = React.renderToStaticMarkup(input);

				expect(
					output
				).to.equal(
					'<div><div></div></div>'
				);
			});
			it('should handle a basic example #1b', () => {
				let foo = "Hello world";
				let className = "bar";
				let input = t7 `<div className=${ className }><span className=${ className }>${ foo }</span></div>`;
				let output = React.renderToStaticMarkup(input);

				expect(
					output
				).to.equal(
					'<div class="bar"><span class="bar">Hello world</span></div>'
				);
			});
		});
	});
});
