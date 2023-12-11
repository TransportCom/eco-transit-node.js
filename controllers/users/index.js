var express = require("express");
const makeCallback = require('../../config/callback');;

const maker = require('./use-cases')
let utils,
	middlewares,
	E = null;

var router = express.Router({ mergeParams: true });
let usecases
function init() {
	usecases = maker(utils,E)
	router.get("/", makeCallback(usecases.getUsers));
	router.get("/active/:id", makeCallback(usecases.active));
}







exports.router = function (U, errors, M) {
	
	utils = U;
	E = errors;
	middlewares = M;
	init()
	return router;
};
exports.useCases = function (U,errors) {
	utils = U;
	E = errors;
	usecases = maker(utils,E)
	return usecases
};