var fs = require('fs');
var args = process.argv.slice(2);

//we are looking at an input
if(args[0] === "-i") {
  //check the file or folder
  var fileName = args[1];
  if(fileName !== "") {
    fs.readFile("./" + fileName, 'utf8', function(err, code) {
      //we actually need to recursively parse all files in a directory eventually...
      handleCode(code)
    })
  }
}

function handleCode(code) {
  //go through character by character till we find t7`, that is NOT commented out
  var char = '';
  var lastChar = '';
  var t7open = false;
  var t7inside = false;
  var totalCode = '';
  var insideLiteral = false;
  var innerCode = '';
  var innerLiteralCode = '';
  var processedCode = '';
  var literals = [];

  for(var i = 0; i < code.length; i = i + 1 | 0) {
    lastChar = char;
    char = code[i];
    if(char === '7' && lastChar === 't' && insideLiteral === false) {
      t7open = true;
    } else if(t7open === true && char === '`' && insideLiteral === false) {
      t7inside = true;
      //remove the t character from the totalCode as it's part of
      totalCode = totalCode.substring(0, totalCode.length - 1);
    } else if(t7open === true && t7inside === true && char === '{' && lastChar === '$') {
      insideLiteral = true;
    } else if(t7open === true && t7inside === true && char === '}' && insideLiteral === true) {
      literals.push(innerLiteralCode);
      innerLiteralCode = '';
      insideLiteral = false;
    } else if(t7open === true && t7inside === true && char === '`' && insideLiteral === false) {
      t7inside = false;
      t7open = false;
      //we now need to process this
      processedCode = processCode(innerCode);
    } else if (t7inside === true && insideLiteral === true) {
      innerLiteralCode += char;
    } else if (t7inside === true) {
      innerCode += char;
    } else {
      totalCode += char;
    }
  }

  function processedCode(code, literals) {
    //we can turn the placeholders into literals by taking the array and converting it
    //we also want to build the vdom from the code
    debugger;
  };

  console.log(totalCode, innerCode, innerLiteralCode);
};
