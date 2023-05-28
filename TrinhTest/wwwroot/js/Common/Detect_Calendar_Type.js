
function Calendar_Detect_Old_New (data, status, cancel, state, isOld) {
    let e = {};
    e.Text = "";
    e.ColorCode = "";
    e.ID = 0;

    let filter = "";
    if (Number(state) + Number(cancel) == 0) {
        return 0;
    }
    else {
        if (Number(state) == 0) {
            filter = (isOld == 0) ? "Khách Mới Hủy Lịch" : "Khách Cũ Hủy Lịch";
        }
        else {
            if (status == 1) filter = (isOld == 0) ? "Khách Mới Chưa Đến" : "Khách Cũ Chưa Đến";
            else filter = (isOld == 0) ? "Khách Mới Đã Đến" : "Khách Cũ Đã Đến";
        }

        let _res = data.filter(word => word["Name"] == filter);
        if (_res != undefined && _res.length != 0) {
            e.Text = _res[0].ColorText;
            e.ColorCode = _res[0].ColorCode;
            e.ID = Number(_res[0].ID);
        }
    }
    return e;
}
function Calendar_Fill_Data_OldNew (data, dataColor) {

    if (data != undefined && data.length != 0) {
        for (i = 0; i < data.length; i++) {
            let e = Calendar_Detect_Old_New(dataColor
                , Number(data[i].Status)
                , Number(data[i].IsCancel)
                , Number(data[i].State)
                , Number(data[i].IsOld)
            );
            if (e != 0) {
                data[i].ColorText = e.Text;
                data[i].ColorCode = e.ColorCode
                data[i].MasterID = e.ID
            }
            else {
                data[i].isShow = 0;
            }
        }
        return data;
    }
    else {
        return [];
    }
}


