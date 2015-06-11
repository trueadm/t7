
describe("Mithril tests", function() {

  var testContainer = document.getElementById("app");

  function render(vDom) {
    m.render(testContainer, vDom);
  }

  afterEach(function() {
    testContainer.innerHTML = "";
    t7.setOutput(t7.Outputs.Universal);
    t7.deregisterAllComponents();
  });

  it('should handle a very simple single element', function() {
    var input = render(t7`<div>Hello world</div>`);
    var output = testContainer.innerHTML;
    var expected = '<div>Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with a class', function() {
    var input = render(t7`<div class="foo">Hello world</div>`);
    var output = testContainer.innerHTML;
    var expected = '<div class="foo">Hello world</div>';
    assert(output === expected);
  });

  it('should handle a very simple single element with dynamic properties', function() {
    var props = [1,2,3];
    var attr = "foobar";
    var input = render(t7`<div className=${ attr } id="foo">Hello world. I like ${ props[0] }, ${ props[1] } and ${ props[2] }!</div>`);
    var output = testContainer.innerHTML;
    var expected = '<div class="foobar" id="foo">Hello world. I like 1, 2 and 3!</div>';
    assert(output === expected);
  });
});
