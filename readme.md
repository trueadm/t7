#t7.js

## Overview

t7.js is a small, lightweight JavaScript template library that compiles ES2015 template strings into virtual DOM objects.

[Template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings)
allow for JavaScript expressions to be embedded within literal strings. With that in mind,
it made logical sense to build a small library around them to assist developers
wanting to work with virtual DOM frameworks without the overhead of learning a new
language. t7 does not introduce new syntax into the mix like
other templating engines do, it simply uses pure JavaScript and HTML.

t7 provides designers and developers with a way to create awesome
templates that anyone with JavaScript knowledge can easily understand.
Long gone are the days of having to learn something like Mustache, Handlebars, Jade or Underscore.

Unlike JSX, t7 relies exclusively on ES 2015 features, so you can use any ES 2015 compliant build tools, linters, IDEs or syntax highlighting schemes, without worrying about transpiling JSX.

## Installing

t7 fully supports in-browser, NodeJS and Browserify/Webpack usage. If you are using
t7 in your browser, simply include the script:

### Browser

```html
<script src="t7.js"></script>
```

### Node/Browserify/Webpack

Simply run the following:

```sh
npm install t7
```

Then use the t7 module as you would any other module:

```javascript
var t7 = require("t7");
```

## Usage

You must first create an instance of t7 using the `t7.factory`, this will create a unique instance
of t7 allowing you to compile templates within the scope of your current closure.

With an instance you simply call t7 by using ``` t7`<html>...</html>` ```. It will invoke
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

If React is detected in the scope, the above will return a React compliant virtual DOM object that can be used in React render() functions. You can manually select the output of t7 by using `t7.setOutput(...)`

## Outputs

By default t7 will attempt to check to see if React is available. If it is, t7 will
automatically produce React elements as its output. This allows developers to easily
swap in t7 for JSX code. t7 can also produce "universal" virtual DOM output. Universal DOM
output should be compatible with most other virtual DOM frameworks out there (Mercury, Cito and Virtal-dom).

An example of this is:

```javascript
t7.setOutput(t7.Outputs.React);
```

Or when using an instance of t7:

Below is the full list of currently supported outputs:

- React
- Inferno
- Mithril
- Universal

## Components

Components and sub-components are essential for breaking down large applications
into manageable parts that can be re-used. t7 understands this and has a simple
syntax for defining components in relation to custom elements. Much like JSX, you
can pass a HTML tag with a reference to a JavaScript object.

To do so, simply let t7 know the name of the tag that will be the local object in
its `t7.assign()` function. You must also ensure your `t7.assign()` calls are within
a `t7.module(...)` wrapper. The module wrapper ensures your components are kept
within scope without being made global objects.

```javascript

t7.module(function(t7) {
  function MyWidget(props) {
    return t7`
      <div>
        <span>I'm a widget ${ props.welcome }</span>
      </div>
    `;
  }

  t7.assign("Widget", MyWidget);

  t7`
    <div>
      <header>
        <Widget welcome="Hello world" />
      </header>
    </div>
  `;
});
```


Furthermore, you must ensure the assigned component name starts with an uppercase character, such
as `<Foo></Foo>` this ensures that the component gets picked up by t7 properly.

### Component Examples

- [Handling nested React components](examples/react-complex-components.html)

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

It's highly recommended that the [t7-precompiler](https://github.com/trueadm/t7-precompiler) is used when deploying to a production
environment. The precompiler will greatly reduce memory usage, startup speeds and
template compile times.

## Browser Support

Currently, Safari 9+, Microsoft Edge, Firefox 34+ and Chrome 41+ support ES2015 template strings. However,
there are transpilers (such as [Babel](https://babeljs.io/) or Traceur) that provide support for ES2015 templates.
This should not affect usage of t7 in production mode, as the precompiler will provide support for
IE8+.
