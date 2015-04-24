/*

  t7.js is a small, lightweight library for compiling ES2015 template literals
  into virtual DOM objects.

  By Dominic Gannaway

*/

var t7 = (function() {
  "use strict";

  //we store created functions in the cache (key is the template string)
  var docHead = document.getElementsByTagName('head')[0];
  window.t7cache = {};

  //to save time later, we can pre-create a props object structure to re-use
  var functionProps = {};
  var functionPlaceholders = [];

  for(var ii = 1; ii < 15; ii++) {
    functionProps["$" + ii] = null;
    functionPlaceholders.push("$" + ii);
  };

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
    var n = 0;

    //if the node has children that is an array, handle it with a loop
    if(root.children != null && Array.isArray(root.children)) {
      //we're building an array in code, so we need an open bracket
      childrenText.push("[");

      for(i = 0, n = root.children.length; i < n; i++) {
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

      if(root.key != null) {
        tagParams.push("key: '" + root.key + "'");
      }

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
    var n = 0;
    var n2 = 0;
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

    for(i = 0, n = html.length; i < n; i++) {
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
            for(s = 0, n2 = placeholders.length; s < n2; s++) {
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
            attrs: (tagData && tagData.attrs) ? tagData.attrs : {},
            children: []
          };
          if(tagData && tagData.key) {
            vElement.key = tagData.key;
          }
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
    var n = 0;
    var n2 = 0;
    var currentString = '';
    var inQuotes = false;
    var attrParts = [];
    var attrs = {};
    var key = '';

    //build the parts of the tag
    for(i = 0, n = tagText.length; i < n; i++) {
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
    for(i = 1, n = parts.length; i < n; i++) {
      attrParts = [];
      lastChar= '';
      currentString = '';

      for(s = 0, n2 = parts[i].length; s < n2; s++) {
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
          if(attrParts[0] === "key") {
            key = "' + props." + attrParts[1] + " + '";
          } else {
            attrs[attrParts[0]] = "' + props." + attrParts[1] + " + '";
          }
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

  function addNewScriptFunction(scriptString, templateKey) {
    var funcCode = scriptString + '\n//# sourceURL=' + templateKey;
    var scriptElement = document.createElement('script');
    scriptElement.textContent = funcCode;
    docHead.appendChild(scriptElement);
  }

  //main t7 compiling function
  function t7(template) {
    var fullHtml = null;
    var i = 1;
    var n = arguments.length;
    var functionString = null;
    var scriptString = null;
    //we need to generate a very quick key that will be used as the function name
    var templateKey = null;
    var tpl = "";

    for(; i < n; i++) {
      functionProps["$" + i] = arguments[i];
      tpl += template[i];
    };

    //set our unique key using xxHash
    templateKey = XXH( tpl, 0xABCD ).toString(8);

    if(window.t7cache[templateKey] == null) {
      fullHtml = '';
      //put our placeholders around the template parts
      for(i = 0, n = template.length; i < n; i++) {
        if(i === template.length - 1) {
          fullHtml += template[i];
        } else {
          fullHtml += template[i] + functionPlaceholders[i];
        }
      }
      //once we have our vDom array, build an optimal function to improve performance
      functionString = [];
      buildFunction(
        //build a vDom from the HTML
        getVdom(fullHtml, functionPlaceholders, functionProps),
        functionString,
        true
      )
      //build a new Function
      scriptString = 'window.t7cache["' + templateKey + '"]=function(props)';
      scriptString += '{"use strict";return ' + functionString.join('') + '}';

      addNewScriptFunction(scriptString, templateKey);
    }

    return window.t7cache[templateKey](functionProps);
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

  //TODO register tags
  t7.register = function() {
  };

  return t7;
})();

if(typeof module != "undefined" && module.exports != null) {
  module.exports = t7;
}

(function(e,t,n,r,i){var s={},o=function(t){return e.Function("return "+t)()},u=e.document,a,f=function(t,i){var o={exports:{}};s[t]=1,n[t]=o.exports;if(!i)i=i||e[t];else if(typeof i=="function"){var u=l;r[t]&&r[t].sandbox&&typeof u=="function"&&(u=a),i=i(u,o.exports,o)||o.exports}return i=i,n[t]=i},l=function(e){var t=n[e],r=[e,t];return r&&(e=r[0],t=r[1]),s[e]&&t?t:(typeof t=="string"&&t.indexOf("(function(")===0&&(t=o(t)),f(e,t))},c={exports:{}};for(var h in n)s[h]=0;t(l,c.exports,c)})(this,function(e,t,n){window.XXH=e("xxhash")},{"./lib/uint32":function(e,t,n){(function(e){function t(e,n){if(!(this instanceof t))return new t(e,n);this._low=0,this._high=0,this.remainder=null;if(typeof n=="undefined")return i.call(this,e);if(typeof e=="string")return s.call(this,e,n);r.call(this,e,n)}function r(e,t){return this._low=e|0,this._high=t|0,this}function i(e){return this._low=e&65535,this._high=e>>>16,this}function s(e,t){var n=parseInt(e,t||10);return this._low=n&65535,this._high=n>>>16,this}var o={36:t(Math.pow(36,5)),16:t(Math.pow(16,7)),10:t(Math.pow(10,9)),2:t(Math.pow(2,30))},u={36:t(36),16:t(16),10:t(10),2:t(2)};t.prototype.fromBits=r,t.prototype.fromNumber=i,t.prototype.fromString=s,t.prototype.toNumber=function(){return this._high<<16|this._low},t.prototype.toString=function(e){e=e||10;var n=u[e]||new t(e);if(!this.gt(n))return this.toNumber().toString(e);var r=this.clone(),i=new Array(32);for(var s=31;s>=0;s--){r.div(n),i[s]=r.remainder.toNumber().toString(e);if(!r.gt(n))break}return i[s-1]=r.toNumber().toString(e),i.join("")},t.prototype.add=function(e){var t=this._low+e._low,n=t>>>16;return n+=this._high+e._high,this._low=t&65535,this._high=n&65535,this},t.prototype.subtract=function(e){return this.add(e.clone().negate())},t.prototype.multiply=function(e){var t=this._high,n=this._low,r=e._high,i=e._low,s,o;return o=n*i,s=o>>>16,s+=t*i,s&=65535,s+=n*r,this._low=o&65535,this._high=s&65535,this},t.prototype.div=function(e){if(e._low==0&&e._high==0)throw Error("division by zero");if(e._high==0&&e._low==1)return this.remainder=new t(0),this;if(e.gt(this))return this.remainder=new t(0),this._low=0,this._high=0,this;if(this.eq(e))return this.remainder=new t(0),this._low=1,this._high=0,this;var n=e.clone(),r=-1;while(!this.lt(n))n.shiftLeft(1,!0),r++;this.remainder=this.clone(),this._low=0,this._high=0;for(;r>=0;r--)n.shiftRight(1),this.remainder.lt(n)||(this.remainder.subtract(n),r>=16?this._high|=1<<r-16:this._low|=1<<r);return this},t.prototype.negate=t.prototype.not=function(){var e=(~this._low&65535)+1;return this._low=e&65535,this._high=~this._high+(e>>>16)&65535,this},t.prototype.equals=t.prototype.eq=function(e){return this._low==e._low&&this._high==e._high},t.prototype.greaterThan=t.prototype.gt=function(e){return this._high>e._high?!0:this._high<e._high?!1:this._low>e._low},t.prototype.lessThan=t.prototype.lt=function(e){return this._high<e._high?!0:this._high>e._high?!1:this._low<e._low},t.prototype.or=function(e){return this._low|=e._low,this._high|=e._high,this},t.prototype.and=function(e){return this._low&=e._low,this._high&=e._high,this},t.prototype.xor=function(e){return this._low^=e._low,this._high^=e._high,this},t.prototype.shiftRight=t.prototype.shiftr=function(e){return e>16?(this._low=this._high>>e-16,this._high=0):e==16?(this._low=this._high,this._high=0):(this._low=this._low>>e|this._high<<16-e&65535,this._high>>=e),this},t.prototype.shiftLeft=t.prototype.shiftl=function(e,t){return e>16?(this._high=this._low<<e-16,this._low=0,t||(this._high&=65535)):e==16?(this._high=this._low,this._low=0):(this._high=this._high<<e|this._low>>16-e,this._low=this._low<<e&65535,t||(this._high&=65535)),this},t.prototype.rotateLeft=t.prototype.rotl=function(e){var t=this._high<<16|this._low;return t=t<<e|t>>>32-e,this._low=t&65535,this._high=t>>>16,this},t.prototype.rotateRight=t.prototype.rotr=function(e){var t=this._high<<16|this._low;return t=t>>>e|t<<32-e,this._low=t&65535,this._high=t>>>16,this},t.prototype.clone=function(){return new t(this._low,this._high)},typeof define!="undefined"&&define.amd?define([],function(){return t}):typeof n!="undefined"&&n.exports?n.exports=t:e.UINT32=t})(this)},cuint:function(e,t,n){t.UINT32=e("./lib/uint32"),t.UINT64=e("./lib/uint64")},xxhash:function(e,t,n){(function(t){function r(e){var t=[];for(var n=0,r=e.length;n<r;n++){var i=e.charCodeAt(n);i<128?t.push(i):i<2048?t.push(192|i>>6,128|i&63):i<55296||i>=57344?t.push(224|i>>12,128|i>>6&63,128|i&63):(n++,i=65536+((i&1023)<<10|e.charCodeAt(n)&1023),t.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63))}return new Uint8Array(t)}function i(){if(arguments.length==2)return(new i(arguments[1])).update(arguments[0]).digest();if(!(this instanceof i))return new i(arguments[0]);s.call(this,arguments[0])}function s(e){return this.seed=e instanceof o?e.clone():o(e),this.v1=this.seed.clone().add(h),this.v2=this.seed.clone().add(a),this.v3=this.seed.clone(),this.v4=this.seed.clone().subtract(u),this.total_len=0,this.memsize=0,this.memory=null,this}var o=e("cuint").UINT32;o.prototype.xxh_update=function(e,t){var n=a._low,r=a._high,i,s;s=e*n,i=s>>>16,i+=t*n,i&=65535,i+=e*r;var o=this._low+(s&65535),f=o>>>16;f+=this._high+(i&65535);var l=f<<16|o&65535;l=l<<13|l>>>19,o=l&65535,f=l>>>16,n=u._low,r=u._high,s=o*n,i=s>>>16,i+=f*n,i&=65535,i+=o*r,this._low=s&65535,this._high=i&65535};var u=o("2654435761"),a=o("2246822519"),f=o("3266489917"),l=o("668265263"),c=o("374761393"),h=u.clone().add(a);i.prototype.init=s,i.prototype.update=function(e){var t=typeof e=="string",n;t&&(e=r(e),t=!1,n=!0),e instanceof ArrayBuffer&&(n=!0,e=new Uint8Array(e));var i=0,s=e.length,o=i+s;if(s==0)return this;this.total_len+=s,this.memsize==0&&(t?this.memory="":n?this.memory=new Uint8Array(16):this.memory=new Buffer(16));if(this.memsize+s<16)return t?this.memory+=e:n?this.memory.set(e.subarray(0,s),this.memsize):e.copy(this.memory,this.memsize,0,s),this.memsize+=s,this;if(this.memsize>0){t?this.memory+=e.slice(0,16-this.memsize):n?this.memory.set(e.subarray(0,16-this.memsize),this.memsize):e.copy(this.memory,this.memsize,0,16-this.memsize);var u=0;t?(this.v1.xxh_update(this.memory.charCodeAt(u+1)<<8|this.memory.charCodeAt(u),this.memory.charCodeAt(u+3)<<8|this.memory.charCodeAt(u+2)),u+=4,this.v2.xxh_update(this.memory.charCodeAt(u+1)<<8|this.memory.charCodeAt(u),this.memory.charCodeAt(u+3)<<8|this.memory.charCodeAt(u+2)),u+=4,this.v3.xxh_update(this.memory.charCodeAt(u+1)<<8|this.memory.charCodeAt(u),this.memory.charCodeAt(u+3)<<8|this.memory.charCodeAt(u+2)),u+=4,this.v4.xxh_update(this.memory.charCodeAt(u+1)<<8|this.memory.charCodeAt(u),this.memory.charCodeAt(u+3)<<8|this.memory.charCodeAt(u+2))):(this.v1.xxh_update(this.memory[u+1]<<8|this.memory[u],this.memory[u+3]<<8|this.memory[u+2]),u+=4,this.v2.xxh_update(this.memory[u+1]<<8|this.memory[u],this.memory[u+3]<<8|this.memory[u+2]),u+=4,this.v3.xxh_update(this.memory[u+1]<<8|this.memory[u],this.memory[u+3]<<8|this.memory[u+2]),u+=4,this.v4.xxh_update(this.memory[u+1]<<8|this.memory[u],this.memory[u+3]<<8|this.memory[u+2])),i+=16-this.memsize,this.memsize=0,t&&(this.memory="")}if(i<=o-16){var a=o-16;do t?(this.v1.xxh_update(e.charCodeAt(i+1)<<8|e.charCodeAt(i),e.charCodeAt(i+3)<<8|e.charCodeAt(i+2)),i+=4,this.v2.xxh_update(e.charCodeAt(i+1)<<8|e.charCodeAt(i),e.charCodeAt(i+3)<<8|e.charCodeAt(i+2)),i+=4,this.v3.xxh_update(e.charCodeAt(i+1)<<8|e.charCodeAt(i),e.charCodeAt(i+3)<<8|e.charCodeAt(i+2)),i+=4,this.v4.xxh_update(e.charCodeAt(i+1)<<8|e.charCodeAt(i),e.charCodeAt(i+3)<<8|e.charCodeAt(i+2))):(this.v1.xxh_update(e[i+1]<<8|e[i],e[i+3]<<8|e[i+2]),i+=4,this.v2.xxh_update(e[i+1]<<8|e[i],e[i+3]<<8|e[i+2]),i+=4,this.v3.xxh_update(e[i+1]<<8|e[i],e[i+3]<<8|e[i+2]),i+=4,this.v4.xxh_update(e[i+1]<<8|e[i],e[i+3]<<8|e[i+2])),i+=4;while(i<=a)}return i<o&&(t?this.memory+=e.slice(i):n?this.memory.set(e.subarray(i,o),this.memsize):e.copy(this.memory,this.memsize,i,o),this.memsize=o-i),this},i.prototype.digest=function(){var e=this.memory,t=typeof e=="string",n=0,r=this.memsize,i,s,h=new o;this.total_len>=16?i=this.v1.rotl(1).add(this.v2.rotl(7).add(this.v3.rotl(12).add(this.v4.rotl(18)))):i=this.seed.add(c),i.add(h.fromNumber(this.total_len));while(n<=r-4)t?h.fromBits(e.charCodeAt(n+1)<<8|e.charCodeAt(n),e.charCodeAt(n+3)<<8|e.charCodeAt(n+2)):h.fromBits(e[n+1]<<8|e[n],e[n+3]<<8|e[n+2]),i.add(h.multiply(f)).rotl(17).multiply(l),n+=4;while(n<r)h.fromBits(t?e.charCodeAt(n++):e[n++],0),i.add(h.multiply(c)).rotl(11).multiply(u);return s=i.clone().shiftRight(15),i.xor(s).multiply(a),s=i.clone().shiftRight(13),i.xor(s).multiply(f),s=i.clone().shiftRight(16),i.xor(s),this.init(this.seed),i},typeof define!="undefined"&&define.amd?define([],function(){return i}):typeof n!="undefined"&&n.exports?n.exports=i:t.XXH=i})(this)}},{},{})
