// esa.js

function part_definition () {
    this.part_name = null,
    this.part_kind = null
}
// external function ensure_kind_defined ((self part_definition))

function named_part_instance () {
    this.instance_name = null,
    this.instance_node = null
}

function part_pin () {
    this.part_name = null,
    this.pin_name = null
}

function source () {
    this.part_name = null,
    this.pin_name = null
}
// external function refers_to_selfQ ((self source))

function destination () {
    this.part_name = null,
    this.pin_name = null
}
// external function refers_to_selfQ ((self destination))

function wire () {
    this.index = null,
    this.sources = [],
    this.destinations = []
}

// external function install_source ((self wire), (? name), (? name))
// external function install_destination ((self wire), (? name), (? name))
function add_source (self, name, name) {
    self.install_source (part, pin);
};
function add_destination (self, name, name) {
    self.install_destination (part, pin);
};

function kind () {
    this.kind_name = null,
    this.input_pins = null,
    this.self_class = null,
    this.output_pins = null,
    this.parts = null,
    this.wires = null
}
// external function install_input_pin ((self kind), (? name))
// external function install_output_pin ((self kind), (? name))
function add_input_pin (self, name) {
    self.ensure_input_pin_not_declared (name);
    self.install_input_pin (name);
};
function add_output_pin (self, name) {
    self.ensure_output_pin_not_declared (name);
    self.install_output_pin (name);
};
function add_part (self, name, kind, node_class) {
    self.ensure_part_not_declared (nm);
    self.install_part (nm, k, nclass);
};
function add_wire (self, wire) {
    (function () {
	for (const s in w.sources ()) {
	    self.ensure_valid_source (s);
	};
    }) ();
    (function () {
	for (const dest in w.destinations ()) {
	    self.ensure_valid_destination (dest);
	};
    }) ();
    self.install_wire (w);
};
// external function install_wire ((self kind), (? wire))
// external function install_part ((self kind), (? name), (? kind), (? node_class))
// external function parts ((self kind))
// external function install_class ((self kind), (? node_class))
// external function ensure_part_not_declared ((self kind), (? name))
// external function ensure_valid_input_pin ((self kind), (? name))
// external function ensure_valid_output_pin ((self kind), (? name))
// external function ensure_input_pin_not_declared ((self kind), (? name))
// external function ensure_output_pin_not_declared ((self kind), (? name))
function ensure_valid_source (self, source) {
    if (s.refers_to_selfQ ()) {
	self.ensure_valid_input_pin (s.pin_name ());
    } else {
	{ /*let*/
	    let p = self.kind_find_part (s.part_name ());
	    p.ensure_kind_defined ();
	    p.part_kind ().ensure_valid_output_pin (s.pin_name ());
	} /* end let */
    }
};
function ensure_valid_destination (self, destination) {
    if (dest.refers_to_selfQ ()) {
	self.ensure_valid_output_pin (dest.pin_name ());
    } else {
	{ /*let*/
	    let p = self.kind_find_part (dest.part_name ());
	    p.ensure_kind_defined ();
	    p.part_kind ().ensure_valid_input_pin (dest.pin_name ());
	} /* end let */
    }
};
function loader (self, name, node, dispatcher) {
    { /*let*/
	let clss = self.self_class ();
	{ let inst = new clss;
	  inst.clear_input_queue ();
	  inst.clear_output_queue ();
	  inst.kind_field = self;
	  inst.container = my-container;
	  inst.name_in_container = my-name;
	  (function () {
	      for (const part in self.parts) {
		  { /*let*/
		      let part_instance = part.part_kind ().loader (part.part_name, inst, dispatchr);
		      inst.add_child (part.part_name, part_instance);
		  } /* end let */
	      };
	  }) ();
	  dispatchr.memo_node (inst);
	  return inst;}

    } /* end let */
};
// external function find_wire_for_source ((self kind), (? name), (? name))
// external function find_wire_for_self_source ((self kind), (? name))

