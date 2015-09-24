(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["t7"] = factory();
	else
		root["t7"] = factory();
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
	
	var _coreTransformer = __webpack_require__(3);
	
	var _coreTransformer2 = _interopRequireDefault(_coreTransformer);
	
	exports.setTransformer = _coreTransformer2['default'];
	
	var _coreParseTemplateString = __webpack_require__(8);
	
	var _coreParseTemplateString2 = _interopRequireDefault(_coreParseTemplateString);

	exports['default'] = _coreParseTemplateString2['default'];

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

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _transformersDefault = __webpack_require__(10);
	
	var _transformersDefault2 = _interopRequireDefault(_transformersDefault);
	
	var transformer = _transformersDefault2['default'];
	
	exports['default'] = {
		setTransformer: function setTransformer(newTransformer) {
			transformer = newTransformer;
		},
		getTransformer: function getTransformer() {
			return transformer;
		}
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		a: true,
		address: true,
		article: true,
		applet: true,
		aside: true,
		audio: true,
		blockquote: true,
		button: true,
		canvas: true,
		center: true,
		dd: true,
		del: true,
		dir: true,
		div: true,
		dl: true,
		dt: true,
		fieldset: true,
		figcaption: true,
		figure: true,
		footer: true,
		form: true,
		frameset: true,
		h1: true,
		h2: true,
		h3: true,
		h4: true,
		h5: true,
		h6: true,
		header: true,
		hgroup: true,
		hr: true,
		html: true,
		iframe: true,
		ins: true,
		isindex: true,
		legend: true,
		li: true,
		main: true,
		map: true,
		mark: true,
		menu: true,
		menuitem: true,
		meta: true,
		meter: true,
		nav: true,
		noframes: true,
		noscript: true,
		object: true,
		option: true,
		ol: true,
		output: true,
		p: true,
		pre: true,
		ruby: true,
		section: true,
		script: true,
		table: true,
		tbody: true,
		td: true,
		tfoot: true,
		th: true,
		thead: true,
		tr: true,
		ul: true,
		video: true,
	
		// SVG
		circle: true,
		clipPath: true,
		defs: true,
		ellipse: true,
		g: true,
		line: true,
		linearGradient: true,
		mask: true,
		path: true,
		pattern: true,
		polygon: true,
		polyline: true,
		radialGradient: true,
		rect: true,
		stop: true,
		svg: true,
		text: true,
		tspan: true
	};
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	// Attributes that have their values filled in disabled="disabled"
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports["default"] = {
		checked: true,
		compact: true,
		declare: true,
		defer: true,
		disabled: true,
		ismap: true,
		multiple: true,
		nohref: true,
		noresize: true,
		noshade: true,
		nowrap: true,
		readonly: true,
		selected: true
	};
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = parseHtml;
	
	var _parseTag = __webpack_require__(7);
	
	var _parseTag2 = _interopRequireDefault(_parseTag);
	
	var _blockElements = __webpack_require__(4);
	
	var _blockElements2 = _interopRequireDefault(_blockElements);
	
	var tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
	var empty = {};
	
	function parseHtml(html) {
		var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		options.components || (options.components = empty);
		var result = [];
		var current = undefined;
		var level = -1;
		var arr = [];
		var byTag = {};
		var inComponent = false;
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _utilT7Err = __webpack_require__(12);
	
	var _utilT7Err2 = _interopRequireDefault(_utilT7Err);
	
	var _voidTags = __webpack_require__(9);
	
	var _voidTags2 = _interopRequireDefault(_voidTags);
	
	var _fillAttrs = __webpack_require__(5);
	
	var _fillAttrs2 = _interopRequireDefault(_fillAttrs);
	
	var ATTRIBUTE_REGEX = /([\w-:]+)|('[^\']*')|("[^\"]*")/g;
	var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
	var html5Data = /(data-)/g; // TODO
	var rmultiDash = /[A-Z]/g; // TODO
	
	exports['default'] = function (tag) {
		var tokenIndex = 0;
		var key = undefined;
		var res = {
			type: 'tag',
			name: '',
			description: '',
			voidElement: false,
			attrs: {},
			children: []
		};
	
		tag.replace(ATTRIBUTE_REGEX, function (match) {
			if (tokenIndex === 0) {
				if (_voidTags2['default'][match] || tag.charAt(tag.length - 2) === '/') {
					res.voidElement = true;
				}
				if (match.indexOf(':') > 0) {
					var parts = match.split(':');
					res.name = parts[1];
					res.description = parts[0];
				} else {
					res.name = match;
				}
			} else if (tokenIndex % 2) {
				key = match;
			} else {
				res.attrs[key] = match.replace(/['"]/g, '');
			}
			tokenIndex++;
		});
	
		return res;
	};
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = parseTemplateString;
	
	var _parseHtml = __webpack_require__(6);
	
	var _parseHtml2 = _interopRequireDefault(_parseHtml);
	
	var _transformer = __webpack_require__(3);
	
	var _transformer2 = _interopRequireDefault(_transformer);
	
	function parseTemplateString(template) {
		var templateString = '';
	
		if (template.length > 1) {
			for (var _len = arguments.length, placeholders = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				placeholders[_key - 1] = arguments[_key];
			}
	
			for (var i = 0; i < template.length; i++) {
				templateString += template[i] + placeholders[i];
			}
		} else {
			templateString = template[0];
		}
	
		return _transformer2['default'].getTransformer().transform((0, _parseHtml2['default'])(templateString));
	}
	
	;
	module.exports = exports['default'];

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$keys = __webpack_require__(14)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _utilIsArray = __webpack_require__(11);
	
	var _utilIsArray2 = _interopRequireDefault(_utilIsArray);
	
	function _transform(_x) {
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
							children[i] = _transform(ast[i]);
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
							children: _transform(ast.children)
						};
					} else if (hasChildren && !hasAttrs) {
						return {
							tag: ast.name,
							children: _transform(ast.children)
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
	
	exports['default'] = {
		transform: function transform(ast) {
			return _transform(ast);
		}
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$create = __webpack_require__(13)['default'];
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(16), __esModule: true };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(21);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	module.exports = __webpack_require__(2).Object.keys;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(20)
	  , core      = __webpack_require__(2)
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
/* 18 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(17)
	    , fn   = (__webpack_require__(2).Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(19)(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(18);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(23);
	
	__webpack_require__(22)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ }
/******/ ])
});
;
//# sourceMappingURL=t7.js.map