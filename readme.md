#t7.js

## Overview

t7.js is a small, lightweight library for compiling ES2015 template strings
into virtual DOM objects. t7 does not introduce a new syntax or language into the mix
like other templating engines do, it simply uses pure JavaScript and HTML.

This project aims to provide developers with a simple layer above frameworks or libraries
that make use of virtual DOMs (such as React, Inferno, Mitrhil and Cito) without the need
to write cluttered object literal code that represents the DOM. Unlike JSX, t7 is fully
web compliant as it's only JavaScript. As such, it can linted and IDEs should play nicely with
your code. Furthermore, i7 doesn't require an in-browser transformer, transpiler or special
script tags to start developing like JSX does.

[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) are string literals allowing embedded expressions. They were built
for exactly this purpose and allow for embedding JavaScript variables and functions.

## Usage

t7 fully supports in-browser, NodeJS and Browserify/Webpack usage.

## Example

```javascript

var items = ['Ball', 'Boat'];
var welcome = "World";

t7`
  <div class="foo">
    <h1>Hello ${ welcome }</h1>
    <ul id="bar">
      ${
        items.map( item => t7`
          <li class="item">
            <span>The item is: ${ item }</span>
          </li>
        `)
      }
    </ul>
  </div>
`;
```

Would return the follow virtual DOM object:

```javascript

  [
    {
      tag: "div",
      attrs: {"class": "foo"},
      children: [
        {
          tag: "h1",
          children: "Hello World"
        },
        {
          tag: "ul",
          attrs: {id: "bar"},
          children: [
            {
              tag: "li",
              attr: {"class": "item"},
              children: [
                {
                  tag: "span",
                  children: [
                    {
                      tag: "span",
                      children: ["The item is: Ball"]
                    }
                  ]
                }
              ]
            },
            {
              tag: "li",
              attr: {"class": "item"},
              children: [
                {
                  tag: "span",
                  children: [
                    {
                      tag: "span",
                      children: ["The item is: Boat"]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]

```

## Control Flow

To help reduce boilerplate and speed up development, t7 comes with a few essential
control flow functions, represented in Vanilla JS. Control flow functions remove
the need to write callbacks all over your project and keep simple things confined
to the context of the template.

### Collections

Similar to the native Array.map() function, except 7.each() attempts to automatically
add keys to the virtual DOM nodes where possible. This in turn improves performance.

```javascript

  ${

    t7.each(expression, callback);

  }

```

### If/Else statements

```javascript

  ${

    t7.if(expression, truthy callback).else(falsey callback);

  }

```

More control flow functions to come soon!

## Performance

t7 will cache templates where possible for a solid performance when developing.

It's highly recommended that you the i7 precompiler is used when deploying to a production
environment. The precompiler will greatly reduce memory usage, startup speeds and
template compile times.

## Support

Currently, only Firefox 34+ and Chrome 41+ support ES2015 template strings. However,
there are transpilers (such as [Babel](https://babeljs.io/) or Traceur) that provide support for ES2015 templates.
