var loadPath_zh = "/locales/zh/solutions/zh-ireland.json";
var loadPath_en = "/locales/en/solutions/en-ireland.json";
// set cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// get cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
// 国际化方法
function i18nMethod(choose_lang) {
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
        $('nav').localize();
        $('.view').localize();
        $('.main').localize();
        $('footer').localize();
    });
}
$(function() {
    // 获取本地存储的语言类型变量，如果没有，则默认为zh
    var cookie_lang = getCookie("lang");
    var lang = "";
    if (cookie_lang == null) {
        lang = "zh";
    } else {
        lang = cookie_lang;
    }
    // 根据默认语言执行国际化方法
    i18nMethod(lang);
    // 监听用户点击事件
    $("#choose_lang a").click(function(e) {
        e.preventDefault();
        var choose_lang = $(e.target).attr("href");
        if (lang == choose_lang) {
            return;
        } else {
            // 设置本地存储的语言类型变量为choose_lang的值
            setCookie("lang", choose_lang);
            i18nMethod(choose_lang);
        }
    });
});
