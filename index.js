var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

io.on('connection', function (socket) {

setInterval(function() {
  io.emit('map:points', [{
    location: [getRandomInRange(65, 60, 3), getRandomInRange(-180, 180, 3)],
    name: "<b>Manchester</b><br/>EUR 142.20 ",
    id: new Date().getTime() + 1
  }, {
    location: [getRandomInRange(65, 60, 3), getRandomInRange(-180, 180, 3)],
    name: "<b>Manchester</b><br/>PLN 142.20 ",
    id: new Date().getTime() + 2
  }, {
    location: [getRandomInRange(65, 60, 3), getRandomInRange(-180, 180, 3)],
    name: "<b>Manchester</b><br/>USD 142.20 ",
    id: new Date().getTime() + 3
  }, {
    location: [getRandomInRange(65, 6, 3), getRandomInRange(-180, 180, 3)],
    name: "<b>Manchester</b><br/>GBP 142.20 ",
    id: new Date().getTime() + 4
  }]);
}, 5000);
});

http.listen(8080, 'localhost', function() {
    console.log('Running ...');
});
