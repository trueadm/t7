t7`<div><span><div /></span></div>`

describe("React tests", function() {
  beforeEach(function() {
    t7.setOutput(t7.Outputs.React);
    t7.clearCache();
  });

  it('should handle a very simple single element', function() {
    var input = t7`<div>Hello world</div>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<div>Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class', function() {
    var input = t7`<div className="foo">Hello world</div>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<div class="foo">Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with dynamic properties', function() {
    var props = [1,2,3];
    var attr = "foobar";
    var input = t7`<div className=${ attr } id="foo">Hello world. I like ${ props[0] }, ${ props[1] } and ${ props[2] }!</div>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<div class="foobar" id="foo">Hello world. I like 1, 2 and 3!</div>';
    assert(output === expected);
  });

  it('should handle a simple list of elements', function() {
    var input = t7`<ul><li>item #1</li><li>item #2</li><li>item #3</li><li>item #4</li><li>item #5</li></ul>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<ul><li>item #1</li><li>item #2</li><li>item #3</li><li>item #4</li><li>item #5</li></ul>';
    assert(output === expected);
  });

  it('should handle a dnyamic list of elements', function() {
    var items = ["one", "two", "three", "four"];
    var mapping = function(item, index) {
      return t7`<li className="item" id=${ "item-" + index }>${ item } - #${index}</li>`;
    };

    var input = t7`<ul className="items">${ items.map(mapping) }</ul>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<ul class="items"><li class="item" id="item-0">one - #0</li><li class="item" id="item-1">two - #1</li>'
                  + '<li class="item" id="item-2">three - #2</li><li class="item" id="item-3">four - #3</li></ul>';

    assert(output === expected);
  });

  it('should handle a complex set of elements', function() {
    var input = t7`<div><span>Here is </span><br />another<span>span!</span><div>this is </div>a block!</div>`;
    var output = React.renderToStaticMarkup(input);
    var expected = '<div><span>Here is </span><br>another<span>span!</span><div>this is </div>a block!</div>';
    assert(output === expected);
  });

  it('should handle a basic component', function() {
    var Component = React.createClass({
      render: function() {
        return t7`
          <div className=${"foo"}>${ this.props.children }</div>
        `;
      }
    })

    var input = "";

    t7.module(function(t7) {
      t7.assign("Test", Component);
      input = t7`<div><Test><span>Hello world</span></Test></div>`;
    });

    var output = React.renderToStaticMarkup(input);
    var expected = '<div><div class="foo"><span>Hello world</span></div></div>';
    assert(output === expected);
  });

  it('should handle multiple nested components', function() {

    var input = "";

    t7.module(function(t7) {
      var Component1 = React.createClass({
        render: function() {
          return t7`
            <Component2 name="123">
              <h1>Component 1</h1>
              <div>Hello world</div>
            </Component2>
          `;
        }
      });

      var Component2 = React.createClass({
        render: function() {
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

      var Component3 = React.createClass({
        render: function() {
          return t7`
            <div>
              <h3>Component 3</h3>
              ${ this.props.children }
            <div>
          `;
        }
      });

      var Component4 = React.createClass({
        render: function() {
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

    var output = React.renderToStaticMarkup(input);
    var expected = '<div><h1>Component 1</h1><div>Hello world</div><h2>Component 2</h2>'
      +'<div><h3>Component 3</h3><div><h4>Component 4</h4><span>123</span></div><div></div></div></div>';
    assert(output === expected);
  });
});
