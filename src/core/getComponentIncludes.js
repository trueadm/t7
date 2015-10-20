//typically, someone will use the syntax #include ${{components}};
//they can use a new line instead of a semi-colon and (for now) even omit the #include
//so its short-hand is #${{components}}
export default function getComponentIncludes(firstTemplate, firstValue) {
    if(firstTemplate.indexOf('#') !== -1 && typeof firstValue === "object") {
        return firstValue;
    }
    return null;
}
