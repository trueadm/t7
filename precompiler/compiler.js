var recast = require('recast');
var types = recast.types;
var Visitor = require('./visitor');
var fs = require('fs');
var t7 = require('../t7.js');
var args = process.argv.slice(2);
var templateCache = require("./templateCache.js");

t7.setPrecompile(true);

//we are looking at an input
if(args[0] === "-i" && args[2] === "-o") {
  //check the file or folder
  var fileName = args[1];
  var output = args[3];
  if(fileName !== "") {
    fs.readFile("./" + fileName, 'utf8', function(err, fileText) {
      handleFile(fileName, fileText, output)
    })
  }
} else {
  console.log("Invalid arguments: Please define an input filename and an output type, for example '-i myFile.js -o react'");
}

function handleFile(fileName, fileText, outputType) {
  console.time("Precompiled '" + fileName + "'");
  var ast = recast.parse(fileText);

  for(outputName in t7.Outputs) {
    if(outputName.toLowerCase() === outputType.toLowerCase()) {
      t7.setOutput(t7.Outputs[outputName]);
      break;
    }
  }

  var output = recast.print(transform(ast)).code;

  //add the template sources to bottom of file
  output += "\n//t7 precompiled templates\n" + templateCache.generateSource();
  //make new file
  createCompiledFile(fileName.replace(".js", ".compiled.js"), output)
  console.timeEnd("Precompiled '" + fileName + "'");
};

function createCompiledFile(fileName, fileText) {
  fs.writeFile("./" + fileName, fileText);
};

function transform(ast) {
  return types.visit(ast, Visitor.visitor);
};
