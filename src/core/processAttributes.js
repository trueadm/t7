import t7Err                 from '../util/t7Err';
import validateNamespaces    from '../util/validateNamespaces';
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
        t7Err('processAttributes()', 't7 attributes can\'t contain a non-empty value.');
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

    switch (key) {

        // xmlns is a special case
        case 'xmlns':
            // validate namespaces
            if (validateNamespaces(value)) {
                res.attrs[key] = value;
            } else {
                t7Err('t7', 'Assigned xml attribute does not not contain a valid namespace');
            }
            return; // faster to do a 'return' then a 'break'
        default:
            // validate the 'key'
            if (validateAttributeName(key)) {
                res.attrs[key] = value;
            }
    }
}

export default processAttributes;