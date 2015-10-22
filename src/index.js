import { setTransformer }   from  './core/transformer';
import parseTemplateString  from './core/parseTemplateString';
import parseHtml  from './core/parseHtml';
import { clearTemplates, getCachingEnabled, setCachingEnabled }   from  './core/cacheControl';
import React from './transformers/react';
import Universal from './transformers/universal';
import Mithril from './transformers/mithril';

const t7 = parseTemplateString;
let templateCaching = false;

t7.setTransformer = setTransformer;
t7.clearTemplates = clearTemplates;
t7.parseHtml = parseHtml;
t7.getCachingEnabled = getCachingEnabled;
t7.setCachingEnabled = setCachingEnabled;
t7.Transformers = { React, Universal, Mithril };

export default t7;
