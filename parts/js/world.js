function world () {
    this.initially = 
	function () {
	},
    this.react =
	function (message) {
	    let e = new event ();
	    let pp = new part_pin ();
	    pp.set_part_name (this.name_in_container ());
	    pp.set_pin_name ("s");
	    e.set_partpin (pp);
	    e.set_data ("World");
	    kernel.send (this, e);
	}
}

