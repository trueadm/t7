# t7

## Overview

t7 is a small, lightweight JavaScript template library that compiles ES2015 template strings into virtual DOM objects.

[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
allow for JavaScript expressions to be embedded within literal strings. With that in mind,
it made logical sense to build a small library around them to assist developers
wanting to work with virtual DOM frameworks without the overhead of learning a new
language. t7 does not introduce new syntax into the mix like
other templating engines do, it simply uses pure JavaScript and HTML.

t7 provides designers and developers with a way to create awesome
templates that anyone with JavaScript knowledge can easily understand.
Long gone are the days of having to learn something like Mustache, Handlebars, Jade or Underscore.

Unlike JSX, t7 is fully web compliant, resulting in templates that can easily be linted.
Furthermore, IDEs should play nicely with the syntax and there isn't a need to setup
in-browser transformers or NodeJS transpilers to start developing.


## Install

t7 fully supports browser and node.js environments. If you are using
t7 in your browser, simply include the script:

### Browser

```html
<script src="t7.js"></script>
```

### Node

```sh
npm install --save-dev t7
```

```js
// ES5
var t7 = require('t7');
// ES6+
import t7 from 't7';
```

## Usage

Simply call t7 by using ``` t7`<html>...</html>` ```. It will invoke
the t7 library to handle the tagged template string and t7 will then produce a representation
of the HTML template as virtual DOM.

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

If React is detected in the scope, the above will return a React compliant virtual DOM object that can be used in React render() functions. You can manually select the output of t7 by using `t7.setTransformer(...)`

## Transformers

Behind the scenes, t7 parses the HTML and the expressions passed into the template tag. It generates an AST
that can then easily be "transformed" into various different outputs. It's also easy to create new
transformations for other implementations other than Virtual DOM.

By default t7 will attempt to transform templates to `universal` virtual DOM output. Universal DOM
output should be compatible with most other virtual DOM frameworks out there (Mercury, Cito and Virtual-Dom).

Note: t7 will check if React is available (as a global). If it is, t7 will
switch its default output to the `react` transformer instead of `universal` transformer;

To manually set the transformer that t7 uses, you can pass `setTransformer()` a transformer that
creates a JavaScript template. Check the t7 source for some examples of how to create
transformers.

Currently, t7 has the following transformers built-in:

- React
- Mithril
- Universal

These transformers cane be found via `t7.Transformers`. An example of this is:

```js
t7.setTransformer(t7.Transformers.React);
```

## Components

Components and sub-components are essential for breaking down large applications
into manageable parts that can be re-used. t7 understands this and has a simple
syntax for defining components. Very much like JSX, you
can pass a HTML tag with a reference to a JavaScript object.

To do so, simply pass in the component objects as an object literal using
`#include ${{Component}}` at the top of your template. Below is an example:

```js


function Widget(props) {
    return t7`
        <div>
            <span>I'm a widget ${ props.welcome }</span>
        </div>
    `;
}

t7`
    #include ${{Widget}}
    <div>
        <header>
            <Widget welcome="Hello world" />
        </header>
    </div>
`;

```


Furthermore, you must ensure the assigned component name starts with an uppercase character, such
as `<Foo></Foo>` this ensures that the component gets picked up by t7 properly.

### Component Examples

- [Handling nested React components](examples/react-components)

## Syntax Highlighting

Due to the fact HTML is entered into template strings, your IDE/editor will likely not default to highlighting your HTML syntax. This will be addressed with independent plugins/packages for the various popular IDEs/editors.

- [GitHub Atom](https://atom.io/packages/t7)

## Performance

t7 will cache templates where possible for a solid performance when developing.

A t7 Babel plugin will soon be available that allows t7 templates to transpile with existing workflows.

## Browser Support

Currently, Safari 9+, Microsoft Edge, Firefox 34+ and Chrome 41+ support ES2015 template strings. However,
there are transpilers (such as [Babel](https://babeljs.io/)) that provide support for ES2015 templates.
