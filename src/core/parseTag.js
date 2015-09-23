let attrRE = /([\w-:]+)|['"]{1}([^'"]*)['"]{1}/g;

let lookup = Object.create(null);
lookup.area = true;
lookup.base = true;
lookup.br = true;
lookup.col = true;
lookup.embed = true;
lookup.hr = true;
lookup.img = true;
lookup.input = true;
lookup.keygen = true;
lookup.link = true;
lookup.menuitem = true;
lookup.meta = true;
lookup.param = true;
lookup.source = true;
lookup.track = true;
lookup.wbr = true;

export default function parseTag(tag) {
    let i = 0;
    let key;
    let res = {
        type: 'tag',
        name: '',
        description: '',
        voidElement: false,
        attrs: {},
        children: []
    };

    tag.replace(attrRE, function (match) {
        if (i % 2) {
            key = match;
        } else {
            if (i === 0) {
                if (lookup[match] || tag.charAt(tag.length - 2) === '/') {
                    res.voidElement = true;
                }
                if(match.indexOf(":") > 0) {
                    let parts = match.split(":");
                    res.name = parts[1];
                    res.description = parts[0];
                } else {
                    res.name = match;
                }
            } else {
                res.attrs[key] = match.replace(/['"]/g, '');
            }
        }
        i++;
    });

    return res;
};
