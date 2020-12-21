// suggestion on how this might appear
// other ideas welcome...
// another idea: if everything were loaded into an index.html file, then
//  the parts could be simple .js files included via
//  <script src=".../hello.js"> </script>x
var leaf_parts = [
    { name: "hello",
      initially: function () { },
      react: function (e) {
	  let new-event = new event ();
	  let pp = new part_pin ();
	  pp.set_part_name (this.name_in_container ());
	  pp.set_pin_name ("s");
	  e.set_partpin (pp);
	  e.set_data ("Hello");
	  kernel.send (this, e);
      }
    },
    { name: "world",
      initially: function () {	},
      react: function (e) {
	  let new-event = new event ();
	  let pp = new part_pin ();
	  pp.set_part_name (this.name_in_container ());
	  pp.set_pin_name ("s");
	  e.set_partpin (pp);
	  e.set_data ("World");
	  kernel.send (this, e);
      }
    },
    {
	name : "string-join",
	state : null,
	string_a : null,
	string_b : null,
	initially : function () {
	    this.state = "idle";
	},
	react : function (e) {
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
	send_both : function () {
	    kernel.send (this, "c", string_a + string_b);
	    kernel.next (this, "idle");
	}
    }
];
