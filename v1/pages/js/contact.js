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
                $('#navbar').localize();
                $('#main').localize();
                $('#footer').localize();
            });
        }
    });
});
// 提供给百度地图api的变量
var company = "";
var map_address = "";
switch (lang) {
    case "en":
        company = "我们公司";
        map_address = "香港中环荆威广场17楼";
        break;
    case "zh":
        company = "my company";
        map_address = "17/F, Silver Fortune Plaza, No.1 Wellington Street, Central";
        break;
    default:
        company = "我们公司";
        map_address = "香港中环荆威广场17楼";
}
