var tape= require("tape"),
  path= require("path"),
  Wmm= require("..")

tape(path.basename(__filename), function(t){
	var map= new Wmm({ generator: true})
	map.get( "foo*bar:x")[ 0].n= 10

	var fooEmpty= map.get( "foobar:x")
	t.equals( fooEmpty.length, 2, "empty slot wildcard can match")
	fooEmpty[ 1].n= 11

	var fooContent= map.get( "fooHIYAbar:x")
	t.equals( fooContent.length, 2, "contentful slot wildcard can match")
	fooContent[ 1].n= 12

	var fooStar= map.get( "foo*bar:x")
	t.equals( fooStar.length, 3, "exact slot wildcard returns original wildcard slot")
	t.equals( fooStar[ 0].n, 10)
	t.equals( fooStar[ 1].n, 11)
	t.equals( fooStar[ 2].n, 12)

	var fooNewStar= map.get( "foob*:x")
	t.equals( fooNewStar.length, 3, "suffix wildcard can match")
	fooNewStar[ 2].n= 13

	var fooReStar= map.get( "foob*:x")
	t.equals( fooReStar.length, 3, "duplicate suffix wildcard doesn't grow map")

	var fooDupeStar= map.get( "f*:x")
	t.equals( fooDupeStar.length, 5, "new suffix wildcard does grow map")
	fooDupeStar[ 4].n= 14

	var fooNewStar4= map.get( "*bar:x")
	t.equals( fooNewStar4.length, 6, "prefix wildcard can match")
	fooNewStar4[ 5].n= 15
	var starBar= map.get( "*bar")
	t.equals( starBar.length, 6, "repeat prefix match at first level does not grow map")
	t.deepEquals( starBar[ 5], { x:{ n: 15}}, "repeat prefix match ")

	t.deepEquals( map.keys(),[ 'foo*bar', 'foobar', 'fooHIYAbar', 'foob*', 'f*', '*bar'], "correct keys founds")
	t.deepEquals( starBar,[{ x:{ n: 10}},
		{ x:{ n: 11}},
		{ x:{ n: 12}},
		{ x:{ n: 13}},
		{ x:{ n: 14}},
		{ x:{ n: 15}}], "final shape looks good")

	var nestedStar= map.get( "*HIYA*:x")
	t.equals( nestedStar.length, 5, "double wildcard matches existing")
	t.end()
})
