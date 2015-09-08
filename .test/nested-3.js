var tape= require("tape"),
  path= require("path"),
  Wmm= require("..")

tape(path.basename(__filename), function(t){
	var map= new Wmm({generator: true})
	map.get("a:x")[0].n = 1
	map.get("a:y")[0].n = 2
	map.get("a:z")[0].n = 3

	var aStar= map.get("a:*")
	t.equal(aStar.length, 4, "a has correct number of children")
	t.equal(aStar[0].n, 1, "first element is a:x")
	t.equal(aStar[2].n, 3, "third element is a:z")
	t.deepEqual(aStar[3], {}, "fourth wildcard element has been instantiated")

	var aStarN= map.get("a:*:n")
	t.equal(aStarN.length, 4, "deeper get is also correct number of children")
	t.equal(aStarN[0], 1, "first element is a:x:n")
	t.equal(aStarN[2], 3, "third element is a:z:n")
	t.deepEqual(aStarN[3], {}, "wildcard element instantiated an empty field")
	t.deepEqual(aStar[3], {n: {}}, "wildcard element instantiated an empty field")

	t.end()
})
