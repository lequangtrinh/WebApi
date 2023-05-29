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
    notif_initialize('danger', 'Something Wrongs');
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
    
    if (VDMINIFY == "true" && !url.includes('/assests/') && !url.includes('/assets/') ) url = url.replace('.js', '.min.js');
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
    if (VDMINIFY == "true" && !_url.includes('/assests/') && !_url.includes('/assets/')) _url = _url.replace('.js', '.min.js');
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
    heartBeat();
    setInterval("heartBeat()", 1000 * 1000);
}); 