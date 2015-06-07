var app = require("http").createServer(handler);
var fs = require("fs");

app.listen(process.env.PORT || 8080, process.env.IP);

function handler(req, res) {
    var path = req.url;
    if(path == "/") path = "/index.html";
    fs.readFile(__dirname + "/site" + path, function(err, data) {
        if(err) {
            res.writeHead(500);
            res.end("Could not get file: " + path);
        } else {
            console.log("Served: " + path + " with status 200");
            res.writeHead(200);
            res.end(data);
        }
    });
}

