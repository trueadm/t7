
describe("Universal tests", function() {
  beforeEach(function() {
    t7.setOutput(t7.Outputs.Universal);
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
});
