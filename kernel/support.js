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


// support functions that do work with/to the "kind" class
//

// support functions that do work with/to the "node" class
//



// support functions that do work with/to the "wire" class
//
// external function install_source ((self wire), (? name), (? name))
// external function install_destination ((self wire), (? name), (? name))

function install_source (self part_name pin_name) {
    let s = new source ();
    s.set_part_name (part_name);
    s.set_pin_name (pin_name);
    self.push (s);
}

function install_destination (self part_name pin_name) {
    let d = new destination ();
    d.set_part_name (part_name);
    d.set_pin_name (pin_name);
    self.push (d);
}



// support functions that do work with/to the "dispatcher" class
//
// external function memo_node ((self dispatcher) node)
// external function set_top_node ((self dispatcher) node)
// deprecated?: external function create_top_event ((self dispatcher) name value)

function memo_node (self, n) {
    self.all-parts ().push (n);
}

function set_top_node (self, n) {
    self.set_top_node (n);
}


function 
function 
function 
function 
// various left-overs
//
