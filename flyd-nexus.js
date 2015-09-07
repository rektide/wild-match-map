var flyd= require("flyd")

function FlydNexus(){
	var _watches= {}
	Object.defineProperty(this, "_watches", {
		get: function(){
			return _watches
		}
	})
}

FlydNexus.prototype.get= function get(key){
	var getter = FlydNexus.getter(key)
	return getter.call(this)
}

FlydNexus.getter= function(keys){
	if(keys instanceof String){
		keys= keys.split(":")
	}
	for(var i in keys){
		var key= keys[i]
	}
	return function(){
		var cursor= this,
		  matches= []
		for(var i of keys){
			var key= keys[i]
			}
		}
		return matches
	}
}


function(key, slot, keyF, keyL, slotF, slotL){
	if( keyL=== null&& slotL=== null){ // forward matching
		var keyChar= key[keyF],
		  slotChar= slot[slotF]
		if( keyChar=== "*"){
			// jump to end, reverse match now
			keyL= key.length- 1
		}else if( keyChar=== slotChar){
			// forward matching
			++keyF
			++slotF
		}else if( slotChar=== "*"){
			slotL= slot.length
			while(slotChar=== "*"&& slotF< slotL){
				slotChar= slot[ ++slotF]
			}
		}else{
			keyS= key.length+ 1
		}
	}else if( keyL!== null){ // reverse matching the key
		var keyChar= key[keyL]
		if(keyChar === "*"){
			keyL--
		}else if(keyChar
			
		}
	}else if( slotL!== null){ // matching wildcard key
		
	}
	if( keyS>= key.length|| slotS>= slot.length){
		done= true
	}

}

var INDEX= 0,
  POS= 1,
  WILD= 2

/// @param n - the key number to look for
function findMatches( slot, keys, matches){
	matches= matches|| {}

	var searches= []
	for(var i= 0; i< keys.length; ++i){
		searches[i]= [i, 0, null] // KEY-ORDINAL, POS, WILD
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
			var key= keys[ search[ INDEX]],
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


	for(var j= 0; j< keys.length; ++j){
		// fully check this key against the slot
		var key= keys[j],
		  keyF= 0,
		  keyL= null,
		  slotF= 0,
		  slotL= null,
		  done= false

		while(!done){
			
			keyL++
		}


		while(!done){
			if( keyL=== null&& slotL=== null){ // forward matching
				var keyChar= key[keyF],
				  slotChar= slot[slotF]
				if( keyChar=== "*"){
					
				}else if( keyChar=== slotChar){
					// forward matching
					++keyF
					++slotF
				}else if( slotChar=== "*"){
					slotL= slot.length
					while(slotChar=== "*"&& slotF< slotL){
						slotChar= slot[ ++slotF]
					}
				}else{
					keyS= key.length+ 1
				}
			}else if( keyL!== null){ // reverse matching the key
				var keyChar= key[keyL]
				if(keyChar === "*"){
					keyL--
					
				}else if(keyChar
					
				}
			}else if( slotL!== null){ // matching wildcard key
				
			}
			if( keyS>= key.length|| slotS>= slot.length){
				done= true
			}
		}
		for(var kp= 0; kp< key.length; ++kp){
			var keyChar= key[kp]
			
		}

		var key= keys[j],
		  keyChar= key[kp]

		if(keyChar === "*"){
			tails[j]= key.length
		}else if(tails[j] !== null){
			// we've had a wildcard match, backtrack
			
		}




		if(slotChar === "*"){
			tails[j]= keys[j].length
			anchors[j]= kp
		}else if(keyChar === "*"){
			
		}else if(slotChar === keyChar){
			keyPos[j]++
			if(anchors[j] !== null)
				anchors[j]= keyPos[j]
		}else{
			// backtrack
			if(tails[j] !== null){
				
			}
			keyPos[j]= null
		}
	}
	
	while(true){
		var hadWild= false
	}

	for(var pieces in o){
		pieces = parsed(slot)[0] // memoizee parse of string keys
		var hadWild= false
		for(var i = 0; i < pieces.length; ++i){
			var piece= pieces[i]
			for(var j= 0; j< keys.length; ++j){
				if(piece === ""){
					end[j]= keys[j].length
					hadWild= true
				}else if(hadWild){
					
					// just had a wildcard, now chars
					hadWild= false
					if(start[j] === null){
						continue
					}
				}else{
					// chars that must be consumed
					if(start[j] === null){
						continue
					}
					keyPoses[j]= findConcrete(
				}
			}
		}
	}

}

function nonWild(str, n){
	n= n|| 0
	while( str[ n]=== "*")
		++n
	return n
}

function findConcrete(key, n){
	if(n === null)
		return null
	n= n || 0
	var target
	while(!target){	
		if(n >= key.length){
			return null
		}
		target= key[n]
		if(!target){
			++n
		}
	}
	return n
}

var parsed= memoizee(function(keyString){
	if(keyString instanceof Array){
		return keyString
	}
	var keys= keyString.split(":")
	for(var i= 0; i < keys.length; ++i){
		var key= keys[i]
		if(/\*/.test(key)){
			// clean double **'s
			var last
			while(last != key){
				last= key
				key= key.replace("**", "*")
			}
			keys[i]= key.split("*")
			keys[i].wildcard= true
		}else{
			keys[i]= [key]
		}
	}
	return keys
})

module.exports= FlydNexus
