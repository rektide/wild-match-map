function WildMatchMap(opts){
	if(opts){
		if(opts.generator){
			var generator= opts.generator
			Object.defineProperty(this, "_generator", {
				get: function(){
					return generator
				}
			})
		}
	}
}

WildMatchMap.prototype.get= function get(key){
	var got= getter(key, !!this._generator),
	  matches= getter.call(this)
	return Object.keys(matches)
}

WildMatchMap.prototype.set= function set(key, value){
	var got= getter(key, null, value),
	  matches= getter.call(this)
}

function getter(keys, create, set){
	keys= parse(keys)
	return function(){
		var cursors= [this],
		  assign= false
		for(var i= 0; i< keys.length; ++i){
			if( set&& i+ 1=== keys.length){
				assign= true
			}
			var key= keys[i],
			  next= []
			for(var i= 0; i< cursors.length; ++i){
				if( assign){
					var old= cursors[key]
					cursors[key]= set
					continue
				}
				var el= cursors[i],
				  matches
				for(var slot in el){
					// find all matching keys for this cursor
					matches= findMatches(slot, [key])
				}
				if( matches|| create|| set){
					if(!matches){
						// placeholder
						matches= {}
					}
					if( create && !matches[key]){
						// create our match
						cursor[key]= this._generator ? this._generator() : {}
						matches[key]= true
					}
					for(var j in matches){
						if( !set){
							// get the found slot
							var match= cursor[ j]
							next.push( match)
						}else{
							cursor[ j]= set
						}
					}
				}
			}
			cursors= next
		}
		return currsors
	}
}


var ORDINAL= 0,
  POS= 1

function findMatches( slot, keys, matches){
	var added= false
	matches= matches|| {}

	var searches= []
	for(var i= 0; i< keys.length; ++i){
		searches[i]= [i, 0] // KEY-ORDINAL, POS
	}

	var nextPos
	for(var i= 0; i< slot.length; i= nextPos){
		var slotChar= slot[ i],
		  wildSlot= slotChar=== "*"
		nextPos= wildSlot ? nonWild(slot, i+ 1) : i+ 1
		var nextChar= slot[ nextPos]

		for(var j= 0; j< searches.length; ++j){
			var search= searches[ j]
			if( !search){
				continue
			}
			var key= keys[ search[ ORDINAL]],
			  pos= search[ POS],
			  keyChar= key[ pos],
			  wildKey= keyChar=== "*"

			if( slotChar=== "*"){
				// if slot ends with *, match survivors
				if(nextChar === undefined){
					searches[ j]= null
					matches[ key]= true
					added= true
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
				}
			}else if( keyChar== slotChar || wildKey){
				// alternative searches are already launched for other wildKeys
				++search[ POS]
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
		var key= searches[ i][ ORDINAL]
		added= true
		matches[ key]= true
	}
	return added? matches: null
}


function nonWild(str, n){
	n= n|| 0
	while( str[ n]=== "*")
		++n
	return n
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

WildMatchMap.prototype.clear= function(){
	for(var key in this){
		this.delete(key)
	}
}

WildMatchMap.prototype.delete= function(key){
	delete this[key]
}

WildMatchMap.prototype.entries= function(){
	return Object.keys(this).map(function(val, key){
		return [key, val]
	})
}

WildMatchMap.prototype.forEach= function(fn, thisArg){
}

WildMatchMap.prototype.has= function(key){
	return this[key] !== undefined
}

WildMatchMap.prototype.keys= function(){
	return Object.keys(this)
}

WildMatchMap.prototype.values= function(){
	return Object.keys(this).map(function(val){return val})
}

Object.defineProperty(WildMatchMap, Symbol.species, {
	get: function(){
		return WildMatchMap
	}
})


module.exports= WildMatchMap
