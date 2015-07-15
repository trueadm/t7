
var foo = "world";

var example = t7`
  <div>
    <div>Hello world ${ foo }! This works</div>
    <div>${ "The " + foo + " is your oyster!" }</div>
  </div>
`;

React.render(example, document.body);
