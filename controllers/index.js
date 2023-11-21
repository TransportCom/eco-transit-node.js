var express = require("express");

let U,
	E,
	M = null;

var router = express.Router();


function init() {
	// router.use(middlewares.jsonverify);
	router.use("/profile", M.jsonverify, require("./profile").router(U, E, M));
	router.use("/station", require("./station").router(U, E, M));
	router.use("/expedition", require("./expedition").router(U, E, M));
	router.use("/iterinary", require("./iterinary").router(U, E, M));
	router.use("/user", require("./user").router(U,E,M))
}

module.exports = function (utils, errors, middlewares) {
	U = utils;
	E = errors;
	M = middlewares(U,E);
	init();
	return router;
};