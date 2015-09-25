import parseHtml			from './parseHtml';
import createTemplateKey	from './createTemplateKey';
import { getTemplate }		from './cacheControl';
import createTemplate		from './createTemplate';

export default function parseTemplateString(templateStrings, ...values) {
	let templateToHash = templateStrings[0];

	//build the template string
    for (let i = 0; i < templateStrings.length; i++) {
      templateToHash += templateStrings[i];
    };

	//set our unique key
	let templateKey = createTemplateKey(templateToHash);
	let template = getTemplate(templateKey);

	if(template == null) {
		return createTemplate(templateKey, templateStrings, values, this);
	}

	return template;
};
