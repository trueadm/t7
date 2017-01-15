describe("Universal tests", function() {
  beforeEach(function() {
    t7.setOutput(t7.Outputs.Universal);
    t7.clearCache();
  });

  it('should handle a very simple single element', function() {
    var input = t7`<div>Hello world</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","children":"Hello world"}';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class', function() {
    var input = t7`<div class="foo">Hello world</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello world"}';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class expression', function() {
    var input = t7`<div class="foo ${1 + 1}">Hello world</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{"class":"foo 2"},"children":"Hello world"}';
    assert(output === expected);
  });

  it('should handle a very simple single element with some quotes and double quotes', function() {
    var input = t7`<div class="foo">Hello 'world' or should I say, "world"</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello \'world\' or should I say, \\"world\\""}';
    assert(output === expected);
  });

  it('should handle a very simple single element with \\n characters', function() {
    var input = t7`<div class="foo">Hello 'world' or \\n should I say, "world"</div>`;
    var output = JSON.stringify(input);

    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello \'world\' or \\n should I say, \\"world\\""}';
    assert(output === expected);
  });

  it('should handle a very simple component/tag', function() {
    var input = "";

    t7.module(function(t7){
      var component = function(props) {
        return t7`<span>${ props.name }</span>`;
      }
      t7.assign("Component", component);
      input = t7`<div>Hello <Component name="world"></Component></div>`;
    })

    var output = JSON.stringify(input);
    var expected = '{"tag":"div","children":["Hello ",{"tag":"span","children":"world"}]}';
    assert(output === expected);
  });

  it('should handle the readme example', function() {
    var items = ['Ball', 'Boat'];
    var welcome = "World";

    function map(item) {
      return t7`
        <li class="item">
          <span>The item is: ${ item }</span>
        </li>
      `
    }

    var input = t7`
      <div class="foo">
        <h1>Hello ${ welcome }</h1>
        <ul id="bar">
          ${
            items.map(map)
          }
        </ul>
      </div>
    `;

    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":[{"tag":"h1","children":["Hello ","World"]},{"tag":"ul","attrs":{"id":"bar"},"children":[{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","children":["The item is: ","Ball"]}]},{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","children":["The item is: ","Boat"]}]}]}]}';
    assert(output === expected);
  });

  it('should handle the splat example', function() {
    const a = 'a';
    const props = { b: 'b', c: 'NOT C' };
    const moreProps = { d: 'd' };

    const input = t7`<div a=${a} b='NOT B' ...${props} c='c' ...${moreProps}></div>`;

    expect(input).to.deep.equal({
      tag: 'div',
      attrs: { a: 'a', b: 'b', c: 'c', d: 'd' }
    });
  });

  it('should throw an error upon when there is a missing closing tag', function() {
    var fooBar = "Foo";
    var test = "123"
    var input = function() {t7`<div><span>${ fooBar } - ${ test }</div>`};
    expect(input).to.throw(Error);
  });

  it('should throw an error upon when there is no single root element', function() {
    var input = function() {t7`<div>123</div><div>456</div>`};
    expect(input).to.throw(Error);
  });

  it('should throw an error upon when there is no single root element #2', function() {
    var input = function() {t7`<img /><img />`};
    expect(input).to.throw(Error);
  });

  it('basic svg example should be handled', function() {
    var input = t7`
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg>
    `;
    var output = JSON.stringify(input);
    var expected = '{"tag":"svg","attrs":{"height":"100","width":"100"},"children":[{"tag":"circle","attrs":{"cx":"50","cy":"50","r":"40","stroke":"black","stroke-width":"3","fill":"red"}}]}';
    assert(output === expected);
  });
});
