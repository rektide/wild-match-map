function WildMatchMap(opts){
}

WildMatchMap.prototype.get= function get(key){
	var getter = WildMatchMap.getter(key)
	return getter.call(this)
}

WildMatchMap.getter= function(keys){
	keys= parse(keys)
	return function(){
		var cursor= this,
		  matches= {}
		for(var i of keys){
			var key= keys[i]
		}
		return matches
	}
}


var ORDINAL= 0,
  POS= 1

function findMatches( slot, keys, matches){
	matches= matches|| {}

	var searches= []
	for(var i= 0; i< keys.length; ++i){
		searches[i]= [i, 0] // KEY-ORDINAL, POS
	}

	var nextPos
	for(var i= 0; i< slot.length; i= nextPos){
		var slotChar= slot[ i],
		  wildSlot= slotChar=== "*"
		nextPos= wildSlot ? nonWild(slot, i+ 1) : i+ 1,
		var nextChar= slot[ nextPos]

		for(var j= 0; j< searches.length; ++j){
			var search= searches[ j],
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
					continue
				}

				// more chars to match; duplicate this search for all places the next character might begin
				var made= null
				for(var k= pos, k< key.length; ++k){
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
		matches[ key]= true
	}
	return matches
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

module.exports= WildMatchMap
