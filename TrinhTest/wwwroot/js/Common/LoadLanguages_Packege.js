"use strict";
(function ($) {
    $("#Languagesdropdown").click(function (e) {
        if ($("#CkeckLanguages").hasClass('show')) {
            $("#CkeckLanguages").removeClass('show');
        }
        else {
            $("#CkeckLanguages").addClass('show');
            ClickSettingLanguages();
        }
    });
    // #region // Load Data Language
    var xmlLang_static_Url;
    function ClickSettingLanguages () {
        document.querySelectorAll('.LanguagesSetting').forEach(node => {
            node.addEventListener("click", e => {
                switch (node.childNodes[1].innerText) {
                    case "VietNam": {
                        xmlLang_static_Url ="/Language/VN/static.xml"
                        break;
                    }
                    case "JanPan": {
                        xmlLang_static_Url = "/Language/JP/static.xml"
                        break;
                    }
                    case "US-UK": {
                        xmlLang_static_Url = "/Language/ENG/static.xml"
                        break;
                    }
                };
            });
        });
    }
})(jQuery);
