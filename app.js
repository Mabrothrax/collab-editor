const https = require('https');
const url = require("url");
const fs = require('fs');
const { Server } = require("socket.io");
const dataBank = require("./db/databank.json");
const options = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

if(process.env.NODE_ENV === "dev") {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
}

const server = https.createServer(options, (req, res) => {
    const reqPath = url.parse(req.url).pathname;
    if (req.method == "GET") {
        if (reqPath == "/") {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            fs.createReadStream('./views/collab_form.html').pipe(res);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write("Nothing to see here");
            res.end();
        }
    }
    
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

module.exports = server;