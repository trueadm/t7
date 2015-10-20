import { setTemplate, getCachingEnabled }       from './cacheControl';
import parseHtml             from './parseHtml';
import buildCompiledTemplate from './buildCompiledTemplate';

export default function createTemplate(templateKey, templateStrings, values) {
    let fullHtml = '';

    //put our placeholders around the template parts
    for (let i = 0, n = templateStrings.length; i < n; i++) {
        if (i === templateStrings.length - 1) {
            fullHtml += templateStrings[i];
        } else {
          fullHtml += templateStrings[i] + "__$props__[" + i + "]";
        }
    }
    //parse the HTML and generate ast
    const ast = parseHtml(fullHtml);
    const compiledTemplate = buildCompiledTemplate(ast, templateKey);

    if (getCachingEnabled() === false) {
        return {
          templateKey: templateKey,
          template: 'return ' + compiledTemplate
        }
    } else {
        let functionString = '"use strict";var __$props__ = arguments[0];'
            + 'var components = arguments[1];return ' + compiledTemplate;
        let template = new Function(functionString);
        setTemplate(templateKey, template);
        return template;
    }
}
