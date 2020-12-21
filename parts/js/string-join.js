function string_join () {
    this.state= null,
    this.string_a = null,
    this.string_b = null,
    this.initially = 
	function () {
	    this.state = "idle";
	},
    this.react =
	function (e) {
	    // in "idle":
	    //  on "a" : string_a = e.data (); kernel.next (this, "waiting for b");
	    //  on "b" : string_b = e.data (); kernel.next (this, "waiting for a");
	    // in "waiting for a":
	    //  on "a" : string_a = e.data (); this.send_both ();
	    // in "waiting for b":
	    //  on "b" : string_b = e.data (); this.send_both ();

	    if (this.state === "idle") {
		if (e.pin () === "a") {
		    this.string_a = e.data;
		    this.state = "waiting for b";
		} else if (e.pin () == "b") {
		    this.string_b = e.data;
		    this.state = "waiting for a";
		} else {
		    fail ();
		}
	    } else if (this.state === "waiting for b") {
		if (e.pin () == "b") {
		    this.string_b = e.data;
		    this.send_both ();
		    this.state = "idle";
		} else {
		    fail ();
		}
	    } else if (this.state === "waiting for a") {
		if (e.pin () == "a") {
		    this.string_b = e.data;
		    this.send_both ();
		    this.state = "idle";
		} else {
		    fail ();
		}
	    } else {
		fail ();
	    }
	},
    this.send_both = function () {
	kernel.send (this, "c", string_a + string_b);
	kernel.next (this, "idle");
    }
}
