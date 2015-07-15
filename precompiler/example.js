
var foo = "world";

var example = t7`
  <div>
    <div>Hello world ${ foo }! This works</div>
    <div>${ fooBar + "foo" + data() }</div>
  </div>
`;
