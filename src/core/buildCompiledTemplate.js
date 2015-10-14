import { getTransformer } from './transformer';

function buildCompiledTemplate(ast, templateKey, t7instance) {
    return getTransformer().compile(ast);
};

export default buildCompiledTemplate;
