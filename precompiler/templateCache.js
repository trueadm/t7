
var caches = {};

var templateCache = {
  get: function(templateKey) {
    return caches[templateKey];
  },
  set: function(templateKey, template) {
    caches[templateKey] = template;
  },
  clear: function() {
    caches = {};
  },
  generateSource: function() {
    var source = [];
    for(var key in caches) {
      source.push(";function __" + key + "(){" + caches[key] + "};");
    }
    return source.join("\n");
  }
};

module.exports = templateCache;
