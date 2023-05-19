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
