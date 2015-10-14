import t7Err             from '../util/t7Err';


let attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
let html5Data = /(data-)/g; // TODO
let rmultiDash = /[A-Z]/g; // TODO

import validNamespaces   from '../util/validNamespaces';

/**
 * Process attributes
 *
 * @param {String} key
 * @param {String} value
 * @param {Object} res
 */

function processAttributes(key, value, res) {

			// FIX ME! This doesn't handle HTML5 -* data, and dataset attribute correctly.
			
			// FIX ME! This doesn't handle boolean attributes / properties correctly. Overloaded booleans are not counted etc.

		  if (key !== 'xmlns') {
		      res.attrs[key] = value;
		  } else {

			  // validate namespaces
		      if (validNamespaces(value)) {
		          res.attrs[key] = value;
		      } else {
  		 
		  // TODO: Should this throw an error ??
				  
		//		t7Err('t7', value + ' is not a valid namespace');  
			  }
		  }		 			

			
}

export default processAttributes;