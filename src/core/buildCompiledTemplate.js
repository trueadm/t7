import { getTransformer } from './transformer';

function buildCompiledTemplate(ast, templateKey) {
    return getTransformer()(ast);
};

export default buildCompiledTemplate;
