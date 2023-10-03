//count page
function ResCountPage(data) {
    let count = ((data.length / 50) <= 0) ? 1 : (data.length / 50);
    return count > Math.round(count) ? Math.round(count + 0.5) : Math.round(count);
}
//check author page 
function validateAuthor(role) {
    let count = 0;
    switch (role) {
        case "users":count=1; break;
    }
    return count;
}
//load page loading 
function ShowLoader() {
    $("#DetailModal_Content").html('');
    $("#DetailModal_Content").load("/Setting/LoaderPage");
    $("#DetailModal_Content").removeClass('modal-content');
    $('#DetailModal').modal('show');
    return false;
};
// check reload page error
function ErrorPage(status) {
    let url = "";
    switch (status) {
        case 401: url = "/Error/Error401"; break;
        case 500: url = "/Error/Error500"; break;
    }
    return url;
}
// tab control author
function Checking_TabControl_Permission() {
    x = document.getElementsByClassName("_tab_control_");
    if (x != undefined && x.length != 0) {
        for (i = x.length - 1; i >= 0; i--) {
            console.log(x[i])
            let datatab = x[i].attributes["data-tab"].value;

            if (datatab != "" && datatab != "undefined") {
                switch (x[i].nodeName.toLowerCase()) {
                    case 'td':
                        switch (datatab) {
                            case "confirm_using_service":
                                x[i].innerHTML = "<i class='green check icon'></i>";
                                break;
                            case "phone_customer":
                                if (x[i].innerHTML.length > 0) {
                                    x[i].innerHTML = secret_phone(x[i].innerHTML);
                                } else {
                                    x[i].innerHTML = "";
                                }
                                break;
                            default: x[i].innerHTML = "*********";
                        }
                        break;
                    case 'a':
                        switch (datatab) {
                            case "phone_customer":
                                if (x[i].dataset.info != 0) {
                                    x[i].innerHTML = secret_phone(x[i].innerHTML);
                                } else {
                                    x[i].remove();
                                }
                                break;
                            default: x[i].remove();
                        }
                        break;

                    case 'button':
                        x[i].remove();
                        break;
                    case 'div':
                        switch (datatab) {
                            case "phone_customer":
                                if (x[i].dataset.info != 0) {
                                    x[i].innerHTML = secret_phone(x[i].innerHTML);
                                } else {
                                    x[i].remove();
                                }
                                break;
                            //default: x[i].innerHTML = "";
                            default: x[i].remove();
                        }
                        break;
                    case 'i':
                        x[i].remove();
                        break;
                    case 'span':
                        switch (datatab) {
                            case "phone_customer":
                                if (x[i].dataset.info != 0) {
                                    x[i].innerHTML = secret_phone(x[i].innerHTML);
                                } else {
                                    x[i].remove();
                                }
                                break;
                            default: x[i].innerHTML = "";
                        }
                        break;
                    case 'tr':
                        x[i].remove();
                        break;
                    case 'input':
                        if (x[i].value != "") {
                            //x[i].value = "00000000000";
                            x[i].setAttribute("type", "password");
                            x[i].setAttribute("disabled", "true");
                        }
                        break;
                }
            }
        }
    }
}
function secret_phone(phone) {
    let value = "*******";
    value = value + phone.substring(phone.length - 3, phone.length)
    return value;
}
//render page data
function RenderPageData(id, page) {
    let myNode = document.getElementById(id);
    if (page > 1 && myNode != null) {
        let Previous = '<li class="page-item disabled" id="' + id +'Prev">'
            + '<a class="page-link" href="javascript:;" tabindex="-1">'
            + '<i class="fa fa-angle-left"></i>'
            + '<span class="sr-only">Previous</span>'
            + '</a>'
            + '</li>';
        let Next = '<li class="page-item" id="' + id +'Next">'
            + '<a class="page-link" href="javascript:;">'
            + '<i class="fa fa-angle-right"></i>'
            + '<span class="sr-only">Next</span>'
            + '</a>'
            + '</li>';
        let tr = '';
        for (i = 1; i <= page; i++) {
            if (i == 1) {
                tr += '<li class="page-item active ' + id + '"><a class="page-link" href="javascript:;">' + i + '</a>'
                    + '</li>';
            }
            else {
                tr += '<li class="page-item ' + id + '"><a class="page-link" href="javascript:;">' + i + '</a>'
                    + '</li>';
            }
           
        }
        document.getElementById(id).innerHTML = Previous + tr + Next;
    }
}
//render button
function Render_Button_Grid(buttons) {
    let numbercollap = 2;
    let result = '';
    if (buttons != undefined && buttons.length >= numbercollap) {
        let idrandom = 'col' + (new Date()).getTime() + RandomNumber();
        result = '<div class="text-center ">'
            + '<i class="position-relative fa fa-ellipsis-h" data-bs-toggle="collapse" id="showClassButtons" href="#' + idrandom + '">'
            + ' <div class="vttcollapse shadow-lg bg-body collapse-horizontal rounded position-absolute" id="' + idrandom + '">'
            ;

        $.each(buttons, function (index, value) {
            result = result + value;
        });
        result = result + '</div></i></div>';
    }
    else {
        result = '<div class="text-center ">'
        $.each(buttons, function (index, value) {
            result = result + value;
        });
        result = result + '</div>';
    }
    return result;
}

function RandomNumber() {
    let min = 1000000000;
    let max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ConvertNumberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function RenderLayoutPaggin(id, data) {
    let myNode = document.getElementById(id);
    if (myNode != null) {
        myNode.innerHTML = '';
        let stringContent = '';
        //if (data && data.length > 0) {
        //    for (let i = 0; i < data.length; i++) {
        //        let li='<li class="">< a href = "#" data-page="3" >' +i+'</a ></li >'
        //        stringContent = stringContent + li ;
        //    }
        //};
        for (let i = 0; i < 10; i++) {
            let li = '<li class=""><a href = "#" data-page="3" >' + (i+1) + '</a></li>'
            stringContent = stringContent + li;
        }
        document.getElementById(id).innerHTML = '<li class="pager prev"><a href = "#" data - page="1">‹</a></li>'
                                                + stringContent
                                                + '<li class="pager Next"><a href = "#" data - page="2">›</a></li>';
    }
}

function ColorSearchFilterText(keyword, className) {
    var options = {
        "accuracy": {
            "value": "partially",
            "limiters": [",", "."]
        }
    };
    $("." + className).unmark({
        done: function () {
            $("." + className).mark(keyword, options);
        }
    });
}
function ColorSearchFilterText_Combo(keyword, className) {
    var options = {
        "accuracy": {
            "value": "partially",
            "limiters": [",", "."]
        }
    };
    $(className).unmark({
        done: function () {
            $(className).mark(keyword, options);
        }
    });
}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
Date.prototype.addMinutes = function (m) {
    this.setTime(this.getTime() + (m  * 60 * 1000));
    return this;
}

// Server to show client m-d-y
function formatDateClient(date) {
    if (date != undefined && date != "") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }
    else {
        return '01-01-1900';
    }
}
//  m-d-y to date
function formatDMY_To_Date(date) {
    if (date != undefined && date != "") {
        dates = date.split('-');
        return new Date(dates[2], dates[1] - 1, dates[0], 0, 0, 0, 0);
    }
    else {
        return new Date();
    }
}
//  m-d-y to date
function formatdDateTime_To_Date(date) {
    if (date != undefined && date != "") {
        var d = new Date(date),
            month = '' + d.getMonth(),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return new Date(year, month, day, 0, 0, 0, 0);
    }
    else {
        return new Date();
    }
}
//  m-d-y hh-mm to date
function formatDMYHHMM_To_Date(date) {
    if (date != undefined && date != "") {
        dates = date.split(' ');
        dates1 = dates[0].split('-');
        dates2 = dates[1].split(':');
        return new Date(dates1[2], dates1[1] - 1, dates1[0], dates2[0], dates2[1], 0, 0);
    }
    else {
        return new Date();
    }
}
// Server to show client dd-mm
function yyyyMMdd_ddMM(date) {
    var x = date.split("-");
    return x[2] + "-" + x[1];
}

function DateFormat(date) {
    if (date !== undefined && date !== '' && date !== null) {
        date = date.split("-").reverse().join("-");
    }
    return date;
}
// Server to show client y-m-d
// date( d-m-y)
function formatDate(date) {
    if (date != undefined && date != "") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }
    else {
        return '1900-01-01';
    }
}

function formatDateToDMYHM(date) {
    if (date != undefined && date != "") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        hour = d.getHours();
        minute = d.getMinutes();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        return [day, month, year].join('-') + ' ' + [hour, minute].join(':');
    }
    else {
        return '01-01-1990';
    }
}

// Formate date for datetotpe
function formatDateInput(date) {
    if (date != undefined && date != "") {
        if (date.includes("-")) {
            var x = date.split("-");
            return x[0] + "-" + x[1] + "-" + x[2];
        }
        else if (date.includes("/")) {
            var x = date.split("/");
            return x[0] + "-" + x[1] + "-" + x[2];
        }
        else return '01-01-1900';
    }
    else {
        return '01-01-1900';
    }
}
// second to hms
function secondsToHms(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return (hours + ":" + minutes + ":" + seconds);
}

// Server to show client dd-mm
function yyyyMMddHHMMM_ddMMyyyy(date) {
    if (date.length >8) {
        var x = date.split(" ");
        var y = x[0].split("-");
        return y[2] + "-" + y[1] + "-" + y[0];
    }
    return '';
}

// Server to show client dd-mm
function yyyyMMddHHMMM_HHMM(date) {
    var x = date.split(" ");
    return x[1];
}
//Formate Birthday
function formatBirthday(date) {
    try {
        let now = new Date();
        if (date != undefined && date != "") {
            if (date.includes("-")) {
                var x = date.split("-");
                if ((Number(x[2]) < 1900 || Number(x[2]) > now.getFullYear()) || !Number(x[0]) || !Number(x[1]) || !Number(x[2]))
                    return "";
                return x[0] + "-" + x[1] + "-" + x[2];
            }
            else if (date.includes("/")) {
                var x = date.split("/");
                if ((Number(x[2]) < 1900 || Number(x[2]) > now.getFullYear()) || Number(x[0]) || Number(x[1]) || Number(x[2]))
                    return "";
                return x[0] + "-" + x[1] + "-" + x[2];
            }
            else return '01-01-1900';
        }
        else {
            return '01-01-1900';
        }
    } catch (ex) {
        return "";
    }
}

//Function Distance 2 time
function GetHHMM_FromDateTime(x) {
    let date = new Date(x);
    return date.getHours() + ":" + date.getMinutes();
}
function DateNowHHMM() {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
}
function ChangeMinute_To_Hour_Minute(__minute, text = "") {
    __minute = Number(__minute);
    if (__minute == 0) return "";
    let _result = "";
    switch (__minute) {
        case 0:
            _result = " second " + text;
            break;
        case 1:
            _result = __minute.toString() + " minute " + text;
            break;
        default:
            {
                if (__minute <= 60) {
                    _result = __minute.toString() + " minutes " + text;
                }

                else if (__minute > 61 && __minute <= 120) {
                    _result = Math.floor(__minute / 60) + " hour " + __minute % 60 + " minute " + text;
                }
                else {
                    _result = Math.floor(__minute / 60) + " hours " + text;
                }
            }
            break;
    }

    return _result;
}
function HHMM_Distance_HHMM(_from, _to) {
    try {
        if (_from == "" || _to == "") return 0;

        let __from = Number(_from.split(':')[0]) * 60 + Number(_from.split(':')[1]);
        let __to = Number(_to.split(':')[0]) * 60 + Number(_to.split(':')[1]);
        let __minute = __to - __from;
        return __minute;

    }
    catch (ex)
    {
        return 0;
    }
}


//(date) 2020-03-16T00:00:00   -> 2020-03-16 (string)
function ConvertDT_To_StringYMD(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return d.getFullYear() + '-' + month + '-' + date;

    }
    catch (err) {
        return "";
    }
}
function ConvertDT_To_DT1(x) {
    try {
        var d = new Date(x);
        return new Date(d.getFullYear(), d.getMonth(), 1);


    }
    catch (err) {
        return new Date();
    }
}

function GETDATE_NOW_DMYHM() {
    try {
        var d = new Date();
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return date + '-' + month + '-' + d.getFullYear();

    }
    catch (err) {
        return "";
    }
}

function GetDateTime_Now_Only_Date() {
    try {
        var datenow = new Date();
        return new Date(datenow.getFullYear(), datenow.getMonth(), datenow.getDate());
    }
    catch (err) {
        return "";
    }
}

function GetDateTime_Now_To_String() {
    try {
        var datenow = new Date();
        let hour = (datenow.getHours() < 10) ? ("0" + datenow.getHours()) : datenow.getHours();
        let minute = (datenow.getMinutes() < 10) ? ("0" + datenow.getMinutes()) : datenow.getMinutes();
        let second = (datenow.getSeconds() < 10) ? ("0" + datenow.getSeconds()) : datenow.getSeconds();
        return hour + ":" + minute + ":" + second;
    }
    catch (err) {
        return "";
    }
}
function GetDateTime_Now_HHMM() {
    try {
        var datenow = new Date();
        let hour = (datenow.getHours() < 10) ? ("0" + datenow.getHours()) : datenow.getHours();
        let minute = (datenow.getMinutes() < 10) ? ("0" + datenow.getMinutes()) : datenow.getMinutes();
        return hour + ":" + minute ;
    }
    catch (err) {
        return "";
    }
}
function GetMonthName_Eng(x) {
    let month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'];
    let d = new Date(x);
    let _month = d.getMonth();
    return month_array[_month];
}
function GetDateTime_String_HHMM(x) {
    try {
        var datenow = new Date(x);
        let hour = (datenow.getHours() < 10) ? ("0" + datenow.getHours()) : datenow.getHours();
        let minute = (datenow.getMinutes() < 10) ? ("0" + datenow.getMinutes()) : datenow.getMinutes();
        return hour + ":" + minute;
    }
    catch (err) {
        return "";
    }
}
function GetDateTime_String_DMY(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return date + '-' + month + '-' + d.getFullYear();
    }
    catch (err) {
        return "";
    }
}
function GetDateTime_String_DMYHM(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        return date + '-' + month + '-' + d.getFullYear() + ' ' + hour + ":" + minute;
    }
    catch (err) {
        return "";
    }
}

function ConvertDateTimeToHHMMSS(DateTime) {
    try {
        var datenow = new Date(DateTime);
        let hour = (datenow.getHours() < 10) ? ("0" + datenow.getHours()) : datenow.getHours();
        let minute = (datenow.getMinutes() < 10) ? ("0" + datenow.getMinutes()) : datenow.getMinutes();
        let second = (datenow.getSeconds() < 10) ? ("0" + datenow.getSeconds()) : datenow.getSeconds();
        return hour + ":" + minute + ":" + second;
    }
    catch (err) {
        return "";
    }
}
// (Date) 1900-01-01 -> ''
function ConvertToDateRemove1900(x) {

    try {
        var d = new Date(x);
        if (Number(d.getFullYear()) == 1900) return "";
        else return x
    }
    catch (err) {
        return x;
    }
}


