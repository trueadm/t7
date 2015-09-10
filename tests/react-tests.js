import React from 'react';
import t7 from '../t7';

t7`<div><span><div /></span></div>`

describe("React tests", () => {
  beforeEach(() => {
    t7.setOutput(t7.Outputs.React);
    t7.clearCache();
  });

  it('should handle a very simple single element', () => {
    let input = t7`<div>Hello world</div>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<div>Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class', () => {
    let input = t7`<div className="foo">Hello world</div>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<div class="foo">Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with dynamic properties', () => {
    let props = [1,2,3];
    let attr = "foobar";
    let input = t7`<div className=${ attr } id="foo">Hello world. I like ${ props[0] }, ${ props[1] } and ${ props[2] }!</div>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<div class="foobar" id="foo">Hello world. I like 1, 2 and 3!</div>';
    assert(output === expected);
  });

  it('should handle a simple list of elements', () => {
    let input = t7`<ul><li>item #1</li><li>item #2</li><li>item #3</li><li>item #4</li><li>item #5</li></ul>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<ul><li>item #1</li><li>item #2</li><li>item #3</li><li>item #4</li><li>item #5</li></ul>';
    assert(output === expected);
  });

  it('should handle a dnyamic list of elements', () => {
    let items = ["one", "two", "three", "four"];
    let mapping = function(item, index) {
      return t7`<li className="item" id=${ "item-" + index }>${ item } - #${index}</li>`;
    };

    let input = t7`<ul className="items">${ items.map(mapping) }</ul>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<ul class="items"><li class="item" id="item-0">one - #0</li><li class="item" id="item-1">two - #1</li>'
                  + '<li class="item" id="item-2">three - #2</li><li class="item" id="item-3">four - #3</li></ul>';

    assert(output === expected);
  });

  it('should handle a complex set of elements', () => {
    let input = t7`<div><span>Here is </span><br />another<span>span!</span><div>this is </div>a block!</div>`;
    let output = React.renderToStaticMarkup(input);
    let expected = '<div><span>Here is </span><br>another<span>span!</span><div>this is </div>a block!</div>';
    assert(output === expected);
  });

  it('should handle a basic component', () => {
    let Component = React.createClass({
      render: () => {
        return t7`
          <div className=${"foo"}>${ this.props.children }</div>
        `;
      }
    })

    let input = "";

    t7.module(function(t7) {
      t7.assign("Test", Component);
      input = t7`<div><Test><span>Hello world</span></Test></div>`;
    });

    let output = React.renderToStaticMarkup(input);
    let expected = '<div><div class="foo"><span>Hello world</span></div></div>';
    assert(output === expected);
  });

  it('should handle multiple nested components', () => {

    let input = "";

    t7.module(function(t7) {
      let Component1 = React.createClass({
        render: () => {
          return t7`
            <Component2 name="123">
              <h1>Component 1</h1>
              <div>Hello world</div>
            </Component2>
          `;
        }
      });

      let Component2 = React.createClass({
        render: () => {
          return t7`
            <div>
              ${ this.props.children }
              <h2>Component 2</h2>
              <Component3>
                <Component4 name=${ this.props.name } />
              </Component3>
            </div>
          `;
        }
      });

      let Component3 = React.createClass({
        render: () => {
          return t7`
            <div>
              <h3>Component 3</h3>
              ${ this.props.children }
            <div>
          `;
        }
      });

      let Component4 = React.createClass({
        render: () => {
          return t7`
            <div>
              <h4>Component 4</h4>
              <span>${ this.props.name }</span>
            </div>
          `;
        }
      });

      t7.assign({
        "Component1": Component1,
        "Component2": Component2,
        "Component3": Component3,
        "Component4": Component4,
      });
      input = t7`<Component1 />`;
    });

    let output = React.renderToStaticMarkup(input);
    let expected = '<div><h1>Component 1</h1><div>Hello world</div><h2>Component 2</h2>'
      +'<div><h3>Component 3</h3><div><h4>Component 4</h4><span>123</span></div><div></div></div></div>';
    assert(output === expected);
  });
});
