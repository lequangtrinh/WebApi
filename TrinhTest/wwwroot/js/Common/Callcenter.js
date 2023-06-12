
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
