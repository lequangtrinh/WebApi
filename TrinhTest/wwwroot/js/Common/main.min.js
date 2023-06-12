'use strict'
//Master
//var sideBarIsHide = false;
//var ManuelSideBarIsHide = false;
//var ManuelSideBarIsState = false;
var isMobile = window.matchMedia("only screen and (max-width: 768px)");
if (isMobile.matches) {
    //resizeSidebar("1");
    $(".computer.only").toggleClass("displaynone");
    $(".colhidden").toggleClass("displaynone");
}

// using context
$('.ui.right.sidebar')
    .sidebar({
        context: $('#contextWrap .pusher'),
        transition: 'slide out',
        silent: true
    })
    .sidebar('attach events', '.rightsidebar');

$(".ui.dropdown").dropdown({
    allowCategorySelection: true,
    forceSelection: false,
    transition: "fade up"
});

$('.ui.accordion:not(#menuDesktopCategory)').accordion({
    selector: {},
    duration: 0
});
$('#menuDesktopCategory.ui.accordion').accordion({
    selector: {}
});

$(document).ready(function () {
    colorize();
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
    $(".ui.rating").rating(); //rating trigger
    $('.tabular .item').tab();
    $(".hamburger").on("click", function() {
        this
            .classList
            .toggle("is-active");
    });
    $('.ui.embed').embed();
    $(window).trigger("resize");
    CreateObserversMutationTable();
    Master_ScrollTableHorizontal();
   // ScrollBar_Custom();
});

function ScrollBar_Custom() {
    $(".overflow-auto").each((idx,element) => {
        if (!$(element).hasClass("mCustomScrollbar"))
            $(element).mCustomScrollbar({
                axis: "yx", //
                scrollbarPosition: "inside", // Vị Trí Thanh Cuộn Trên Nội Dung // outside OR inside
                autoHideScrollbar: true, // true: auto ẩn hiện thanh scrollbar
                autoDraggerLength: true, // false: Giữ nguyên kích thước thanh scroll
                live: true,
                theme: 'vttech-theme',
                //mouseWheel: {
                //    enable: true,
                //    scrollAmount: 5
                //},
                snapAmount: 40, // Số px 1 lần cuộn (integer)
                scrollButtons: {
                    enable: false // Button Scroll (boolean)
                },
                advanced: {
                    autoExpandHorizontalScroll: true
                },
                keyboard: {
                    scrollAmount: 40 // Số px 1 lần cuộn (integer)
                },
                scrollInertia: 400, //Thời gian cuộn đến trong 1 lần (s)
            });
    })
    $(".table-responsive,.mobile-responsive").each((idx, element) => {
        if (!$(element).hasClass("mCustomScrollbar"))
            $(element).mCustomScrollbar({
                axis: "xy", //
                scrollbarPosition: "inside", // Vị Trí Thanh Cuộn Trên Nội Dung // outside OR inside
                autoHideScrollbar: true, // true: auto ẩn hiện thanh scrollbar
                autoDraggerLength: true, // false: Giữ nguyên kích thước thanh scroll
                live: true,
                theme: 'vttech-theme',
                snapAmount: 40, // Số px 1 lần cuộn (integer)
                scrollButtons: {
                    enable: false // Button Scroll (boolean)
                },
                keyboard: {
                    scrollAmount: 40 // Số px 1 lần cuộn (integer)
                },
                scrollInertia: 400, //Thời gian cuộn đến trong 1 lần (s)
                advanced: {
                    updateOnContentResize: true,
                    updateOnImageLoad : true,
                    updateOnSelectorChange: true,
                    autoExpandHorizontalScroll: true,
                },
                documentTouchScroll : true
            });
    })
    $(".overflow-x").each((idx, element) => {
        if (!$(element).hasClass("mCustomScrollbar"))
            $(element).mCustomScrollbar({
                axis: "x", //
                scrollbarPosition: "inside", // Vị Trí Thanh Cuộn Trên Nội Dung // outside OR inside
                autoHideScrollbar: true, // true: auto ẩn hiện thanh scrollbar
                autoDraggerLength: true, // false: Giữ nguyên kích thước thanh scroll
                live: true,
                theme: 'vttech-theme',
                snapAmount: 40, // Số px 1 lần cuộn (integer)
                scrollButtons: {
                    enable: false // Button Scroll (boolean)
                },
                advanced: {
                    autoExpandHorizontalScroll: true
                },
                keyboard: {
                    scrollAmount: 40 // Số px 1 lần cuộn (integer)
                },
                scrollInertia: 400, //Thời gian cuộn đến trong 1 lần (s)
            });
    })
    $(".overflow-y").each((idx, element) => {
        if (!$(element).hasClass("mCustomScrollbar"))
            $(element).mCustomScrollbar({
                axis: "y", //
                scrollbarPosition: "inside", // Vị Trí Thanh Cuộn Trên Nội Dung // outside OR inside
                autoHideScrollbar: true, // true: auto ẩn hiện thanh scrollbar
                autoDraggerLength: true, // false: Giữ nguyên kích thước thanh scroll
                live: true,
                theme: 'vttech-theme',
                snapAmount: 40, // Số px 1 lần cuộn (integer)
                scrollButtons: {
                    enable: false // Button Scroll (boolean)
                },
                advanced: {
                    autoExpandHorizontalScroll: true
                },
                keyboard: {
                    scrollAmount: 40 // Số px 1 lần cuộn (integer)
                },
                scrollInertia: 400, //Thời gian cuộn đến trong 1 lần (s)
            });
    })

}


