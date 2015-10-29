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
            let input = t7`<div className=${ className }><span className=${ className }>${ foo }</span></div>`;

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
            let input = t7`<div>
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
            let input = t7`<div><span>Hello world</span> this is a test!</div>`;

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
        it('should handle a basic example #4', () => {
            let input = t7`<div class='hello'><span id='foo'></span></div>`;

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
            let input = t7`<div foo="bar">`;

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
            let input = t7`<div foo=bar something=54 quote='t7 '>`;

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
            let input = t7`<div class="foo"><p>Hello, t7!</p></div>`;

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
            let input = t7`<div class="hello"><span id="foo"></span></div>`;

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
            let input = t7`<div-custom class="hello"></div-custom>`;

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
            let input = t7`<div class="handles multiple classes" and="attributes"></div>`;
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
            let input = t7`<img src='xxx.jpg' alt='t7Pic'/>`;

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
            let input = t7`<div disabled="true"></div>`;
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
            let input = t7`<div disabled=${true}></div>`;
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
            let input = t7`<div '14(/'=${true}></div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div'
            });
        });
        it('should only accept valid namespaces', () => {
            let input = t7`<div xmlns='http://www.w3.org/2000/svg'></div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                attrs: {
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            });
        });
        it('should accept html comments', () => {
            let input = t7`<div>
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

		it('should handle a comment with words inside a tag', () => {
            let input = t7`<b><!--comment text-->words</b>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'b',
                children: [
					{
                    	tag: "#comment",
                    	children: 'comment text'
                	},
					'words'
				]
            });
        });

         it('void elements should not have children!! #1', () => {
            let input = t7`<circle><span></span></circle>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'circle'
            });
        });

         it('void elements should not have children!! #2', () => {
            let input = t7`<circle>working!</circle>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'circle'
            });
        });

       it('should not handle attributes with whitespace between the equals', () => {
            let input = () => t7 `<div hello  =   "world" foo    = "bar"></div>`;

            expect(input).to.throw();
        });

		it('should handle tag names with dots (ReactJS style)', () => {
            const Module = {
                Class() {
                    return t7`<div>Test</div>`;
                }
            }
            let input = t7 `#include ${{Module}};<Module.Class></Module.Class>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
				children: "Test"
            });
        });

		 it('should handle XMP tag', () => {
			 let input = t7 `<XMP><A HREF="http://www.idocs.com">Cool Dude</A></XMP>`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: "XMP",
				children: {
					tag: "A",
					attrs: {
						HREF: "http://www.idocs.com"
					},
					children: "Cool Dude"
				}
			});
		});

		 it('should handle XMP tag', () => { // Throw error in inComponent
			 let input = t7`<a
                         />`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: "XMP",
				children: {
					tag: "A",
					attrs: {
						HREF: "http://www.idocs.com"
					},
					children: "Cool Dude"
				}
			});
		});
// Works in JSX
		 it('should handle chinese tags, or not?', () => { 
			 let input = t7`<日本語></日本語>`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: '日本語'
			});
		});
		
		
		// Works in JSX
//		https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=%3CLeftRight%20left%3D%3Ca%20%2F%3E%20right%3D%3Cb%3Emonkeys%20%2F%3E%20gorillas%3C%2Fb%3E%20%2F%3E
		 it('should handle weird attributes', () => { 
			 let input = t7`<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: "XMP",
				children: {
					tag: "A",
					attrs: {
						HREF: "http://www.idocs.com"
					},
					children: "Cool Dude"
				}
			});
		});
		
		// https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=%3CA%20aa%3D%7Baa.bb.cc%7D%20bb%3D%7Bbb.cc.dd%7D%3E%3Cdiv%3E%7Baa.b%7D%3C%2Fdiv%3E%3C%2FA%3E
			 it('should handle triple components', () => { 
			 let input = t7`<A aa={aa.bb.cc} bb={bb.cc.dd}><div>{aa.b}</div></A>`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: "XMP",
				children: {
					tag: "A",
					attrs: {
						HREF: "http://www.idocs.com"
					},
					children: "Cool Dude"
				}
			});
		});
		
// should extract the namespace
 it('missing and not working namespace', () => { 
			 let input = t7`<div dominic:t7='33'> </div>`;

			 expect(
				 input
			 ).to.deep.equal({
				tag: "XMP",
				attrs: {
					'dominic:t7': "33"
				}
			});
		});
		it('should handle quotes in attribute', () => {
            let input = t7`<div xxx=\'a"b\'>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'foo'
            });
        });

        it('should accept boolean attributes', () => {
            let input = t7 `<div>
                                <input disabled />
                            </div>`;
            expect(
                input
            ).to.deep.equal({
                tag: 'div',
                children: {
                    tag: "input",
                    attrs: {
                        disabled: ""
                    }
                }
            });
        });
    });
};
