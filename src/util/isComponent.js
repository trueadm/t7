import validateElementTags from './validateElementTags';

/**
 * Validate if the 'tagName' is a valid Component name
 * @param {String} tagName The name to be validated
 * @return {Boolean}
 */
export default (tagName) => !validateElementTags(tagName[0].toLowerCase()) && (tagName[0] === tagName[0].toUpperCase());
