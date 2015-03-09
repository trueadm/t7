/*

  t7.js is a small, lightweight library for compiling ES2015 template literals
  into virtual DOM objects.

  By Dominic Gannaway

*/

var t7 = (function() {
  "use strict";

  //we store created functions in the cache (key is the template string)
  var cache = {};

  var selfClosingTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ];

  //when creating a new function from a vdom, we'll need to build the vdom's children
  function buildChildren(root, tagParams, childrenProp) {
    var childrenText = [];
    var i = 0;

    //if the node has children that is an array, handle it with a loop
    if(root.children != null && Array.isArray(root.children)) {
      //we're building an array in code, so we need an open bracket
      childrenText.push("[");

      for(i = 0; i < root.children.length; i++) {
        if(root.children[i][0] === "$") {
          childrenText.push("{children:");
          childrenText.push(root.children[i].substring(1));
          childrenText.push("}");
        } else {
          buildFunction(root.children[i], childrenText, i === root.children.length - 1)
        }
      }
      //we now need to close the array we've constructed
      childrenText.push("]");
      //push the children code into our tag params code
      tagParams.push((childrenProp ? "children: " : "") + childrenText.join(""));

    } else if(root.children != null && typeof root.children === "string") {
      root.children = root.children.replace(/(\r\n|\n|\r)/gm,"");
      tagParams.push((childrenProp ? "children: " : "") + '"' + root.children + '"');
    }
  };

  function buildAttrsParams(root, attrsParams) {
    var val = '';
    for(var name in root.attrs) {
      val = root.attrs[name];
      attrsParams.push("'" + name + "':'" + val + "'");
    }
  };

  //This takes a vDom array and builds a new function from it, to improve
  //repeated performance at the cost of building new Functions()
  function buildFunction(root, functionText, isLast) {
    var i = 0;
    var tagParams = [];
    var literalParts = [];
    var attrsParams = [];

    if(Array.isArray(root)) {
      //throw error about adjacent elements
    } else {
      functionText.push("{");

      //add the tag name
      tagParams.push("tag: '" + root.tag + "'");

      //build the attrs
      if(root.attrs != null) {
        buildAttrsParams(root, attrsParams);
        tagParams.push("attrs: {" + attrsParams.join(',') + "}");
      }

      //build the children for this node
      buildChildren(root, tagParams, true);

      functionText.push(tagParams.join(','));
      functionText.push("}");

      //if we are at the end of building an array, do not add the comma after
      if(isLast === false) {
        functionText.push(",");
      }
    }
  };

  function getVdom(html, placeholders, props) {
    var char = '';
    var lastChar = '';
    var i = 0;
    var s = 0;
    var root = null;
    var insideTag = false;
    var tagContent = '';
    var tagName = '';
    var vElement = null;
    var childText = '';
    var parent = null;
    var tagData = null;
    var skipAppend = false;
    var newChild = null;

    for(i = 0; i < html.length; i++) {
      //set the char to the current character in the string
      char = html[i];

      if (char === "<") {
        insideTag = true;
      } else if(char === ">" && insideTag === true) {
        //check if first character is a close tag
        if(tagContent[0] === "/") {
          //when the childText is not empty
          if(childText.trim() !== "") {
            //check if childText contains one of our placeholders
            for(s = 0 ; s < placeholders.length; s++) {
              if(childText.indexOf(placeholders[s]) > -1) {
                if(Array.isArray(props[placeholders[s]])) {
                  //set the children to this object
                  parent.children.push('$props.' + placeholders[s]);
                  //set the child to null so we don't then append it to the parent's child below
                  childText = null;
                  break;
                } else if( typeof props[placeholders[s]] === "string"
                  || typeof props[placeholders[s]] === "number" ) {
                  childText = childText.replace(placeholders[s], '" + props.' + placeholders[s] + ' + "');
                }
              }
            }

            if(childText !== null) {
              parent.children = childText;
            }
          }
          //move back up the vDom tree
          parent = parent.parent;
        } else {
          //check if there any spaces in the tagContent, if not, we have our tagName
          if(tagContent.indexOf(" ") === -1) {
            tagName = tagContent;
          } else {
            //get the tag data via the getTagData function
            tagData = getTagData(tagContent, placeholders);
            tagName = tagData.tag;
          }
          //now we create out vElement
          vElement = {
            tag: tagName,
            attrs: tagData.attrs || {},
            children: []
          };
          //push the node we've constructed to the relevant parent
          if(parent === null) {
            parent = vElement;
            root = parent;
          } else if (Array.isArray(parent)) {
            parent.push(vElement);
          } else {
            parent.children.push(vElement);
          }
          //check if we've just made a self closing tag
          if(selfClosingTags.indexOf(tagName) === -1) {
            //set our node's parent to our current parent
            vElement.parent = parent;
            //now assign the parent to our new node
            parent = vElement;
          }
        }
        //reset our flags and strings
        insideTag = false;
        tagContent = '';
        childText = '';
      } else if (insideTag === true) {
        tagContent += char;
        lastChar = char;
      } else {
        childText += char;
        lastChar = char;
      }
    }
    //return the root (our constructed vDom)
    return root;
  }

  function getTagData(tagText, placeholders) {
    var parts = [];
    var char = '';
    var lastChar = '';
    var i = 0;
    var s = 0;
    var currentString = '';
    var inQuotes = false;
    var attrParts = [];
    var attrs = {};
    var key = '';

    //build the parts of the tag
    for(i = 0; i < tagText.length; i++) {
      char = tagText[i];

      if(char === " " && inQuotes === false) {
        parts.push(currentString);
        currentString = '';
      } else if(char === "'") {
        if(inQuotes === false) {
          inQuotes = true;
        } else {
          inQuotes = false;
          parts.push(currentString);
          currentString = '';
        }
      } else if(char === '"') {
        if(inQuotes === false) {
          inQuotes = true;
        } else {
          inQuotes = false;
          parts.push(currentString);
          currentString = '';
        }
      } else {
        currentString += char;
      }
    }

    if(currentString !== "") {
      parts.push(currentString);
    }
    currentString = '';

    //loop through the parts of the tag
    for(i = 1; i < parts.length; i++) {
      attrParts = [];
      lastChar= '';
      currentString = '';

      for(s = 0; s < parts[i].length; s++) {
        char = parts[i][s];

        //if the character is =, then we're able to split the attribute name and value
        if(char === "=") {
          attrParts.push(currentString);
          currentString = '';
        } else {
          currentString += char;
          lastChar = char;
        }
      }

      if(currentString != "") {
        attrParts.push(currentString);
      }
      if(attrParts.length > 1) {
        if(placeholders.indexOf(attrParts[1]) === -1) {
          attrs[attrParts[0]] = attrParts[1];
        } else {
          attrs[attrParts[0]] = "' + props." + attrParts[1] + " + '";
        }
      }
    }

    //return the attributes and the tag name
    return {
      tag: parts[0],
      attrs: attrs,
      key: key
    }
  };

  //main t7 compiling function
  function t7(template) {
    var props = {};
    var placeholders = [];
    var fullHtml = '';
    var i = 0;
    var vDom = [];
    var functionString = [];

    for(i = 1; i < arguments.length; i++) {
      props["$" + i] = arguments[i];
      placeholders.push("$" + i);
    };

    //put our placeholders around the template parts
    for(i = 0; i < template.length; i++) {
      if(i === template.length - 1) {
        fullHtml += template[i];
      } else {
        fullHtml += template[i] + placeholders[i];
      }
    }

    if(cache[fullHtml] == null) {
      //build a vDom from the HTML
      vDom = getVdom(fullHtml, placeholders, props);
      //once we have our vDom array, build an optimal function to improve performance
      buildFunction(vDom, functionString, true)
      //build a new Function
      cache[fullHtml] = new Function("props", "return " + functionString.join(''));
    }

    return cache[fullHtml].call(window, props);
  };

  //a lightweight flow control function
  //expects truthy and falsey to be functions
  t7.if = function(expression, truthy) {

    if(expression) {
      return {
        else: function() {
          return truthy();
        }
      };
    } else {
      return {
        else: function(falsey) {
          return falsey();
        }
      }
    }
  };

  t7._flattenArrayOfArrays = function(a, r){
    if(!r){ r = []}
    for(var i=0; i<a.length; i++){
        if(a[i].constructor == Array){
            t7._flattenArrayOfArrays(a[i], r);
        }else{
            r.push(a[i]);
        }
    }
    return r;
  };

  t7.setFormat = function( format ) {
    //TODO
  };

  t7.register = function( structure ) {
    //TODO
  };

  return t7;
})();

if(typeof module != "undefined" && module.exports != null) {
  module.exports = t7;
}
