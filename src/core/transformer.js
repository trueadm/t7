import defaultTransformer from '../transformers/default'

let transformer = defaultTransformer;

export setTransformer(newTransformer) {
	transformer = newTransformer;
};

export getTransformer() {
	return transformer;
};
