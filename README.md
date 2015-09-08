# Wild Match Map

Wild Match Map is a "rendezvous" Map where keys used for get and set may have wildcards. Wildcard sets are kept intact, not resolved. Thus even a non-wildcard get might return multiple results: for this reason, gets always return a collection of results, as even if there is an exact no-wildcard set/get match, there may be a wildcard set that will also contribute.

This library was created in radical opposition to the principles of concealment that both EventEmitter and EventTarget enact: these libraries explicitly prevent knowing the bindings, EventEmitter offering to describe listeners but not not emitters, and EventTarget refusing to admit both listeners and emitters.

In comparison, Wild Match Map permits arbitrary wildcard bindings. Although not explicitly a event emitter- instead a general Map- the Map is designed to allow explorative bindings.

# Recommended Use

The normal mode to use Wild Match Map is with a {generator:function(){}} provided, that creates objects on demand when a `get` is issued. `set`, by comparison, has the potential to set unintended matches.
