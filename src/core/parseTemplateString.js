import parseHtml    from './parseHtml';
import transformer  from './transformer';

export default function parseTemplateString(template, ...placeholders) {
    let templateString = '';

    if(template.length > 1) {
        for(let i = 0; i < template.length; i++) {
            templateString += template[i] + placeholders[i];
        }
    } else {
        templateString = template[0];
    }
    let ast = parseHtml(templateString);

    return transformer.getTransformer().transform(ast);
};
