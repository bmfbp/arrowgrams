// 38 functions needed to support kernel.js
// syntax is "external function z ((self y) (? a) (? b) (? c) ...)"
// y is a type - the type of the "self" object
// z is the name of the method
// a b c ... are other parameter types
// ? are parameter names (to be chosen by implementor)

// FYI: this is lisp-inspired syntax
// FYI: methods in Lisp are not declared in the class, but separately
// FYI: in Lisp methods, the first arg is the Object self

// external function ensure_kind_defined ((self part_definition))
// external function refers_to_selfQ ((self source))
// external function refers_to_selfQ ((self destination))
// external function install_source ((self wire), (? name), (? name))
// external function install_destination ((self wire), (? name), (? name))
// external function install_input_pin ((self kind), (? name))
// external function install_output_pin ((self kind), (? name))
// external function install_wire ((self kind), (? wire))
// external function install_part ((self kind), (? name), (? kind), (? node_class))
// external function parts ((self kind))
// external function install_class ((self kind), (? node_class))
// external function ensure_part_not_declared ((self kind), (? name))
// external function ensure_valid_input_pin ((self kind), (? name))
// external function ensure_valid_output_pin ((self kind), (? name))
// external function ensure_input_pin_not_declared ((self kind), (? name))
// external function ensure_output_pin_not_declared ((self kind), (? name))
// external function find_wire_for_source ((self kind), (? name), (? name))
// external function find_wire_for_self_source ((self kind), (? name))
// external function clear_input_queue ((self node))
// external function clear_output_queue ((self node))
// external function install_node ((self node), (? node))
// external function initially ((self node))
// external function send ((self node), (? event))
// external function display_output_events_to_console_and_delete ((self node))
// external function get_output_events_and_delete ((self node))
// external function has_no_containerQ ((self node))
// external function has_inputs_or_outputsQ ((self node))
// external function childrenQ ((self node))
// external function flagged_as_busyQ ((self node))
// external function dequeue_input ((self node))
// external function input_queueQ ((self node))
// external function enqueue_input ((self node), (? event))
// external function enqueue_output ((self node), (? event))
// external function react ((self node), (? event))
// external function node_find_child ((self node), (? name))
// external function memo_node ((self dispatcher), (? node))
// external function set_top_node ((self dispatcher), (? node))
// external function create_top_event ((self dispatcher), (? name), (? value))

// decisions:
// support.js can define any data structures that it needs (invisible to kernel)


// documentation:
// FYI: in general "ensure" means check, if OK return, else crash (throw, etc.)
//  ensure is not production-friendly,
//     but a stub-out of an error check that should be expanded
// FYI: in general "install" means add given item to a collection
// FYI: support.js functions affect the attributes of classes defined in kernel.js (kernel.scl)


// install-initially-function supplied by part
// install-react-function supplied by part

function install_wire (kind, wire) { kind.wires.push (wire); }

function install_part (self, name, kind, node_class) {
    let p = new part_definition ();
    p.part_name = name.tolowercase ();
    p.part_kind = kind;
    self.parts.push (p);
}

function kind_find_part (self, name) {
    for (p in self.parts) {
	if (streq (p.part_name, name)) {
	    return p;
	}
    }
    throw "INTERNAL ERROR: kind_find_part";
}

function ensure_part_not_declared (self, name) {
    for (part in self.parts) {
	if (streq (part.part_name, name)) {
	    throw `${part.part_name} already declared in ${self.kind_name}`;
	}
    }
}

function ensure_valid_input_pin (self, name) {
    for (pin_name in self.input_pins) {
	if (streq (pin_name, name)) {
	    return true;
	}
    }
    throw `${name} is not an input pin of ${self.kind_name}`;
}

function ensure_valid_output_pin (self, name) {
    for (pin_name in self.output_pins) {
	if (streq (pin_name, name)) {
	    return true;
	}
    }
    throw `${name} is not an output pin of ${self.kind_name}`;
}

function ensure_input_pin_not_declared (self, name) {
    for (pin_name in self.input_pins) {
	if (streq (pin_name, name)) {
	    throw `${name} already declared as an input pin in ${self.kind_name}`;
	}
    }
    return true;
}
function ensure_output_pin_not_declared (self, name) {
    for (pin_name in self.output_pins) {
	if (streq (pin_name, name)) {
	    throw `${name} already declared as an output pin in ${self.kind_name}`;
	}
    }
    return true;
}

function refers_to_selfQ (self) {
    if (streq (self.part_name, "self")) {
	return true;
    } else {
	return false;
    }
}

// support functions that do work with/to the "wire" class
//
// external function install_source ((self wire), (? name), (? name))
// external function install_destination ((self wire), (? name), (? name))

function install_source (self, part_name, pin_name) {
    let s = new source ();
    s.part_name = part_name.tolowercase ();
    s.pin_name = pin_name.tolowercase ();
    self.source.push (s);
}

