let templateCache = {};
let cachingEnabled = true;

export function getTemplate(key) {
    return templateCache[key];
};
export function setTemplate(key, template) {
    templateCache[key] = template;
};
export function clearTemplates() {
    templateCache = {};
};
export function getCachingEnabled() {
    return cachingEnabled;
}
export function setCachingEnabled(_cachingEnabled) {
    cachingEnabled = _cachingEnabled;
}
