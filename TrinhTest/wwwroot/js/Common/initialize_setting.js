﻿


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
            //if (sys_isMobile === 1) {
            //    if ($(".view-back-master").length != 0) {
            //        $(".view-back-master").unbind("click").on("click", function () {
            //            let _master_detail = $(this).closest(".view-session");
            //            _master_detail.removeClass("active");
            //        });
            //    }
            //    if ($(".view-session-master").length != 0) {
            //        $(".view-session-master").unbind("click").on("click", ".master-group-item", function () {
            //            let _title = $(this).attr("data-title") ? $(this).attr("data-title") : "";
            //            let _master = $(this).closest(".view-session");
            //            _master.toggleClass("active");
            //            _master.find(".card-header-title").html(_title);
            //        })
            //    }
            //    if ($(".view-session-detail").length != 0) {
            //        var swiper = new Swipe('.view-session-detail');
            //        swiper.onLeft(function () {
            //            let parent = $(this.element).closest(".view-session")
            //            parent.removeClass("active");
            //        });
            //        swiper.onRight(function () {

            //        });
            //        swiper.onUp(function () {

            //        });
            //        swiper.onDown(function () {

            //        });
            //        swiper.run();
            //    }
            //}
        }, 100
    )


    //#endregion
})(jQuery);
