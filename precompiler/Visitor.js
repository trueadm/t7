var assert = require('assert');
var recast = require('recast');
var t7 = require('../t7.js');
var types = recast.types;
var PathVisitor = types.PathVisitor;
var n = types.namedTypes;
var b = types.builders;
var templateCache = require("./templateCache.js");

function Visitor() {
  PathVisitor.apply(this, arguments);
}
Visitor.prototype = Object.create(PathVisitor.prototype);
Visitor.prototype.constructor = Visitor;

Visitor.prototype.visitTemplateLiteral = function(path) {
  var node = path.node;
  var replacement = b.literal(node.quasis[0].value.cooked);

  for (var i = 1, length = node.quasis.length; i < length; i++) {
    replacement = b.binaryExpression(
      '+',
      b.binaryExpression(
        '+',
        replacement,
        node.expressions[i - 1]
      ),
      b.literal(node.quasis[i].value.cooked)
    );
  }

  return replacement;
};


Visitor.prototype.visitTaggedTemplateExpression = function(path) {
  var node = path.node;
  var templates = [];
  var expressions = [];
  var placeholders = [];
  var i = 0;
  var t7Node = null;
  var arguments = [];
  var ast = false;
  var output = "";

  //we check for t7
  if(node.tag.name === "t7") {
    for(i = 0; i < node.quasi.quasis.length; i++) {
      templates.push(node.quasi.quasis[i].value.cooked);
    }
    for(i = 0; i < node.quasi.expressions.length; i++) {
      expressions.push(recast.print(node.quasi.expressions[i]).code);
      placeholders.push(null);
    }

    arguments = [templates].concat(placeholders);
    t7Node = t7.apply(null, arguments)
    //we need to store the t7Node.compiled code in its own place in the page
    templateCache.set(t7Node.templateKey, t7Node.template);
    //then create an output for recast to parse
    output = "t7.precompile({template: __" + t7Node.templateKey + ",templateKey: " + t7Node.templateKey + ", values: [" + expressions.join(", ") + "]})";
    ast = recast.parse(output);
  }

  return ast;
};

Visitor.visitor = new Visitor();
module.exports = Visitor;
