"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
require("dotenv/config");
var _connectDB = _interopRequireDefault(require("../config/connectDB"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//get query params

var cors = require('cors');
var app = (0, _express["default"])();
app.use(cors({
  credentials: true,
  origin: true
}));
var port = process.env.PORT || 8080;
console.log('>>check port:', port);
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '50mb'
}));

// config app

(0, _viewEngine["default"])(app);
(0, _web["default"])(app);
(0, _connectDB["default"])();
app.listen(port, function () {
  console.log("Backend Nodejs is running on the port: ", port);
});