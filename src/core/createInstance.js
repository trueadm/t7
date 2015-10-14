import parseTemplateString from './parseTemplateString';

export default function createInstance() {
    let _components = {};
    let _precompile = false;

    function instance(...args) {
        return parseTemplateString.apply(instance, args);
    }
    instance.setPrecompile = function setPrecompile(precompile) {
        _precompile = precompile;
    }
    instance.getPrecompile = function getPrecompile() {
        return _precompile;
    }
    instance.register = function register(name, component) {
        _components[name] = component;
    }
    instance.load = function load(name) {
        return _components[name];
    }
    return instance;
}
