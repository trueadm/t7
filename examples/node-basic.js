var t7 = require('../t7.js');

t7.setOutput(t7.Outputs.Universal);

console.log("NodeJS basic render example. You should get: { tag: 'div', attrs: {}, children: 'Hello world! Your name is Bob' }");

var name = "Bob";

var example = t7`
  <div>Hello world! Your name is ${ name }</div>
`;

console.log("Result:");

console.log(example);
