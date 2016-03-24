var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('nickname', function (nickname) {
        console.log(nickname);
        socket.emit('nickname_ok', nickname);
        socket.emit('chat_message', 'Welcome ' + nickname + " !");
    });

    socket.on('chat_message', function (msg) {
        io.emit('chat_message', msg);
    });
});

console.log(process.env.PORT);
console.log(process.env.IP);
http.listen(process.env.PORT, process.env.IP, function() {
    console.log('Running');
});