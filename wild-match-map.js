function WildMatchMap(opts){
	if(opts){
		if(opts.generator){
			var generator= opts.generator
			if(generator === true){
				generator= function(){
					return {}
				}
			}
			Object.defineProperty(this, "_generator", {
				get: function(){
					return generator
				}
			})
		}
	}
}

Object.defineProperty(WildMatchMap.prototype, "get", {
	value: function get(key){
		var got= getter(key, !!this._generator),
		  matches= got.call(this)
		return matches
	}
})

Object.defineProperty(WildMatchMap.prototype, "set", {
	value: function set(key, value){
		var got= getter(key, null, value),
		  matches= getter.call(this)
	}
})

/**
  For a list of keys, find all slots 
*/
function getter(keys, create, set){
	keys= parse(keys)
	return function(){
		var cursors= [this],
		  lastSet= false
		for(var i= 0; i< keys.length; ++i){
			if( set&& i+ 1=== keys.length){
				lastSet= true
			}
			var key= keys[i],
			  next= []
			for(var j= 0; j< cursors.length; ++j){
				var cursor= cursors[j],
				  matches= {}
				for(var slot in cursor){
					// find all matching keys for this cursor
					if(findMatch(slot, [key])){
						matches[slot]= true
					}
				}
				if( matches|| create|| set){
					if(!matches){
						// placeholder
						matches= {}
					}
					if( create && !matches[key]){
						// create our exact match
						var match= this._generator? this._generator(): {}
						cursor[ key]= match
						matches[ key]= true
					}
					for(var k in matches){
						if( !lastSet){
							// get the found slot
							var match= cursor[ k]
							next.push( match)
						}else{
							cursor[ k]= set
						}
					}
				}
			}
			cursors= next
		}
		return cursors
	}
}

function findMatches(){
}


var ORDINAL= 0,
  POS= 1,
  NEXT= 2

/**
  Return a key-map of keys that match the slot
  @param slot - slot name to test against
  @param keys - array of expressions to test with
*/
function findMatch( slot, keys, matches){
	var added= false
	matches= matches|| {}

	// searches are spun up for each key, and duplicated if necessary
	var searches= []
	for(var i= 0; i< keys.length; ++i){
		searches[i]= [i, 0, null] // KEY-ORDINAL, POS, NEXT
	}

	// iterate character by character through the slot
	var nextSlot
	for(var i= 0; i< slot.length; i= nextSlot){
		// pull out the present slot character
		var slotChar= slot[ i],
		  wildSlot= slotChar=== "*"
		// if the slot character is a wildcard, find the next meaningful char (& distance to)
		nextSlot= wildSlot ? nonWild(slot, i+ 1) : i+ 1
		var nextChar= slot[ nextSlot]

		// iterate through all ongoing searches
		for(var j= 0; j< searches.length; ++j){
			var search= searches[ j]
			if( !search){
				// search has terminated
				continue
			}
			var ordinal= search[ ORDINAL],
			  key= keys[ ordinal],
			  pos= search[ POS],
			  keyChar= key[ pos],
			  wildKey= keyChar=== "*"

			if( wildSlot){
				// if slot _ends_ with *, match all remaining survivors
				if( nextChar=== undefined){
					if( !matches[ key]){
						matches[ key]= true
						added= true
					}
					searches[ j]= null
					continue
				}

				// more chars to match; duplicate this search for all places the next character might begin
				var made= null
				for(var k= pos; k< key.length; ++k){
					var futureChar= key[k]
					if( futureChar=== nextChar|| futureChar=== "*"){
						var last= made!== null ? searches[ made] : undefined
						if( last=== undefined){
							// start this search on this next matched char
							search[ POS]= k
							made= j
						}else if(last && last[ POS]+ 1=== k){
							// we just made this match last char, forward it
							++search[ made][ POS]
						}else{
							// make new 
							var newSearch= search.slice( 0)
							newSearch[ POS]= k
							made= searches.push( newSearch)- 1
						}
					}
					
				}
				if( made=== null){
					// there's more chars on slot, but nothing remaining in the key that will match
					searches[ j]= null
					continue
				}else{
				}
			}else if( wildKey){
				var nextPos= search[ NEXT]
				if( nextPos=== null){
					// first time here, attempt to find nextKey
					nextPos= nonWild( key, pos+ 1)

					if( nextPos>= key.length){
						// wildcard is complete, done with search
						if( !matches[key]){
							matches[key]= true
							added= true
						}
						searches[j]= null
						continue
					}
					search[ NEXT]= nextPos
				}
				var nextKey= key[ nextPos]
				if( nextKey=== slotChar){
					// fork new search if we match
					var copy= [ search[ ORDINAL], search[ NEXT], null]
					searches.push(copy)
				}
			}else if( keyChar== slotChar){
				++search[ POS]
			}else if(pos >= key.length){
				throw new Error("We should already have matched") // and cleaned up the search
			}else{
				// couldn't match
				searches[ j]= null
			}
		}
	}
	for(var i= 0; i< searches.length; ++i){
		if( !searches[i]){
			continue
		}
		var search= searches[ i],
		  ordinal= searches[ i][ ORDINAL],
		  key= keys[ordinal],
		  pos= search[ POS]
		if( pos< key.length){
			continue
		}
		if( !matches[ key]){
			matches[ key]= true
			added= true
		}
	}
	return added? matches: null
}


function nonWild(str, n){
	n= n|| 0
	while( str[ n]=== "*")
		++n
	return n
}

/**
  @param chr - character to find
  @param str - str to search in
  @param n - start looking in str from this position
*/
function nextMatches(chr, str, n){
	var positions= [],
	  prev
	for(; n< str.length; ++n){
		var futureChar= str[n]
		if( futureChar=== chr|| futureChar=== "*"){
			if( prev=== n){
				// duplicate match to previous, update the previous
				++positions[ positions.length- 1]
			}else{
				positions.push(n)
				prev= n+ 1
			}
		}
	}
	return positions
}

function parse(keyString, sep){
	if(keyString instanceof Array){
		return keyString
	}
	sep= sep|| ":"
	var keys= keyString.split(sep)
	return keys
}

Object.defineProperty(WildMatchMap.prototype, "size", {
	get: function(){
		return Object.keys(this).length
	}
})

Object.defineProperty(WildMatchMap.prototype, "clear", {
	value: function(){
		for(var key in this){
			this.delete(key)
		}
	}
})

Object.defineProperty(WildMatchMap.prototype, "delete", {
	value: function del(key){
		delete this[key]
	}
})

Object.defineProperty(WildMatchMap.prototype, "entries", {
	value: function entries(){
		return Object.keys(this).map(function(val, key){
			return [key, val]
		})
	}
})

Object.defineProperty(WildMatchMap.prototype, "forEach", {
	value: function forEach(fn, thisArg){
	}
})

Object.defineProperty(WildMatchMap.prototype, "has", {
	value: function has(key){
		return this[key] !== undefined
	}
})

Object.defineProperty(WildMatchMap.prototype, "keys", {
	value: function keys(){
		return Object.keys(this)
	}
})

Object.defineProperty(WildMatchMap.prototype, "values", {
	value: function values(){
		return Object.keys(this).map(function(val){return val})
	}
})

Object.defineProperty(WildMatchMap, Symbol.species, {
	get: function(){
		return WildMatchMap
	}
})


module.exports= WildMatchMap
