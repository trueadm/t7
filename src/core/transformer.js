import defaultTransformer from '../transformers/default'

let transformer = defaultTransformer;

export default {
	setTransformer(newTransformer) {
		transformer = newTransformer;
	},
	getTransformer() {
		return transformer;
	}
};
