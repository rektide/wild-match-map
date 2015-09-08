var tape= require("tape"),
  path= require("path"),
  Wmm= require("..")

tape(path.basename(__filename), function(t){
	var map= new Wmm({ generator: true})
	map.get( "foo*bar:x")[0].n= 10

	var fooEmpty= map.get( "foobar:x")
	t.equals( fooEmpty.length, 2, "empty slot wildcard can match")
	fooEmpty[1].n= 11

	var fooContent= map.get( "fooHIYAbar:x")
	t.equals( fooContent.length, 2, "contentful slot wildcard can match")
	fooContent[1].n= 12

	var fooStar= map.get( "foo*bar:x")
	t.equals( fooStar.length, 3, "exact slot wildcard returns original wildcard slot")
	t.equals( fooStar[0].n, 10)
	t.equals( fooStar[1].n, 11)
	t.equals( fooStar[2].n, 12)

	var fooNewStar= map.get( "foo*:x")
	t.equals( fooNewStar.length, 4, "new subset wildcard can match")
	fooNewStar[3].n= 13

	var fooNewStar2= map.get( "foo*:x")
	t.equals( fooNewStar2.length, 4, "new subset wildcard can match- again")
	fooNewStar2[3].n= 14

	var fooNewStar3= map.get( "f*:x")
	t.equals( fooNewStar3.length, 5, "suffix wildcard can match")
	fooNewStar3[4].n= 15

	var fooNewStar4= map.get( "*bar:x")
	t.equals( fooNewStar4.length, 6, "prefix wildcard can match")
	fooNewStar3[4].n= 16
	var starBar= map.get( "*bar")
	t.equals( starBar.length, 6, "repeat prefix match returns same size")

	t.deepEquals( map.keys(), [ 'foo*bar', 'foobar', 'fooHIYAbar', 'foo*', 'f*', '*bar'], "correct keys found")
	t.deepEquals( starBar, [{x: {n: 10 }},
	                        {x: {n: 11 }},
	                        {x: {n: 12 }},
	                        {x: {n: 14 }},
	                        {x: {n: 16 }},
	                        {x: {}} ], "final shape looks good")

	var nestedStar= map.get( "*HIYA*:x")
	t.equals( nestedStar.length, 2, "double wildcard matches existing")
	console.log(nestedStar)
	t.end()
})
