import t7 from '../t7';
import { expect } from 'chai';

describe("Universal tests", () => {
  beforeEach(() => {
    t7.setOutput(t7.Outputs.Universal);
    t7.clearCache();
  });

  it('should handle a very simple single element', () => {
    let input = t7`<div>Hello world</div>`;
    let output = JSON.stringify(input);
    let expected = '{"tag":"div","children":"Hello world"}';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple single element with a class', () => {
    let input = t7`<div class="foo">Hello world</div>`;
    let output = JSON.stringify(input);
    let expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello world"}';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple single element with some quotes and double quotes', () => {
    let input = t7`<div class="foo">Hello 'world' or should I say, "world"</div>`;
    let output = JSON.stringify(input);
    let expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello \'world\' or should I say, \\"world\\""}';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple single element with \\n characters', () => {
    let input = t7`<div class="foo">Hello 'world' or \\n should I say, "world"</div>`;
    let output = JSON.stringify(input);

    let expected = '{"tag":"div","attrs":{"class":"foo"},"children":"Hello \'world\' or \\n should I say, \\"world\\""}';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple component/tag', () => {
    let input = "";

    t7.module(function(t7){
      let component = function(props) {
        return t7`<span>${ props.name }</span>`;
      }
      t7.assign("Component", component);
      input = t7`<div>Hello <Component name="world"></Component></div>`;
    })

    let output = JSON.stringify(input);
    let expected = '{"tag":"div","children":["Hello ",{"tag":"span","children":"world"}]}';
    expect(output).to.equal(expected);
  });

  it('should handle the readme example', () => {
    let items = ['Ball', 'Boat'];
    let welcome = "World";

    function map(item) {
      return t7`
        <li class="item">
          <span>The item is: ${ item }</span>
        </li>
      `
    }

    let input = t7`
      <div class="foo">
        <h1>Hello ${ welcome }</h1>
        <ul id="bar">
          ${
            items.map(map)
          }
        </ul>
      </div>
    `;

    let output = JSON.stringify(input);
    let expected = '{"tag":"div","attrs":{"class":"foo"},"children":[{"tag":"h1","children":["Hello ","World"]},{"tag":"ul","attrs":{"id":"bar"},"children":[{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","children":["The item is: ","Ball"]}]},{"tag":"li","attrs":{"class":"item"},"children":[{"tag":"span","children":["The item is: ","Boat"]}]}]}]}';
    expect(output).to.equal(expected);
  });

  it('should throw an error upon when there is a missing closing tag', () => {
    let fooBar = "Foo";
    let test = "123"
    let input = () => {t7`<div><span>${ fooBar } - ${ test }</div>`};
    expect(input).to.throw(Error);
  });

  it('should throw an error upon when there is no single root element', () => {
    let input = () => {t7`<div>123</div><div>456</div>`};
    expect(input).to.throw(Error);
  });

  it('should throw an error upon when there is no single root element #2', () => {
    let input = () => {t7`<img /><img />`};
    expect(input).to.throw(Error);
  });

  it('basic svg example should be handled', () => {
    let input = t7`
      <svg height="100" width="100">
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg>
    `;
    let output = JSON.stringify(input);
    let expected = '{"tag":"svg","attrs":{"height":"100","width":"100"},"children":[{"tag":"circle","attrs":{"cx":"50","cy":"50","r":"40","stroke":"black","stroke-width":"3","fill":"red"}}]}';
    expect(output).to.equal(expected);
  });
});
