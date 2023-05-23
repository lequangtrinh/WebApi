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
})(jQuery);
