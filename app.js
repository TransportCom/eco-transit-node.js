var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyLogger = require("morgan-body");
const cors = require("cors");
const limiter = require('./config/limiter')
// use 'debug' module
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
require('./config/db')

if (process.env.NODE_ENV == "development") {
	//console.log(process.env);
}

let utils = require("./utils");

let errors = require("./errors");

const middlewares = require('./middlewares')

var api = require("./controllers")(utils, errors, middlewares);


// start cron
const app = express();
// view engine setup

app.use(cors());
app.options("*", cors());

app.use(logger("dev"));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ limit : '50mb', extended: true }));
app.use(cookieParser());
app.use(limiter.IPLimiter)
app.use("/s/api/", api);

app.use("/public/images", express.static(path.join(__dirname, "public/images")));

app.listen(process.env.PORT | 4000,() => {
	console.log("PORT:",process.env.PORT | 4000)
})
module.exports = app;
