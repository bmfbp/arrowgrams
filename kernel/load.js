// convert incoming object into a data structure
// here, we just want to convert leaves and graphs into templates + instantiation_templates
function arrowgrams_build (item) {
    if (item.itemKind === "leaf") {
	build_leaf (item);
    } else if (item.itemKind == "graph") {
	build_schematic (item);
    } else {
	throw `can't happen arrowgrams_build ${item}`;
    }
}

function build_leaf (item) {
    // example     {"itemKind":"leaf","name":"string-join","inPins":["a","b"],"outPins":["c","error"],"kind":"string-join","filename":"$\/parts\/js\/.\/string-join.lisp"},
    let templateName = item.kind;
    let inpinsArray = item.inPins;
    let outpinsArray = item.outPins;
    let filename = expand_parts_directory (item.filename);
}

function build_schematic (item) {
}

// helpers
function expand_parts_directory (fname) {
    // replace $ in fname string with parts directory
    // for now, don't do anything - parts will be hard-coded
    return fname;
}
