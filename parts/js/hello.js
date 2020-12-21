function hello () {
    this.initially = 
	function () {
	},
    this.react =
	function (message) {
	    let new_event = new event ();
	    let pp = new part_pin ();
	    pp.set_part_name (this.name_in_container ());
	    pp.set_pin_name ("s");
	    new_event.set_partpin (pp);
	    new_event.set_data ("Hello");
	    kernel.send (this, new_event);
	}
}