// convert datetime to string
function ConvertStringYMD_DMY(x) {
    try {
        let j = x.split('-');
        return (j[2] + "-" + j[1] + "-" + j[0]);
    }
    catch (err) {
        return "";
    }
}
function ConvertStringDMY_YMD(x) {
    try {
        let j = x.split('-');
        return (j[2] + "-" + j[1] + "-" + j[0]);
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToString(x) {
    try {
        let j = x.split('-');
        return ('ngày ' + j[0] + ' tháng ' + j[1] + ' năm ' + j[2]);
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToStringRemove1900(x) {
    try {
        let j = x.split('-');
        if (j[2] == "1900") return "";
        else return (j[0] + " - " + j[1] + " - " + j[2]);
    }
    catch (err) {
        return "";
    }
}
// DateTimeUTC => 19-08-2021
function ConvertDateTimeUTC_DMY(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return d.getFullYear() + "-" + month + "-" + date;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeTo_StringT(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let second = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : d.getSeconds();
        return d.getFullYear() + "-" + month + "-" + date + 'T' + hour + ":" + minute + ":" + second;
    }
    catch (err) {
        return "";
    }
}

function ConvertDateTimeUTC_DMY_Remove1900(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        if (d.getFullYear() == "1900") return '';
        else return d.getFullYear() + "-" + month + "-" + date;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_YMD(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return d.getFullYear() + "-" + month + "-" + date;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTCSS(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        var datenow = new Date();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let second = (d.getSeconds() < 10) ? ("0" + d.getSeconds()) : d.getSeconds();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
            return hour + ":" + minute + ":" + second;
        }
        else {
            return date + "-" + month + "-" + d.getFullYear();
        }
        return d;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        var datenow = new Date();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
            return hour + ":" + minute;
        }
        else {
            return date + "-" + month + "-" + d.getFullYear();
        }
        return d;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_NoYear(x) {


    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        var datenow = new Date();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
            return hour + ":" + minute;
        }
        else {
            return date + "-" + month + "-" + d.getFullYear();
        }
        //return d;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_Time(x) {
    try {

        if (x != undefined) {
            if (x == "") return "";
            var d = new Date(x);
            var datenow = new Date();
            let _month = d.getMonth() + 1;
            let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
            let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
            let month = (_month < 10) ? ("0" + _month) : _month;
            let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

            if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
                return hour + ":" + minute;
            }
            else {
                return hour + ":" + minute + "  " + date + "-" + month + "-" + d.getFullYear();
            }
            return d;
        }
        else {
            var d = new Date();
            let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
            let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
            return hour + ":" + minute;
        }
    }
    catch (err) {
        return "";
    }
}
//DateTimeUTC => "15:09  19-08-2021"
function ConvertDateTimeUTC_DMYHM(x) {
    try {

        if (x != undefined) {
            if (x == "") return "";
            var d = new Date(x);
            let _month = d.getMonth() + 1;
            let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
            let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
            let month = (_month < 10) ? ("0" + _month) : _month;
            let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
            return hour + ":" + minute + "  " + date + "-" + month + "-" + d.getFullYear();
        }
        else {
            return "";
        }
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_DMY(x) {
    try {

        if (x != undefined) {
            if (x == "") return "";
            var d = new Date(x);
            let _month = d.getMonth() + 1;
            let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
            let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
            let month = (_month < 10) ? ("0" + _month) : _month;
            let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
            return  date + "-" + month + "-" + d.getFullYear();
        }
        else {
            return "";
        }
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_Time_OnlyHour(x) {
    try {

        var d = isNaN(x) ? new Date(x) : new Date(Number(x));
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        return hour + ":" + minute;
    }
    catch (err) {
        return "";
    }
}
function ConvertTimeSpanUTC_Time(x) {
    try {

        var d = isNaN(x) ? new Date(x) : new Date(Number(x));
        var datenow = new Date();
        let _month = d.getMonth() + 1;
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
            return hour + ":" + minute;
        }
        else {
            return hour + ":" + minute + "  " + date + "-" + month + "-" + d.getFullYear();
        }
        return d;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToTimeSpan(x) {

    try {
        if (x != undefined) {
            let d = new Date(x);

            return d.getTime();
        }
        else {
            let d = new Date();
            return d.getTime();
        }
    }
    catch (err) {
        return "";
    }
}
// Convert datetime to number
function ConvertDateByNumbers(startDate) {

    let chars = [' ', '<br>'];
    try {
        for (i = 0; i < chars.length; i++) {
            let char = chars[i];
            if (startDate.includes(char)) {
                startDate = startDate.split(char)[0];
            }
            if (startDate != "" || startDate != undefined) {
                var parts = startDate.split('-');
                startDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var date = new Date(startDate);
                return Number(date.getTime());
            }
            else return 0;
        }

    }
    catch (err) {
        return 0;
    }

}

function StringYMDTODate(x) {
    try {
        if (x.includes('T')) {
            x = x.split('T')[0];
        }
        let j = x.split('-');
        return new Date(Number(j[0]), Number(j[1]) - 1, Number(j[2])); // 0-11 for month
    }
    catch (err) {
        return new Date();
    }
}

function StringYMD_SPACE_HMTODate(x) {
    try {
        if (x.includes(' ')) {
            x1 = x.split(' ')[0];
            x2 = x.split(' ')[1];
            let j1 = x1.split('-');
            let j2 = x2.split(':');
            return new Date(Number(j1[0]), Number(j1[1]) - 1, Number(j1[2]), Number(j2[0]), Number(j2[1])); // 0-11 for month

        }

    }
    catch (err) {
        return new Date();
    }
}
function ConvertDateTimeToStringDMY_HM(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        var datenow = new Date();
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        if (d.getDate() == datenow.getDate() && d.getYear() == datenow.getYear() && d.getMonth() == datenow.getMonth()) {
            return hour + ":" + minute;
        }
        else {
            return hour + ":" + minute + "  " + date + "-" + month + "-" + d.getFullYear();
        }
        return d;
    }
    catch (err) {
        return "";
    }
}
// Server to show client dd-mm-yyyy HH:MM
function formatDate_to_ddmmyyyyHHMM(date) {
    if (date != undefined && date != "") {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hh = ' ' + d.getHours(),
            mm = '' + d.getMinutes();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var day = [day, month, year].join('-');
        var hour = [hh, mm].join(':');
        return day + hour;
    }
    else {
        return '01-01-1900 09:00';
    }
}
// new Date => "2021-08-19 15:13:00"
function ConvertDateTimeToStringYMDHHMMSS(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;

        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        return d.getFullYear() + "-" + month + "-" + date + " " + hour + ":" + minute+":00";
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToString_D_M(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        let month = (_month < 10) ? ("0" + _month) : _month;
        return date +"/"+ month;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToString_DOW(x) {
    try {
        var dayofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var d = new Date(x);
        return dayofweek[Number(d.getDay())];
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeToString_D_(x) {
    try {
        var d = new Date(x);
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return date ;
    }
    catch (err) {
        return "";
    }
}
function ConvertDateTimeUTC_Time_DOWFULLDAY(x) {
    try {

        var d = isNaN(x) ? new Date(x) : new Date(Number(x));
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let _month= d.getMonth() + 1
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        return ConvertDateTimeToString_DOW(x)
            + " , " + date + "/" + month + "/"+d.getFullYear()
            + " " + hour + ":" + minute;
    }
    catch (err) {
        return "";
    }
}
function Face_Convert_Date_To_DOW_DMY(x) {
    try {

        var d = isNaN(x) ? new Date(x) : new Date(Number(x));
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();
        let _month = d.getMonth() + 1
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();

        return ConvertDateTimeToString_DOW(x)
            + " , " + date + "/" + month + "/" + d.getFullYear()
    }
    catch (err) {
        return "";
    }
}

// 2021-09-20 15:08 => 15:08
function Face_Convert_Date_To_DOW_HM(x) {
    try {
        var d = isNaN(x) ? new Date(x) : new Date(Number(x));
        let hour = (d.getHours() < 10) ? ("0" + d.getHours()) : d.getHours();
        let minute = (d.getMinutes() < 10) ? ("0" + d.getMinutes()) : d.getMinutes();

        return hour + ":" + minute;
    }
    catch (err) {
        return "";
    }
}

// 2021-09-20 15:08 => 20/09/2021
function ConvertDateTimeToString_D_M_Y(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        let month = (_month < 10) ? ("0" + _month) : _month;
        let year = d.getFullYear();
        return date + "/" + month + "/" + year;
    }
    catch (err) {
        return "";
    }
}

function ConvertDateTime_To_Timespan_TimeZone(_dd) {
    try {
        return (_dd.getTime() + (_dd.getTimezoneOffset() * 60 * 1000 * -1));
    } catch (ex){
        return 0;
    }
}

function ConverDateTime_Only_Date_From_DateTime(x) {
    try {
        return new Date(x.getFullYear(), x.getMonth(), x.getDate());
    }
    catch (err) {
        return "";
    }
}
// => "2021-08-19"
function ConvertDT_To_StringYMD(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let month = (_month < 10) ? ("0" + _month) : _month;
        let date = (d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate();
        return d.getFullYear() + '-' + month + '-' + date;

    }
    catch (err) {
        return "";
    }
}

function GetTimeAgo_FromCurrent(x) {
    try {
        let resulf = '';
        let date = new Date(x);
        let hour = (date.getHours() < 10) ? ("0" + date.getHours()) : date.getHours();
        let minute = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes();


        let dateNow = new Date();
        if (date.toDateString() == dateNow.toDateString()) {
            resulf = hour + ":" + minute;
        }
        else {
            let diffTime = Math.abs(date - dateNow);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays == 1) {
                resulf = diffDays + ' day ago ' + hour + ":" + minute;
            }
            else if (diffDays < 6) {
                resulf = (diffDays-1) + ' days ago ' + hour + ":" + minute;
            }
            else {
                resulf = ConvertDateTimeToString_D_M_Y(x)+'  ' + hour + ":" + minute;
            }
        }

        return resulf;
    }
    catch (err) {
        return "";
    }
}


function ConvertString_DMY_To_StringYMD(x) {
    try {
        let _d = x.split(' ')[0];
        return _d.split('-')[2] + '-' + _d.split('-')[1] + '-' + _d.split('-')[0];

    }
    catch (err) {
        return "";
    }
}

function ConvertString_YMD_To_DateTime(x) {
    try {
        let _d = x.split(' ')[0];
        return new Date(_d.split('-')[0], Number(_d.split('-')[1])-1, _d.split('-')[2]);
    }
    catch (err) {
        return "";
    }
}
function ConvertString_DMY_To_DateTime(x) {
    try {
        let _d = x.split(' ')[0];
        return new Date(_d.split('-')[2], Number(_d.split('-')[1]) - 1, _d.split('-')[0]);
    }
    catch (err) {
        return "";
    }
}
function ConvertOnly_DMY_To_DateTime(x) {
    try {
        return new Date(x.split('-')[2], Number(x.split('-')[1]) - 1, x.split('-')[0]);
    }
    catch (err) {
        return "";
    }
}
function ConvertString_DMYHM_To_DateTime(x) {
    try {
        let _d = x.split(' ')[0];
        let _h = x.split(' ')[1];
        return new Date(_d.split('-')[2], Number(_d.split('-')[1]) - 1, _d.split('-')[0], _h.split(':')[0], _h.split(':')[1]);
    }
    catch (err) {
        return "";
    }
}

function ConvertDT_To_ThousandNumber(x) {
    try {
        var d = new Date(x);
        let _month = d.getMonth() + 1;
        let _year = d.getFullYear();
        return _year * 12 + _month;
    }
    catch (err) {
        return 0;
    }
}
function ConvertThousandNumber_To_MY(t) {
    try {
        let _m = "";
        let _y = "";

        if (t % 12 == 0) {
            _m = "12";
            _y = t / 12 - 1;
        }
        else {
            _m = t % 12;
            _y = (t - _m) / 12;


        }
        return ((_m < 10) ? ('0'+_m.toString()) : _m.toString()) + '/' + _y.toString().substring(2, 4);
    }
    catch (ex){
        return "";
    }
}
function Distance_Year_2Date(d1, d2) {
    try {
        return d2.getFullYear() - d1.getFullYear();
    }
    catch (ex) {
        return 0;
    }
}
//date_validate
(function ($) {
    $.fn.date_validate = function (options) {
        var base = this;
        var is_error = true;
        var defaults = {
            format: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            class: 'error-birthday',
            elm_error: '.field'
        };
        var settings = $.extend({}, defaults, options);
        base.init = function () {
            is_error = validate_date(base.val());
        };
        base.init();
        function validate_date(value) {
            if (value && value != '') {
                if (value.match(settings.format)) {
                    var opera1 = value.split('/');
                    var opera2 = value.split('-');
                    lopera1 = opera1.length;
                    lopera2 = opera2.length;
                    if (lopera1 > 1) {
                        var pdate = value.split('/');
                    }
                    else if (lopera2 > 1) {
                        var pdate = value.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
                return true;
            } else {
                return true;
            }
        }
        base.keypress(function (_e) {
            var v = base.val();
            if (v.match(/^\d{2}$/) !== null) {
                base.val(v + '-');
            } else if (v.match(/^\d{2}\-\d{2}$/) !== null) {
                base.val(v + '-');
            }

        })
        base.change(function (_e) {
            if (validate_date(base.val()) == false) {
                base.closest(settings.elm_error).addClass(settings.class);
                is_error = false;
            } else {
                base.closest(settings.elm_error).removeClass(settings.class);
                is_error = true;
            }
        })
        var date_validate = {
            get_validate: function (_d) {
                return is_error;
            }

        };
        return date_validate;
    };

}(jQuery));
(function ($) {
    //init Language page
    if (typeof LanguageVTT !== 'undefined') {
        LanguageVTT.Refresh();
    }
    //init table responsive
    if (typeof TableReponsive !== 'undefined' && sys_isMobile == 1) {
        TableReponsive.Refresh();
    }
    $(document).click(function (e) {
        var clickover = $(event.target);
        if (!clickover.hasClass("collapse") && !clickover.hasClass("form-check-input") && !clickover.hasClass("form-switch")
            && (clickover.parent() != undefined && !clickover.parent().hasClass("collapse"))
        ) {
            try {
                //$('.collapse').not('.collapsesticky').collapse('hide');
            }
            catch (e) {

            }


        }
    });
    //#region  remove keyup enter submit from
    setTimeout(
        () => {
            $(document).find('form input').on('keyup keypress', function (e) {
                if (e.which == 13) {
                    e.preventDefault();
                    return false;
                }
            });
            $(document).find('form').unbind().on('submit', function () {
                return false;
            });
        }, 100
    )


    //#endregion
})(jQuery);

    // #region // Load Data Language
    var xmlLang_static_Url;
    function ClickSettingLanguages () {
        document.querySelectorAll('.LanguagesSetting').forEach(node => {
            node.addEventListener("click", e => {
                switch (node.childNodes[1].innerText) {
                    case "VietNam": {
                        localStorage.setItem("Languages", 'vn');
                        xmlLang_static_Url ="/Language/VN/static.xml"
                        break;
                    }
                    case "JanPan": {
                        localStorage.setItem("Languages", 'jpn');
                        xmlLang_static_Url = "/Language/JP/static.xml"
                        break;
                    }
                    case "US-UK": {
                        localStorage.setItem("Languages", 'en');
                        xmlLang_static_Url = "/Language/ENG/static.xml"
                        break;
                    }
                };
            });
        });
    };
    function TranslateLanguguagesData(value, translateFrom, translateTo) {
        let dataLanguages = '';
        var apiUrl = `https://api.mymemory.translated.net/get?q=${value}&langpair=${translateFrom}|${translateTo}`;
        $.ajax(
            {
                type: "post",
                dataType: "json",
                url: apiUrl,
                success: function (msg) {
                    dataLanguages = msg.responseData.translatedText;
                }
            });
        return dataLanguages;
    };
    function ChangeLanguage_Detect_Dynamic_File() {
        var xhttp_d = new XMLHttpRequest();
        xhttp_d.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                xmlLang_dynamic = this.responseXML;
            }
        };
        xhttp_d.open("GET", xmlLang_dynamic_Url, false);
        xhttp_d.send();
    }


//#region //success,info,danger,warning,other
async function notif_initialize(_type, _mes, _delay) {
    let _id = (new Date()).getTime() + 12;
    let _pa = 'MS_Notification';
    let _rel = await notif_createel(_id, _pa, _type, _mes);
    if (_rel == 'resolved') {
        if (_type != 'danger') {
            notif_closeauto(_id, _delay);
            notif_progressrun(_id, _delay);
        }
        else {
            notif_closeevent(_id)
            notif_timmersend(_id);
        }
    }

}
function notif_closeauto (_id, _delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            if ($('#nt' + _id).length) $('#nt' + _id).remove();
        }, _delay);
    });
}
function notif_progressrun (_id, _delay) {
    let seco = _delay / 200;
    return new Promise(resolve => {
        let elem = document.getElementById('pb' + _id);
        if (typeof (elem) != 'undefined' && elem != null) {
            let width = 1;
            let id = setInterval(frame, seco);
            function frame () {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
            }
        }
    });
}
function notif_createel (_id, _pa, _type, _mes) {
    let type = 'dark', mess = '', per = '', title = '', time = '';
    if (_type != 'danger') {
        per = '<div class="progress bg-transparent">'
            + '<div id="pb' + _id + '" class="progress-bar bg-gradient-light" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
            + '</div>'
    }
    switch (_type) {
        case 'dark':
            type = 'bg-gradient-dark';title = 'Successful';
            break;
        case 'info':
            type = 'bg-gradient-info';title = 'Notice';
            break;
        case 'danger':
            type = 'bg-gradient-danger'; title = 'Handling Failure';
            time = '<small id="tm' + _id + '" class="text-white">now</small>'
            break;
        case 'warning':
            type = 'bg-gradient-warning'; title = 'Warning';
            break;
        default:
            type = 'bg-white'; title = 'Notice';
            break;
    }
    mess = (_mes != '' && _mes != undefined)? ('<div class="toast-body text-white"> '+ _mes+ '</div>'): '';
    return new Promise(resolve => {
        let content = '<div class="toast fade show p-2 mt-2 ' + type + '" role="alert" id="nt' + _id + '" >'
            + '<div class="toast-header bg-transparent border-0">'
            + '<i class="ni ni-bell-55 text-white me-2"></i>'
            + '<span class="me-auto text-white font-weight-bold">' + title + '</span>'
            + time
            + '</div>'
            + '<hr class="horizontal light m-0">'
            + mess
            + per
            + '</div>'
        let el = createElementFromHTML(content)
        $("#" + _pa).append(el);
        resolve('resolved');
    });
}
function notif_closeevent(_id) {
    $("#cl" + _id).unbind('click').click(function (event) {
        if ($('#nt' + _id).length) $('#nt' + _id).remove();

    });
}
function notif_timmersend (_id) {
    let seco = 30;
    return new Promise(resolve => {
        let _timenow = DateNowHHMM();
        let id = setInterval(function () { frame(_timenow) }, seco);
        function frame (_timenow) {
            let elem = document.getElementById('tm' + _id);
            if (typeof (elem) != 'undefined' && elem != null) {
                let timecurrent = DateNowHHMM();
                let _timeago = HHMM_Distance_HHMM(_timenow, timecurrent);
                _timeago = _timeago < 0 ? 0 : _timeago;
                let _timeago_text = ChangeMinute_To_Hour_Minute(_timeago, 'ago');
                if ($('#tm' + _id).length) $('#tm' + _id).html((_timeago_text != '') ? _timeago_text : 'seconds ago');
 
            }
            else clearInterval(id);        
        }

    });
}
//#endregion

function notiError_SW () {
    notif_initialize('danger', 'Something Wrongs', 2000);
}
function notiSuccess () {
    notif_initialize('dark', '', 2000);
}
function notiSuccessMess (mes) {
    notif_initialize('success', mes, 2000);
}
function notiError (mes) {
    notif_initialize('danger', mes);
}
function notiWarning (mes) {
    notif_initialize('warning', mes,10000);
}
function notiMess10 (mes) {
    notif_initialize('info', mes, 10000);
}
 
 
//#region //Confirmation
function confirmf_initialize (title, text, isconfirm, iscancel) {
    return new Promise(resolve => {
        let swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn bg-gradient-primary mx-2',
                cancelButton: 'btn bg-gradient-light mx-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: title,
            text: text,
            icon: 'warning',
            showConfirmButton: isconfirm ,
            showCancelButton: iscancel,
            confirmButtonText: 'Yes !',
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                resolve(false);
            } else {
                resolve(false);
            }
        })
    });


}
//#endregion

async function notiConfirm (content) {
 
    let re= await confirmf_initialize('Confirmation'
        , content != undefined ? content : 'Do you want to continue?'
        , true, true
    );
    
    if (!re) return new Promise();
    else return null;
 
 
}
async function notiConfirm_Type (type) {
    let content = "";
    for (_notiindex = 0; _notiindex < language_global_noti_text.length; _notiindex++) {
        if (language_global_noti_text[_notiindex].title == type) {
            content = language_global_noti_text[_notiindex].value[(Global_Language_Chossing ? Global_Language_Chossing : "vn")];
            _notiindex = language_global_noti_text.length;
        }
    }
    let re = await confirmf_initialize('Confirmation'
        , content != undefined ? content : 'Do you want to continue?'
        , true, true
    );
    if (!re) return new Promise();
    else return null;
}
async function notiPopup_Type (type) {
    let content = "";
    for (_notiindex = 0; _notiindex < language_global_noti_text.length; _notiindex++) {
        if (language_global_noti_text[_notiindex].title == type) {
            content = language_global_noti_text[_notiindex].value[(Global_Language_Chossing ? Global_Language_Chossing : "vn")];
            _notiindex = language_global_noti_text.length;
        }
    }
    let re = await confirmf_initialize('Notification'
        , content != undefined ? content : ''
        , false, true
    );
    if (!re) return new Promise();
    else return null;
}
async function notiPopup_Type_Service (type, data) {
    let content = "";
    for (_notiindex = 0; _notiindex < language_global_noti_text.length; _notiindex++) {
        if (language_global_noti_text[_notiindex].title == type) {
            content = language_global_noti_text[_notiindex].value[(Global_Language_Chossing ? Global_Language_Chossing : "vn")];
            _notiindex = language_global_noti_text.length;
        }
    }
    for (let i = 0; i < data.length; i++) {
        content = content.replace("{" + i + "}", data[i].toString());
    }
    let re = await confirmf_initialize('Notification'
        , content != undefined ? content : 'Do you want to continue?'
        , false, true
    );
    if (!re) return new Promise();
    else return null;
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
 

 

// Load_Combo(DataBranch, "cbbBranch", true);
var Timer_Search_Combo;
function Load_Combo(dt, id, isRequire, allItem) {
    let data = dt;
    if (isRequire != undefined) {
        if (allItem != undefined) {
            if (data != undefined && data.length >= 1) {
                let item_all = JSON.parse(JSON.stringify(data[0]));
                if (item_all.ID != undefined && item_all.Name != undefined && item_all.ID != 0) {
                    item_all.ID = 0;
                    item_all.Name = allItem;
                    if (item_all.Icon != undefined) item_all.Icon = '';
                    if (item_all.Avatar != undefined) item_all.Avatar = '';
                    data = [item_all].concat(data);
                }
            }
        }
        let myNode = document.getElementById(id);
        if (myNode != null) {
            myNode.innerHTML = '';
            let stringContent = '';
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    let icon = (item.Icon != undefined && item.Icon != '') ? ('<i class="' + item.Icon + '"></i>') : '';
                    let avatar = (item.Avatar != undefined && item.Avatar != '')
                        ? ('<img style="width:15px; height:15px;" src="data:image/png;base64,' + ((item.Avatar != "") ? item.Avatar : Master_Default_Image) + '" alt="label-image">')
                        : '';
                    let tr =
                        '<div class="item" data-value=' + item.ID + '>' + icon + avatar + item.Name + '</div>'
                    stringContent = stringContent + tr;
                }
            }
            document.getElementById(id).innerHTML = stringContent;
            OnCombo_FillOption(id, data, isRequire);
        }
        if (allItem != undefined && data.length >= 1) return 0;
    }
}
function OnCombo_FillOption(id, data, isRequire) {
    let isMulti = 0;
    let parent = $('#' + id).parent().get(0);
    if ($(parent).attr('class').includes('multiple')) isMulti = 1;
    if (!$(parent).find(".search")) {
        $(parent).prepend('<input class="search" autocomplete="off" tabindex="0" />');
    }
    $(parent).find(".dropdown").remove();
    $(parent).prepend("<i class='dropdown icon'></i>");

    $(parent).find(".search").unbind('keyup');
    $(parent).find(".search").on('keyup', function (e) {
        if (![40, 39, 38, 37, 34, 33, 133].includes(e.keyCode)) {
            OnCombo_SearchTimeout(id, data, $(this).val(), 'Name', 'item', OnCombo_SearchRender);
        }
    });


    if (isMulti == 0) {
        $(parent).find('.dropdown.icon').unbind('click').on('click', function (e) {
            $(parent).find(".search").focus();
            e.preventDefault();
        });
        $(parent).unbind('click');
        $(parent).on('click', function (e) {
            OnCombo_Search(id, data, $(parent).find(".search").val(), 'Name', 'item', OnCombo_SearchRender);
        });
        if (!isRequire) {
            $(parent).find(".remove").remove();
            $(parent).prepend("<i class='remove icon'></i>");
            $(parent).find('.remove.icon').unbind('click').on('click', function (e) {
                $(this).parent('.dropdown').dropdown('clear');
                e.stopPropagation();
            });
        }
        else {
            $(parent).find(".remove").remove();
        }
        $(parent).find('.text').unbind('click').on('click', function (e) {
            $(parent).find(".search").focus();
        });
    }
    else {
        $(parent).find('.search').unbind('click').on('click', function (e) {
            $(parent).dropdown('show');
            e.preventDefault();
        });
        //$(parent).unbind('click').on('click', function (e) {
        //    $(parent).find(".search").focus();
        //    e.preventDefault();
        //});
        //console.log(1123)
        //$('.ui.label.transition.visible .delete.icon').unbind('click').on('click', function (e) {
        //    console.log(123)
        //    $(this).parent('.dropdown').dropdown('clear');
        //    e.stopPropagation();
        //});
        //$(parent).find('.search').unbind('focus').on('focus', function (e) {
        //   // OnCombo_Search(id, data, $(parent).find(".search").val(), 'Name', 'item', OnCombo_SearchRender);
        //});
    }

}
function OnCombo_Search(comboid, data, searchkey, columnname, classrow, functionLoad) {
    try {
        searchkey = xoa_dau(searchkey).toLowerCase();
        let _data = data.filter(word => {
            return (xoa_dau(word[columnname]).toLowerCase().includes(searchkey));
        });
        if (_data != undefined && _data != null && _data.length != 0) {
            functionLoad(_data, comboid);
            ColorSearchFilterText_Combo(searchkey, '#' + comboid + ' > .' + classrow);
        }
        else {
            functionLoad(data, comboid);
        }
        return false;
    }
    catch (ex){
        return false;
    }
}
function OnCombo_SearchTimeout(comboid, data, searchkey, columnname, classrow, functionLoad) {
    try {
        let parent = $('#' + comboid).parent().get(0);
        $(parent).addClass("loading");
        clearTimeout(Timer_Search_Combo);
        Timer_Search_Combo = setTimeout(function (e) {
            OnCombo_Search(comboid, data, searchkey, columnname, classrow, functionLoad);
            $(parent).removeClass("loading");
        }, 300)
    }
    catch (ex) {
        return false;
    }
}
function OnCombo_SearchRender(data, id) {
    let _isMulti = 0;
    let parent = $('#' + id).parent().get(0);
    if ($(parent).attr('class').includes('multiple')) _isMulti = 1;
    if (parent != undefined) {
        let value = $(parent).dropdown('get value');
        let myNode = document.getElementById(id);
        if (myNode != null) {
            myNode.innerHTML = '';
            let stringContent = '';
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    let icon = (item.Icon != undefined) ? ('<i class="' + item.Icon + '"></i>') : '';
                    let avatar = (item.Avatar != undefined)
                        ? ('<img style="width:15px; height:15px;" src="data:image/png;base64,' + ((item.Avatar != "") ? item.Avatar : Master_Default_Image) + '" alt="label-image">')
                        : '';
                    let tr = '';

                    if (_isMulti == 0) {
                        let _classitem = '';
                        _classitem = ((',' + value + ',').includes(',' + item.ID + ',')) ? 'item active' : 'item';
                        tr = '<div class="' + _classitem + '"  data-value=' + item.ID + '>' + icon + avatar + item.Name + '</div>'
                    }
                    else {
                        if (!(',' + value + ',').includes(',' + item.ID + ','))
                            tr = '<div class="item"  data-value=' + item.ID + '>' + icon + avatar + item.Name + '</div>'
                    }


                    stringContent = stringContent + tr;
                }
            }
            document.getElementById(id).innerHTML = stringContent;
        }
    }
}

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

// #region  General Function
var CC_TotalSeconds = 0;
function CCF_CallFail(phonenumber) {

    if (Incommingaudio != undefined && Incommingaudio != null) {
        Incommingaudio.pause();
        Incommingaudio.currentTime = 0;
    }
    $('#CallCenter_Area').addClass('d-none');
    CCF_ResetFiled();
    flagCalling = 0;
}
function CCF_BeginTime() {
    CC_TotalSeconds = 0;

}
function CCF_setTime() {
    ++CC_TotalSeconds;
    $('#CallCenter_ProgressingTime').html(CCF_pad(parseInt(CC_TotalSeconds / 60)) + ':' + CCF_pad(CC_TotalSeconds % 60));
}
function CCF_pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
function CCF_Event() {
    $("#CallCenter_ProgressingMute").on("click", function () {
        $("#CallCenter_ProgressingUnMute").removeClass('d-none');
        $(this).addClass('d-none');
        CallingMute();
    });
    $("#CallCenter_ProgressingUnMute").on("click", function () {
        $("#CallCenter_ProgressingMute").removeClass('d-none');
        $(this).addClass('d-none');
        CallingUnMute();
    });
    $("#CallCenter_ProgressingEndCall").on("click", function () {
        sip_hangup();
        $('#CallCenter_Area').addClass('d-none');
        CCF_ResetFiled();
    });
}
function CCF_ResetFiled() {
    CC_TotalSeconds = 0;
    clearInterval(interval);
    interval = null;
    $('#CallCenter_HangDiv').removeClass('d-none');
    $('#CallCenter_ProgressingArea').addClass('d-none');
    $('#CallCenter_ProgressingMute').removeClass('d-none');
    $('#CallCenter_ProgressingUnMute').addClass('d-none');
    $('#CallCenter_Name').html('no-profile');
    $('#CallCenter_Phone').html('');
    $('#CallCenter_ProgressingTime').html('');
    $('#CallCenter_Avatar').attr('src', '/assests/img/gray.png');
    $('#CallCenter_MultiPhone').html('');
}


