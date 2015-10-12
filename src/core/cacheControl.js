let templateCache = {};

export function getTemplate(key) {
    return templateCache[key];
};
export function setTemplate(key, template) {
    templateCache[key] = template;
};
export function clearTemplates() {
    templateCache = {};
};
