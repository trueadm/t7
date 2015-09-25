import parseTemplateString from './parseTemplateString';

export default function createInstance() {
    //TODO
    let instance = {
        _components: {},
        _precompile: false,
        setPrecompile: precompile => { this._precompile = precompile },
        getPrecompile: () => { return this._precompile; },
        setComponent: () => null,
        getComponent: () => null,
    };
    return parseTemplateString.bind(instance);
}
