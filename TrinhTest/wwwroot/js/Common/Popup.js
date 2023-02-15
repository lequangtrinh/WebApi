//#region  Popup Main
function CloseModal() {
    $('#DetailModal_Content').empty();
    $("#DetailModal_Content").html('')
    $('#DetailModal').modal('hide');
    //if (!$('#DetailModalLV2').hasClass('in')) {
    //    $('#DetailModal').modal('hide');
    //    $('#DetailModal_Content').empty();
    //    $("#DetailModal_Content").html('');
    //}
    //else {
    //    $('#DetailModalLV2').modal('hide');
    //    $('#DetailModalLV2_Content').empty();
    //    $("#DetailModalLV2_Content").html('')
    //    $("#DetailModal").css("opacity", "1");
    //}
}