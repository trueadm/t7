
describe("React tests", function() {
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
});
