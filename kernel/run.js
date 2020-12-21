// runtime loader (not part of the kernel)
fs = require ("fs");
function load_schematic (filename) {
    fs.readFile (filename, function (err, text) {
	if (err) throw err;
	let obj = JSON.parse (text);
	for item in obj {
	    kindTable[item.name] = item;
	}
}
