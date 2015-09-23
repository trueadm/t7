import defaultTransformer from '../transformers/default/index'

let transformer = defaultTransformer;

export default {
    setTransformer(newTransformer) {
        transformer = newTransformer;
    },
    getTransformer() {
        return transformer;
    }
};
