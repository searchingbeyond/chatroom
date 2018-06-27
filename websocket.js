var info = document.getElementById("info");
var send= document.getElementById("send");
var notice = document.getElementById("notice");
var msg = document.getElementById("msg");
 
var ws  = new WebSocket("ws://localhost:8001");
ws.onopen = function(){
    notice.innerHTML = "websocket connected";
}
ws.onclose = function(){
    notice.innerHTML = "closed"
}
ws.onmessage = function(response){
    console.log(response);
    //收到message后，创建一个div，保存消息，并追加到msg中。
    var div = document.createElement("div");
    var json = JSON.parse(response.data);
    switch(json.type){
        case "enter":
            div.innerHTML = "<font color='blue'>" + json.data + "</font>";
            break;
        case "message":
            div.innerHTML = "<font color='orange'>" + json.data + "</font>";
            break;
        default:
            div.innerHTML = "<font color='brown'>" + json.data + "</font>";
            break;
    }
    msg.appendChild(div);
}
send.onclick = function(){
    ws.send(info.value)
}