function install_destination (self,part_nam, pin_name) {
    let d = new destination ();
    d.part_name = part_name.tolowercase ();
    d.pin_name = pin_name.tolowercase ();
    self.destinations.push (d);
}
	
// support functions that do work with/to the "kind" class
//
// external function install_input_pin ((self kind), (? name))
// external function install_output_pin ((self kind), (? name))
// external function install_wire ((self kind), (? wire))
// external function install_part ((self kind), (? name), (? kind), (? node_class))
// external function parts ((self kind))
// external function install_class ((self kind), (? node_class))
// external function ensure_part_not_declared ((self kind), (? name))
// external function ensure_valid_input_pin ((self kind), (? name))
// external function ensure_valid_output_pin ((self kind), (? name))
// external function ensure_input_pin_not_declared ((self kind), (? name))
// external function ensure_output_pin_not_declared ((self kind), (? name))
// external function find_wire_for_source ((self kind), (? name), (? name))
// external function find_wire_for_self_source ((self kind), (? name))


// support functions that do work with/to the "node" class
//
// external function clear_input_queue ((self node))
// external function clear_output_queue ((self node))
// external function install_node ((self node), (? node))
// external function initially ((self node))
// external function send ((self node), (? event))
// external function display_output_events_to_console_and_delete ((self node))
// external function get_output_events_and_delete ((self node))
// external function has_no_containerQ ((self node))
// external function has_inputs_or_outputsQ ((self node))
// external function childrenQ ((self node))
// external function flagged_as_busyQ ((self node))
// external function dequeue_input ((self node))
// external function input_queueQ ((self node))
// external function enqueue_input ((self node), (? event))
// external function enqueue_output ((self node), (? event))
// external function react ((self node), (? event))
// external function node_find_child ((self node), (? name))

function clear_input_queue (self) {
    self.input_queue = [];
}

function clear_output_queue (self) {
    self.output_queue = [];
}

function display_output_events_to_console_and_delete (self) {
    for (e in self.output_queue) {
	console.log (e);
    }
}

function flagged_as_busyQ (self) {
    if (self.busy_flag) {
	return true;
    } else {
	return false;
    }
}

function childrenQ (self) {
    if (self.children.length > 0) {
	return true;
    } else {
	return false;
    }
}

function has_no_containerQ (self) {
    if (self.container) {
	return true;
    } else {
	return false;
    }
}

function send (self, e) {
    self.output_queue.qpush (e);
}

function get_output_events_and_delete (self) {
    let outputs = self.output_queue;
    self.output_queue = [];
    return outputs;
}

function dequeue_input (self) {
    return self.input_queue.qpop ();
}

function input_queueQ (self) {
    if (self.input_queue.length > 0) {
	return true;
    } else {
	return false;
    }
}

function has_inputs_or_outputsQ (self) {
    if ((self.input_queue.length > 0) || (self.output_queue.length > 0)) {
	return true;
    } else {
	return false;
    }
}

function install_child (self, name, child) {
    let pinstance = new named_part_instance ();
    pinstance.instance_name = name.tolower ();
    pinstance.instance_node = child;
    self.children.push (pinstance);
}

function enqueue_input (self, e) {
    self.input_queue.qpush (e);
}

function enqueue_output (self, e) {
    self.output_queue.qpush (e);
}

function find_wire_for_source (self, part_name, pin_name) {
    // in this version, wires were prematurely optimized
    //   to contain a list of sources and
    //              a list of destinations
    // (I think that, later, I made wires have a single source and (still)
    //  have multiple destinations)
    for (w in self.wires) {
	for (s in w.sources) {
	    if ( (streq ("self", s.part-name)) || (streq (part_name, s.part_name))
		 &&
		 streq (s.pin_name, pin_name) ) {
		return w;
	    }
	}
    }
    let no_connection_wire = new wire ();
    return no_connection_wire;
}

function find_wire_for_self_source (self, pinname) {
    return find_wire_for_source (self, "self", pinname);
}

function node_find_child (self, name) {
    for (p in self.children) {
	if (streq (name, p.instance_name)) {
	    return p;
	}
    }
    throw `Can't happen node_find_child (${self}, ${name})`;
}

// support functions that do work with/to the "dispatcher" class
//
// external function memo_node ((self dispatcher) node)
// external function set_top_node ((self dispatcher) node)
// deprecated?: external function create_top_event ((self dispatcher) name value)

function memo_node (self, n) {
    self.all_parts.push (n);
}

function set_top_node (self, n) {
    self.top_node = n;
}

function declare_finished (dispatcher) {
    // no op
}


// miscellaneous
function ensure_kind_defined (self, part_definition) {
    if (isKind (self.part_kind)) {
	// ok
    } else {
	throw `kind ${self.part_name} is not defined`;
    }
}

// helpers
function streq (s1, s2) {
    return s1.tolowercase () === s2.tolowercase ();
}

var kindTable = [];

function isKind (k) {
    if (undefined !== kindTable.k) {
	return true;
    } else {
	return false;
    }
}
