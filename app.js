const https = require('https');
const fs = require('fs');
const { Server } = require("socket.io");
const dataBank = require("./db/databank.json");
const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    fs.createReadStream('./views/collab_form.html').pipe(res);
}).listen(8080);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('historic state', dataBank);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('val clicked', (msg) => {
        dataBank[msg.el].val = msg.val;
        io.emit('val provided', msg);
    });
});