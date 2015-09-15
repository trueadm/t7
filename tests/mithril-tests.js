import m from 'mithril';
import t7 from '../t7';
import { expect } from 'chai';

window.m = m;

describe("Mithril tests", () => {
	let testContainer = document.createElement('div');
	// document.body.appendChild(testContainer);

  let render = vDom => {
    m.render(testContainer, vDom);
  }

  beforeEach(() => {
    t7.setOutput(t7.Outputs.Mithril);
    t7.clearCache();
  });

  afterEach(() => {
    testContainer.innerHTML = "";
  });

  it('should handle a very simple single element', () => {
    let input = render(t7`<div>Hello world</div>`);
    let output = testContainer.innerHTML;
    let expected = '<div>Hello world</div>';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple single element with a class', () => {
    let input = render(t7`<div class="foo">Hello world</div>`);
    let output = testContainer.innerHTML;
    let expected = '<div class="foo">Hello world</div>';
    expect(output).to.equal(expected);
  });

  it('should handle a very simple single element with dynamic properties', () => {
    let props = [1,2,3];
    let attr = "foobar";
    let input = render(t7`<div className=${ attr } id="foo">Hello world. I like ${ props[0] }, ${ props[1] } and ${ props[2] }!</div>`);
    let output = testContainer.innerHTML;
    let expected = '<div class="foobar" id="foo">Hello world. I like 1, 2 and 3!</div>';
    expect(output).to.equal(expected);
  });

  it('should handle components', () => {
    t7.module(function(t7) {
      let App = {
        controller() {
          this.data = "random data";
        },
        view(ctrl) {
          return t7`<Component data=${ ctrl.data } />`;
        }
      };
      let Component = {
        view(ctrl, args) {
          return t7`<div>Hello world - ${ args.data }</div>`;
        }
      };
      t7.assign("Component", Component);

      m.mount(testContainer, App);
        let output = testContainer.innerHTML;
        let expected = '<div>Hello world - random data</div>';
        expect(output).to.equal(expected);
      });
    });
});
