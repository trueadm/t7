import parseTemplateString     from './core/parseTemplateString';
import { setTransformer }      from './core/transformer';

let t7 = parseTemplateString;

t7.setTransformer = setTransformer;

export default t7;