function node () {
    this.input_queue = null,
    this.output_queue = null,
    this.kind_field = null,
    this.container = null,
    this.name_in_container = null,
    this.children = null,
    this.busy_flag = null
}
// external function clear_input_queue ((self node))
// external function clear_output_queue ((self node))
// external function install_node ((self node), (? node))
function add_child (self, name, node) {
    self.install_child (nm, nd);
};
function initialize (self) {
    self.initially ();
};
// external function initially ((self node))
// external function send ((self node), (? event))
function distribute_output_events (self) {
    if (self.has_no_containerQ ()) {
	self.display_output_events_to_console_and_delete ();
    } else {
	{ /*let*/
	    let parent_composite_node = self.container;
	    (function () {
		for (const output in self.get_output_events_and_delete ()) {
		    { /*let*/
			let dest = output.partpin;
			{ /*let*/
			    let w = parent_composite_node.kind_field.find_wire_for_source (output.partpin.part_name, output.partpin.pin_name);
			    (function () {
				for (const dest in w.destinations) {
				    if (dest.refers_to_selfQ ()) {
					{ let new_event = new event;
					  { let pp = new part-pin;
					    pp.part_name = parent_composite_node.name_in_container;
					    pp.pin_name = dest.pin_name;
					    new_event.partpin = pp;
					    new_event.data = output.data;
					    parent_composite_node.send (new_event);}
					}

				    } else {
					{ let new_event = new event;
					  { let pp = new part-pin;
					    pp.part_name = dest.part_name;
					    pp.pin_name = dest.pin_name;
					    new_event.partpin = pp;
					    new_event.data = output.data;
					    { /*let*/
						let child_part_instance = parent_composite_node.node_find_child (pp.part_name);
						child_part_instance.instance_node.enqueue_input (new_event);
					    } /* end let */}
					}

				    }
				};
			    }) ();
			} /* end let */
		    } /* end let */
		};
	    }) ();
	} /* end let */
    }
};
// external function display_output_events_to_console_and_delete ((self node))
// external function get_output_events_and_delete ((self node))
// external function has_no_containerQ ((self node))
function distribute_outputs_upwards (self) {
    if (self.has_no_containerQ ()) {
    } else {
	{ /*let*/
	    let parent = self.container;
	    parent.distribute_output_events ();
	} /* end let */
    }
};
function busyQ (self) {
    if (self.flagged_as_busyQ ()) {
	return true;
    } else {
	(function () {
	    for (const child_part_instance in self.children) {
		{ /*let*/
		    let child_node = child_part_instance.instance_node;
		    if (child_node.has_inputs_or_outputsQ ()) {
			return true;
		    } else {
			if (child_node.busyQ ()) {
			    return true;
			}
		    }
		} /* end let */
	    };
	}) ();
    }
    return false;
};
function readyQ (self) {
    if (self.input_queueQ ()) {
	if (self.busyQ ()) {
	    return false;
	} else {
	    return true;
	}
    }
    return false;
};
function invoke (self) {
    { /*let*/
	let e = self.dequeue_input ();
	self.run_reaction (e);
	self.distribute_output_events ();
    } /* end let */
};
// external function has_inputs_or_outputsQ ((self node))
// external function childrenQ ((self node))
// external function flagged_as_busyQ ((self node))
// external function dequeue_input ((self node))
// external function input_queueQ ((self node))
// external function enqueue_input ((self node), (? event))
// external function enqueue_output ((self node), (? event))
// external function react ((self node), (? event))
function run_reaction (self, event) {
    self.react (e);
};
function run_composite_reaction (self, event) {
    { /*let*/
	let w = true;
	if (self.has_no_containerQ ()) {
	    w = self.kind_field.find_wire_for_self_source (e.partpin.pin_name);
	} else {
	    w = self.container.kind_field.find_wire_for_source (e.partpin.part_name, e.partpin.pin_name);
	}
	(function () {
	    for (const dest in w.destinations) {
		{ let new_event = new event;
		  { let pp = new part-pin;
		    if (dest.refers_to_selfQ ()) {
			pp.part_name = dest.part_name;
			pp.pin_name = dest.pin_name;
			new_event.partpin = pp;
			new_event.data = e.data;
			self.send (new_event);
		    } else {
			if (self.childrenQ ()) {
			    pp.part_name = dest.part_name;
			    pp.pin_name = dest.pin_name;
			    new_event.partpin = pp;
			    new_event.data = e.data;
			    { /*let*/
				let child_part_instance = self.node_find_child (dest.part_name);
				child_part_instance.instance_node ().enqueue_input (new_event);
			    } /* end let */
			}
		    }}
		}

	    };
	}) ();
    } /* end let */
};
// external function node_find_child ((self node), (? name))

function dispatcher () {
    this.all_parts = [],
    this.top_node = null
}
// external function memo_node ((self dispatcher), (? node))
// external function set_top_node ((self dispatcher), (? node))
function initialize_all (self) {
    (function () {
	for (const part in self.all_parts) {
	    part.initialize ();
	};
    }) ();
};
function distribute_all_outputs (self) {
    (function () {
	for (const p in self.all_parts) {
	    p.distribute_output_events ();
	    p.distribute_outputs_upwards ();
	};
    }) ();
};
function dispatcher_run (self) {
    { /*let*/
	let done = true;
	for (;;) {
	    done = true;
	    self.distribute_all_outputs ();
	    (function () {
		for (const part in self.all_parts) {
		    if (part.readyQ ()) {
			part.invoke ();
			done = false;
			return;
		    }
		};
	    }) ();
	    if (done) {break;};
	}
    } /* end let */
};
function dispatcher_inject (self) {
    { /*let*/
	let e = self.create_top_event (pin, val);
	self.top_node.enqueue_input (e);
	self.dispatcher_run ();
    } /* end let */
};
// external function create_top_event ((self dispatcher), (? name), (? value))

function event () {
    this.partpin = null,
    this.data = null
}
