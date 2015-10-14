(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["t7Factory"] = factory();
	else
		root["t7Factory"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _coreTransformer = __webpack_require__(5);
	
	var _coreCreateInstance = __webpack_require__(7);
	
	var _coreCreateInstance2 = _interopRequireDefault(_coreCreateInstance);
	
	var _coreCacheControl = __webpack_require__(2);
	
	exports['default'] = {
	    setTransformer: _coreTransformer.setTransformer,
	    createInstance: _coreCreateInstance2['default'],
	    clearTemplates: _coreCacheControl.clearTemplates
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getTemplate = getTemplate;
	exports.setTemplate = setTemplate;
	exports.clearTemplates = clearTemplates;
	var templateCache = {};
	
	function getTemplate(key) {
	    return templateCache[key];
	}
	
	;
	
	function setTemplate(key, template) {
	    templateCache[key] = template;
	}
	
	;
	
	function clearTemplates() {
	    templateCache = {};
	}
	
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = parseHtml;
	
	var _parseTag = __webpack_require__(10);
	
	var _parseTag2 = _interopRequireDefault(_parseTag);
	
	var tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
	var empty = {};
	var whitespace = /[\t\r\n\f]+/g;
	
	function parseHtml(html) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		options.components || (options.components = empty);
		var result = [];
		var current = undefined;
		var level = -1;
		var arr = [];
		var byTag = {};
		var inComponent = false;
		html = html.replace(whitespace, ''); // calculate for special and hidden chars etc etc
	
		html.replace(tagRE, function (tag, index) {
			if (inComponent) {
				if (tag !== '</' + current.name + '>') {
					return;
				} else {
					inComponent = false;
				}
			}
			var isOpen = tag.charAt(1) !== '/';
			var start = index + tag.length;
			var nextChar = html.charAt(start);
			var parent = undefined;
	
			if (isOpen) {
				level++;
				current = (0, _parseTag2['default'])(tag);
				result.description = current.description;
				if (current.type === 'tag' && options.components[current.name]) {
					current.type = 'component';
					inComponent = true;
				}
				if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
					current.children.push({
						type: 'text',
						content: html.slice(start, html.indexOf('<', start))
					});
				}
				byTag[current.tagName] = current;
				// if we're at root, push new base node
				if (level === 0) {
					result.push(current);
				}
				parent = arr[level - 1];
				if (parent) {
					parent.children.push(current);
				}
				arr[level] = current;
			}
	
			if (!isOpen || current.voidElement) {
				level--;
				if (!inComponent && nextChar !== '<' && nextChar) {
					// trailing text node
					arr[level].children.push({
						type: 'text',
						content: html.slice(start, html.indexOf('<', start))
					});
				}
			}
		});
	
		return result;
	}
	
	;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.setTransformer = setTransformer;
	exports.getTransformer = getTransformer;
	
	var _transformersDefault = __webpack_require__(14);
	
	var _transformersDefault2 = _interopRequireDefault(_transformersDefault);
	
	var transformer = _transformersDefault2['default'];
	
	function setTransformer(newTransformer) {
		transformer = newTransformer;
	}
	
	;
	
	function getTransformer() {
		return transformer;
	}
	
	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _transformer = __webpack_require__(5);
	
	function buildCompiledTemplate(ast, templateKey, t7instance) {
	    return (0, _transformer.getTransformer)().compile(ast);
	};
	
	exports['default'] = buildCompiledTemplate;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = createInstance;
	
	var _parseTemplateString = __webpack_require__(11);
	
	var _parseTemplateString2 = _interopRequireDefault(_parseTemplateString);
	
	function createInstance() {
	    var _components = {};
	    var _precompile = false;
	
	    function instance() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        return _parseTemplateString2['default'].apply(instance, args);
	    }
	    instance.setPrecompile = function setPrecompile(precompile) {
	        _precompile = precompile;
	    };
	    instance.getPrecompile = function getPrecompile() {
	        return _precompile;
	    };
	    instance.register = function register(name, component) {
	        _components[name] = component;
	    };
	    instance.load = function load(name) {
	        return _components[name];
	    };
	    return instance;
	}
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = createTemplate;
	
	var _cacheControl = __webpack_require__(2);
	
	var _parseHtml = __webpack_require__(4);
	
	var _parseHtml2 = _interopRequireDefault(_parseHtml);
	
	var _buildCompiledTemplate = __webpack_require__(6);
	
	var _buildCompiledTemplate2 = _interopRequireDefault(_buildCompiledTemplate);
	
	function createTemplate(templateKey, templateStrings, values, t7instance) {
	    var fullHtml = '';
	    //put our placeholders around the template parts
	    for (var i = 0, n = templateStrings.length; i < n; i++) {
	        if (i === templateStrings.length - 1) {
	            fullHtml += templateStrings[i];
	        } else {
	            fullHtml += templateStrings[i] + "__$props__[" + i + "]";
	        }
	    }
	    //parse the HTML and generate HTML
	    var ast = (0, _parseHtml2['default'])(fullHtml);
	    var compiledTemplate = (0, _buildCompiledTemplate2['default'])(ast, templateKey, t7instance);
	
	    if (t7instance.getPrecompile() === true) {
	        return {
	            templateKey: templateKey,
	            template: 'return ' + compiledTemplate
	        };
	    } else {
	        var functionString = '"use strict";var __$props__ = arguments[0];' + 'var t7 = arguments[1];return ' + compiledTemplate;
	        var template = new Function(functionString);
	        (0, _cacheControl.setTemplate)(templateKey, template);
	        return template;
	    }
	}
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	// FIX ME, MAYBE!?  Inherit code from creating template key from Inferno to avoid FF slow downs_
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = createTemplateKey;
	
	function createTemplateKey(tpl) {
	  var hash = 0;
	  if (tpl.length == 0) {
	    return tpl;
	  }
	  for (var i = 0, len = tpl.length; i < len; i++) {
	    var chr = tpl.charCodeAt(i);
	    hash = (hash << 5) - hash + chr;
	    hash |= 0;
	  }
	  return hash;
	}
	
	;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _specVoidTags = __webpack_require__(13);
	
	var _specVoidTags2 = _interopRequireDefault(_specVoidTags);
	
	var _utilT7Err = __webpack_require__(16);
	
	var _utilT7Err2 = _interopRequireDefault(_utilT7Err);
	
	var _processAttributes2 = __webpack_require__(12);
	
	var _processAttributes3 = _interopRequireDefault(_processAttributes2);
	
	var ATTRIBUTE_REGEX = /([\w-]+)|('[^\']*')|("[^\"]*")/g;
	var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
	var html5Data = /(data-)/g; // TODO
	var rmultiDash = /[A-Z]/g; // TODO
	
	exports['default'] = function (tag) {
		var tokenIndex = 0;
		var key = undefined;
		var res = {
			type: 'tag',
			name: '',
			voidElement: false,
			attrs: {},
			children: []
		};
	
		// handle dynamic tags
		tag = tag.replace(/(__\$props__\[.*\])/g, "'$1'");
	
		// FIX ME! tag names should be validated to avoid chinese and arabic tags, and also avoid numberic and special chars.
		tag.replace(ATTRIBUTE_REGEX, function (match) {
			if (tokenIndex === 0) {
				if (_specVoidTags2['default'][match] || tag.charAt(tag.length - 2) === '/') {
					// 'charAt' slow - consider slice etc?
					res.voidElement = true;
				}
				res.name = match;
			} else if (tokenIndex % 2) {
				key = match;
			}
			// Attributes - This need a heavy re-write
			else {
					var _processAttributes = function _processAttributes(key, name, res) {};
				}
			tokenIndex++;
		});
	
		return res;
	};
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = parseTemplateString;
	
	var _parseHtml = __webpack_require__(4);
	
	var _parseHtml2 = _interopRequireDefault(_parseHtml);
	
	var _createTemplateKey = __webpack_require__(9);
	
	var _createTemplateKey2 = _interopRequireDefault(_createTemplateKey);
	
	var _cacheControl = __webpack_require__(2);
	
	var _createTemplate = __webpack_require__(8);
	
	var _createTemplate2 = _interopRequireDefault(_createTemplate);
	
	function parseTemplateString(templateStrings) {
		var templateToHash = templateStrings[0];
	
		//build the template string
		for (var i = 0; i < templateStrings.length; i++) {
			templateToHash += templateStrings[i];
		};
	
		//set our unique key
		var templateKey = (0, _createTemplateKey2['default'])(templateToHash);
		var template = (0, _cacheControl.getTemplate)(templateKey);
	
		for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			values[_key - 1] = arguments[_key];
		}
	
		if (template == null) {
			return (0, _createTemplate2['default'])(templateKey, templateStrings, values, this)(values, this);
		}
	
		return template(values, this);
	}
	
	;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
			value: true
	});
	
	var _utilValidNamespaces = __webpack_require__(17);
	
	var _utilValidNamespaces2 = _interopRequireDefault(_utilValidNamespaces);
	
	function processAttributes(key, name, res) {
	
			var value = match.replace(/['"]/g, '');
	
			// FIX ME! This doesn't handle HTML5 -* data, and dataset attribute correctly.
	
			// FIX ME! This doesn't handle boolean attributes / properties correctly. Overloaded booleans are not counted etc.
	
			if (key !== 'xmlns') {
					res.attrs[key] = value;
			} else {
	
					// validate namespaces
					if ((0, _utilValidNamespaces2['default'])(value)) {
							res.attrs[key] = value;
					} else {
	
							// TODO: Should this throw an error ??
	
							//		t7Err('t7', value + ' is not a valid namespace'); 
					}
			}
	}
	
	exports['default'] = processAttributes;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		area: true,
		base: true,
		basefont: true,
		br: true,
		col: true,
		command: true,
		embed: true,
		frame: true,
		hr: true,
		img: true,
		input: true,
		isindex: true,
		keygen: true,
		link: true,
		meta: true,
		param: true,
		source: true,
		track: true,
		wbr: true,
	
		//common self closing svg elements
		path: true,
		circle: true,
		ellipse: true,
		line: true,
		rect: true,
		use: true,
		stop: true,
		polyline: true,
		polygon: true
	};
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(19)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _utilIsArray = __webpack_require__(15);
	
	var _utilIsArray2 = _interopRequireDefault(_utilIsArray);
	
	function transform(_x) {
		var _again = true;
	
		_function: while (_again) {
			var ast = _x;
			_length = children = i = hasAttrs = hasChildren = childrenIsString = undefined;
			_again = false;
	
			// 'ast' now contains a description for the tag
			if (ast.type === 'text') {
				return ast.content;
			} else {
				if ((0, _utilIsArray2['default'])(ast)) {
					var _length = ast.length;
	
					if (_length === 1) {
						_x = ast[0];
						_again = true;
						continue _function;
					} else {
						var children = new Array(_length);
						for (var i = 0; i < _length; i++) {
							children[i] = transform(ast[i]);
						}
						return children;
					}
				} else {
					var hasAttrs = ast.attrs && _Object$keys(ast.attrs).length > 0;
					var hasChildren = ast.children && ast.children.length > 0;
					var childrenIsString = false;
	
					if (hasChildren && hasAttrs) {
						return {
							tag: ast.name,
							attrs: ast.attrs,
							children: transform(ast.children)
						};
					} else if (hasChildren && !hasAttrs) {
						return {
							tag: ast.name,
							children: transform(ast.children)
						};
					} else if (!hasChildren && hasAttrs) {
						return {
							tag: ast.name,
							attrs: ast.attrs
						};
					} else {
						return {
							tag: ast.name
						};
					}
				}
			}
		}
	}
	
	function compileTemplateAttributes(ast) {
		var attrsParams = [];
	
		for (var _name in ast.attrs) {
			var val = ast.attrs[_name];
			val = val.replace(/(__\$props__\[.*\])/g, '" + $1 + "');
			attrsParams.push('"' + _name + '":"' + val + '"');
		}
		return attrsParams.join(', ');
	}
	
	function compileTemplateChildren(root, rootChildrenStringBuilder, childrenProp) {
		var childrenStringBuilder = [];
	
		if (root.children != null && (0, _utilIsArray2['default'])(root.children)) {
			for (var i = 0, n = root.children.length; i < n; i++) {
				var child = root.children[i];
				if (child != null) {
					if (typeof child === 'string') {
						child = child.replace(/(\r\n|\n|\r)/gm, '');
						var matches = child.match(/__\$props__\[\d*\]/g);
	
						if (matches !== null) {
							childrenStringBuilder.push(root.children[i]);
						} else {
							childrenStringBuilder.push('"' + root.children[i] + '"');
						}
					} else {
						compileTemplateRoot(root.children[i], childrenStringBuilder);
					}
				}
			}
		} else if (root.children != null && typeof root.children === 'string') {
			var child = root.children.replace(/(\r\n|\n|\r)/gm, '');
			var noManipulate = true;
			child = child.replace(/(__\$props__\[.*\])/g, '",$1,"');
			//if the last two characters are ,', replace them with nothing
			if (child.substring(child.length - 2) === ',"') {
				child = child.substring(0, child.length - 2);
				noManipulate = false;
			}
			if (child.substring(0, 2) === '",') {
				child = child.substring(2);
				noManipulate = false;
			}
			if (noManipulate) {
				rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + '"' + child + '"');
			} else {
				rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + child);
			}
		} else {
			compileTemplateRoot(root.children, childrenStringBuilder);
		}
		//if we have some children in our string builder, create it up and put it on our root children string builder
		if (childrenStringBuilder.length === 1) {
			rootChildrenStringBuilder.push((childrenProp ? 'children: ' : '') + childrenStringBuilder[0]);
		} else if (childrenStringBuilder.length > 1) {
			rootChildrenStringBuilder.push((childrenProp ? 'children: ' : '') + '[' + childrenStringBuilder.join(",") + ']');
		}
	}
	
	function compileTemplateRoot(root, rootStringBuilder) {
		if (root.tag != null) {
			var rootString = '{tag: "' + root.tag + '"';
	
			if (root.key != null) {
				rootString += ', key: ' + root.key;
			}
			if (root.attrs != null) {
				var attrsParams = compileTemplateAttributes(root);
				rootString += ', attrs: {' + attrsParams + '}';
			}
			if (root.children != null) {
				var childrenStringBuilder = [];
				compileTemplateChildren(root, childrenStringBuilder, true);
				//add the children and close the object
				rootString += ', ' + childrenStringBuilder.join(',') + '}';
			} else {
				//close the object if there are not children
				rootString += '}';
			}
			rootStringBuilder.push(rootString);
		} else {
			//no root? then it's a text node
			rootStringBuilder.push("'" + root + "'");
		}
	}
	
	exports['default'] = {
		compile: function compile(ast) {
			var templateStringBuilder = [];
	
			compileTemplateRoot(transform(ast), templateStringBuilder);
			return templateStringBuilder.join(', ');
		}
	};
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports["default"] = function (x) {
	  return x.constructor === Array;
	};
	
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$create = __webpack_require__(18)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = minErr;
	var Wrapper = function Wrapper(module, msg) {
		this.message = module ? (msg || 'This operation is not supported') + (module.length > 4 ? ' -> Module: ' + module : ' -> Core') : 'The string did not match the expected pattern';
		// use the name on the framework
		this.name = 't7';
	};
	
	Wrapper.prototype = _Object$create(Error.prototype);
	
	function minErr(module, msg) {
		throw new Wrapper(module, msg);
	}
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Validate namespace through the 'xmlns' attribute
	 * @param {String}  ns  The namespace to validate
	 * @return {Boolean} true / false
	 *
	 * Usage:
	 *
	 * let xmlns='http://www.w3.org/1999/xhtml';
	 *
	 *  validNamespaces(xmlns);
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	function validNamespaces(ns) {
	
	    switch (ns) {
	        case 'http://www.w3.org/1999/xhtml': // html
	        case 'http://www.w3.org/1998/Math/MathML': // MathML
	        case 'http://www.w3.org/2000/svg': // SVG
	        case 'http://www.w3.org/1999/xlink': // Xlink
	        case 'http://www.w3.org/XML/1998/namespace': // XML
	        case 'http://www.w3.org/2000/xmlns/':
	            // XMLNS
	            return true;
	        default:
	            return false;
	    }
	};
	
	exports['default'] = validNamespaces;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(26);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	module.exports = __webpack_require__(3).Object.keys;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(25)
	  , core      = __webpack_require__(3)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 26 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(22)
	    , fn   = (__webpack_require__(3).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(24)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(28);
	
	__webpack_require__(27)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=t7.js.map