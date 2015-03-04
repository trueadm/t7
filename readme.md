#t7.js

## Overview

t7.js is a small, lightweight library for compiling ES2015 template strings
into virtual DOM objects. The project was inspired by the work done JSX. This
project aims to be a solid replacement to JSX with web compliance and performance
key features.

[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) are string literals allowing embedded expressions. They were built
for exactly this purpose and allow for embedding JavaScript variables and functions.

## Example

```javascript

var items = ['Ball', 'Boat'];
var welcome = "World";

t7`
  <div class="foo">
    <h1>Hello ${ welcome }</h1>
    <ul id="bar">
      ${
        t7.each(items, item => t7`
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

Control flow functions will also be able to intelligently apply key values to objects
to help improve performance without you ever needing to know about them.

### Collections

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

## Support

Currently, only Firefox 34+ and Chrome 41+ support ES2015 template strings. However,
there are transpilers (such as [Babel](https://babeljs.io/) or Traceur) that provide support for ES2015 templates.
