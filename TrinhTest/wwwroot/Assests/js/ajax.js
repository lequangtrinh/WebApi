function AjaxLoad (url, data, async, error, success, sender, before, complete) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        type: "POST",
        data: data,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        async: async,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.href =ErrorPage(XMLHttpRequest.status);;
        },
        success: function (result) {
            if (result != undefined)
                if (success != undefined && success != null && success.length != 0) success(result);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("X-Access-Token"));
            xhr.setRequestHeader("UserID", localStorage.getItem("X-UserID"));
            if (before != undefined && before != null && before.length != 0) before();
            if (sender != undefined && sender != null && sender.length != 0)
                sender.css('pointer-events', 'none');
        },
        complete: function (e) {
            if (complete != undefined && complete != null && complete.length != 0) complete(e);
            if (sender != undefined && sender != null && sender.length != 0)
                sender.css('pointer-events', 'auto');
        }
    });
}
function AjaxJWT (url, data, async, success) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/json; charset=utf-8',
        async: async,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.href =ErrorPage(XMLHttpRequest.status);
        }
        , beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("X-Access-Token"));
            xhr.setRequestHeader("UserID",localStorage.getItem("X-UserID"));
        },
        success: function (result) {
            if (result != undefined)
                if (success != undefined && success != null && success.length != 0)
                    success(result);
        },
    });
}
function AjaxApi (url, data, async, success, before, complete) {
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/json; charset=utf-8',
        async: async,
        success: function (result) {
            if (result != undefined)
                if (success != undefined && success != null && success.length != 0)
                    success(result);
        }
        , beforeSend: function (e) {
            if (before != undefined && before != null && before.length != 0) before();
        },
        complete: function (e) {
            if (complete != undefined && complete != null && complete.length != 0) complete(e);
        }
    });
}
function AjaxUpload (url, inputid, success, error) {
    $('#' + inputid).unbind("change");
    $('#' + inputid).change(function () {
        let input = document.getElementById(inputid);
        let files = input.files;
        let formData = new FormData();
        for (let i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }

        $.ajax(
            {
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (error != undefined && error != null && error.length != 0) error();
                },
                success: function (result) {
                    if (result != undefined)
                        if (success != undefined && success != null && success.length != 0)
                            success(result);
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("X-Access-Token"));
                    xhr.setRequestHeader("UserID", localStorage.getItem("X-UserID"));
                }
            }
        );
    })
}
function AjaxUpload_Multi (url, inputid, success, error, before, complete) {
    $('#' + inputid).unbind("change");
    $('#' + inputid).change(function () {
        var promises = [];
        let input = document.getElementById(inputid);
        let files = input.files;
        for (let i = 0; i != files.length; i++) {
            promises.push(AjaxUpload_MultiExe(url, files[i], files[i].name, success, error, before));
        }
        Promise.all(promises).then((values) => { });
    });
}
function AjaxUpload_MultiExe (url, file, namefile, success, error, before) {
    return new Promise(resolve => {
        let formData = new FormData();
        formData.append("files", file);
        $.ajax(
            {
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                type: "POST",
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (error != undefined && error != null && error.length != 0) error(namefile);
                },
                success: function (result, e) {
                    if (result != undefined) {
                        if (success != undefined && success != null && success.length != 0)
                            success(result, namefile);
                    }
                    resolve(true);
                },
                beforeSend: function (xhr, e) {
                    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("X-Access-Token"));
                    xhr.setRequestHeader("UserID", localStorage.getItem("X-UserID"));
                    if (before != undefined && before != null && before.length != 0)
                        before(namefile);
                }
            }
        );
    });

}