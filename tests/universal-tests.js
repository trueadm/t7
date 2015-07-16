
describe("Universal tests", function() {
  beforeEach(function() {
    t7.setOutput(t7.Outputs.Universal);
    t7.clearCache();
    t7.deregisterAllComponents();
  });

  it('should handle a very simple single element', function() {
    var input = t7`<div>Hello world</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{},"children":"Hello world"}';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class', function() {
    var input = t7`<div class="foo">Hello world</div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello world"}';
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
    var component = function(props) {
      return t7`<span>${ props.name }</span>`;
    }
    t7.registerComponent("Component", component);

    var input = t7`<div>Hello <Component name="world"></Component></div>`;
    var output = JSON.stringify(input);
    var expected = '{"tag":"div","attrs":{},"children":["Hello ",{"tag":"span","attrs":{},"children":"world"}]}';
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
    var expected = '{"tag":"div","attrs":{"class":"foo"},"children":[{"tag":"h1","attrs":{},"children":["Hello ","World"]},{"tag":"ul","attrs":{"id":"bar"},"children":[{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","attrs":{},"children":["The item is: ","Ball"]}]},{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","attrs":{},"children":["The item is: ","Boat"]}]}]}]}';
    assert(output === expected);
  });
});
