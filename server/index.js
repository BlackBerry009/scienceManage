var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('../client'))
app.use('/user',require("./router/user"))
app.use('/manager',require("./router/manager"))
app.use('/common',require("./router/common"))

app.listen(12306);

