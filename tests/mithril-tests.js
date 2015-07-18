describe("Mithril tests", function() {
  var testContainer = document.getElementById("app");

  function render(vDom) {
    m.render(testContainer, vDom);
  }

  beforeEach(function() {
    t7.setOutput(t7.Outputs.Mithril);
    t7.clearCache();
  });

  afterEach(function() {
    testContainer.innerHTML = "";
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

  it('should handle components', function() {
    t7.module(function(t7) {
      var App = {
        controller: function() {
          this.data = "random data";
        },
        view: function(ctrl) {
          return t7`<Component data=${ ctrl.data } />`;
        }
      };
      var Component = {
        view: function(ctrl, args) {
          return t7`<div>Hello world - ${ args.data }</div>`;
        }
      };
      t7.assign("Component", Component);

      m.mount(testContainer, App);
        var output = testContainer.innerHTML;
        var expected = '<div>Hello world - random data</div>';
        assert(output === expected);
      });
    });
});
