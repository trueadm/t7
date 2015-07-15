var recast = require('recast');
var types = recast.types;
var Visitor = require('./visitor');
var fs = require('fs');
var args = process.argv.slice(2);
var templateCache = require("./templateCache.js");

//we are looking at an input
if(args[0] === "-i") {
  //check the file or folder
  var fileName = args[1];
  if(fileName !== "") {
    fs.readFile("./" + fileName, 'utf8', function(err, fileText) {
      handleFile(fileName, fileText)
    })
  }
}

function handleFile(fileName, fileText) {
  var ast = recast.parse(fileText);
  var output = recast.print(transform(ast)).code;
  //add the template sources to bottom of file
  output += "\n//t7 precompiled templates\n" + templateCache.generateSource();
  //make new file
  createCompiledFile(fileName.replace(".js", ".compiled.js"), output)
};

function createCompiledFile(fileName, fileText) {
  fs.writeFile("./" + fileName, fileText);
};

function transform(ast) {
  return types.visit(ast, Visitor.visitor);
};
