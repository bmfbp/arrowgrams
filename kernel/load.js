// runtime loader (not part of the kernel)
fs = require ("fs");
function load_schematic (filename) {
    let top_schematic = "";
    fs.readFile (filename, function (err, text) {
	if (err) throw err;
	let obj = JSON.parse (text);
	for (item in obj) {
	    kindTable[item.name] = item;
	    if (item.itemKind === "graph") {
		// parts are emitted in reverse order
		// - top schematic is the last part emitted
		top_schematic = item.name;  // overwrite, leaving top-most schematic
	    }
	}
    })
}

