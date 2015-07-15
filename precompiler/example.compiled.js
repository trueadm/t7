
var foo = "world";

var example = t7.precompile({template: __330996856,templateKey: 330996856, values: [foo, "The " + foo + " is your oyster!"]});

React.render(example, document.body);

//t7 precompiled templates
;function __330996856(){"use strict";var __$props__ = arguments[0];return React.createElement('div',{},React.createElement('div',{},'Hello world ',__$props__[0],'! This works'),React.createElement('div',{},__$props__[1]))};