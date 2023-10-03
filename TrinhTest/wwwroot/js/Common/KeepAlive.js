function heartBeat() {
   //let userid = sys_userID_Main;
   //let username = sys_userName_Main;
    $.get("/api/Home/KeepAlive", function (data) { });
    //Get_User_Online_List();
}

//#region
//function Get_User_Online_List() {
//    $.get("/KeepAlive.ashx?useronline=1", function (data) {
//        if (data != "") {
//            let DataUserOnline = JSON.parse(data);
//            RenderListUserOnline(DataUserOnline, "ListUserOnline");
//        }
//    });
//}
//#endregion

$(function () {
    console.log("KeepAlive");
    heartBeat();
    setInterval("heartBeat()", 1000 * 1000);
}); 