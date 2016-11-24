var express = require('express');
var app = express();

app.use(express.static('./'));

app.listen(process.argv[2]);
