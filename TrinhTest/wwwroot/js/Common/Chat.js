"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/MessagesHub").build();
//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, userTo, message) {
    if (message != '' && message != null) {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        console.log(user + "says" + userTo + "is:" + msg)
        data.ValuesMessages.push({
            "Messages": "",
            "UserID": user,
            "DateTime": "",
            "Value": msg
        });
        RenderDataMessagesUsers(data, "ChatItemUsers");
        data = data;
        RemoveAddClassTestUserSend(user);
    }
    else {
        if ($("#StageMessagesDots").hasClass("d-none")) {
            $("#StageMessagesDots").removeClass("d-none");
        }
    }
});
connection.start().then(function () {
    connection.invoke("GetConnectionId").then(function (id) {
     /*   document.getElementById("connectionId").innerText = id;*/
    });
    //document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});
