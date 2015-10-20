import { getTransformer } from './transformer';

function buildCompiledTemplate(ast, templateKey) {
    return getTransformer().compile(ast);
};

export default buildCompiledTemplate;
