#t7.js

## Overview

t7.js is a small, lightweight library for compiling ES2015 template literals
into virtual DOM objects. The project was inspired by the work done JSX. This
project aims to be a solid replacement to JSX with web compliance and performance
key features.

## Example

```javascript

var items = ['Ball', 'Boat'];
var welcome = "World";

t7`
  <div class="foo">
    <h1>Hello ${ welcome }</h1>
    <ul id="bar">
      ${
        items.forEach( item => t7`
          <li class="item">
            <span>The item is: ${ item }</span>
          </li>
        `)
      }
    </ul>
  </div>
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

The virtual DOM object can then be used in a variety of different virtual DOM
frameworks and libraries that support the format.

## Dependencies

ES2015 template literal support, either natively or through a transpiler, such
as Traceur or Babel.
