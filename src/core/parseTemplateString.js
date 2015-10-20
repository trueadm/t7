import parseHtml			from './parseHtml';
import createTemplateKey	from './createTemplateKey';
import { getTemplate }		from './cacheControl';
import createTemplate		from './createTemplate';
import getComponentIncludes from './getComponentIncludes';

export default function parseTemplateString(templateStrings, ...values) {
	let templateToHash = templateStrings[0];
	let components = getComponentIncludes(templateStrings[0], values[0]);

	//build the template string
    for (let i = 0; i < templateStrings.length; i++) {
      templateToHash += templateStrings[i];
    };

	//set our unique key
	let templateKey = createTemplateKey(templateToHash);
	let template = getTemplate(templateKey);

	if(template == null) {
		return createTemplate(templateKey, templateStrings, values)(values, components);
	}

	return template(values, components);
};
