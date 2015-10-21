import { expect } from 'chai';
import universalTransformer from '../../src/transformers/universal';
import t7 from '../../src';

export default function reactTests() {
    beforeEach(() => {
        t7.setTransformer(universalTransformer);
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
        it('should handle a basic component #1', () => {
            var Component = function(props) {
              return t7`<span>${ props.foo }</span>`;
            }
            let input =t7`#include ${{Component}};<div>Hello <Component foo=${ "World" } /></div>`;

            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                children: [
                    "Hello ",
                    {
                        tag: "span",
                        children: "World"
                    }
                ]
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
        it('should handle text value as a child node', () => {
            let input = t7 `<div class="foo"><p>Hello, t7!</p></div>`;

            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                    class: 'foo'
                },
               children: {
                    tag: 'p',
                    children: 'Hello, t7!'
                }
            });
        });
        it('should handle children with attributes', () => {
            let input = t7 `<div class="hello"><span id="foo"></span></div>`;

            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                    class: 'hello'
                },
               children: {
                    tag: 'span',
                    attrs: {
                      id: "foo"
                  }
                }
            });
        });
        it('should handle custom element tags', () => {
            let input = t7 `<div-custom class="hello"></div-custom>`;

            expect(
                input
            ).to.deep.equal({
                tag: 'div-custom',
                attrs: {
                    class: 'hello'
                }
            });
        });
        it('should handle multiple classes and attributes', () => {
            let input = t7 `<div class="handles multiple classes" and="attributes"></div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                    class: 'handles multiple classes',
                    and: 'attributes'
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

        it('should not accept empty attribute values', () => {
            let input = t7 `<div disabled="true"></div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                disabled:'true'
                }
            });
        });

        it('should handle overloaded attribute values', () => {
            let input = t7 `<div disabled=${true}></div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                disabled:'true'
                }
            });
        });
        it('should not render invalid attributes', () => {
            let input = t7 `<div '14(/'=${true}></div>`;
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
        it('should only accept html comments', () => {
            let input = t7 `<div>
                                <!-- hey I am a comment -->
                            </div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                children: {
                    tag: "#comment",
                    children: 'hey I am a comment'
                }
            });
        });
    });
};