var ObserverTable;

function CreateObserversMutationTable() {
    if (ObserverTable != undefined && ObserverTable != null) {
        if (ObserverTable != undefined && ObserverTable != null) {
            ObserverTable.disconnect();
        }
    }
    else {
        ObserverTable = new MutationObserver(CallbackMutationTable);
    }
}
function CallbackMutationTable(mutations) {
    let MainMaster = $("#MasterContainer > .pusher.pushable");
    let MainMaster_height = MainMaster.outerHeight();
    for (let mutation of mutations) {
        if (mutation.type === 'childList') {
            if (mutation.target.offsetHeight > MainMaster_height) {
                $('#ActionScrollTable').addClass("show");
            }
            else {
                $('#ActionScrollTable').removeClass("show");
            }
        }
    }
}
function Master_ScrollTableHorizontal() {
    let MainMaster = $("#MasterContainer > .pusher.pushable");
    let MainMaster_Table = MainMaster.find("table");
    MainMaster_Table.each(function () {
        let divScroll = $(this).parent();
        let divScroll_Attr = divScroll.css("overflowX");
        if (divScroll_Attr == "auto" || divScroll_Attr == "scroll") {
            ObserverTable.observe(divScroll[0],{
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            });
        }
    })
}




//Sidebar Change Zoom Browser
function ChangeZoomBrowser() {
    $('#ZoomBrowser input[name="throughput"]').click(function () {
        let zoom = $(this).val();
        //document.body.style.zoom = zoom + '%';
        Cookies.set('VTTECH_Font_Size_Browser', zoom);
        Check_Change_Font_Size();
        $(window).trigger("resize");
    })
    if (Cookies.get('VTTECH_Font_Size_Browser') != undefined) {
        let zoomCookie = Cookies.get('VTTECH_Font_Size_Browser');
        $('#ZoomBrowser input[name="throughput"]').each(function () {
            let valzoom = $(this).val();
            if (valzoom == zoomCookie) {
                $(this).trigger('click');
                return false;
            }
        })
    }
    if ($(window).width() <= 768) {
        Cookies.set('VTTECH_Font_Size_Browser', "font-default");
    }
}

function setCookie(cname, cvalue, exMins) {
    var d = new Date();
    d.setTime(d.getTime() + (exMins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function OnclickSetDefaulNewTab() {
    if (Cookies.get('_VTT_Default_Open') != undefined) {
        setCookie('_VTT_Default_Open', '', 0)
        $('#DefaultNewTab').text('Mặc Định');
    }
    else{
        Cookies.set('_VTT_Default_Open', PortClient, 365);
        $('#DefaultNewTab').text('Bỏ Mặc Định');
    }
}
//Sidebar And Navbar Coloring Function (This button on Footer)
function colorize() {
    let a;
    let b;
    let d;
    let z;
    let l;
    let profile;


        if (b == null) {
            b = $(".sidebar").attr("data-color");
        }
        //$(".sidemenu").removeClass(b).addClass(Cookies.get('sidebarColor'));
        //$(".sidebar").attr("data-color", Cookies.get('sidebarColor'));
    


        if (z == null) {
            z = $(".navslide .menu").attr("data-color");
        }
        //$(".navslide .menu").removeClass(z).addClass(Cookies.get('headerColor'));
        //$(".navslide .menu").attr("data-color", Cookies.get('headerColor'));
    
 
        if (z == null) {
            z = $("#MainCustomer_Header_Info .profileheader").attr("data-background");
        }
        //$("#MainCustomer_Header_Info .profileheader").removeClass(z).addClass(Cookies.get('profilebackground'));
        //$("#MainCustomer_Header_Info .profileheader").attr("data-background", Cookies.get('profilebackground'));
    


    $(".profileheaderList li a").on("click", function (b) {
        var c = $(this).attr("data-background");
        if (profile == null) {
            profile = $("#MainCustomer_Header_Info .profileheader").attr("data-background");
        }
        $("#MainCustomer_Header_Info .profileheader").removeClass(profile).addClass(c);
        $("#MainCustomer_Header_Info .profileheader").attr("data-background",c);
        profile = c;
        Cookies.set('profilebackground', c);
    });

    $(".colorlist li a").on("click", function(b) {
        var c = $(this).attr("data-addClass");
        if (l == null) {
            l = $(".navslide .menu").attr("data-color");
        }
        $(".navslide .menu").removeClass(l).addClass(c);
        l = c;
        Cookies.set('headerColor', c);
    });
    $(".sidecolor li a").on("click", function(a) {
        var c = $(this).attr("data-addClass");
        // a.preventDefault();
        if (d == null) {
            d = $(".sidebar").attr("data-color");
        }
        $(".sidemenu").removeClass(d).addClass(c);
        $(".accordion").removeClass("inverted").addClass("inverted");
        Cookies.set('sidebarColor', c);
        d = c;
    });
    $(".colorize").popup({
        on: "click"
    });
}
