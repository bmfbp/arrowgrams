there are 4 main phases (build-aux is a subset of building)

1. building
2. loading
3. initializing
4. running

Confusion: Parts have a _name_ and a _class_ (_kind_ is a synonym for _class_ _[*]_).

On a diagram, we need to only show the _class_.  The _name_ is generated automatically.  When people look at a box on a diagram, they are only interested in the _kind_ of box that it is.

Programmers are used to specifying both parts, e.g. "xyz : Hello", but the name portion (xyz) is syntactic noise.

Concrete example: our simple HelloWorld example contains a part "hello".  We generate a unique name for it.  Programmers would write "hello : Hello".  In Arrowgrams, it is sufficient to say the box is "hello".  The transpiler makes this into "id247 : Hello".  _[Excrutiating detail - the generated name is the same as the pointer (address) and we never explicitly refer to the name (we don't need to).  If we make a unique instance of a part, then its name is the same as its address.]_

1. During the building phase, we collect information about Parts and create Templates (old name is "kind").

2. During the loading phase, we instantiate Parts recursively.  We must make fresh instances of each Part and each Wire, recursively (in contrast, OOP only needs fresh instances of Parts and doesn't even have the concept of Wires).  _[**]_

3. During the initialization phase, we start each Part.  The Part _might_ generate output events, but these events are only queued up, not delivered, during Initialization.

4. During the run phase, we release all outputs and loop forever looking for Parts that are ready to run.  The Dispatcher is the forever loop.

[*] I used the word Kind instead of Class, because, Class is a "general" thing.  In OOP, all objects inherit from Object.  In Arrowgrams, we are more specific - all Schematics inherit from Part and all Leaves inherit from Part.  There is only one _Kind_ of thing in arrowgrams - a Part.  The programmer cannot redefine the class Part, whereas in OOP a programmer can define all sorts of Classes. _[I'm generalizing]_

Instantiation of Parts is the same thing as instantiating instance variables in OOP.  Nothing new here.

Instantiation of Wires is more strange.  A Wire can only refer to Parts that are contained in the same Schematic as the wire.  OOP doesn't let you say this sort of thing, without writing code to check for this condition.  Arrowgrams instantiates Wires _and_ it checks that the wires only refer to contained Parts (and "self").  The concept is simple, but the code (kernel.js) is messy because we can only use OOP (or worse) techniques.

In a production version of Arrowgrams, the Template for a Part (Kind) would contain real pointers from wires back to Parts, but in this bootstrap version, we use strings instead of pointers (less efficient ;  kinda like duck-typing, but safe duck-typing, since this duck-typing is hidden and the programmer is never exposed to it.  The Programmer only sees Parts and Wires.). 
