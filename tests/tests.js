import t7Factory from '../src';
import reactTransformer from '../src/transformers/react';
import defaultTransformer from '../src/transformers/default';
import { expect } from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

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
		beforeEach(() => {
			t7Factory.setTransformer(defaultTransformer);
		});

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
				let input = t7 `<div>
									<span>Hello world</span>
								</div>`;
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
			
			it('should not accept invalid namespaces', () => {
				let input = t7 `<div xmlns="t7Namespace"></div>`;

				expect(
					input
				).to.deep.equal({
					tag: 'div'
				});
			});

			it('should only accept valid namespaces', () => {
				let input = t7 `<div xmlns='http://www.w3.org/2000/svg'></div>`;
				expect(
					input
				).to.deep.equal({
					tag: 'div',
					attrs: {
						xmlns: 'http://www.w3.org/2000/svg'
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
				let output = ReactDOMServer.renderToStaticMarkup(input);

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
				let output = ReactDOMServer.renderToStaticMarkup(input);

				expect(
					output
				).to.equal(
					'<div class="bar"><span class="bar">Hello world</span></div>'
				);
			});
			it('should handle a basic example #2', () => {
				let input = t7 `<div>
									<span>Hello world</span>
								</div>`;
				let output = ReactDOMServer.renderToStaticMarkup(input);

				expect(
					output
				).to.equal(
					'<div><span>Hello world</span></div>'
				);
			});

			it('should handle a basic component #1', () => {
				class Component extends React.Component {
					render() {
						return t7`<span>Hello ${ this.props.foo }</span>`;
					}
				}
				
				t7.register("Component", Component);

				let output = ReactDOMServer.renderToStaticMarkup(
					t7`<div><Component foo=${ "World" } /></div>`
				);
			});
		});
	});
});
