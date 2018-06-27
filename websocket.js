var info = document.getElementById("info");
var send= document.getElementById("send");
var notice = document.getElementById("notice");
var msg = document.getElementById("msg");

var ws 	= new WebSocket("ws://localhost:8001");
ws.onopen = function(){
	notice.innerHTML = "welcome";
}
ws.onclose = function(){
	notice.innerHTML = "closed"
}
ws.onmessage = function(response){
	console.log(response);
	//收到message后，创建一个div，保存消息，并追加到msg中。
	showMsg(response);
}
send.onclick = function(){
	if(info.value.trim().length){
		ws.send(info.value)
		info.value = "";//发送消息后，清空输入框内容
	} else {
		alert("内容不能为空")
	}
}

function showMsg(response){
	var div = document.createElement("div");
	var json = JSON.parse(response.data);
	switch(json.type){
		case "enter":
		case "left":
			div.className = "system";
			div.innerHTML = json.data;
			break;
		case "message":
			div.className = "friend";
			div.innerHTML = json.data;

	}
	msg.appendChild(div);
}
