var loadPath_zh = "/locales/zh/solutions/zh-portugal.json";
var loadPath_en = "/locales/en/solutions/en-portugal.json";
var apply_progress_path = "http://dkglobalvisa.b0.upaiyun.com/img/images/portugal/apply_progress.jpg";
var apply_progress_en_path = "http://dkglobalvisa.b0.upaiyun.com/img/images/portugal/apply_progress_en.jpg";
// set cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/";
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
// 判断当前页面语言，给tabs加上或者移除一个类，改变其样式
function changeTabs(lang) {
    if (lang == "en") {
        $("#nav_tabs").addClass("tabs_style");
    } else {
        $("#nav_tabs").removeClass("tabs_style");
    }
}
// 加载申请流程图片
function loadImg(choose_lang){
    var img_path = "";
    switch (choose_lang) {
        case "en":
            img_path = apply_progress_en_path;
            break;
        case "zh":
            img_path = apply_progress_path;
            break;
        default:
            img_path = apply_progress_path;
    }
    $("#apply_progress").attr("src",img_path);
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
    // 执行changeTabs()方法，使tabs样式适应屏幕
    changeTabs(lang);
    // 根据默认语言执行国际化方法
    i18nMethod(lang);
    // 根据默认语言加载对应语言的流程图片
    loadImg(lang);
    // 监听用户点击事件
    $("#choose_lang a").click(function(e) {
        e.preventDefault();
        var choose_lang = $(e.target).attr("href");
        if (lang == choose_lang) {
            return;
        } else {
            // 设置本地存储的语言类型变量为choose_lang的值
            setCookie("lang", choose_lang);
            lang = choose_lang;
            // 执行changeTabs()方法，使tabs样式适应屏幕
            changeTabs(lang);
            i18nMethod(lang);
            loadImg(lang);
        }
    });
});
