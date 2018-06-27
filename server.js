var ws = require("nodejs-websocket")
 
var port = 8001;
var count = 0;//client的计数器
 
function broadcast(server, msg) {
    //server.connections是一个数组，保存着所有client
    server.connections.forEach(function (connection) {
        connection.sendText(msg);
    });
}
var server = ws.createServer(function (conn) {
    console.log("New connection");
    count++;
    conn.nickname = "user" + count;
    var msg = {
        "type" : "enter",
        "data" : conn.nickname + " come in"
    }
    broadcast(server, JSON.stringify(msg));
    conn.on("text", function (str) {
        console.log("Received From: "+ conn.nickname + " ----  Data:" + str);
        var msg = {
            "type" : "message",
            "data" : conn.nickname + ": " + str
        }
        broadcast(server, JSON.stringify(msg));
    });
    conn.on("close", function (code, reason) {
        var msg = {
            "type" : "left",
            "data" : conn.nickname + " left the room"
        }
        broadcast(server, JSON.stringify(msg));
        console.log("Connection closed");
    });
    conn.on("error", function(err){
        console.log("some accident happend");
        console.log(err);
    });
});
 
console.log("websocket started , listening " + port)
server.listen(port)
