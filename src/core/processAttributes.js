import t7Err                 from '../util/t7Err';
import validateAttributeName from '../util/validateAttributeName';

/**
 * Process attributes
 *
 * @param {String} key
 * @param {String} value
 * @param {Object} res
 */
function processAttributes(key, value, res) {

    // Throw if the value is empty
    if (!value) {
        t7Err('processAttributes()', 't7 attributes can\'t contain a empty value.');
    }

    // Do a 'quick' return if a  falsy overloaded attribute, null or undefined value
    if (value == false ||
        value == null ||
        value === undefined) {
        return;
    }

    // Deal with overloaded truthy attributes
    if (value === true) {
        value = 'true';
    }

    // validate the 'key'
    if (validateAttributeName(key)) {
        res.attrs[key] = value;
    }
}

export default processAttributes;