//#endregion

// Incoming call
function sip_incomingcall(header, headername) {
    if (flagCalling == 0) {
        try {
            CCF_ResetFiled();
            $('#CallCenter_Area').removeClass('d-none');
            Incommingaudio.loop = true;
            Incommingaudio.play();
        }
        catch (err) {
            console.log("Sound Error");
        }
        CCF_Incom_DetectPhone(header, headername);
    } else {
        console.log("Calling");
    }
}
function CCF_Incom_DetectPhone(header, headername) {
    let phonenumber = '';
    let name = '';
    let _defaultImage = "/assests/img/gray.png";
    $('#CallCenter_Avatar').attr('src', _defaultImage);
    if (headername != "0") {
        phonenumber = headername;
    }
    else {
        let resdouble = header.split(":");
        let res = resdouble[1].split("@");
        phonenumber = res[0];

    }
    AjaxJWT(url = "/api/Call/InCommingCall"
        , data = JSON.stringify({ phone: phonenumber })
        , async = true
        , success = function (result) {
            if (result != "0") {
                let data = JSON.parse(result)
                name = data[0].Name;
                let custid = data[0].CustID;
                let custcode = data[0].Code;
                if (custid != '') {
                    $("#CallCenter_Name").html('<a target="_blank" class="text-white" href="/Customer/MainCustomer?CustomerID=' + custid + '">' + custcode + ' - ' + name + '</a>');
                }
                else {
                    $("#CallCenter_Name").html(name);
                }
                $("#CallCenter_Phone").html(phonenumber);
                $('#CallCenter_Avatar').attr('src', (data[0].Image ? ('data:image/png;base64, ' + data[0].Image) : _defaultImage));
            } else {
                $("#CallCenter_Name").html('no-profile');
                $("#CallCenter_Phone").html(phonenumber);
                $('#CallCenter_Avatar').attr('src', _defaultImage);
            }
        }
    );



}
function CCF_Incom_Accept() {
    try {
        Incommingaudio.pause();
        Incommingaudio.currentTime = 0;
        $('#CallCenter_HangDiv').addClass('d-none');
        $('#CallCenter_ProgressingArea').removeClass('d-none');
        CCF_Event();
        CallingAnswer();
        flagCalling = 1;
        return false;
    }
    catch (err) {
        console.log("Sound Error");
        flagCalling = 0;
        return false;
    }
}
function CCF_Incom_Decline() {
    if (Incommingaudio != undefined && Incommingaudio != null) {
        Incommingaudio.pause();
        Incommingaudio.currentTime = 0;
    }
    sip_hangup();
    $('#CallCenter_Area').addClass('d-none');
    CCF_ResetFiled();
    flagCalling = 0;
    return false;
}

//#endregion

// Outcoming call
function CCF_OutcomCall(phone, customer, ticket, line) {
    CCF_ResetFiled();
    $('#CallCenter_HangDiv').addClass('d-none');
    $('#CallCenter_Header').html('Outcoming Call');
    Incommingaudio.pause();
    Incommingaudio.currentTime = 5;
    let phone1 = "0354709903";
    let phone2 = "0354709903";
    $('#CallCenter_Name').html(("1" != "0")
        ? '<a target="_blank" class="text-white" href="/Customer/MainCustomer?CustomerID=' + "2" + '">' + "00001" + ' - ' + "trinh test call" + '</a>'
        : "trinh test 1"
    );
    $('#CallCenter_Avatar').attr('src', ("" != "")
        ? ('/Assets/img/doctor.jpg')
        : ('/Assets/img/Customer-service.png')
    );

    //else {
    //    $('#CallCenter_Name').html('no profile');
    //    $('#CallCenter_Avatar').attr('src', 'data:image/png;base64, ' + Master_Default_Image);
    //}
    if (phone1 != '' && phone2 != '') CCF_Outcom2Phone(phone1, phone2);
    else {
        if (line != 0) {
            sip_callexe(line);
            $('#CallCenter_Phone').html(line);
        }
        else {
            sip_callexe(phone1);
            $('#CallCenter_Phone').html(phone1.slice(0, -3) + '***');
        }
        $('#CallCenter_ProgressingArea').removeClass('d-none');
    }
    //AjaxJWT(url = "/api/Call/OutCommingCall"
    //    , data = JSON.stringify({
    //        cus: customer
    //        , tic: ticket
    //        , line: line
    //    })
    //    , async = true
    //    , success = function (result) {
    //        let data = JSON.parse(result);
    //        let dataoutcomming = data.Table;
    //        let dataPhone = data.Table1;
    //        let phone1 = dataPhone[0].Phone1;
    //        let phone2 = dataPhone[0].Phone2;
    //        if (dataoutcomming != null && dataoutcomming.length != 0) {
    //            $('#CallCenter_Name').html((dataoutcomming[0].ID != "0")
    //                ? '<a target="_blank" class="text-white" href="/Customer/MainCustomer?CustomerID=' + dataoutcomming[0].ID + '">' + dataoutcomming[0].Code + ' - ' + dataoutcomming[0].Name + '</a>'
    //                : dataoutcomming[0].Name
    //            );
    //            $('#CallCenter_Avatar').attr('src', (dataoutcomming[0].Image != "")
    //                ? ('data:image/png;base64, ' + dataoutcomming[0].Image)
    //                : ('data:image/png;base64, ' + Master_Default_Image)
    //            );
    //        }
    //        else {
    //            $('#CallCenter_Name').html('no profile');
    //            $('#CallCenter_Avatar').attr('src', 'data:image/png;base64, ' + Master_Default_Image);
    //        }
    //        if (phone1 != '' && phone2 != '') CCF_Outcom2Phone(phone1, phone2);
    //        else {
    //            if (line != 0) {
    //                sip_callexe(line);
    //                $('#CallCenter_Phone').html(line);
    //            }
    //            else {
    //                sip_callexe(phone1);
    //                $('#CallCenter_Phone').html(phone1.slice(0, -3) + '***');
    //            }
    //            $('#CallCenter_ProgressingArea').removeClass('d-none');
    //        }
    //    }
    //);


    $('#CallCenter_Area').removeClass('d-none');
    CCF_Event();
    return false;


}
function CCF_Outcom2Phone(phone1, phone2) {


    let Multi_phone1 = (phone1.length > 0 ? encrypt_phone(phone1.replace(" ", "")) : "");
    let Multi_phone2 = (phone2.length > 0 ? encrypt_phone(phone2.replace(" ", "")) : "");
    let str = '<span data-info="' + Multi_phone1 + '" class="call w-50 text-dark text-md me-3 badge bg-gradient-light  cursor-pointer my-1"  >'
        + phone1.slice(0, -3) + '***'
        + '</span>'
        + '<span data-info="' + Multi_phone2 + '" class="call w-50 text-dark text-md badge bg-gradient-light cursor-pointer my-1"  >'
        + phone2.slice(0, -3) + '***'
        + '</span>'

    $('#CallCenter_MultiPhone').html(str);
    $("#CallCenter_MultiPhone .call").on("click", function () {
        let phoneExe = $(this).attr("data-info");
        $("#CallCenter_Phone").html($(this).html());
        $("#CallCenter_MultiPhone").html('');
        $('#CallCenter_ProgressingArea').removeClass('d-none');
        sip_callexe(decrypt_phone(phoneExe));
        return false;
    });
}
function encrypt_phone(phone) {
    let result = "";
    if (phone != undefined && phone.length > 0) {
        let date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();

        let stringdate = year.toString() + month.toString() + day.toString() + phone;
        result = btoa(stringdate)
    }
    return result;
}
//#endregion

