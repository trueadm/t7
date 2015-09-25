export default function createTemplateKey(tpl) {
  let hash = 0;
  if (tpl.length == 0) {
      return tpl;
  }
  for (let i = 0, len = tpl.length; i < len; i++) {
    let chr = tpl.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};
