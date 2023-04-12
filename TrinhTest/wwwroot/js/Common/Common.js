//count page
function ResCountPage(data) {
    let count = ((data.length / 50) <= 0) ? 1 : (data.length / 50);
    return count > Math.round(count) ? Math.round(count + 0.5) : Math.round(count);
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