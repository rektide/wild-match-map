var fs= require("fs"),
  tests= fs.readdirSync(__dirname)

tests.forEach(function(test){
	if(!test.endsWith(".js")){
		return
	}
	if(test === "index.js"){
		return
	}
	require("./" + test)
})
