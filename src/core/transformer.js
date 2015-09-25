import defaultTransformer from '../transformers/default'

let transformer = defaultTransformer;

export function setTransformer(newTransformer) {
	transformer = newTransformer;
};

export function getTransformer() {
	return transformer;
};
