import universalTransformer from '../transformers/universal'

let transformer = universalTransformer;

export function setTransformer(newTransformer) {
	transformer = newTransformer;
};

export function getTransformer() {
	return transformer;
};
