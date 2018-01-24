var mongoose = require("mongoose");
var Quote = mongoose.model("Quote");

module.exports = {
	login: function(req,res){
		console.log("in controller", req.body);
		req.session.user = req.body.name;
		return res.json(req.session.user)
	},
	
	checkSess: function (req, res) {
		if (req.session.user == undefined) {
			console.log("check session:", req.session.user)
			return res.json(null)
		}
		return res.json(req.session.user);
	},

  	logout: function(req,res){
		req.session.destroy();
		res.redirect("/");
	 },
	 
	 addQuote: function(req,res){
		 console.log("breated!!!!")
		 console.log("req!!", req.body)
		 console.log("name!!", req.body.name)
		 Quote.create({name: req.body.name, content: req.body.content, likes: req.body.likes}), function(err,quote){
			console.log("Created!!!!", res.json(quotes)) 
			console.log(err)
			Quote.find({}).sort("-likes").exec(function(err, quotes){
				 return res.json(quotes);
			 })
		 }
	 }
}