var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var i,a=1,s=arguments.length;a<s;a++)for(var n in i=arguments[a])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)},CountUp=function(){function t(t,i,a){var s=this;this.target=t,this.endVal=i,this.options=a,this.version="2.0.7",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:""},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.count=function(t){s.startTime||(s.startTime=t);var i=t-s.startTime;s.remaining=s.duration-i,s.useEasing?s.countDown?s.frameVal=s.startVal-s.easingFn(i,0,s.startVal-s.endVal,s.duration):s.frameVal=s.easingFn(i,s.startVal,s.endVal-s.startVal,s.duration):s.countDown?s.frameVal=s.startVal-(s.startVal-s.endVal)*(i/s.duration):s.frameVal=s.startVal+(s.endVal-s.startVal)*(i/s.duration),s.countDown?s.frameVal=s.frameVal<s.endVal?s.endVal:s.frameVal:s.frameVal=s.frameVal>s.endVal?s.endVal:s.frameVal,s.frameVal=Number(s.frameVal.toFixed(s.options.decimalPlaces)),s.printValue(s.frameVal),i<s.duration?s.rAF=requestAnimationFrame(s.count):null!==s.finalEndVal?s.update(s.finalEndVal):s.callback&&s.callback()},this.formatNumber=function(t){var i,a,n,e,r,o=t<0?"-":"";if(i=Math.abs(t).toFixed(s.options.decimalPlaces),n=(a=(i+="").split("."))[0],e=a.length>1?s.options.decimal+a[1]:"",s.options.useGrouping){r="";for(var l=0,h=n.length;l<h;++l)0!==l&&l%3==0&&(r=s.options.separator+r),r=n[h-l-1]+r;n=r}return s.options.numerals&&s.options.numerals.length&&(n=n.replace(/[0-9]/g,function(t){return s.options.numerals[+t]}),e=e.replace(/[0-9]/g,function(t){return s.options.numerals[+t]})),o+s.options.prefix+n+e+s.options.suffix},this.easeOutExpo=function(t,i,a,s){return a*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=__assign(__assign({},this.defaults),a),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(i),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el="string"==typeof t?document.getElementById(t):t,this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined"}return t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold){this.finalEndVal=t;var a=this.countDown?1:-1;this.endVal=t+a*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.callback=t,this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,this.finalEndVal||this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){var i=this.formattingFn(t);"INPUT"===this.el.tagName?this.el.value=i:"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=i:this.el.innerHTML=i},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: "+t,null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t}();

/*
	A simple, lightweight jQuery plugin for creating sortable tables.
	https://github.com/kylefox/jquery-tablesort
	Version 0.0.11
*/

(function ($) {
    $.tablesort = function ($table, settings) {
        var self = this;
        this.$table = $table;
        this.$thead = this.$table.find('thead');
        this.settings = $.extend({}, $.tablesort.defaults, settings);
        this.$sortCells = this.$thead.length > 0 ? this.$thead.find('th:not(.no-sort)') : this.$table.find('th:not(.no-sort)');
        this.$sortCells.on('click.tablesort', function () {
            try {
                let _tablesortclassname = this.parentNode.offsetParent.className;
                if (_tablesortclassname.includes('nosortwholetable'))
                    return false;
                else {
                    if (LanguageVTT)
                        LanguageVTT.Terminate();
                    self.sort($(this));
                }
            }
            catch (ex) {

            }

        });
        this.index = null;
        this.$th = null;
        this.direction = null;
    };
    
    $.tablesort.prototype = {
        
        sort: function (th, direction) {
            var start = new Date(),
                self = this,
                table = this.$table,
                rowsContainer = table.find('tbody').length > 0 ? table.find('tbody') : table,
                rows = rowsContainer.find('tr').has('td, th'),
                cells = rows.find(':nth-child(' + (th.index() + 1) + ')').filter('td, th'),
                sortBy = th.data().sortBy,
                sortedMap = [];

            var unsortedValues = cells.map(function (idx, cell) {
                if (sortBy)
                    return (typeof sortBy === 'function') ? sortBy($(th), $(cell), self) : sortBy;
                return ($(this).data().sortvalue != null ? $(this).data().sortvalue : $(this).text());
            });
            if (unsortedValues.length === 0) return;

            //click on a different column
            if (this.index !== th.index()) {
                this.direction = 'asc';
                this.index = th.index();
            }
            else if (direction !== 'asc' && direction !== 'desc')
                this.direction = this.direction === 'asc' ? 'desc' : 'asc';
            else
                this.direction = direction;

            direction = this.direction == 'asc' ? 1 : -1;

            self.$table.trigger('tablesort:start', [self]);
            self.log("Sorting by " + this.index + ' ' + this.direction);

            // Try to force a browser redraw
            self.$table.css("display");
            // Run sorting asynchronously on a timeout to force browser redraw after
            // `tablesort:start` callback. Also avoids locking up the browser too much.
            setTimeout(function () {
                self.$sortCells.removeClass(self.settings.asc + ' ' + self.settings.desc);
                for (var i = 0, length = unsortedValues.length; i < length; i++) {
                    sortedMap.push({
                        index: i,
                        cell: cells[i],
                        row: rows[i],
                        value: unsortedValues[i]
                    });
                }

                sortedMap.sort(function (a, b) {
                    return self.settings.compare(a.value, b.value) * direction;
                });

                $.each(sortedMap, function (i, entry) {
                    rowsContainer.append(entry.row);
                });

                th.addClass(self.settings[self.direction]);

                self.log('Sort finished in ' + ((new Date()).getTime() - start.getTime()) + 'ms');
                self.$table.trigger('tablesort:complete', [self]);
                //Try to force a browser redraw
                self.$table.css("display");
                if (LanguageVTT)
                    LanguageVTT.Initialize();
            }, unsortedValues.length > 2000 ? 200 : 10);
        },

        log: function (msg) {
            if (($.tablesort.DEBUG || this.settings.debug) && console && console.log) {
                console.log('[tablesort] ' + msg);
            }
        },

        destroy: function () {
            this.$sortCells.off('click.tablesort');
            this.$table.data('tablesort', null);
            return null;
        }

    };

    $.tablesort.DEBUG = false;

    $.tablesort.defaults = {
        debug: $.tablesort.DEBUG,
        asc: 'sorted ascending',
        desc: 'sorted descending',
        compare: function (a, b) {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        }
    };

    $.fn.tablesort = function (settings) {
        var table, sortable, previous;
        return this.each(function () {
            table = $(this);
            previous = table.data('tablesort');
            if (previous) {
                previous.destroy();
            }
            table.data('tablesort', new $.tablesort(table, settings));
        });
    };

})(window.Zepto || window.jQuery);
//#region // var
var session_base = "BaseData";
var session_setting = "BaseSetting";
var indexedDBVer = 13;//Version is number table
var preload_circleAvatar = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoopNy8/MOOvPSgBaKKTI45HPTnrQAtFGQehooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAKdzIyX9sBgjsCOpJAOPcCqsuzyZFyjxCU5cD7xKk4PqQcVrUUAU5PtKQysWGwQ/KB1DY5qsp3PacLkYWMqODh8Ej8K1aKAKOm9JMf7O7/e5z+NXqKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k=';
//#endregion
//#region // settings
function Master_Setting_Set (name, value) {
    let key = '[' + VDNAME + '][' + session_setting + ']' + name;
    localStorage.setItem(key, value);
}
function Master_Setting_Get (name) {
    let key = '[' + VDNAME + '][' + session_setting + ']' + name;
    let value = localStorage.getItem(key);
    return value;
}
//#endregion

//#region // Data DB

function Master_Session_Data (session, setfun) {
    if (!localstorage_check(session)) {
        let e = {};
        e.time = new Date();
        let data = {};
        data["Time"] = e;
        localstorage_set(session, data)
        setfun();
    }
    return exist_preload('DB');
}
function Master_IndexDB_Checking () {
    let isAllow = true;
    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange

    if (!window.indexedDB) {
        isAllow = false;
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }
    return isAllow;
}
function Master_IndexDB_Delete (dbName, callback) {
    dbName = '[' + VDNAME + '][' + VDVERSION + '][' + dbName + ']';
    if (Master_IndexDB_Checking()) {
        var DBDeleteRequest = window.indexedDB.deleteDatabase(dbName);
        DBDeleteRequest.onerror = function (event) {
        };
        DBDeleteRequest.onblocked = function (e) {
        };
        DBDeleteRequest.onsuccess = function (event) {
            callback()
        };
    }
}
function Master_IndexDB_IniTable (dbName, name, data, ver) {
    return new Promise(resolve => {
        dbName = '[' + VDNAME + '][' + VDVERSION + '][' + dbName + ']';
        let request = window.indexedDB.open(dbName, ver);
        request.onupgradeneeded = function (event) {
            let db = event.target.result;
            db.createObjectStore(name, {keyPath: "ID"});
        };
        request.onsuccess = function (event) {
            let database = request.result;
            //console.log([name])
            let transaction = database.transaction([name], 'readwrite');
            let objectStore = transaction.objectStore(name);
            for (let i = 0;i < data.length;i++) {
                objectStore.add(data[i]);
            }
            database.close();
            resolve(true);
        };

    });


}
function Master_IndexDB_Reads (dbName, tablenames, callback) {
    try {
        let promises = [];
        for (i = 0;i < tablenames.length;i++) {
            promises.push(Master_IndexDB_Read(dbName, tablenames[i]))
        }
        Promise.all(promises).then((values) => {
            callback(values);
        });
    }
    catch (ex) {
        console.log('error 4: ' + dbName + ' - ' + tablenames)
    }
}
function Master_IndexDB_Read (dbName, name) {
    try {
        return new Promise(function (resolve) {
            dbName = '[' + VDNAME + '][' + VDVERSION + '][' + dbName + ']';
            let request = window.indexedDB.open(dbName, indexedDBVer);
            request.onsuccess = function (event) {
                let db = request.result;
                try {
                    var transaction = db.transaction([name], "readwrite");
                    var objectStore = transaction.objectStore(name);
                    var objectStoreRequest = objectStore.getAll();
                    objectStoreRequest.onsuccess = function (event) {
                        var myRecord = objectStoreRequest.result;
                        var result = myRecord.reduce(function (r, e) {
                            r[e.ID] = e
                            return r;
                        }, {});
                        return resolve(result);

                    };
                } catch (ex) {
                    return {};
                }
                db.close();
            };
            request.error = function () {
            }
            
        });
    } catch (ex) {
    }
}
function Fun_GetTeeth_ByToken (data, tokenstring, type) {
    try {
        let result = "";
        if (data != undefined && Object.values(data).length > 0) {

            let _tokens = tokenstring.split(",");
            if (_tokens.length != 0) {
                for (let i = 0;i < _tokens.length;i++) {
                    if (data[_tokens[i]] != undefined) {
                        if (type == 0) {
                            result += (data[_tokens[i]].TeethName).trim() + ', ';
                        }
                        else if (type == 1) {
                            result += (data[_tokens[i]].TeethNameBaby).trim() + ', ';
                        }
                        else {
                            result += (data[_tokens[i]].TeethNameMerge).trim() + ', ';
                        }
                    }
                }
            }
            result = (result.trim()).slice(0, -1);
        }
        return result;
    }
    catch (ex) {
        return "";
    }
}
function Fun_GetString_ByToken (data, tokenstring) {
    try {
        let result = "";
        if (Object.values(data).length > 0) {

            let _tokens = tokenstring.split(",");
            if (_tokens.length != 0) {
                for (let i = 0;i < _tokens.length;i++) {
                    if (data[_tokens[i]] != undefined) {
                        result += (data[_tokens[i]].Name).trim() + ', ';
                    }
                }
            }
            result = (result.trim()).slice(0, -1);
        }
        return result;
    }
    catch (ex){
        return "";
    }
}
function Fun_GetName_ByID (data, id) {
    try {
        let result = "";
        if (Object.values(data).length > 0) {
            if (data[id] != undefined) {
                result = data[id].Name;
            }
        }
        return result;
    }
    catch (ex){
        return "";
    }
}
function Fun_GetAvatar_ByID (data, id) {
    try {
        let result = preload_circleAvatar;
        if (Object.values(data).length > 0) {
            if (data[id] != undefined) {
                result = data[id].Avatar;
                if (result == '') result = preload_circleAvatar;
            }
        }
        return result;
    }
    catch (ex){
        return preload_circleAvatar;
    }
}
function Fun_GetObject_ByID (data, id) {
    try {

        let result = null;
        if (id != 0) {

            if (Object.values(data).length > 0) {
                if (data[id] != undefined) {
                    if (typeof data[id].Avatar === 'object' && data[id].Avatar !== null && data[id].Avatar == '') data[id].Avatar = preload_circleAvatar;
                    result = data[id];

                }
            }
        }
        if (result == null) {
            let e = {};
            e.ID = 0;
            e.Name = 'unknown';
            e.Avatar = preload_circleAvatar;
            e.Code = 'unknown';
            result = e;
        }
        return result;
    }
    catch (ex){
        let e = {};
        e.ID = 0;
        e.Name = 'unknown';
        e.Avatar = preload_circleAvatar;
        e.Code = 'unknown';
        return e;
    }
}
function Fun_GetArray_ByJson (data, json) {
    try {
        let result = [];
        if (Object.values(data).length > 0) {
     
            let objjson = JSON.parse(json);
            if (Object.values(objjson).length > 0) {
                for ([key, value] of Object.entries(objjson)) {
                    if (data[key] != undefined) {
                        result.push((data[key].Name).trim());
                        
                    }
                };
                
            }
        }
        return result;
    }
    catch (ex){
        return [];
    }
}

//#endregion

//#region // Javascript and css
function js_require_notasync (url, loadnormal) {
    
    if (VDMINIFY == "true" && !url.includes('/Assests/') && !url.includes('/Assets/') ) url = url.replace('.js', '.min.js');
    if (loadnormal != true) {
        try {
            let key = '[' + VDNAME + ']' + url;
            let isreload = 0;
            let _data;

            let value = localStorage.getItem(key);
            if (value != undefined && value != null && value != '') {
                let _el = JSON.parse(value);
                if (_el != undefined) {
                    let _u = _el.unique;
                    _data = _el.data;
                    if (_u != '' && _u == ver_get()) {
                        isreload = 1;
                    }
                }
            }
            if (isreload == 0) {
                jQuery.ajax({
                    url: url + '?' + ver_get(),
                    dataType: 'script',
                    async: false,
                    success: function (data) {
                        let e = {};
                        e.data = data;
                        e.unique = ver_get();
                        localStorage.setItem(key, JSON.stringify(e));
                    },
                    error: function () {
                        console.log(url + ' failure 2')
                    }
                });
            }
            else {
                let code = _data;
                let s = document.createElement("script");
                s.type = "text/javascript";
                try {
                    s.appendChild(document.createTextNode(code));
                    document.head.appendChild(s);
                } catch (ex) {
                    s.text = code;
                    document.head.appendChild(s);
                }
            }
        }
        catch (ex)
        {
            jQuery.ajax({
                url: url + '?' + ver_get(),
                dataType: 'script',
                async: false,
                success: function (data) {
                },
                error: function () {
                    console.log(url + ' failure 2')
                }
            });

            console.log(url + ' full storage')
        }
    }
    else {
        jQuery.ajax({
            url: url,
            dataType: 'script',
            async: false,
            cache: true,
            success: function (data) {
            },
            error: function () {
            }
        });
    }

    //jQuery.ajax({
    //    url: url + '?ver=' + new Date().getTime(),
    //    dataType: 'script',
    //    async: false,
    //    cache: false,
    //    success: function (data) {
    //    },
    //    error: function () {
    //    }
    //});
}

function js_require(_url, callback, _skipCache) {
    if (VDMINIFY == "true" && !_url.includes('/Assests/') && !_url.includes('/Assets/')) _url = _url.replace('.js', '.min.js');
    basket
        .require({
            url: _url
            , key: VDNAME + _url
            , skipCache: (_skipCache != undefined) ? false : _skipCache
            , unique: _url + ver_get()
        })
        .then(function () {
            if (typeof callback !== 'undefined' && $.isFunction(callback)) {
                callback();
            }
       });
    //jQuery.ajax({
    //    url: _url + '?ver=' + new Date().getTime(),
    //    dataType: 'script',
    //    async: false,
    //    cache: false,
    //    success: function (data) {
    //    },
    //    error: function () {
    //    }
    //});
}
function css_require (_url) {
    if (VDMINIFY == "true" && !_url.includes('/Assests/') && !_url.includes('/Assets/')) _url = _url.replace('.css', '.min.css');
    $('head').append($('<link rel="stylesheet" type="text/css" />')
        .attr('href', _url));

}
//#endregion

//#region // version
function ver_check () {
    let setver = 0;
    let version = ver_get();
    if (version == '') {
        setver = 1;
    }
    else {
        let verapp = version.split(']')[0];
        verapp = verapp.replace('[', '')
        if (verapp != VDVERSION) {
            setver = 1;
        }
    }
    if (setver == 1 || exist_preload('JS')) {
        ver_reset();
    }

}
function ver_reset () {
    let defaultver = '[' + VDVERSION + ']' + (new Date()).getTime();
    ver_set(defaultver);
}
function ver_set (ver) {
    let key = '[' + VDNAME + ']' + '-ver';
    localStorage.setItem(key, ver);
}
function ver_get () {
     let key = '[' + VDNAME + ']' + '-ver';
    let ver = localStorage.getItem(key);
    if (ver != null && ver != undefined) {
        return ver
    }
    else {
        return '';
    }
}
function exist_preload (_type) {
    let key = '[' + VDNAME + ']' + '[Exist][' + _type + ']';
    let ver = localStorage.getItem(key);
    if (ver != null && ver != undefined) {
        return false;
    }
    else {
        localStorage.setItem(key, 1);
        return true;
    }
}
//#endregion

//#region // local storage
function localstorage_set (key, value) {
    try {
        key = '[' + VDNAME + ']' + key;
        let e = {}; e.unique = ver_get(); e.data = value;
        localStorage.setItem(key, JSON.stringify(e));
    }
    catch (ex) {
        console.log("Local Storage is full, Please empty data");
        console.log(key)
    }
}
function localstorage_get (key) {
    key = '[' + VDNAME + ']' + key;
    let ver = localStorage.getItem(key);
    if (ver != null && ver != undefined) {
        return ver
    }
    else {
        return '';
    }
}
function localstorage_check (key) {
    let isExist = 0;
    let value = localstorage_get(key);
    if (value != '') {
        let _el = JSON.parse(value);
        if (_el != undefined) {
            let _u = _el.unique;
            _data = _el.data;
            if (_u != '' && _u == ver_get()) {
                isExist = 1;
            }
        }
    }
    return (isExist == 1);

}
//#endregion
//#region // author
function author_set (key, value) {
    try {
        key = '[' + VDNAME + ']' + key;
        localStorage.setItem(key, value);
    }
    catch (ex) {
    }
}
function author_get (key) {
    key = '[' + VDNAME + ']' + key;
    let ver = localStorage.getItem(key);
    if (ver != null && ver != undefined) {
        return ver
    }
    else {
        return '';
    }
}
//#endregion
/*!
* basket.js
* v0.5.2 - 2015-02-07
* http://addyosmani.github.com/basket.js
* (c) Addy Osmani;  License
* Created by: Addy Osmani, Sindre Sorhus, Andrée Hansson, Mat Scales
* Contributors: Ironsjp, Mathias Bynens, Rick Waldron, Felipe Morais
* Uses rsvp.js, https://github.com/tildeio/rsvp.js
*/
!function (a, b) { "use strict"; var c = b.head || b.getElementsByTagName("head")[0], d = "basket-", e = 5e3, f = [], g = function (a, b) { try { return localStorage.setItem(d + a, JSON.stringify(b)), !0 } catch (c) { if (c.name.toUpperCase().indexOf("QUOTA") >= 0) { var e, f = []; for (e in localStorage) 0 === e.indexOf(d) && f.push(JSON.parse(localStorage[e])); return f.length ? (f.sort(function (a, b) { return a.stamp - b.stamp }), basket.remove(f[0].key), g(a, b)) : void 0 } return } }, h = function (a) { var b = new RSVP.Promise(function (b, c) { var d = new XMLHttpRequest; d.open("GET", a), d.onreadystatechange = function () { 4 === d.readyState && (200 === d.status || 0 === d.status && d.responseText ? b({ content: d.responseText, type: d.getResponseHeader("content-type") }) : c(new Error(d.statusText))) }, setTimeout(function () { d.readyState < 4 && d.abort() }, basket.timeout), d.send() }); return b }, i = function (a) { return h(a.url).then(function (b) { var c = j(a, b); return a.skipCache || g(a.key, c), c }) }, j = function (a, b) { var c = +new Date; return a.data = b.content, a.originalType = b.type, a.type = a.type || b.type, a.skipCache = a.skipCache || !1, a.stamp = c, a.expire = c + 60 * (a.expire || e) * 60 * 1e3, a }, k = function (a, b) { return !a || a.expire - +new Date < 0 || b.unique !== a.unique || basket.isValidItem && !basket.isValidItem(a, b) }, l = function (a) { var b, c, d; if (a.url) return a.key = a.key || a.url, b = basket.get(a.key), a.execute = a.execute !== !1, d = k(b, a), a.live || d ? (a.unique && (a.url += (a.url.indexOf("?") > 0 ? "&" : "?") + "basket-unique=" + a.unique), c = i(a), a.live && !d && (c = c.then(function (a) { return a }, function () { return b }))) : (b.type = a.type || b.originalType, b.execute = a.execute, c = new RSVP.Promise(function (a) { a(b) })), c }, m = function (a) { var d = b.createElement("script"); d.defer = !0, d.text = a.data, c.appendChild(d) }, n = { "default": m }, o = function (a) { return a.type && n[a.type] ? n[a.type](a) : n["default"](a) }, p = function (a) { return a.map(function (a) { return a.execute && o(a), a }) }, q = function () { var a, b, c = []; for (a = 0, b = arguments.length; b > a; a++)c.push(l(arguments[a])); return RSVP.all(c) }, r = function () { var a = q.apply(null, arguments), b = this.then(function () { return a }).then(p); return b.thenRequire = r, b }; a.basket = { require: function () { for (var a = 0, b = arguments.length; b > a; a++)arguments[a].execute = arguments[a].execute !== !1, arguments[a].once && f.indexOf(arguments[a].url) >= 0 ? arguments[a].execute = !1 : arguments[a].execute !== !1 && f.indexOf(arguments[a].url) < 0 && f.push(arguments[a].url); var c = q.apply(null, arguments).then(p); return c.thenRequire = r, c }, remove: function (a) { return localStorage.removeItem(d + a), this }, get: function (a) { var b = localStorage.getItem(d + a); try { return JSON.parse(b || "false") } catch (c) { return !1 } }, clear: function (a) { var b, c, e = +new Date; for (b in localStorage) c = b.split(d)[1], c && (!a || this.get(c).expire <= e) && this.remove(c); return this }, isValidItem: null, timeout: 5e3, addHandler: function (a, b) { Array.isArray(a) || (a = [a]), a.forEach(function (a) { n[a] = b }) }, removeHandler: function (a) { basket.addHandler(a, void 0) } }, basket.clear(!0) }(this, document);
//# sourceMappingURL=basket.min.js.map
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
/*!
  * Bootstrap v5.1.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory(global.Popper));
}(this, (function (Popper) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  const toType = obj => {
    if (obj === null || obj === undefined) {
      return `${obj}`;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = `#${hrefAttr.split('#')[1]}`;
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = obj => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  const getElement = obj => {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach(property => {
      const expectedTypes = configTypes[property];
      const value = config[property];
      const valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    });
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  const getjQuery = () => {
    const {
      jQuery
    } = window;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          DOMContentLoadedCallbacks.forEach(callback => callback());
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
    }

    const listLength = list.length;
    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const customEventsRegex = /^(mouseenter|mouseleave)/i;
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    const uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (let i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler, delegationSelector = null) {
    const uidEventList = Object.keys(events);

    for (let i = 0, len = uidEventList.length; i < len; i++) {
      const event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    const delegation = typeof handler === 'string';
    const originalHandler = delegation ? delegationFn : handler;
    let typeEvent = getTypeEvent(originalTypeEvent);
    const isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      const wrapFn = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const events = getEvent(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(handlerKey => {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },

    one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },

    off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getEvent(element);
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(elementEvent => {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      const storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(keyHandlers => {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      const isNative = nativeEvents.has(typeEvent);
      let jQueryEvent;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;
      let evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(key => {
          Object.defineProperty(evt, key, {
            get() {
              return args[key];
            }

          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  const elementMap = new Map();
  var Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const VERSION = '5.1.1';

  class BaseComponent {
    constructor(element) {
      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data.set(this._element, this.constructor.DATA_KEY, this);
    }

    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      Object.getOwnPropertyNames(this).forEach(propertyName => {
        this[propertyName] = null;
      });
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated);
    }
    /** Static */


    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (isDisabled(this)) {
        return;
      }

      const target = getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$d = 'alert';
  const DATA_KEY$c = 'bs.alert';
  const EVENT_KEY$c = `.${DATA_KEY$c}`;
  const EVENT_CLOSE = `close${EVENT_KEY$c}`;
  const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
  const CLASS_NAME_FADE$5 = 'fade';
  const CLASS_NAME_SHOW$8 = 'show';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Alert extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$d;
    } // Public


    close() {
      const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW$8);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
      this._element.remove();

      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  enableDismissTrigger(Alert, 'close');
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Alert to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Alert);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$c = 'button';
  const DATA_KEY$b = 'bs.button';
  const EVENT_KEY$b = `.${DATA_KEY$b}`;
  const DATA_API_KEY$7 = '.data-api';
  const CLASS_NAME_ACTIVE$3 = 'active';
  const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
  const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Button extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$c;
    } // Public


    toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Button.getOrCreateInstance(this);

        if (config === 'toggle') {
          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
    event.preventDefault();
    const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
    const data = Button.getOrCreateInstance(button);
    data.toggle();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Button to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Button);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    },

    offset(element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },

    position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const NODE_TEXT = 3;
  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
      return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
    }

  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$b = 'carousel';
  const DATA_KEY$a = 'bs.carousel';
  const EVENT_KEY$a = `.${DATA_KEY$a}`;
  const DATA_API_KEY$6 = '.data-api';
  const ARROW_LEFT_KEY = 'ArrowLeft';
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  const SWIPE_THRESHOLD = 40;
  const Default$a = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  const DefaultType$a = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  const ORDER_NEXT = 'next';
  const ORDER_PREV = 'prev';
  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';
  const KEY_TO_DIRECTION = {
    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
  };
  const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
  const EVENT_SLID = `slid${EVENT_KEY$a}`;
  const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
  const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
  const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
  const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
  const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
  const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
  const CLASS_NAME_CAROUSEL = 'carousel';
  const CLASS_NAME_ACTIVE$2 = 'active';
  const CLASS_NAME_SLIDE = 'slide';
  const CLASS_NAME_END = 'carousel-item-end';
  const CLASS_NAME_START = 'carousel-item-start';
  const CLASS_NAME_NEXT = 'carousel-item-next';
  const CLASS_NAME_PREV = 'carousel-item-prev';
  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
  const SELECTOR_ACTIVE$1 = '.active';
  const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  const SELECTOR_ITEM = '.carousel-item';
  const SELECTOR_ITEM_IMG = '.carousel-item img';
  const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  const SELECTOR_INDICATORS = '.carousel-indicators';
  const SELECTOR_INDICATOR = '[data-bs-target]';
  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
  const POINTER_TYPE_TOUCH = 'touch';
  const POINTER_TYPE_PEN = 'pen';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Carousel extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent);

      this._addEventListeners();
    } // Getters


    static get Default() {
      return Default$a;
    }

    static get NAME() {
      return NAME$b;
    } // Public


    next() {
      this._slide(ORDER_NEXT);
    }

    nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }

    prev() {
      this._slide(ORDER_PREV);
    }

    pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
        triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    }

    cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config && this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    }

    to(index) {
      this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      const activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

      this._slide(order, this._items[index]);
    } // Private


    _getConfig(config) {
      config = { ...Default$a,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$b, config, DefaultType$a);
      return config;
    }

    _handleSwipe() {
      const absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      const direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0;

      if (!direction) {
        return;
      }

      this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
    }

    _addEventListeners() {
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
      }

      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
        EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
      }

      if (this._config.touch && this._touchSupported) {
        this._addTouchEventListeners();
      }
    }

    _addTouchEventListeners() {
      const hasPointerPenTouch = event => {
        return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
      };

      const start = event => {
        if (hasPointerPenTouch(event)) {
          this.touchStartX = event.clientX;
        } else if (!this._pointerEvent) {
          this.touchStartX = event.touches[0].clientX;
        }
      };

      const move = event => {
        // ensure swiping with one touch and not pinching
        this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
      };

      const end = event => {
        if (hasPointerPenTouch(event)) {
          this.touchDeltaX = event.clientX - this.touchStartX;
        }

        this._handleSwipe();

        if (this._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          this.pause();

          if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
          }

          this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
        }
      };

      SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
        EventHandler.on(itemImg, EVENT_DRAG_START, e => e.preventDefault());
      });

      if (this._pointerEvent) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
        EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
        EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
        EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
      }
    }

    _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      const direction = KEY_TO_DIRECTION[event.key];

      if (direction) {
        event.preventDefault();

        this._slide(direction);
      }
    }

    _getItemIndex(element) {
      this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
      return this._items.indexOf(element);
    }

    _getItemByOrder(order, activeElement) {
      const isNext = order === ORDER_NEXT;
      return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
    }

    _triggerSlideEvent(relatedTarget, eventDirectionName) {
      const targetIndex = this._getItemIndex(relatedTarget);

      const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

      return EventHandler.trigger(this._element, EVENT_SLIDE, {
        relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
    }

    _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
        activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
        activeIndicator.removeAttribute('aria-current');
        const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

        for (let i = 0; i < indicators.length; i++) {
          if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
            indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
            indicators[i].setAttribute('aria-current', 'true');
            break;
          }
        }
      }
    }

    _updateInterval() {
      const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      if (!element) {
        return;
      }

      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    }

    _slide(directionOrOrder, element) {
      const order = this._directionToOrder(directionOrOrder);

      const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

      const activeElementIndex = this._getItemIndex(activeElement);

      const nextElement = element || this._getItemByOrder(order, activeElement);

      const nextElementIndex = this._getItemIndex(nextElement);

      const isCycling = Boolean(this._interval);
      const isNext = order === ORDER_NEXT;
      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

      const eventDirectionName = this._orderToDirection(order);

      if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
        this._isSliding = false;
        return;
      }

      if (this._isSliding) {
        return;
      }

      const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.defaultPrevented) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;

      const triggerSlidEvent = () => {
        EventHandler.trigger(this._element, EVENT_SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });
      };

      if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
        nextElement.classList.add(orderClassName);
        reflow(nextElement);
        activeElement.classList.add(directionalClassName);
        nextElement.classList.add(directionalClassName);

        const completeCallBack = () => {
          nextElement.classList.remove(directionalClassName, orderClassName);
          nextElement.classList.add(CLASS_NAME_ACTIVE$2);
          activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
          this._isSliding = false;
          setTimeout(triggerSlidEvent, 0);
        };

        this._queueCallback(completeCallBack, activeElement, true);
      } else {
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        this._isSliding = false;
        triggerSlidEvent();
      }

      if (isCycling) {
        this.cycle();
      }
    }

    _directionToOrder(direction) {
      if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
        return direction;
      }

      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }

      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }

    _orderToDirection(order) {
      if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
        return order;
      }

      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }

      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    } // Static


    static carouselInterface(element, config) {
      const data = Carousel.getOrCreateInstance(element, config);
      let {
        _config
      } = data;

      if (typeof config === 'object') {
        _config = { ..._config,
          ...config
        };
      }

      const action = typeof config === 'string' ? config : _config.slide;

      if (typeof config === 'number') {
        data.to(config);
      } else if (typeof action === 'string') {
        if (typeof data[action] === 'undefined') {
          throw new TypeError(`No method named "${action}"`);
        }

        data[action]();
      } else if (_config.interval && _config.ride) {
        data.pause();
        data.cycle();
      }
    }

    static jQueryInterface(config) {
      return this.each(function () {
        Carousel.carouselInterface(this, config);
      });
    }

    static dataApiClickHandler(event) {
      const target = getElementFromSelector(this);

      if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
        return;
      }

      const config = { ...Manipulator.getDataAttributes(target),
        ...Manipulator.getDataAttributes(this)
      };
      const slideIndex = this.getAttribute('data-bs-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel.carouselInterface(target, config);

      if (slideIndex) {
        Carousel.getInstance(target).to(slideIndex);
      }

      event.preventDefault();
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
  EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

    for (let i = 0, len = carousels.length; i < len; i++) {
      Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Carousel to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Carousel);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$a = 'collapse';
  const DATA_KEY$9 = 'bs.collapse';
  const EVENT_KEY$9 = `.${DATA_KEY$9}`;
  const DATA_API_KEY$5 = '.data-api';
  const Default$9 = {
    toggle: true,
    parent: null
  };
  const DefaultType$9 = {
    toggle: 'boolean',
    parent: '(null|element)'
  };
  const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
  const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
  const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
  const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
  const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
  const CLASS_NAME_SHOW$7 = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Collapse extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._isTransitioning = false;
      this._config = this._getConfig(config);
      this._triggerArray = [];
      const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

      for (let i = 0, len = toggleList.length; i < len; i++) {
        const elem = toggleList[i];
        const selector = getSelectorFromElement(elem);
        const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

        if (selector !== null && filterElement.length) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    static get Default() {
      return Default$9;
    }

    static get NAME() {
      return NAME$a;
    } // Public


    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }

      let actives = [];
      let activesData;

      if (this._config.parent) {
        const children = SelectorEngine.find(`.${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`, this._config.parent);
        actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
      }

      const container = SelectorEngine.findOne(this._selector);

      if (actives.length) {
        const tempActiveData = actives.find(elem => container !== elem);
        activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      actives.forEach(elemActive => {
        if (container !== elemActive) {
          Collapse.getOrCreateInstance(elemActive, {
            toggle: false
          }).hide();
        }

        if (!activesData) {
          Data.set(elemActive, DATA_KEY$9, null);
        }
      });

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

        this._element.style[dimension] = '';
        EventHandler.trigger(this._element, EVENT_SHOWN$5);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

      if (startEvent.defaultPrevented) {
        return;
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      const triggerArrayLength = this._triggerArray.length;

      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);

        if (elem && !this._isShown(elem)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler.trigger(this._element, EVENT_HIDDEN$5);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW$7);
    } // Private


    _getConfig(config) {
      config = { ...Default$9,
        ...Manipulator.getDataAttributes(this._element),
        ...config
      };
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = getElement(config.parent);
      typeCheckConfig(NAME$a, config, DefaultType$9);
      return config;
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }

      const children = SelectorEngine.find(`.${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`, this._config.parent);
      SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
        const selected = getElementFromSelector(element);

        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      });
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      triggerArray.forEach(elem => {
        if (isOpen) {
          elem.classList.remove(CLASS_NAME_COLLAPSED);
        } else {
          elem.classList.add(CLASS_NAME_COLLAPSED);
        }

        elem.setAttribute('aria-expanded', isOpen);
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const _config = {};

        if (typeof config === 'string' && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    const selector = getSelectorFromElement(this);
    const selectorElements = SelectorEngine.find(selector);
    selectorElements.forEach(element => {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  //const NAME$9 = 'dropdown';
  //const DATA_KEY$8 = 'bs.dropdown';
  //const EVENT_KEY$8 = `.${DATA_KEY$8}`;
  //const DATA_API_KEY$4 = '.data-api';
  //const ESCAPE_KEY$2 = 'Escape';
  //const SPACE_KEY = 'Space';
  //const TAB_KEY$1 = 'Tab';
  //const ARROW_UP_KEY = 'ArrowUp';
  //const ARROW_DOWN_KEY = 'ArrowDown';
  //const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  //const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
  //const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
  //const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
  //const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
  //const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
  //const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
  //const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
  //const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
  //const CLASS_NAME_SHOW$6 = 'show';
  //const CLASS_NAME_DROPUP = 'dropup';
  //const CLASS_NAME_DROPEND = 'dropend';
  //const CLASS_NAME_DROPSTART = 'dropstart';
  //const CLASS_NAME_NAVBAR = 'navbar';
  //const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
  //const SELECTOR_MENU = '.dropdown-menu';
  //const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  //const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  //const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
  //const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
  //const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
  //const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
  //const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
  //const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
  //const Default$8 = {
  //  offset: [0, 2],
  //  boundary: 'clippingParents',
  //  reference: 'toggle',
  //  display: 'dynamic',
  //  popperConfig: null,
  //  autoClose: true
  //};
  //const DefaultType$8 = {
  //  offset: '(array|string|function)',
  //  boundary: '(string|element)',
  //  reference: '(string|element|object)',
  //  display: 'string',
  //  popperConfig: '(null|object|function)',
  //  autoClose: '(boolean|string)'
  //};
  ///**
  // * ------------------------------------------------------------------------
  // * Class Definition
  // * ------------------------------------------------------------------------
  // */

  //class Dropdown extends BaseComponent {
  //  constructor(element, config) {
  //    super(element);
  //    this._popper = null;
  //    this._config = this._getConfig(config);
  //    this._menu = this._getMenuElement();
  //    this._inNavbar = this._detectNavbar();
  //  } // Getters


  //  static get Default() {
  //    return Default$8;
  //  }

  //  static get DefaultType() {
  //    return DefaultType$8;
  //  }

  //  static get NAME() {
  //    return NAME$9;
  //  } // Public


  //  toggle() {
  //    return this._isShown() ? this.hide() : this.show();
  //  }

  //  show() {
  //    if (isDisabled(this._element) || this._isShown(this._menu)) {
  //      return;
  //    }

  //    const relatedTarget = {
  //      relatedTarget: this._element
  //    };
  //    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

  //    if (showEvent.defaultPrevented) {
  //      return;
  //    }

  //    const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

  //    if (this._inNavbar) {
  //      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
  //    } else {
  //      this._createPopper(parent);
  //    } // If this is a touch-enabled device we add extra
  //    // empty mouseover listeners to the body's immediate children;
  //    // only needed because of broken event delegation on iOS
  //    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


  //    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
  //      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
  //    }

  //    this._element.focus();

  //    this._element.setAttribute('aria-expanded', true);

  //    this._menu.classList.add(CLASS_NAME_SHOW$6);

  //    this._element.classList.add(CLASS_NAME_SHOW$6);

  //    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  //  }

  //  hide() {
  //    if (isDisabled(this._element) || !this._isShown(this._menu)) {
  //      return;
  //    }

  //    const relatedTarget = {
  //      relatedTarget: this._element
  //    };

  //    this._completeHide(relatedTarget);
  //  }

  //  dispose() {
  //    if (this._popper) {
  //      this._popper.destroy();
  //    }

  //    super.dispose();
  //  }

  //  update() {
  //    this._inNavbar = this._detectNavbar();

  //    if (this._popper) {
  //      this._popper.update();
  //    }
  //  } // Private


  //  _completeHide(relatedTarget) {
  //    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

  //    if (hideEvent.defaultPrevented) {
  //      return;
  //    } // If this is a touch-enabled device we remove the extra
  //    // empty mouseover listeners we added for iOS support


  //    if ('ontouchstart' in document.documentElement) {
  //      [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
  //    }

  //    if (this._popper) {
  //      this._popper.destroy();
  //    }

  //    this._menu.classList.remove(CLASS_NAME_SHOW$6);

  //    this._element.classList.remove(CLASS_NAME_SHOW$6);

  //    this._element.setAttribute('aria-expanded', 'false');

  //    Manipulator.removeDataAttribute(this._menu, 'popper');
  //    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  //  }

  //  _getConfig(config) {
  //    config = { ...this.constructor.Default,
  //      ...Manipulator.getDataAttributes(this._element),
  //      ...config
  //    };
  //    typeCheckConfig(NAME$9, config, this.constructor.DefaultType);

  //    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
  //      // Popper virtual elements require a getBoundingClientRect method
  //      throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
  //    }

  //    return config;
  //  }

  //  _createPopper(parent) {
  //    if (typeof Popper__namespace === 'undefined') {
  //      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
  //    }

  //    let referenceElement = this._element;

  //    if (this._config.reference === 'parent') {
  //      referenceElement = parent;
  //    } else if (isElement(this._config.reference)) {
  //      referenceElement = getElement(this._config.reference);
  //    } else if (typeof this._config.reference === 'object') {
  //      referenceElement = this._config.reference;
  //    }

  //    const popperConfig = this._getPopperConfig();

  //    const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
  //    this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);

  //    if (isDisplayStatic) {
  //      Manipulator.setDataAttribute(this._menu, 'popper', 'static');
  //    }
  //  }

  //  _isShown(element = this._element) {
  //    return element.classList.contains(CLASS_NAME_SHOW$6);
  //  }

  //  _getMenuElement() {
  //    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  //  }

  //  _getPlacement() {
  //    const parentDropdown = this._element.parentNode;

  //    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
  //      return PLACEMENT_RIGHT;
  //    }

  //    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
  //      return PLACEMENT_LEFT;
  //    } // We need to trim the value because custom properties can also include spaces


  //    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

  //    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
  //      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
  //    }

  //    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  //  }

  //  _detectNavbar() {
  //    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  //  }

  //  _getOffset() {
  //    const {
  //      offset
  //    } = this._config;

  //    if (typeof offset === 'string') {
  //      return offset.split(',').map(val => Number.parseInt(val, 10));
  //    }

  //    if (typeof offset === 'function') {
  //      return popperData => offset(popperData, this._element);
  //    }

  //    return offset;
  //  }

  //  _getPopperConfig() {
  //    const defaultBsPopperConfig = {
  //      placement: this._getPlacement(),
  //      modifiers: [{
  //        name: 'preventOverflow',
  //        options: {
  //          boundary: this._config.boundary
  //        }
  //      }, {
  //        name: 'offset',
  //        options: {
  //          offset: this._getOffset()
  //        }
  //      }]
  //    }; // Disable Popper if we have a static display

  //    if (this._config.display === 'static') {
  //      defaultBsPopperConfig.modifiers = [{
  //        name: 'applyStyles',
  //        enabled: false
  //      }];
  //    }

  //    return { ...defaultBsPopperConfig,
  //      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
  //    };
  //  }

  //  _selectMenuItem({
  //    key,
  //    target
  //  }) {
  //    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

  //    if (!items.length) {
  //      return;
  //    } // if target isn't included in items (e.g. when expanding the dropdown)
  //    // allow cycling to get the last item in case key equals ARROW_UP_KEY


  //    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
  //  } // Static


  //  static jQueryInterface(config) {
  //    return this.each(function () {
  //      const data = Dropdown.getOrCreateInstance(this, config);

  //      if (typeof config !== 'string') {
  //        return;
  //      }

  //      if (typeof data[config] === 'undefined') {
  //        throw new TypeError(`No method named "${config}"`);
  //      }

  //      data[config]();
  //    });
  //  }

  //  static clearMenus(event) {
  //    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
  //      return;
  //    }

  //    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

  //    for (let i = 0, len = toggles.length; i < len; i++) {
  //      const context = Dropdown.getInstance(toggles[i]);

  //      if (!context || context._config.autoClose === false) {
  //        continue;
  //      }

  //      if (!context._isShown()) {
  //        continue;
  //      }

  //      const relatedTarget = {
  //        relatedTarget: context._element
  //      };

  //      if (event) {
  //        const composedPath = event.composedPath();
  //        const isMenuTarget = composedPath.includes(context._menu);

  //        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
  //          continue;
  //        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


  //        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
  //          continue;
  //        }

  //        if (event.type === 'click') {
  //          relatedTarget.clickEvent = event;
  //        }
  //      }

  //      context._completeHide(relatedTarget);
  //    }
  //  }

  //  static getParentFromElement(element) {
  //    return getElementFromSelector(element) || element.parentNode;
  //  }

  //  static dataApiKeydownHandler(event) {
  //    // If not input/textarea:
  //    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
  //    // If input/textarea:
  //    //  - If space key => not a dropdown command
  //    //  - If key is other than escape
  //    //    - If key is not up or down => not a dropdown command
  //    //    - If trigger inside the menu => not a dropdown command
  //    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
  //      return;
  //    }

  //    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);

  //    if (!isActive && event.key === ESCAPE_KEY$2) {
  //      return;
  //    }

  //    event.preventDefault();
  //    event.stopPropagation();

  //    if (isDisabled(this)) {
  //      return;
  //    }

  //    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
  //    const instance = Dropdown.getOrCreateInstance(getToggleButton);

  //    if (event.key === ESCAPE_KEY$2) {
  //      instance.hide();
  //      return;
  //    }

  //    if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
  //      if (!isActive) {
  //        instance.show();
  //      }

  //      instance._selectMenuItem(event);

  //      return;
  //    }

  //    if (!isActive || event.key === SPACE_KEY) {
  //      Dropdown.clearMenus();
  //    }
  //  }

  //}
  ///**
  // * ------------------------------------------------------------------------
  // * Data Api implementation
  // * ------------------------------------------------------------------------
  // */


  //EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
  //EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  //EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
  //EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  //EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  //  event.preventDefault();
  //  Dropdown.getOrCreateInstance(this).toggle();
  //});
  ///**
  // * ------------------------------------------------------------------------
  // * jQuery
  // * ------------------------------------------------------------------------
  // * add .Dropdown to jQuery only if jQuery is present
  // */

  //defineJQueryPlugin(Dropdown);



  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/scrollBar.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
  const SELECTOR_STICKY_CONTENT = '.sticky-top';

  class ScrollBarHelper {
    constructor() {
      this._element = document.body;
    }

    getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }

    hide() {
      const width = this.getWidth();

      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


      this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


      this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

      this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
    }

    _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');

      this._element.style.overflow = 'hidden';
    }

    _setElementAttributes(selector, styleProp, callback) {
      const scrollbarWidth = this.getWidth();

      const manipulationCallBack = element => {
        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }

        this._saveInitialAttribute(element, styleProp);

        const calculatedValue = window.getComputedStyle(element)[styleProp];
        element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    reset() {
      this._resetElementAttributes(this._element, 'overflow');

      this._resetElementAttributes(this._element, 'paddingRight');

      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
    }

    _saveInitialAttribute(element, styleProp) {
      const actualValue = element.style[styleProp];

      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProp, actualValue);
      }
    }

    _resetElementAttributes(selector, styleProp) {
      const manipulationCallBack = element => {
        const value = Manipulator.getDataAttribute(element, styleProp);

        if (typeof value === 'undefined') {
          element.style.removeProperty(styleProp);
        } else {
          Manipulator.removeDataAttribute(element, styleProp);
          element.style[styleProp] = value;
        }
      };

      this._applyManipulationCallback(selector, manipulationCallBack);
    }

    _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
      } else {
        SelectorEngine.find(selector, this._element).forEach(callBack);
      }
    }

    isOverflowing() {
      return this.getWidth() > 0;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/backdrop.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$7 = {
    className: 'modal-backdrop',
    isVisible: true,
    // if false, we use the backdrop helper without adding any element to the dom
    isAnimated: false,
    rootElement: 'body',
    // give the choice to place backdrop under different elements
    clickCallback: null
  };
  const DefaultType$7 = {
    className: 'string',
    isVisible: 'boolean',
    isAnimated: 'boolean',
    rootElement: '(element|string)',
    clickCallback: '(function|null)'
  };
  const NAME$8 = 'backdrop';
  const CLASS_NAME_FADE$4 = 'fade';
  const CLASS_NAME_SHOW$5 = 'show';
  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;

  class Backdrop {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isAppended = false;
      this._element = null;
    }

    show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._append();

      if (this._config.isAnimated) {
        reflow(this._getElement());
      }

      this._getElement().classList.add(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        execute(callback);
      });
    }

    hide(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }

      this._getElement().classList.remove(CLASS_NAME_SHOW$5);

      this._emulateAnimation(() => {
        this.dispose();
        execute(callback);
      });
    } // Private


    _getElement() {
      if (!this._element) {
        const backdrop = document.createElement('div');
        backdrop.className = this._config.className;

        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }

        this._element = backdrop;
      }

      return this._element;
    }

    _getConfig(config) {
      config = { ...Default$7,
        ...(typeof config === 'object' ? config : {})
      }; // use getElement() with the default "body" to get a fresh Element on each instantiation

      config.rootElement = getElement(config.rootElement);
      typeCheckConfig(NAME$8, config, DefaultType$7);
      return config;
    }

    _append() {
      if (this._isAppended) {
        return;
      }

      this._config.rootElement.append(this._getElement());

      EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
        execute(this._config.clickCallback);
      });
      this._isAppended = true;
    }

    dispose() {
      if (!this._isAppended) {
        return;
      }

      EventHandler.off(this._element, EVENT_MOUSEDOWN);

      this._element.remove();

      this._isAppended = false;
    }

    _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/focustrap.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  const Default$6 = {
    trapElement: null,
    // The element to trap focus inside of
    autofocus: true
  };
  const DefaultType$6 = {
    trapElement: 'element',
    autofocus: 'boolean'
  };
  const NAME$7 = 'focustrap';
  const DATA_KEY$7 = 'bs.focustrap';
  const EVENT_KEY$7 = `.${DATA_KEY$7}`;
  const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
  const TAB_KEY = 'Tab';
  const TAB_NAV_FORWARD = 'forward';
  const TAB_NAV_BACKWARD = 'backward';

  class FocusTrap {
    constructor(config) {
      this._config = this._getConfig(config);
      this._isActive = false;
      this._lastTabNavDirection = null;
    }

    activate() {
      const {
        trapElement,
        autofocus
      } = this._config;

      if (this._isActive) {
        return;
      }

      if (autofocus) {
        trapElement.focus();
      }

      EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop

      EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event));
      EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
      this._isActive = true;
    }

    deactivate() {
      if (!this._isActive) {
        return;
      }

      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$7);
    } // Private


    _handleFocusin(event) {
      const {
        target
      } = event;
      const {
        trapElement
      } = this._config;

      if (target === document || target === trapElement || trapElement.contains(target)) {
        return;
      }

      const elements = SelectorEngine.focusableChildren(trapElement);

      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }

    _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }

      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }

    _getConfig(config) {
      config = { ...Default$6,
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$7, config, DefaultType$6);
      return config;
    }

  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$6 = 'modal';
  const DATA_KEY$6 = 'bs.modal';
  const EVENT_KEY$6 = `.${DATA_KEY$6}`;
  const DATA_API_KEY$3 = '.data-api';
  const ESCAPE_KEY$1 = 'Escape';
  const Default$5 = {
    backdrop: true,
    keyboard: true,
    focus: true
  };
  const DefaultType$5 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean'
  };
  const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
  const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
  const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
  const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
  const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
  const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
  const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
  const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
  const CLASS_NAME_OPEN = 'modal-open';
  const CLASS_NAME_FADE$3 = 'fade';
  const CLASS_NAME_SHOW$4 = 'show';
  const CLASS_NAME_STATIC = 'modal-static';
  const OPEN_SELECTOR$1 = '.modal.show';
  const SELECTOR_DIALOG = '.modal-dialog';
  const SELECTOR_MODAL_BODY = '.modal-body';
  const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Modal extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();
      this._isShown = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollBar = new ScrollBarHelper();
    } // Getters


    static get Default() {
      return Default$5;
    }

    static get NAME() {
      return NAME$6;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown || this._isTransitioning) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;

      if (this._isAnimated()) {
        this._isTransitioning = true;
      }

      this._scrollBar.hide();

      document.body.classList.add(CLASS_NAME_OPEN);

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
        EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
          if (event.target === this._element) {
            this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(() => this._showElement(relatedTarget));
    }

    hide() {
      if (!this._isShown || this._isTransitioning) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._isShown = false;

      const isAnimated = this._isAnimated();

      if (isAnimated) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      this._focustrap.deactivate();

      this._element.classList.remove(CLASS_NAME_SHOW$4);

      EventHandler.off(this._element, EVENT_CLICK_DISMISS);
      EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

      this._queueCallback(() => this._hideModal(), this._element, isAnimated);
    }

    dispose() {
      [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    }

    handleUpdate() {
      this._adjustDialog();
    } // Private


    _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value
        isAnimated: this._isAnimated()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _getConfig(config) {
      config = { ...Default$5,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$6, config, DefaultType$5);
      return config;
    }

    _showElement(relatedTarget) {
      const isAnimated = this._isAnimated();

      const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.append(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.scrollTop = 0;

      if (modalBody) {
        modalBody.scrollTop = 0;
      }

      if (isAnimated) {
        reflow(this._element);
      }

      this._element.classList.add(CLASS_NAME_SHOW$4);

      const transitionComplete = () => {
        if (this._config.focus) {
          this._focustrap.activate();
        }

        this._isTransitioning = false;
        EventHandler.trigger(this._element, EVENT_SHOWN$3, {
          relatedTarget
        });
      };

      this._queueCallback(transitionComplete, this._dialog, isAnimated);
    }

    _setEscapeEvent() {
      if (this._isShown) {
        EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
          if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
            event.preventDefault();
            this.hide();
          } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
            this._triggerBackdropTransition();
          }
        });
      } else {
        EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
      }
    }

    _setResizeEvent() {
      if (this._isShown) {
        EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
      } else {
        EventHandler.off(window, EVENT_RESIZE);
      }
    }

    _hideModal() {
      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._isTransitioning = false;

      this._backdrop.hide(() => {
        document.body.classList.remove(CLASS_NAME_OPEN);

        this._resetAdjustments();

        this._scrollBar.reset();

        EventHandler.trigger(this._element, EVENT_HIDDEN$3);
      });
    }

    _showBackdrop(callback) {
      EventHandler.on(this._element, EVENT_CLICK_DISMISS, event => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false;
          return;
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (this._config.backdrop === true) {
          this.hide();
        } else if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition();
        }
      });

      this._backdrop.show(callback);
    }

    _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }

    _triggerBackdropTransition() {
      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const {
        classList,
        scrollHeight,
        style
      } = this._element;
      const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

      if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
        return;
      }

      if (!isModalOverflowing) {
        style.overflowY = 'hidden';
      }

      classList.add(CLASS_NAME_STATIC);

      this._queueCallback(() => {
        classList.remove(CLASS_NAME_STATIC);

        if (!isModalOverflowing) {
          this._queueCallback(() => {
            style.overflowY = '';
          }, this._dialog);
        }
      }, this._dialog);

      this._element.focus();
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // ----------------------------------------------------------------------


    _adjustDialog() {
      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      const scrollbarWidth = this._scrollBar.getWidth();

      const isBodyOverflowing = scrollbarWidth > 0;

      if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
        this._element.style.paddingLeft = `${scrollbarWidth}px`;
      }

      if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
        this._element.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    } // Static


    static jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        const data = Modal.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](relatedTarget);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    EventHandler.one(target, EVENT_SHOW$3, showEvent => {
      if (showEvent.defaultPrevented) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      EventHandler.one(target, EVENT_HIDDEN$3, () => {
        if (isVisible(this)) {
          this.focus();
        }
      });
    }); // avoid conflict when clicking moddal toggler while another one is open

    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

    if (allReadyOpen) {
      Modal.getInstance(allReadyOpen).hide();
    }

    const data = Modal.getOrCreateInstance(target);
    data.toggle(this);
  });
  enableDismissTrigger(Modal);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Modal to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Modal);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): offcanvas.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$5 = 'offcanvas';
  const DATA_KEY$5 = 'bs.offcanvas';
  const EVENT_KEY$5 = `.${DATA_KEY$5}`;
  const DATA_API_KEY$2 = '.data-api';
  const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
  const ESCAPE_KEY = 'Escape';
  const Default$4 = {
    backdrop: true,
    keyboard: true,
    scroll: false
  };
  const DefaultType$4 = {
    backdrop: 'boolean',
    keyboard: 'boolean',
    scroll: 'boolean'
  };
  const CLASS_NAME_SHOW$3 = 'show';
  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
  const OPEN_SELECTOR = '.offcanvas.show';
  const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
  const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
  const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
  const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
  const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
  const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Offcanvas extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._isShown = false;
      this._backdrop = this._initializeBackDrop();
      this._focustrap = this._initializeFocusTrap();

      this._addEventListeners();
    } // Getters


    static get NAME() {
      return NAME$5;
    }

    static get Default() {
      return Default$4;
    } // Public


    toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }

    show(relatedTarget) {
      if (this._isShown) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
        relatedTarget
      });

      if (showEvent.defaultPrevented) {
        return;
      }

      this._isShown = true;
      this._element.style.visibility = 'visible';

      this._backdrop.show();

      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      this._element.setAttribute('role', 'dialog');

      this._element.classList.add(CLASS_NAME_SHOW$3);

      const completeCallBack = () => {
        if (!this._config.scroll) {
          this._focustrap.activate();
        }

        EventHandler.trigger(this._element, EVENT_SHOWN$2, {
          relatedTarget
        });
      };

      this._queueCallback(completeCallBack, this._element, true);
    }

    hide() {
      if (!this._isShown) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

      if (hideEvent.defaultPrevented) {
        return;
      }

      this._focustrap.deactivate();

      this._element.blur();

      this._isShown = false;

      this._element.classList.remove(CLASS_NAME_SHOW$3);

      this._backdrop.hide();

      const completeCallback = () => {
        this._element.setAttribute('aria-hidden', true);

        this._element.removeAttribute('aria-modal');

        this._element.removeAttribute('role');

        this._element.style.visibility = 'hidden';

        if (!this._config.scroll) {
          new ScrollBarHelper().reset();
        }

        EventHandler.trigger(this._element, EVENT_HIDDEN$2);
      };

      this._queueCallback(completeCallback, this._element, true);
    }

    dispose() {
      this._backdrop.dispose();

      this._focustrap.deactivate();

      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default$4,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      typeCheckConfig(NAME$5, config, DefaultType$4);
      return config;
    }

    _initializeBackDrop() {
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: this._config.backdrop,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide()
      });
    }

    _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }

    _addEventListeners() {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
        if (this._config.keyboard && event.key === ESCAPE_KEY) {
          this.hide();
        }
      });
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Offcanvas.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
    const target = getElementFromSelector(this);

    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$2, () => {
      // focus on trigger when it is closed
      if (isVisible(this)) {
        this.focus();
      }
    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

    const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

    if (allReadyOpen && allReadyOpen !== target) {
      Offcanvas.getInstance(allReadyOpen).hide();
    }

    const data = Offcanvas.getOrCreateInstance(target);
    data.toggle(this);
  });
  EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
  enableDismissTrigger(Offcanvas);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  defineJQueryPlugin(Offcanvas);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attr, allowedAttributeList) => {
    const attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attrName)) {
      if (uriAttrs.has(attrName)) {
        return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
      }

      return true;
    }

    const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp); // Check if a regular expression validates the attribute.

    for (let i = 0, len = regExp.length; i < len; i++) {
      if (regExp[i].test(attrName)) {
        return true;
      }
    }

    return false;
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const allowlistKeys = Object.keys(allowList);
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (let i = 0, len = elements.length; i < len; i++) {
      const el = elements[i];
      const elName = el.nodeName.toLowerCase();

      if (!allowlistKeys.includes(elName)) {
        el.remove();
        continue;
      }

      const attributeList = [].concat(...el.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
      attributeList.forEach(attr => {
        if (!allowedAttribute(attr, allowedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$4 = 'tooltip';
  const DATA_KEY$4 = 'bs.tooltip';
  const EVENT_KEY$4 = `.${DATA_KEY$4}`;
  const CLASS_PREFIX$1 = 'bs-tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const DefaultType$3 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(array|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacements: 'array',
    boundary: '(string|element)',
    customClass: '(string|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    allowList: 'object',
    popperConfig: '(null|object|function)'
  };
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: isRTL() ? 'right' : 'left'
  };
  const Default$3 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: [0, 0],
    container: false,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    boundary: 'clippingParents',
    customClass: '',
    sanitize: true,
    sanitizeFn: null,
    allowList: DefaultAllowlist,
    popperConfig: null
  };
  const Event$2 = {
    HIDE: `hide${EVENT_KEY$4}`,
    HIDDEN: `hidden${EVENT_KEY$4}`,
    SHOW: `show${EVENT_KEY$4}`,
    SHOWN: `shown${EVENT_KEY$4}`,
    INSERTED: `inserted${EVENT_KEY$4}`,
    CLICK: `click${EVENT_KEY$4}`,
    FOCUSIN: `focusin${EVENT_KEY$4}`,
    FOCUSOUT: `focusout${EVENT_KEY$4}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
  };
  const CLASS_NAME_FADE$2 = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW$2 = 'show';
  const HOVER_STATE_SHOW = 'show';
  const HOVER_STATE_OUT = 'out';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tooltip extends BaseComponent {
    constructor(element, config) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      super(element); // private

      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this._config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    static get Default() {
      return Default$3;
    }

    static get NAME() {
      return NAME$4;
    }

    static get Event() {
      return Event$2;
    }

    static get DefaultType() {
      return DefaultType$3;
    } // Public


    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        const context = this._initializeOnDelegatedTarget(event);

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this.isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
      const shadowRoot = findShadowRoot(this._element);
      const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
      // This will be removed later in favor of a `setContent` method


      if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
        this._disposePopper();

        this.tip.remove();
        this.tip = null;
      }

      const tip = this.getTipElement();
      const tipId = getUID(this.constructor.NAME);
      tip.setAttribute('id', tipId);

      this._element.setAttribute('aria-describedby', tipId);

      if (this._config.animation) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }

      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

      const attachment = this._getAttachment(placement);

      this._addAttachmentClass(attachment);

      const {
        container
      } = this._config;
      Data.set(tip, this.constructor.DATA_KEY, this);

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
      }

      tip.classList.add(CLASS_NAME_SHOW$2);

      const customClass = this._resolvePossibleFunction(this._config.customClass);

      if (customClass) {
        tip.classList.add(...customClass.split(' '));
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(element => {
          EventHandler.on(element, 'mouseover', noop);
        });
      }

      const complete = () => {
        const prevHoverState = this._hoverState;
        this._hoverState = null;
        EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(null, this);
        }
      };

      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

      this._queueCallback(complete, this.tip, isAnimated);
    }

    hide() {
      if (!this._popper) {
        return;
      }

      const tip = this.getTipElement();

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (this._hoverState !== HOVER_STATE_SHOW) {
          tip.remove();
        }

        this._cleanTipClass();

        this._element.removeAttribute('aria-describedby');

        EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

        this._disposePopper();
      };

      const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

      this._queueCallback(complete, this.tip, isAnimated);

      this._hoverState = '';
    }

    update() {
      if (this._popper !== null) {
        this._popper.update();
      }
    } // Protected


    isWithContent() {
      return Boolean(this.getTitle());
    }

    getTipElement() {
      if (this.tip) {
        return this.tip;
      }

      const element = document.createElement('div');
      element.innerHTML = this._config.template;
      const tip = element.children[0];
      this.setContent(tip);
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      this.tip = tip;
      return this.tip;
    }

    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
    }

    _sanitizeAndSetContent(template, content, selector) {
      const templateElement = SelectorEngine.findOne(selector, template);

      if (!content && templateElement) {
        templateElement.remove();
        return;
      } // we use append for html objects to maintain js events


      this.setElementContent(templateElement, content);
    }

    setElementContent(element, content) {
      if (element === null) {
        return;
      }

      if (isElement(content)) {
        content = getElement(content); // content is a DOM node or a jQuery

        if (this._config.html) {
          if (content.parentNode !== element) {
            element.innerHTML = '';
            element.append(content);
          }
        } else {
          element.textContent = content.textContent;
        }

        return;
      }

      if (this._config.html) {
        if (this._config.sanitize) {
          content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
        }

        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }

    getTitle() {
      const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

      return this._resolvePossibleFunction(title);
    }

    updateAttachment(attachment) {
      if (attachment === 'right') {
        return 'end';
      }

      if (attachment === 'left') {
        return 'start';
      }

      return attachment;
    } // Private


    _initializeOnDelegatedTarget(event, context) {
      return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(val => Number.parseInt(val, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(content) {
      return typeof content === 'function' ? content.call(this._element) : content;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'onChange',
          enabled: true,
          phase: 'afterWrite',
          fn: data => this._handlePopperPlacementChange(data)
        }],
        onFirstUpdate: data => {
          if (data.options.placement !== data.placement) {
            this._handlePopperPlacementChange(data);
          }
        }
      };
      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _addAttachmentClass(attachment) {
      this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
    }

    _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    }

    _setListeners() {
      const triggers = this._config.trigger.split(' ');

      triggers.forEach(trigger => {
        if (trigger === 'click') {
          EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
          EventHandler.on(this._element, eventIn, this._config.selector, event => this._enter(event));
          EventHandler.on(this._element, eventOut, this._config.selector, event => this._leave(event));
        }
      });

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this._config.selector) {
        this._config = { ...this._config,
          trigger: 'manual',
          selector: ''
        };
      } else {
        this._fixTitle();
      }
    }

    _fixTitle() {
      const title = this._element.getAttribute('title');

      const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

      if (title || originalTitleType !== 'string') {
        this._element.setAttribute('data-bs-original-title', title || '');

        if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
          this._element.setAttribute('aria-label', title);
        }

        this._element.setAttribute('title', '');
      }
    }

    _enter(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
      }

      if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
        context._hoverState = HOVER_STATE_SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_SHOW;

      if (!context._config.delay || !context._config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_SHOW) {
          context.show();
        }
      }, context._config.delay.show);
    }

    _leave(event, context) {
      context = this._initializeOnDelegatedTarget(event, context);

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HOVER_STATE_OUT;

      if (!context._config.delay || !context._config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(() => {
        if (context._hoverState === HOVER_STATE_OUT) {
          context.hide();
        }
      }, context._config.delay.hide);
    }

    _isWithActiveTrigger() {
      for (const trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    }

    _getConfig(config) {
      const dataAttributes = Manipulator.getDataAttributes(this._element);
      Object.keys(dataAttributes).forEach(dataAttr => {
        if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
          delete dataAttributes[dataAttr];
        }
      });
      config = { ...this.constructor.Default,
        ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config.container = config.container === false ? document.body : getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      } // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`


      return config;
    }

    _cleanTipClass() {
      const tip = this.getTipElement();
      const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
      const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

      if (tabClass !== null && tabClass.length > 0) {
        tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
      }
    }

    _getBasicClassPrefix() {
      return CLASS_PREFIX$1;
    }

    _handlePopperPlacementChange(popperData) {
      const {
        state
      } = popperData;

      if (!state) {
        return;
      }

      this.tip = state.elements.popper;

      this._cleanTipClass();

      this._addAttachmentClass(this._getAttachment(state.placement));
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tooltip to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Tooltip);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$3 = 'popover';
  const DATA_KEY$3 = 'bs.popover';
  const EVENT_KEY$3 = `.${DATA_KEY$3}`;
  const CLASS_PREFIX = 'bs-popover';
  const Default$2 = { ...Tooltip.Default,
    placement: 'right',
    offset: [0, 8],
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
  };
  const DefaultType$2 = { ...Tooltip.DefaultType,
    content: '(string|element|function)'
  };
  const Event$1 = {
    HIDE: `hide${EVENT_KEY$3}`,
    HIDDEN: `hidden${EVENT_KEY$3}`,
    SHOW: `show${EVENT_KEY$3}`,
    SHOWN: `shown${EVENT_KEY$3}`,
    INSERTED: `inserted${EVENT_KEY$3}`,
    CLICK: `click${EVENT_KEY$3}`,
    FOCUSIN: `focusin${EVENT_KEY$3}`,
    FOCUSOUT: `focusout${EVENT_KEY$3}`,
    MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
    MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
  };
  const SELECTOR_TITLE = '.popover-header';
  const SELECTOR_CONTENT = '.popover-body';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default$2;
    }

    static get NAME() {
      return NAME$3;
    }

    static get Event() {
      return Event$1;
    }

    static get DefaultType() {
      return DefaultType$2;
    } // Overrides


    isWithContent() {
      return this.getTitle() || this._getContent();
    }

    setContent(tip) {
      this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

      this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
    } // Private


    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    _getBasicClassPrefix() {
      return CLASS_PREFIX;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Popover to jQuery only if jQuery is present
   */


  defineJQueryPlugin(Popover);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$2 = 'scrollspy';
  const DATA_KEY$2 = 'bs.scrollspy';
  const EVENT_KEY$2 = `.${DATA_KEY$2}`;
  const DATA_API_KEY$1 = '.data-api';
  const Default$1 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  const DefaultType$1 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
  const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  const CLASS_NAME_ACTIVE$1 = 'active';
  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
  const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
  const SELECTOR_NAV_LINKS = '.nav-link';
  const SELECTOR_NAV_ITEMS = '.nav-item';
  const SELECTOR_LIST_ITEMS = '.list-group-item';
  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
  const SELECTOR_DROPDOWN$1 = '.dropdown';
  const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
  const METHOD_OFFSET = 'offset';
  const METHOD_POSITION = 'position';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class ScrollSpy extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
      this._config = this._getConfig(config);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
      this.refresh();

      this._process();
    } // Getters


    static get Default() {
      return Default$1;
    }

    static get NAME() {
      return NAME$2;
    } // Public


    refresh() {
      const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
      targets.map(element => {
        const targetSelector = getSelectorFromElement(element);
        const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

        if (target) {
          const targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
        this._offsets.push(item[0]);

        this._targets.push(item[1]);
      });
    }

    dispose() {
      EventHandler.off(this._scrollElement, EVENT_KEY$2);
      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default$1,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' && config ? config : {})
      };
      config.target = getElement(config.target) || document.documentElement;
      typeCheckConfig(NAME$2, config, DefaultType$1);
      return config;
    }

    _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }

    _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

    _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }

    _process() {
      const scrollTop = this._getScrollTop() + this._config.offset;

      const scrollHeight = this._getScrollHeight();

      const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        const target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (let i = this._offsets.length; i--;) {
        const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }

    _activate(target) {
      this._activeTarget = target;

      this._clear();

      const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
      const link = SelectorEngine.findOne(queries.join(','), this._config.target);
      link.classList.add(CLASS_NAME_ACTIVE$1);

      if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
      } else {
        SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

          SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
            SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
          });
        });
      }

      EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }

    _clear() {
      SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = ScrollSpy.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .ScrollSpy to jQuery only if jQuery is present
   */

  defineJQueryPlugin(ScrollSpy);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME$1 = 'tab';
  const DATA_KEY$1 = 'bs.tab';
  const EVENT_KEY$1 = `.${DATA_KEY$1}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
  const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
  const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
  const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
  const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  const CLASS_NAME_ACTIVE = 'active';
  const CLASS_NAME_FADE$1 = 'fade';
  const CLASS_NAME_SHOW$1 = 'show';
  const SELECTOR_DROPDOWN = '.dropdown';
  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  const SELECTOR_ACTIVE = '.active';
  const SELECTOR_ACTIVE_UL = ':scope > li > .active';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tab extends BaseComponent {
    // Getters
    static get NAME() {
      return NAME$1;
    } // Public


    show() {
      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
        return;
      }

      let previous;
      const target = getElementFromSelector(this._element);

      const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

      if (listElement) {
        const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = SelectorEngine.find(itemSelector, listElement);
        previous = previous[previous.length - 1];
      }

      const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
        relatedTarget: this._element
      }) : null;
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
        relatedTarget: previous
      });

      if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
        return;
      }

      this._activate(this._element, listElement);

      const complete = () => {
        EventHandler.trigger(previous, EVENT_HIDDEN$1, {
          relatedTarget: this._element
        });
        EventHandler.trigger(this._element, EVENT_SHOWN$1, {
          relatedTarget: previous
        });
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    } // Private


    _activate(element, container, callback) {
      const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
      const active = activeElements[0];
      const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

      const complete = () => this._transitionComplete(element, active, callback);

      if (active && isTransitioning) {
        active.classList.remove(CLASS_NAME_SHOW$1);

        this._queueCallback(complete, element, true);
      } else {
        complete();
      }
    }

    _transitionComplete(element, active, callback) {
      if (active) {
        active.classList.remove(CLASS_NAME_ACTIVE);
        const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

        if (dropdownChild) {
          dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      element.classList.add(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE$1)) {
        element.classList.add(CLASS_NAME_SHOW$1);
      }

      let parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
        const dropdownElement = element.closest(SELECTOR_DROPDOWN);

        if (dropdownElement) {
          SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tab.getOrCreateInstance(this);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    const data = Tab.getOrCreateInstance(this);
    data.show();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Tab to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Tab);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): toast.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'toast';
  const DATA_KEY = 'bs.toast';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_SHOWING = 'showing';
  const DefaultType = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  const Default = {
    animation: true,
    autohide: true,
    delay: 5000
  };
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Toast extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._timeout = null;
      this._hasMouseInteraction = false;
      this._hasKeyboardInteraction = false;

      this._setListeners();
    } // Getters


    static get DefaultType() {
      return DefaultType;
    }

    static get Default() {
      return Default;
    }

    static get NAME() {
      return NAME;
    } // Public


    show() {
      const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      const complete = () => {
        this._element.classList.remove(CLASS_NAME_SHOWING);

        EventHandler.trigger(this._element, EVENT_SHOWN);

        this._maybeScheduleHide();
      };

      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


      reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOW);

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

      if (hideEvent.defaultPrevented) {
        return;
      }

      const complete = () => {
        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


        this._element.classList.remove(CLASS_NAME_SHOWING);

        this._element.classList.remove(CLASS_NAME_SHOW);

        EventHandler.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.classList.add(CLASS_NAME_SHOWING);

      this._queueCallback(complete, this._element, this._config.animation);
    }

    dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      super.dispose();
    } // Private


    _getConfig(config) {
      config = { ...Default,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' && config ? config : {})
      };
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    }

    _maybeScheduleHide() {
      if (!this._config.autohide) {
        return;
      }

      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }

      this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay);
    }

    _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          this._hasMouseInteraction = isInteracting;
          break;

        case 'focusin':
        case 'focusout':
          this._hasKeyboardInteraction = isInteracting;
          break;
      }

      if (isInteracting) {
        this._clearTimeout();

        return;
      }

      const nextElement = event.relatedTarget;

      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }

      this._maybeScheduleHide();
    }

    _setListeners() {
      EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
      EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
      EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
    }

    _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Toast.getOrCreateInstance(this, config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config](this);
        }
      });
    }

  }

  enableDismissTrigger(Toast);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Toast to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Toast);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.1): index.umd.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  var index_umd = {
    Alert,
    Button,
    Carousel,
    Collapse,
    /*Dropdown,*/
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip
  };

  return index_umd;

})));
//# sourceMappingURL=bootstrap.js.map

/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/simple-datatables@3.0.2/dist/umd/simple-datatables.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
! function(t) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).simpleDatatables = t()
  }
}((function() {
  return function t(e, s, i) {
    function a(r, h) {
      if (!s[r]) {
        if (!e[r]) {
          var o = "function" == typeof require && require;
          if (!h && o) return o(r, !0);
          if (n) return n(r, !0);
          var l = new Error("Cannot find module '" + r + "'");
          throw l.code = "MODULE_NOT_FOUND", l
        }
        var d = s[r] = {
          exports: {}
        };
        e[r][0].call(d.exports, (function(t) {
          return a(e[r][1][t] || t)
        }), d, d.exports, t, e, s, i)
      }
      return s[r].exports
    }
    for (var n = "function" == typeof require && require, r = 0; r < i.length; r++) a(i[r]);
    return a
  }({
    1: [function(t, e, s) {
      (function(t) {
        (function() {
          "use strict";

          function e(t, e) {
            return t(e = {
              exports: {}
            }, e.exports), e.exports
          }
          "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== t || "undefined" != typeof self && self;
          var i = e((function(t, e) {
              t.exports = function() {
                var t = "millisecond",
                  e = "second",
                  s = "minute",
                  i = "hour",
                  a = "day",
                  n = "week",
                  r = "month",
                  h = "quarter",
                  o = "year",
                  l = "date",
                  d = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                  c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                  u = {
                    name: "en",
                    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                  },
                  p = function(t, e, s) {
                    var i = String(t);
                    return !i || i.length >= e ? t : "" + Array(e + 1 - i.length).join(s) + t
                  },
                  f = {
                    s: p,
                    z: function(t) {
                      var e = -t.utcOffset(),
                        s = Math.abs(e),
                        i = Math.floor(s / 60),
                        a = s % 60;
                      return (e <= 0 ? "+" : "-") + p(i, 2, "0") + ":" + p(a, 2, "0")
                    },
                    m: function t(e, s) {
                      if (e.date() < s.date()) return -t(s, e);
                      var i = 12 * (s.year() - e.year()) + (s.month() - e.month()),
                        a = e.clone().add(i, r),
                        n = s - a < 0,
                        h = e.clone().add(i + (n ? -1 : 1), r);
                      return +(-(i + (s - a) / (n ? a - h : h - a)) || 0)
                    },
                    a: function(t) {
                      return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
                    },
                    p: function(d) {
                      return {
                        M: r,
                        y: o,
                        w: n,
                        d: a,
                        D: l,
                        h: i,
                        m: s,
                        s: e,
                        ms: t,
                        Q: h
                      } [d] || String(d || "").toLowerCase().replace(/s$/, "")
                    },
                    u: function(t) {
                      return void 0 === t
                    }
                  },
                  g = "en",
                  m = {};
                m[g] = u;
                var b = function(t) {
                    return t instanceof C
                  },
                  y = function(t, e, s) {
                    var i;
                    if (!t) return g;
                    if ("string" == typeof t) m[t] && (i = t), e && (m[t] = e, i = t);
                    else {
                      var a = t.name;
                      m[a] = t, i = a
                    }
                    return !s && i && (g = i), i || !s && g
                  },
                  v = function(t, e) {
                    if (b(t)) return t.clone();
                    var s = "object" == typeof e ? e : {};
                    return s.date = t, s.args = arguments, new C(s)
                  },
                  w = f;
                w.l = y, w.i = b, w.w = function(t, e) {
                  return v(t, {
                    locale: e.$L,
                    utc: e.$u,
                    x: e.$x,
                    $offset: e.$offset
                  })
                };
                var C = function() {
                    function u(t) {
                      this.$L = y(t.locale, null, !0), this.parse(t)
                    }
                    var p = u.prototype;
                    return p.parse = function(t) {
                      this.$d = function(t) {
                        var e = t.date,
                          s = t.utc;
                        if (null === e) return new Date(NaN);
                        if (w.u(e)) return new Date;
                        if (e instanceof Date) return new Date(e);
                        if ("string" == typeof e && !/Z$/i.test(e)) {
                          var i = e.match(d);
                          if (i) {
                            var a = i[2] - 1 || 0,
                              n = (i[7] || "0").substring(0, 3);
                            return s ? new Date(Date.UTC(i[1], a, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, n)) : new Date(i[1], a, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, n)
                          }
                        }
                        return new Date(e)
                      }(t), this.$x = t.x || {}, this.init()
                    }, p.init = function() {
                      var t = this.$d;
                      this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds()
                    }, p.$utils = function() {
                      return w
                    }, p.isValid = function() {
                      return !("Invalid Date" === this.$d.toString())
                    }, p.isSame = function(t, e) {
                      var s = v(t);
                      return this.startOf(e) <= s && s <= this.endOf(e)
                    }, p.isAfter = function(t, e) {
                      return v(t) < this.startOf(e)
                    }, p.isBefore = function(t, e) {
                      return this.endOf(e) < v(t)
                    }, p.$g = function(t, e, s) {
                      return w.u(t) ? this[e] : this.set(s, t)
                    }, p.unix = function() {
                      return Math.floor(this.valueOf() / 1e3)
                    }, p.valueOf = function() {
                      return this.$d.getTime()
                    }, p.startOf = function(t, h) {
                      var d = this,
                        c = !!w.u(h) || h,
                        u = w.p(t),
                        p = function(t, e) {
                          var s = w.w(d.$u ? Date.UTC(d.$y, e, t) : new Date(d.$y, e, t), d);
                          return c ? s : s.endOf(a)
                        },
                        f = function(t, e) {
                          return w.w(d.toDate()[t].apply(d.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), d)
                        },
                        g = this.$W,
                        m = this.$M,
                        b = this.$D,
                        y = "set" + (this.$u ? "UTC" : "");
                      switch (u) {
                        case o:
                          return c ? p(1, 0) : p(31, 11);
                        case r:
                          return c ? p(1, m) : p(0, m + 1);
                        case n:
                          var v = this.$locale().weekStart || 0,
                            C = (g < v ? g + 7 : g) - v;
                          return p(c ? b - C : b + (6 - C), m);
                        case a:
                        case l:
                          return f(y + "Hours", 0);
                        case i:
                          return f(y + "Minutes", 1);
                        case s:
                          return f(y + "Seconds", 2);
                        case e:
                          return f(y + "Milliseconds", 3);
                        default:
                          return this.clone()
                      }
                    }, p.endOf = function(t) {
                      return this.startOf(t, !1)
                    }, p.$set = function(n, h) {
                      var d, c = w.p(n),
                        u = "set" + (this.$u ? "UTC" : ""),
                        p = (d = {}, d[a] = u + "Date", d[l] = u + "Date", d[r] = u + "Month", d[o] = u + "FullYear", d[i] = u + "Hours", d[s] = u + "Minutes", d[e] = u + "Seconds", d[t] = u + "Milliseconds", d)[c],
                        f = c === a ? this.$D + (h - this.$W) : h;
                      if (c === r || c === o) {
                        var g = this.clone().set(l, 1);
                        g.$d[p](f), g.init(), this.$d = g.set(l, Math.min(this.$D, g.daysInMonth())).$d
                      } else p && this.$d[p](f);
                      return this.init(), this
                    }, p.set = function(t, e) {
                      return this.clone().$set(t, e)
                    }, p.get = function(t) {
                      return this[w.p(t)]()
                    }, p.add = function(t, h) {
                      var l, d = this;
                      t = Number(t);
                      var c = w.p(h),
                        u = function(e) {
                          var s = v(d);
                          return w.w(s.date(s.date() + Math.round(e * t)), d)
                        };
                      if (c === r) return this.set(r, this.$M + t);
                      if (c === o) return this.set(o, this.$y + t);
                      if (c === a) return u(1);
                      if (c === n) return u(7);
                      var p = (l = {}, l[s] = 6e4, l[i] = 36e5, l[e] = 1e3, l)[c] || 1,
                        f = this.$d.getTime() + t * p;
                      return w.w(f, this)
                    }, p.subtract = function(t, e) {
                      return this.add(-1 * t, e)
                    }, p.format = function(t) {
                      var e = this;
                      if (!this.isValid()) return "Invalid Date";
                      var s = t || "YYYY-MM-DDTHH:mm:ssZ",
                        i = w.z(this),
                        a = this.$locale(),
                        n = this.$H,
                        r = this.$m,
                        h = this.$M,
                        o = a.weekdays,
                        l = a.months,
                        d = function(t, i, a, n) {
                          return t && (t[i] || t(e, s)) || a[i].substr(0, n)
                        },
                        u = function(t) {
                          return w.s(n % 12 || 12, t, "0")
                        },
                        p = a.meridiem || function(t, e, s) {
                          var i = t < 12 ? "AM" : "PM";
                          return s ? i.toLowerCase() : i
                        },
                        f = {
                          YY: String(this.$y).slice(-2),
                          YYYY: this.$y,
                          M: h + 1,
                          MM: w.s(h + 1, 2, "0"),
                          MMM: d(a.monthsShort, h, l, 3),
                          MMMM: d(l, h),
                          D: this.$D,
                          DD: w.s(this.$D, 2, "0"),
                          d: String(this.$W),
                          dd: d(a.weekdaysMin, this.$W, o, 2),
                          ddd: d(a.weekdaysShort, this.$W, o, 3),
                          dddd: o[this.$W],
                          H: String(n),
                          HH: w.s(n, 2, "0"),
                          h: u(1),
                          hh: u(2),
                          a: p(n, r, !0),
                          A: p(n, r, !1),
                          m: String(r),
                          mm: w.s(r, 2, "0"),
                          s: String(this.$s),
                          ss: w.s(this.$s, 2, "0"),
                          SSS: w.s(this.$ms, 3, "0"),
                          Z: i
                        };
                      return s.replace(c, (function(t, e) {
                        return e || f[t] || i.replace(":", "")
                      }))
                    }, p.utcOffset = function() {
                      return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                    }, p.diff = function(t, l, d) {
                      var c, u = w.p(l),
                        p = v(t),
                        f = 6e4 * (p.utcOffset() - this.utcOffset()),
                        g = this - p,
                        m = w.m(this, p);
                      return m = (c = {}, c[o] = m / 12, c[r] = m, c[h] = m / 3, c[n] = (g - f) / 6048e5, c[a] = (g - f) / 864e5, c[i] = g / 36e5, c[s] = g / 6e4, c[e] = g / 1e3, c)[u] || g, d ? m : w.a(m)
                    }, p.daysInMonth = function() {
                      return this.endOf(r).$D
                    }, p.$locale = function() {
                      return m[this.$L]
                    }, p.locale = function(t, e) {
                      if (!t) return this.$L;
                      var s = this.clone(),
                        i = y(t, e, !0);
                      return i && (s.$L = i), s
                    }, p.clone = function() {
                      return w.w(this.$d, this)
                    }, p.toDate = function() {
                      return new Date(this.valueOf())
                    }, p.toJSON = function() {
                      return this.isValid() ? this.toISOString() : null
                    }, p.toISOString = function() {
                      return this.$d.toISOString()
                    }, p.toString = function() {
                      return this.$d.toUTCString()
                    }, u
                  }(),
                  x = C.prototype;
                return v.prototype = x, [
                  ["$ms", t],
                  ["$s", e],
                  ["$m", s],
                  ["$H", i],
                  ["$W", a],
                  ["$M", r],
                  ["$y", o],
                  ["$D", l]
                ].forEach((function(t) {
                  x[t[1]] = function(e) {
                    return this.$g(e, t[0], t[1])
                  }
                })), v.extend = function(t, e) {
                  return t.$i || (t(e, C, v), t.$i = !0), v
                }, v.locale = y, v.isDayjs = b, v.unix = function(t) {
                  return v(1e3 * t)
                }, v.en = m[g], v.Ls = m, v.p = {}, v
              }()
            })),
            a = e((function(t, e) {
              var s, i, a, n, r, h, o, l, d, c, u, p, f;
              t.exports = (s = {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
              }, i = function(t, e) {
                return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, i, a) {
                  var n = a && a.toUpperCase();
                  return i || e[a] || s[a] || e[n].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(t, e, s) {
                    return e || s.slice(1)
                  }))
                }))
              }, a = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, o = {}, d = [/[+-]\d\d:?(\d\d)?/, function(t) {
                (this.zone || (this.zone = {})).offset = function(t) {
                  if (!t) return 0;
                  var e = t.match(/([+-]|\d\d)/g),
                    s = 60 * e[1] + (+e[2] || 0);
                  return 0 === s ? 0 : "+" === e[0] ? -s : s
                }(t)
              }], c = function(t) {
                var e = o[t];
                return e && (e.indexOf ? e : e.s.concat(e.f))
              }, u = function(t, e) {
                var s, i = o.meridiem;
                if (i) {
                  for (var a = 1; a <= 24; a += 1)
                    if (t.indexOf(i(a, 0, e)) > -1) {
                      s = a > 12;
                      break
                    }
                } else s = t === (e ? "pm" : "PM");
                return s
              }, p = {
                A: [h = /\d*[^\s\d-:/()]+/, function(t) {
                  this.afternoon = u(t, !1)
                }],
                a: [h, function(t) {
                  this.afternoon = u(t, !0)
                }],
                S: [/\d/, function(t) {
                  this.milliseconds = 100 * +t
                }],
                SS: [n = /\d\d/, function(t) {
                  this.milliseconds = 10 * +t
                }],
                SSS: [/\d{3}/, function(t) {
                  this.milliseconds = +t
                }],
                s: [r = /\d\d?/, (l = function(t) {
                  return function(e) {
                    this[t] = +e
                  }
                })("seconds")],
                ss: [r, l("seconds")],
                m: [r, l("minutes")],
                mm: [r, l("minutes")],
                H: [r, l("hours")],
                h: [r, l("hours")],
                HH: [r, l("hours")],
                hh: [r, l("hours")],
                D: [r, l("day")],
                DD: [n, l("day")],
                Do: [h, function(t) {
                  var e = o.ordinal,
                    s = t.match(/\d+/);
                  if (this.day = s[0], e)
                    for (var i = 1; i <= 31; i += 1) e(i).replace(/\[|\]/g, "") === t && (this.day = i)
                }],
                M: [r, l("month")],
                MM: [n, l("month")],
                MMM: [h, function(t) {
                  var e = c("months"),
                    s = (c("monthsShort") || e.map((function(t) {
                      return t.substr(0, 3)
                    }))).indexOf(t) + 1;
                  if (s < 1) throw new Error;
                  this.month = s % 12 || s
                }],
                MMMM: [h, function(t) {
                  var e = c("months").indexOf(t) + 1;
                  if (e < 1) throw new Error;
                  this.month = e % 12 || e
                }],
                Y: [/[+-]?\d+/, l("year")],
                YY: [n, function(t) {
                  t = +t, this.year = t + (t > 68 ? 1900 : 2e3)
                }],
                YYYY: [/\d{4}/, l("year")],
                Z: d,
                ZZ: d
              }, f = function(t, e, s) {
                try {
                  var n = function(t) {
                      for (var e = (t = i(t, o && o.formats)).match(a), s = e.length, n = 0; n < s; n += 1) {
                        var r = e[n],
                          h = p[r],
                          l = h && h[0],
                          d = h && h[1];
                        e[n] = d ? {
                          regex: l,
                          parser: d
                        } : r.replace(/^\[|\]$/g, "")
                      }
                      return function(t) {
                        for (var i = {}, a = 0, n = 0; a < s; a += 1) {
                          var r = e[a];
                          if ("string" == typeof r) n += r.length;
                          else {
                            var h = r.regex,
                              o = r.parser,
                              l = t.substr(n),
                              d = h.exec(l)[0];
                            o.call(i, d), t = t.replace(d, "")
                          }
                        }
                        return function(t) {
                          var e = t.afternoon;
                          if (void 0 !== e) {
                            var s = t.hours;
                            e ? s < 12 && (t.hours += 12) : 12 === s && (t.hours = 0), delete t.afternoon
                          }
                        }(i), i
                      }
                    }(e)(t),
                    r = n.year,
                    h = n.month,
                    l = n.day,
                    d = n.hours,
                    c = n.minutes,
                    u = n.seconds,
                    f = n.milliseconds,
                    g = n.zone,
                    m = new Date,
                    b = l || (r || h ? 1 : m.getDate()),
                    y = r || m.getFullYear(),
                    v = 0;
                  r && !h || (v = h > 0 ? h - 1 : m.getMonth());
                  var w = d || 0,
                    C = c || 0,
                    x = u || 0,
                    M = f || 0;
                  return g ? new Date(Date.UTC(y, v, b, w, C, x, M + 60 * g.offset * 1e3)) : s ? new Date(Date.UTC(y, v, b, w, C, x, M)) : new Date(y, v, b, w, C, x, M)
                } catch (t) {
                  return new Date("")
                }
              }, function(t, e, s) {
                s.p.customParseFormat = !0;
                var i = e.prototype,
                  a = i.parse;
                i.parse = function(t) {
                  var e = t.date,
                    i = t.utc,
                    n = t.args;
                  this.$u = i;
                  var r = n[1];
                  if ("string" == typeof r) {
                    var h = !0 === n[2],
                      l = !0 === n[3],
                      d = h || l,
                      c = n[2];
                    l && (c = n[2]), o = this.$locale(), !h && c && (o = s.Ls[c]), this.$d = f(e, r, i), this.init(), c && !0 !== c && (this.$L = this.locale(c).$L), d && e !== this.format(r) && (this.$d = new Date("")), o = {}
                  } else if (r instanceof Array)
                    for (var u = r.length, p = 1; p <= u; p += 1) {
                      n[1] = r[p - 1];
                      var g = s.apply(this, n);
                      if (g.isValid()) {
                        this.$d = g.$d, this.$L = g.$L, this.init();
                        break
                      }
                      p === u && (this.$d = new Date(""))
                    } else a.call(this, t)
                }
              })
            }));
          i.extend(a), s.parseDate = (t, e) => {
            let s = !1;
            if (e) switch (e) {
              case "ISO_8601":
                s = t;
                break;
              case "RFC_2822":
                s = i(t, "ddd, MM MMM YYYY HH:mm:ss ZZ").format("YYYYMMDD");
                break;
              case "MYSQL":
                s = i(t, "YYYY-MM-DD hh:mm:ss").format("YYYYMMDD");
                break;
              case "UNIX":
                s = i(t).unix();
                break;
              default:
                s = i(t, e).format("YYYYMMDD")
            }
            return s
          }
        }).call(this)
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    2: [function(t, e, s) {
      "use strict";
      Object.defineProperty(s, "__esModule", {
        value: !0
      });
      const i = t => "[object Object]" === Object.prototype.toString.call(t),
        a = (t, e) => {
          const s = document.createElement(t);
          if (e && "object" == typeof e)
            for (const t in e) "html" === t ? s.innerHTML = e[t] : s.setAttribute(t, e[t]);
          return s
        },
        n = t => {
          t instanceof NodeList ? t.forEach((t => n(t))) : t.innerHTML = ""
        },
        r = (t, e, s) => a("li", {
          class: t,
          html: `<a href="#" data-page="${e}">${s}</a>`
        }),
        h = (t, e) => {
          let s, i;
          1 === e ? (s = 0, i = t.length) : -1 === e && (s = t.length - 1, i = -1);
          for (let a = !0; a;) {
            a = !1;
            for (let n = s; n != i; n += e)
              if (t[n + e] && t[n].value > t[n + e].value) {
                const s = t[n],
                  i = t[n + e],
                  r = s;
                t[n] = i, t[n + e] = r, a = !0
              }
          }
          return t
        };
      class o {
        constructor(t, e) {
          return this.dt = t, this.rows = e, this
        }
        build(t) {
          const e = a("tr");
          let s = this.dt.headings;
          return s.length || (s = t.map((() => ""))), s.forEach(((s, i) => {
            const n = a("td");
            t[i] && t[i].length || (t[i] = ""), n.innerHTML = t[i], n.data = t[i], e.appendChild(n)
          })), e
        }
        render(t) {
          return t
        }
        add(t) {
          if (Array.isArray(t)) {
            const e = this.dt;
            Array.isArray(t[0]) ? t.forEach((t => {
              e.data.push(this.build(t))
            })) : e.data.push(this.build(t)), e.data.length && (e.hasRows = !0), this.update(), e.columns().rebuild()
          }
        }
        remove(t) {
          const e = this.dt;
          Array.isArray(t) ? (t.sort(((t, e) => e - t)), t.forEach((t => {
            e.data.splice(t, 1)
          }))) : "all" == t ? e.data = [] : e.data.splice(t, 1), e.data.length || (e.hasRows = !1), this.update(), e.columns().rebuild()
        }
        update() {
          this.dt.data.forEach(((t, e) => {
            t.dataIndex = e
          }))
        }
      }
      class l {
        constructor(t) {
          return this.dt = t, this
        }
        swap(t) {
          if (t.length && 2 === t.length) {
            const e = [];
            this.dt.headings.forEach(((t, s) => {
              e.push(s)
            }));
            const s = t[0],
              i = t[1],
              a = e[i];
            e[i] = e[s], e[s] = a, this.order(e)
          }
        }
        order(t) {
          let e, s, i, a, n, r, h;
          const o = [
              [],
              [],
              [],
              []
            ],
            l = this.dt;
          t.forEach(((t, i) => {
            n = l.headings[t], r = "false" !== n.getAttribute("data-sortable"), e = n.cloneNode(!0), e.originalCellIndex = i, e.sortable = r, o[0].push(e), l.hiddenColumns.includes(t) || (s = n.cloneNode(!0), s.originalCellIndex = i, s.sortable = r, o[1].push(s))
          })), l.data.forEach(((e, s) => {
            i = e.cloneNode(!1), a = e.cloneNode(!1), i.dataIndex = a.dataIndex = s, null !== e.searchIndex && void 0 !== e.searchIndex && (i.searchIndex = a.searchIndex = e.searchIndex), t.forEach((t => {
              h = e.cells[t].cloneNode(!0), h.data = e.cells[t].data, i.appendChild(h), l.hiddenColumns.includes(t) || (h = e.cells[t].cloneNode(!0), h.data = e.cells[t].data, a.appendChild(h))
            })), o[2].push(i), o[3].push(a)
          })), l.headings = o[0], l.activeHeadings = o[1], l.data = o[2], l.activeRows = o[3], l.update()
        }
        hide(t) {
          if (t.length) {
            const e = this.dt;
            t.forEach((t => {
              e.hiddenColumns.includes(t) || e.hiddenColumns.push(t)
            })), this.rebuild()
          }
        }
        show(t) {
          if (t.length) {
            let e;
            const s = this.dt;
            t.forEach((t => {
              e = s.hiddenColumns.indexOf(t), e > -1 && s.hiddenColumns.splice(e, 1)
            })), this.rebuild()
          }
        }
        visible(t) {
          let e;
          const s = this.dt;
          return t = t || s.headings.map((t => t.originalCellIndex)), isNaN(t) ? Array.isArray(t) && (e = [], t.forEach((t => {
            e.push(!s.hiddenColumns.includes(t))
          }))) : e = !s.hiddenColumns.includes(t), e
        }
        add(t) {
          let e;
          const s = document.createElement("th");
          if (!this.dt.headings.length) return this.dt.insert({
            headings: [t.heading],
            data: t.data.map((t => [t]))
          }), void this.rebuild();
          this.dt.hiddenHeader ? s.innerHTML = "" : t.heading.nodeName ? s.appendChild(t.heading) : s.innerHTML = t.heading, this.dt.headings.push(s), this.dt.data.forEach(((s, i) => {
            t.data[i] && (e = document.createElement("td"), t.data[i].nodeName ? e.appendChild(t.data[i]) : e.innerHTML = t.data[i], e.data = e.innerHTML, t.render && (e.innerHTML = t.render.call(this, e.data, e, s)), s.appendChild(e))
          })), t.type && s.setAttribute("data-type", t.type), t.format && s.setAttribute("data-format", t.format), t.hasOwnProperty("sortable") && (s.sortable = t.sortable, s.setAttribute("data-sortable", !0 === t.sortable ? "true" : "false")), this.rebuild(), this.dt.renderHeader()
        }
        remove(t) {
          Array.isArray(t) ? (t.sort(((t, e) => e - t)), t.forEach((t => this.remove(t)))) : (this.dt.headings.splice(t, 1), this.dt.data.forEach((e => {
            e.removeChild(e.cells[t])
          }))), this.rebuild()
        }
        filter(t, e, s, i) {
          const a = this.dt;
          if (a.filterState || (a.filterState = {
              originalData: a.data
            }), !a.filterState[t]) {
            const e = [...i, () => !0];
            a.filterState[t] = function() {
              let t = 0;
              return () => e[t++ % e.length]
            }()
          }
          const n = a.filterState[t](),
            r = Array.from(a.filterState.originalData).filter((e => {
              const s = e.cells[t],
                i = s.hasAttribute("data-content") ? s.getAttribute("data-content") : s.innerText;
              return "function" == typeof n ? n(i) : i === n
            }));
          a.data = r, this.rebuild(), a.update(), s || a.emit("datatable.sort", t, e)
        }
        sort(e, s, i) {
          const a = this.dt;
          if (a.hasHeadings && (e < 0 || e > a.headings.length)) return !1;
          const n = a.options.filters && a.options.filters[a.headings[e].textContent];
          if (n && 0 !== n.length) return void this.filter(e, s, i, n);
          a.sorting = !0, i || a.emit("datatable.sorting", e, s);
          let r = a.data;
          const o = [],
            l = [];
          let d = 0,
            c = 0;
          const u = a.headings[e],
            p = [];
          if ("date" === u.getAttribute("data-type")) {
            let e = !1;
            u.hasAttribute("data-format") && (e = u.getAttribute("data-format")), p.push(Promise.resolve().then((function() {
              return t("./date-cd1c23ce.js")
            })).then((({
              parseDate: t
            }) => s => t(s, e))))
          }
          Promise.all(p).then((t => {
            const n = t[0];
            let p, f;
            Array.from(r).forEach((t => {
              const s = t.cells[e],
                i = s.hasAttribute("data-content") ? s.getAttribute("data-content") : s.innerText;
              let a;
              a = n ? n(i) : "string" == typeof i ? i.replace(/(\$|,|\s|%)/g, "") : i, parseFloat(a) == a ? l[c++] = {
                value: Number(a),
                row: t
              } : o[d++] = {
                value: "string" == typeof i ? i.toLowerCase() : i,
                row: t
              }
            })), s || (s = u.classList.contains("asc") ? "desc" : "asc"), "desc" == s ? (p = h(o, -1), f = h(l, -1), u.classList.remove("asc"), u.classList.add("desc")) : (p = h(l, 1), f = h(o, 1), u.classList.remove("desc"), u.classList.add("asc")), a.lastTh && u != a.lastTh && (a.lastTh.classList.remove("desc"), a.lastTh.classList.remove("asc")), a.lastTh = u, r = p.concat(f), a.data = [];
            const g = [];
            r.forEach(((t, e) => {
              a.data.push(t.row), null !== t.row.searchIndex && void 0 !== t.row.searchIndex && g.push(e)
            })), a.searchData = g, this.rebuild(), a.update(), i || a.emit("datatable.sort", e, s)
          }))
        }
        rebuild() {
          let t, e, s, i;
          const a = this.dt,
            n = [];
          a.activeRows = [], a.activeHeadings = [], a.headings.forEach(((t, e) => {
            t.originalCellIndex = e, t.sortable = "false" !== t.getAttribute("data-sortable"), a.hiddenColumns.includes(e) || a.activeHeadings.push(t)
          })), a.data.forEach(((r, h) => {
            t = r.cloneNode(!1), e = r.cloneNode(!1), t.dataIndex = e.dataIndex = h, null !== r.searchIndex && void 0 !== r.searchIndex && (t.searchIndex = e.searchIndex = r.searchIndex), Array.from(r.cells).forEach((n => {
              s = n.cloneNode(!0), s.data = n.data, t.appendChild(s), a.hiddenColumns.includes(s.cellIndex) || (i = s.cloneNode(!0), i.data = s.data, e.appendChild(i))
            })), n.push(t), a.activeRows.push(e)
          })), a.data = n, a.update()
        }
      }
      const d = function(t) {
          let e = !1,
            s = !1;
          if ((t = t || this.options.data).headings) {
            e = a("thead");
            const s = a("tr");
            t.headings.forEach((t => {
              const e = a("th", {
                html: t
              });
              s.appendChild(e)
            })), e.appendChild(s)
          }
          t.data && t.data.length && (s = a("tbody"), t.data.forEach((e => {
            if (t.headings && t.headings.length !== e.length) throw new Error("The number of rows do not match the number of headings.");
            const i = a("tr");
            e.forEach((t => {
              const e = a("td", {
                html: t
              });
              i.appendChild(e)
            })), s.appendChild(i)
          }))), e && (null !== this.table.tHead && this.table.removeChild(this.table.tHead), this.table.appendChild(e)), s && (this.table.tBodies.length && this.table.removeChild(this.table.tBodies[0]), this.table.appendChild(s))
        },
        c = {
          sortable: !0,
          searchable: !0,
          paging: !0,
          perPage: 10,
          perPageSelect: [5, 10, 15, 20, 25],
          nextPrev: !0,
          firstLast: !1,
          prevText: "&lsaquo;",
          nextText: "&rsaquo;",
          firstText: "&laquo;",
          lastText: "&raquo;",
          ellipsisText: "&hellip;",
          ascText: "▴",
          descText: "▾",
          truncatePager: !0,
          pagerDelta: 2,
          scrollY: "",
          fixedColumns: !0,
          fixedHeight: !1,
          header: !0,
          hiddenHeader: !1,
          footer: !1,
          labels: {
            placeholder: "Search...",
            perPage: "{select} entries per page",
            noRows: "No entries found",
            info: "Showing {start} to {end} of {rows} entries"
          },
          layout: {
            top: "{select}{search}",
            bottom: "{info}{pager}"
          }
        };
      class u {
        constructor(t, e = {}) {
          if (this.initialized = !1, this.options = {
              ...c,
              ...e,
              layout: {
                ...c.layout,
                ...e.layout
              },
              labels: {
                ...c.labels,
                ...e.labels
              }
            }, "string" == typeof t && (t = document.querySelector(t)), this.initialLayout = t.innerHTML, this.initialSortable = this.options.sortable, this.options.header || (this.options.sortable = !1), null === t.tHead && (!this.options.data || this.options.data && !this.options.data.headings) && (this.options.sortable = !1), t.tBodies.length && !t.tBodies[0].rows.length && this.options.data && !this.options.data.data) throw new Error("You seem to be using the data option, but you've not defined any rows.");
          this.table = t, this.listeners = {
            onResize: t => this.onResize(t)
          }, this.init()
        }
        static extend(t, e) {
          "function" == typeof e ? u.prototype[t] = e : u[t] = e
        }
        init(t) {
          if (this.initialized || this.table.classList.contains("dataTable-table")) return !1;
          Object.assign(this.options, t || {}), this.currentPage = 1, this.onFirstPage = !0, this.hiddenColumns = [], this.columnRenderers = [], this.selectedColumns = [], this.render(), setTimeout((() => {
            this.emit("datatable.init"), this.initialized = !0, this.options.plugins && Object.entries(this.options.plugins).forEach((([t, e]) => {
              this[t] && "function" == typeof this[t] && (this[t] = this[t](e, {
                createElement: a
              }), e.enabled && this[t].init && "function" == typeof this[t].init && this[t].init())
            }))
          }), 10)
        }
        render(t) {
          if (t) {
            switch (t) {
              case "page":
                this.renderPage();
                break;
              case "pager":
                this.renderPager();
                break;
              case "header":
                this.renderHeader()
            }
            return !1
          }
          const e = this.options;
          let s = "";
          if (e.data && d.call(this), this.body = this.table.tBodies[0], this.head = this.table.tHead, this.foot = this.table.tFoot, this.body || (this.body = a("tbody"), this.table.appendChild(this.body)), this.hasRows = this.body.rows.length > 0, !this.head) {
            const t = a("thead"),
              s = a("tr");
            this.hasRows && (Array.from(this.body.rows[0].cells).forEach((() => {
              s.appendChild(a("th"))
            })), t.appendChild(s)), this.head = t, this.table.insertBefore(this.head, this.body), this.hiddenHeader = e.hiddenHeader
          }
          if (this.headings = [], this.hasHeadings = this.head.rows.length > 0, this.hasHeadings && (this.header = this.head.rows[0], this.headings = [].slice.call(this.header.cells)), e.header || this.head && this.table.removeChild(this.table.tHead), e.footer ? this.head && !this.foot && (this.foot = a("tfoot", {
              html: this.head.innerHTML
            }), this.table.appendChild(this.foot)) : this.foot && this.table.removeChild(this.table.tFoot), this.wrapper = a("div", {
              class: "dataTable-wrapper dataTable-loading"
            }), s += "<div class='dataTable-top'>", s += e.layout.top, s += "</div>", e.scrollY.length ? s += `<div class='dataTable-container' style='height: ${e.scrollY}; overflow-Y: auto;'></div>` : s += "<div class='dataTable-container'></div>", s += "<div class='dataTable-bottom'>", s += e.layout.bottom, s += "</div>", s = s.replace("{info}", e.paging ? "<div class='dataTable-info'></div>" : ""), e.paging && e.perPageSelect) {
            let t = "<div class='dataTable-dropdown'><label>";
            t += e.labels.perPage, t += "</label></div>";
            const i = a("select", {
              class: "dataTable-selector"
            });
            e.perPageSelect.forEach((t => {
              const s = t === e.perPage,
                a = new Option(t, t, s, s);
              i.add(a)
            })), t = t.replace("{select}", i.outerHTML), s = s.replace("{select}", t)
          } else s = s.replace("{select}", "");
          if (e.searchable) {
            const t = `<div class='dataTable-search'><input class='dataTable-input' placeholder='${e.labels.placeholder}' type='text'></div>`;
            s = s.replace("{search}", t)
          } else s = s.replace("{search}", "");
          this.hasHeadings && this.render("header"), this.table.classList.add("dataTable-table");
          const i = a("nav", {
              class: "dataTable-pagination"
            }),
            n = a("ul", {
              class: "dataTable-pagination-list"
            });
          i.appendChild(n), s = s.replace(/\{pager\}/g, i.outerHTML), this.wrapper.innerHTML = s, this.container = this.wrapper.querySelector(".dataTable-container"), this.pagers = this.wrapper.querySelectorAll(".dataTable-pagination-list"), this.label = this.wrapper.querySelector(".dataTable-info"), this.table.parentNode.replaceChild(this.wrapper, this.table), this.container.appendChild(this.table), this.rect = this.table.getBoundingClientRect(), this.data = Array.from(this.body.rows), this.activeRows = this.data.slice(), this.activeHeadings = this.headings.slice(), this.update(), this.setColumns(), this.fixHeight(), this.fixColumns(), e.header || this.wrapper.classList.add("no-header"), e.footer || this.wrapper.classList.add("no-footer"), e.sortable && this.wrapper.classList.add("sortable"), e.searchable && this.wrapper.classList.add("searchable"), e.fixedHeight && this.wrapper.classList.add("fixed-height"), e.fixedColumns && this.wrapper.classList.add("fixed-columns"), this.bindEvents()
        }
        renderPage() {
          if (this.hasHeadings && (n(this.header), this.activeHeadings.forEach((t => this.header.appendChild(t)))), this.hasRows && this.totalPages) {
            this.currentPage > this.totalPages && (this.currentPage = 1);
            const t = this.currentPage - 1,
              e = document.createDocumentFragment();
            this.pages[t].forEach((t => e.appendChild(this.rows().render(t)))), this.clear(e), this.onFirstPage = 1 === this.currentPage, this.onLastPage = this.currentPage === this.lastPage
          } else this.setMessage(this.options.labels.noRows);
          let t, e = 0,
            s = 0,
            i = 0;
          if (this.totalPages && (e = this.currentPage - 1, s = e * this.options.perPage, i = s + this.pages[e].length, s += 1, t = this.searching ? this.searchData.length : this.data.length), this.label && this.options.labels.info.length) {
            const e = this.options.labels.info.replace("{start}", s).replace("{end}", i).replace("{page}", this.currentPage).replace("{pages}", this.totalPages).replace("{rows}", t);
            this.label.innerHTML = t ? e : ""
          }
          1 == this.currentPage && this.fixHeight()
        }
        renderPager() {
          if (n(this.pagers), this.totalPages > 1) {
            const t = "pager",
              e = document.createDocumentFragment(),
              s = this.onFirstPage ? 1 : this.currentPage - 1,
              i = this.onLastPage ? this.totalPages : this.currentPage + 1;
            this.options.firstLast && e.appendChild(r(t, 1, this.options.firstText)), this.options.nextPrev && e.appendChild(r(t, s, this.options.prevText));
            let n = this.links;
            this.options.truncatePager && (n = ((t, e, s, i, n) => {
              let r;
              const h = 2 * (i = i || 2);
              let o = e - i,
                l = e + i;
              const d = [],
                c = [];
              e < 4 - i + h ? l = 3 + h : e > s - (3 - i + h) && (o = s - (2 + h));
              for (let e = 1; e <= s; e++)
                if (1 == e || e == s || e >= o && e <= l) {
                  const s = t[e - 1];
                  s.classList.remove("active"), d.push(s)
                } return d.forEach((e => {
                const s = e.children[0].getAttribute("data-page");
                if (r) {
                  const e = r.children[0].getAttribute("data-page");
                  if (s - e == 2) c.push(t[e]);
                  else if (s - e != 1) {
                    const t = a("li", {
                      class: "ellipsis",
                      html: `<a href="#">${n}</a>`
                    });
                    c.push(t)
                  }
                }
                c.push(e), r = e
              })), c
            })(this.links, this.currentPage, this.pages.length, this.options.pagerDelta, this.options.ellipsisText)), this.links[this.currentPage - 1].classList.add("active"), n.forEach((t => {
              t.classList.remove("active"), e.appendChild(t)
            })), this.links[this.currentPage - 1].classList.add("active"), this.options.nextPrev && e.appendChild(r(t, i, this.options.nextText)), this.options.firstLast && e.appendChild(r(t, this.totalPages, this.options.lastText)), this.pagers.forEach((t => {
              t.appendChild(e.cloneNode(!0))
            }))
          }
        }
        renderHeader() {
          this.labels = [], this.headings && this.headings.length && this.headings.forEach(((t, e) => {
            if (this.labels[e] = t.textContent, t.firstElementChild && t.firstElementChild.classList.contains("dataTable-sorter") && (t.innerHTML = t.firstElementChild.innerHTML), t.sortable = "false" !== t.getAttribute("data-sortable"), t.originalCellIndex = e, this.options.sortable && t.sortable) {
              const e = a("a", {
                href: "#",
                class: "dataTable-sorter",
                html: t.innerHTML
              });
              t.innerHTML = "", t.setAttribute("data-sortable", ""), t.appendChild(e)
            }
          })), this.fixColumns()
        }
        bindEvents() {
          const t = this.options;
          if (t.perPageSelect) {
            const e = this.wrapper.querySelector(".dataTable-selector");
            e && e.addEventListener("change", (() => {
              t.perPage = parseInt(e.value, 10), this.update(), this.fixHeight(), this.emit("datatable.perpage", t.perPage)
            }), !1)
          }
          t.searchable && (this.input = this.wrapper.querySelector(".dataTable-input"), this.input && this.input.addEventListener("keyup", (() => this.search(this.input.value)), !1)), this.wrapper.addEventListener("click", (e => {
            const s = e.target.closest("a");
            s && "a" === s.nodeName.toLowerCase() && (s.hasAttribute("data-page") ? (this.page(s.getAttribute("data-page")), e.preventDefault()) : t.sortable && s.classList.contains("dataTable-sorter") && "false" != s.parentNode.getAttribute("data-sortable") && (this.columns().sort(this.headings.indexOf(s.parentNode)), e.preventDefault()))
          }), !1), window.addEventListener("resize", this.listeners.onResize)
        }
        onResize() {
          this.rect = this.container.getBoundingClientRect(), this.rect.width && this.fixColumns()
        }
        setColumns(t) {
          t || this.data.forEach((t => {
            Array.from(t.cells).forEach((t => {
              t.data = t.innerHTML
            }))
          })), this.options.columns && this.headings.length && this.options.columns.forEach((t => {
            Array.isArray(t.select) || (t.select = [t.select]), t.hasOwnProperty("render") && "function" == typeof t.render && (this.selectedColumns = this.selectedColumns.concat(t.select), this.columnRenderers.push({
              columns: t.select,
              renderer: t.render
            })), t.select.forEach((e => {
              const s = this.headings[e];
              t.type && s.setAttribute("data-type", t.type), t.format && s.setAttribute("data-format", t.format), t.hasOwnProperty("sortable") && s.setAttribute("data-sortable", t.sortable), t.hasOwnProperty("hidden") && !1 !== t.hidden && this.columns().hide([e]), t.hasOwnProperty("sort") && 1 === t.select.length && this.columns().sort(t.select[0], t.sort, !0)
            }))
          })), this.hasRows && (this.data.forEach(((t, e) => {
            t.dataIndex = e, Array.from(t.cells).forEach((t => {
              t.data = t.innerHTML
            }))
          })), this.selectedColumns.length && this.data.forEach((t => {
            Array.from(t.cells).forEach(((e, s) => {
              this.selectedColumns.includes(s) && this.columnRenderers.forEach((i => {
                i.columns.includes(s) && (e.innerHTML = i.renderer.call(this, e.data, e, t))
              }))
            }))
          })), this.columns().rebuild()), this.render("header")
        }
        destroy() {
          this.table.innerHTML = this.initialLayout, this.table.classList.remove("dataTable-table"), this.wrapper.parentNode.replaceChild(this.table, this.wrapper), this.initialized = !1, window.removeEventListener("resize", this.listeners.onResize)
        }
        update() {
          this.wrapper.classList.remove("dataTable-empty"), this.paginate(this), this.render("page"), this.links = [];
          let t = this.pages.length;
          for (; t--;) {
            const e = t + 1;
            this.links[t] = r(0 === t ? "active" : "", e, e)
          }
          this.sorting = !1, this.render("pager"), this.rows().update(), this.emit("datatable.update")
        }
        paginate() {
          const t = this.options.perPage;
          let e = this.activeRows;
          return this.searching && (e = [], this.searchData.forEach((t => e.push(this.activeRows[t])))), this.options.paging ? this.pages = e.map(((s, i) => i % t == 0 ? e.slice(i, i + t) : null)).filter((t => t)) : this.pages = [e], this.totalPages = this.lastPage = this.pages.length, this.totalPages
        }
        fixColumns() {
          if ((this.options.scrollY.length || this.options.fixedColumns) && this.activeHeadings && this.activeHeadings.length) {
            let t, e = !1;
            if (this.columnWidths = [], this.table.tHead) {
              if (this.options.scrollY.length && (e = a("thead"), e.appendChild(a("tr")), e.style.height = "0px", this.headerTable && (this.table.tHead = this.headerTable.tHead)), this.activeHeadings.forEach((t => {
                  t.style.width = ""
                })), this.activeHeadings.forEach(((t, s) => {
                  const i = t.offsetWidth,
                    n = i / this.rect.width * 100;
                  if (t.style.width = n + "%", this.columnWidths[s] = i, this.options.scrollY.length) {
                    const t = a("th");
                    e.firstElementChild.appendChild(t), t.style.width = n + "%", t.style.paddingTop = "0", t.style.paddingBottom = "0", t.style.border = "0"
                  }
                })), this.options.scrollY.length) {
                const t = this.table.parentElement;
                if (!this.headerTable) {
                  this.headerTable = a("table", {
                    class: "dataTable-table"
                  });
                  const e = a("div", {
                    class: "dataTable-headercontainer"
                  });
                  e.appendChild(this.headerTable), t.parentElement.insertBefore(e, t)
                }
                const s = this.table.tHead;
                this.table.replaceChild(e, s), this.headerTable.tHead = s, this.headerTable.parentElement.style.paddingRight = this.headerTable.clientWidth - this.table.clientWidth + parseInt(this.headerTable.parentElement.style.paddingRight || "0", 10) + "px", t.scrollHeight > t.clientHeight && (t.style.overflowY = "scroll")
              }
            } else {
              t = [], e = a("thead");
              const s = a("tr");
              Array.from(this.table.tBodies[0].rows[0].cells).forEach((() => {
                const e = a("th");
                s.appendChild(e), t.push(e)
              })), e.appendChild(s), this.table.insertBefore(e, this.body);
              const i = [];
              t.forEach(((t, e) => {
                const s = t.offsetWidth,
                  a = s / this.rect.width * 100;
                i.push(a), this.columnWidths[e] = s
              })), this.data.forEach((t => {
                Array.from(t.cells).forEach(((t, e) => {
                  this.columns(t.cellIndex).visible() && (t.style.width = i[e] + "%")
                }))
              })), this.table.removeChild(e)
            }
          }
        }
        fixHeight() {
          this.options.fixedHeight && (this.container.style.height = null, this.rect = this.container.getBoundingClientRect(), this.container.style.height = this.rect.height + "px")
        }
        search(t) {
          return !!this.hasRows && (t = t.toLowerCase(), this.currentPage = 1, this.searching = !0, this.searchData = [], t.length ? (this.clear(), this.data.forEach(((e, s) => {
            const i = this.searchData.includes(e);
            t.split(" ").reduce(((t, s) => {
              let i = !1,
                a = null,
                n = null;
              for (let t = 0; t < e.cells.length; t++)
                if (a = e.cells[t], n = a.hasAttribute("data-content") ? a.getAttribute("data-content") : a.textContent, n.toLowerCase().includes(s) && this.columns(a.cellIndex).visible()) {
                  i = !0;
                  break
                } return t && i
            }), !0) && !i ? (e.searchIndex = s, this.searchData.push(s)) : e.searchIndex = null
          })), this.wrapper.classList.add("search-results"), this.searchData.length ? this.update() : (this.wrapper.classList.remove("search-results"), this.setMessage(this.options.labels.noRows)), void this.emit("datatable.search", t, this.searchData)) : (this.searching = !1, this.update(), this.emit("datatable.search", t, this.searchData), this.wrapper.classList.remove("search-results"), !1))
        }
        page(t) {
          return t != this.currentPage && (isNaN(t) || (this.currentPage = parseInt(t, 10)), !(t > this.pages.length || t < 0) && (this.render("page"), this.render("pager"), void this.emit("datatable.page", t)))
        }
        sortColumn(t, e) {
          this.columns().sort(t, e)
        }
        insert(t) {
          let e = [];
          if (i(t)) {
            if (t.headings && !this.hasHeadings && !this.hasRows) {
              const e = a("tr");
              t.headings.forEach((t => {
                const s = a("th", {
                  html: t
                });
                e.appendChild(s)
              })), this.head.appendChild(e), this.header = e, this.headings = [].slice.call(e.cells), this.hasHeadings = !0, this.options.sortable = this.initialSortable, this.render("header"), this.activeHeadings = this.headings.slice()
            }
            t.data && Array.isArray(t.data) && (e = t.data)
          } else Array.isArray(t) && t.forEach((t => {
            const s = [];
            Object.entries(t).forEach((([t, e]) => {
              const i = this.labels.indexOf(t);
              i > -1 && (s[i] = e)
            })), e.push(s)
          }));
          e.length && (this.rows().add(e), this.hasRows = !0), this.update(), this.setColumns(), this.fixColumns()
        }
        refresh() {
          this.options.searchable && (this.input.value = "", this.searching = !1), this.currentPage = 1, this.onFirstPage = !0, this.update(), this.emit("datatable.refresh")
        }
        clear(t) {
          this.body && n(this.body);
          let e = this.body;
          this.body || (e = this.table), t && ("string" == typeof t && (document.createDocumentFragment().innerHTML = t), e.appendChild(t))
        }
        export (t) {
          if (!this.hasHeadings && !this.hasRows) return !1;
          const e = this.activeHeadings;
          let s = [];
          const a = [];
          let n, r, h, o;
          if (!i(t)) return !1;
          const l = {
            download: !0,
            skipColumn: [],
            lineDelimiter: "\n",
            columnDelimiter: ",",
            tableName: "myTable",
            replacer: null,
            space: 4,
            ...t
          };
          if (l.type) {
            if ("txt" !== l.type && "csv" !== l.type || (s[0] = this.header), l.selection)
              if (isNaN(l.selection)) {
                if (Array.isArray(l.selection))
                  for (n = 0; n < l.selection.length; n++) s = s.concat(this.pages[l.selection[n] - 1])
              } else s = s.concat(this.pages[l.selection - 1]);
            else s = s.concat(this.activeRows);
            if (s.length) {
              if ("txt" === l.type || "csv" === l.type) {
                for (h = "", n = 0; n < s.length; n++) {
                  for (r = 0; r < s[n].cells.length; r++)
                    if (!l.skipColumn.includes(e[r].originalCellIndex) && this.columns(e[r].originalCellIndex).visible()) {
                      let t = s[n].cells[r].textContent;
                      t = t.trim(), t = t.replace(/\s{2,}/g, " "), t = t.replace(/\n/g, "  "), t = t.replace(/"/g, '""'), t = t.replace(/#/g, "%23"), t.includes(",") && (t = `"${t}"`), h += t + l.columnDelimiter
                    } h = h.trim().substring(0, h.length - 1), h += l.lineDelimiter
                }
                h = h.trim().substring(0, h.length - 1), l.download && (h = "data:text/csv;charset=utf-8," + h)
              } else if ("sql" === l.type) {
                for (h = `INSERT INTO \`${l.tableName}\` (`, n = 0; n < e.length; n++) !l.skipColumn.includes(e[n].originalCellIndex) && this.columns(e[n].originalCellIndex).visible() && (h += `\`${e[n].textContent}\`,`);
                for (h = h.trim().substring(0, h.length - 1), h += ") VALUES ", n = 0; n < s.length; n++) {
                  for (h += "(", r = 0; r < s[n].cells.length; r++) !l.skipColumn.includes(e[r].originalCellIndex) && this.columns(e[r].originalCellIndex).visible() && (h += `"${s[n].cells[r].textContent}",`);
                  h = h.trim().substring(0, h.length - 1), h += "),"
                }
                h = h.trim().substring(0, h.length - 1), h += ";", l.download && (h = "data:application/sql;charset=utf-8," + h)
              } else if ("json" === l.type) {
                for (r = 0; r < s.length; r++)
                  for (a[r] = a[r] || {}, n = 0; n < e.length; n++) !l.skipColumn.includes(e[n].originalCellIndex) && this.columns(e[n].originalCellIndex).visible() && (a[r][e[n].textContent] = s[r].cells[n].textContent);
                h = JSON.stringify(a, l.replacer, l.space), l.download && (h = "data:application/json;charset=utf-8," + h)
              }
              return l.download && (l.filename = l.filename || "datatable_export", l.filename += "." + l.type, h = encodeURI(h), o = document.createElement("a"), o.href = h, o.download = l.filename, document.body.appendChild(o), o.click(), document.body.removeChild(o)), h
            }
          }
          return !1
        }
        import(t) {
          let e = !1;
          if (!i(t)) return !1;
          const s = {
            lineDelimiter: "\n",
            columnDelimiter: ",",
            ...t
          };
          if (s.data.length || i(s.data)) {
            if ("csv" === s.type) {
              e = {
                data: []
              };
              const t = s.data.split(s.lineDelimiter);
              t.length && (s.headings && (e.headings = t[0].split(s.columnDelimiter), t.shift()), t.forEach(((t, i) => {
                e.data[i] = [];
                const a = t.split(s.columnDelimiter);
                a.length && a.forEach((t => {
                  e.data[i].push(t)
                }))
              })))
            } else if ("json" === s.type) {
              const t = (t => {
                let e = !1;
                try {
                  e = JSON.parse(t)
                } catch (t) {
                  return !1
                }
                return !(null === e || !Array.isArray(e) && !i(e)) && e
              })(s.data);
              t && (e = {
                headings: [],
                data: []
              }, t.forEach(((t, s) => {
                e.data[s] = [], Object.entries(t).forEach((([t, i]) => {
                  e.headings.includes(t) || e.headings.push(t), e.data[s].push(i)
                }))
              })))
            }
            i(s.data) && (e = s.data), e && this.insert(e)
          }
          return !1
        }
        print() {
          const t = this.activeHeadings,
            e = this.activeRows,
            s = a("table"),
            i = a("thead"),
            n = a("tbody"),
            r = a("tr");
          t.forEach((t => {
            r.appendChild(a("th", {
              html: t.textContent
            }))
          })), i.appendChild(r), e.forEach((t => {
            const e = a("tr");
            Array.from(t.cells).forEach((t => {
              e.appendChild(a("td", {
                html: t.textContent
              }))
            })), n.appendChild(e)
          })), s.appendChild(i), s.appendChild(n);
          const h = window.open();
          h.document.body.appendChild(s), h.print()
        }
        setMessage(t) {
          let e = 1;
          this.hasRows ? e = this.data[0].cells.length : this.activeHeadings.length && (e = this.activeHeadings.length), this.wrapper.classList.add("dataTable-empty"), this.label && (this.label.innerHTML = ""), this.totalPages = 0, this.render("pager"), this.clear(a("tr", {
            html: `<td class="dataTables-empty" colspan="${e}">${t}</td>`
          }))
        }
        columns(t) {
          return new l(this, t)
        }
        rows(t) {
          return new o(this, t)
        }
        on(t, e) {
          this.events = this.events || {}, this.events[t] = this.events[t] || [], this.events[t].push(e)
        }
        off(t, e) {
          this.events = this.events || {}, t in this.events != 0 && this.events[t].splice(this.events[t].indexOf(e), 1)
        }
        emit(t) {
          if (this.events = this.events || {}, t in this.events != 0)
            for (let e = 0; e < this.events[t].length; e++) this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
        }
      }
      s.DataTable = u
    }, {
      "./date-cd1c23ce.js": 1
    }]
  }, {}, [2])(2)
}));
//# sourceMappingURL=/sm/b71d1fdf2e18834149b01e90c6fb68c49c8720f6f79466e6360b5d5b6793e05e.map