import validateElementTags from './validateElementTags';

export default (tagName) => !validateElementTags(tagName[0].toLowerCase()) && (tagName[0] === tagName[0].toUpperCase());
