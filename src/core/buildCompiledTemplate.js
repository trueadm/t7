import { getTransformer } from './transformer';

export default function buildCompiledTemplate(ast, templateKey, t7instance) {
    return getTransformer().compile(ast);
};
