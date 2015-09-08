var tape= require("tape"),
  path= require("path"),
  Wmm= require("..")

tape(path.basename(__filename), function(t){
	var map= new Wmm({generator: true})
	map.get("*:x")
	var b= map.get("b:x")
	t.equals(b.length, 2, "b both explicitly matches itself, and the wildcard")
	t.end()
})
