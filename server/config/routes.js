var Quote = require("../controllers/QuoteController.js");
var path = require("path");

module.exports = function (app) {
	app.post("/login", function (req, res) {
		console.log("in backend routes")
		Quote.login(req, res);
	});

	app.get("/sess", function (req, res) {
		console.log("in backend routes: checking session")
		Quote.checkSess(req, res);
	});

	app.get("/logout", function (req, res) {
		Quote.logout(req, res);
	});

	app.post("/addQuote", function (req, res) {
		Quote.addQuote(req, res);
	})

	app.get("*", function (req, res) {
		res.sendFile(path.resolve("./client/dist/index.html"));
	});
}