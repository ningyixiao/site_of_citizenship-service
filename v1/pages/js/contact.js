var lang = "zh";
var loadPath_zh = "/locales/zh/zh-contact.json";
var loadPath_en = "/locales/en/en-contact.json";
$(function() {
    $("#choose_lang a").click(function(e) {
        e.preventDefault();
        var choose_lang = $(e.target).attr("href");
        if (lang == choose_lang) {
            return;
        } else {
            var load_path = "";
            switch (choose_lang) {
                case "en":
                    load_path = loadPath_en;
                    lang = "en";
                    break;
                case "zh":
                    load_path = loadPath_zh;
                    lang = "zh";
                    break;
                default:
                    load_path = loadPath_zh;
                    lang = "zh";
            }
            // console.log(load_path)
            i18next.use(i18nextXHRBackend).init({
                backend: {
                    loadPath: load_path
                }
            }, function(err, t) {
                jqueryI18next.init(i18next, $);
                // start localizing, details:
                // https://github.com/i18next/jquery-i18next#usage-of-selector-function
                $('title').localize();
            });
        }
    });
});
