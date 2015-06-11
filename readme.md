#t7.js

## Overview

t7.js is a small, lightweight JavaScript template library that compiles ES2015 template strings into virtual DOM objects.

[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
allow for JavaScript expressions to be embedded within literal strings. With that in mind,
it made logical sense to build a small framework around them to assist developers
wanting to work with virtual DOM frameworks without the overhead of learning a new
language. t7 does not introduce new syntax into the mix like
other templating engines do, it simply uses pure JavaScript and HTML.

t7 provides designers and developers with a way to create awesome
templates that anyone with JavaScript knowledge can easily understand.
Long gone are the days of having to learn something like Mustache, Handlebars, Jade or Underscore.

Unlike JSX, t7 is fully web compliant, resulting in templates that can easily be linted.
Furthermore, IDEs should play nicely with the syntax and there isn't a need to setup
in-browser transformers or NodeJS transpilers to start developing.


## Usage

t7 fully supports in-browser, NodeJS and Browserify/Webpack usage. If you are using
t7 in your browser, simply include the script:

```html

<script src="t7.js"></script>

```

The when you want to compile a template, use the ``` t7`<html>...</html>` ``` template
string function to process your template code.

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

If React is detected in the scope, the above will return a React compliant virtual DOM object that can be used in React render() functions. You can manually select the output of t7 by using ` t7.setOutput(...)`

## dbmonster

How well can Cito+t7 render/update the dbmonster scenario? Take a look for yourself.

### Runtime Compilation (Development)

http://t7js.com/dbmonster/index.html

### Precompiled (Production)

http://t7js.com/dbmonster/precompiled.html


## Components

Components and sub-components are essential for breaking down large applications
into manageable parts that can be re-used. t7 understands this and has a simple
syntax for defining components in relation to custom elements. Much like JSX, you
can pass a HTML tag with a reference to a JavaScript object.

To do so, simply let t7 know the name of the HTML tag that will be the local object in
its `registerTag()` function. t7 also handles React components in the same way.

```javascript

function Widget() {
  return t7`
    <div>
      <span>I'm a widget</span>
    </div>
  `;
}

t7.registerTag({
  "my-wiget": Widget
});

t7`
  <div>
    <header>
      <my-widget pages=${ pages } />
    </header>
  </div>
`;

```

## Control Flow

To help reduce boilerplate and speed up development, t7 comes with a few essential
control flow functions, represented in Vanilla JS. Control flow functions remove
the need to write callbacks all over your project and keep simple things confined
to the context of the template.

### If/Else statements

```javascript

  ${

    t7.if(expression, truthy callback).else(falsey callback);

  }

```

More control flow functions to come soon!

## Syntax Highlighting

Due to the fact HTML is entered into template strings, your IDE/editor will likely not default to highlighting your HTML syntax. This will be addressed with independent plugins/packages for the various popular IDEs/editors.

- [GitHub Atom](https://atom.io/packages/t7)

## Performance

t7 will cache templates where possible for a solid performance when developing.

It's highly recommended that you the i7 precompiler is used when deploying to a production
environment. The precompiler will greatly reduce memory usage, startup speeds and
template compile times.

## Support

Currently, only Firefox 34+ and Chrome 41+ support ES2015 template strings. However,
there are transpilers (such as [Babel](https://babeljs.io/) or Traceur) that provide support for ES2015 templates.
This should not affect usae of t7 in produciton mode, as the precompiler will provide support for
IE6+.
