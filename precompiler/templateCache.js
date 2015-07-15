
var caches = {};

var templateCache = {
  store: function(templateKey, funcId, template) {
    caches[templateKey] = {
      funcId: funcId,
      template: template
    };
  },
  clear: function() {
    caches = {};
  },
  generateSource: function() {
    var source = [];
    for(var key in caches) {
      source.push(";function __" + caches[key].funcId + "(){" + caches[key].template + "};");
    }
    return source.join("\n");
  }
};

module.exports = templateCache;
