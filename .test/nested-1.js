var tape= require("tape"),
  path= require("path"),
  Wmm= require("..")

tape(path.basename(__filename), function(t){
	var map= new Wmm({generator: true})
	map.get("a:b")
	var a= map.get("a")
	t.ok(a[0].b, "Asking for a:b creates a.b")
	t.end()
})
