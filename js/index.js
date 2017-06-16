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

$(function() {
    // 监听用户点击事件
    $("#choose_lang a").click(function(e) {
        e.preventDefault();
        var choose_lang = $(e.target).attr("href");
        if (lang == choose_lang) {
            return;
        } else {
            // 设置本地存储的语言类型变量为choose_lang的值
            setCookie("lang",choose_lang);
            lang = choose_lang;

        }
    });
});
