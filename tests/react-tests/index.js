import reactTransformer from '../../src/transformers/react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import t7 from '../../src';

global.React = React;

export default function reactTests() {
    beforeEach(() => {
        t7.setTransformer(reactTransformer);
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
        it('should handle a basic example #3', () => {
            let input = t7 `<div><span>Hello world</span> this is a test!</div>`;
            let output = ReactDOMServer.renderToStaticMarkup(input);

            expect(
                output
            ).to.equal(
                '<div><span>Hello world</span> this is a test!</div>'
            );
        });
        it('should handle a basic component #1', () => {
            class Component extends React.Component {
                render() {
                    return t7`<span>Hello ${ this.props.foo }</span>`;
                }
            }

            let output = ReactDOMServer.renderToStaticMarkup(
                t7`#include ${{Component}};<div><Component foo=${ "World" } /></div>`
            );

            expect(
                output
            ).to.equal(
                '<div><span>Hello World</span></div>'
            );
        });

        it('should handle a basic component #2', () => {
            class Component2 extends React.Component {
                render() {
                    return t7`<span>${ this.props.children }</span>`;
                }
            }

            class Component extends React.Component {
                render() {
                    return t7`#include ${{Component2}};<span>Hello ${ this.props.foo }<Component2>Foo bar!</Component2></span>`;
                }
            }

            let output = ReactDOMServer.renderToStaticMarkup(
                t7`#include ${{Component}};<div><Component foo=${ "World" } /></div>`
            );

            expect(
                output
            ).to.equal(
                '<div><span>Hello World<span>Foo bar!</span></span></div>'
            );
        });
    });
};
