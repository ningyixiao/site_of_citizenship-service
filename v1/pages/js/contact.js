var lang = "zh";
var loadPath_zh = "/locales/zh/zh-contact.json";
var loadPath_en = "/locales/en/en-contact.json";
// 提供给百度地图api的变量，需要先初始化
var company = "我们公司";
var map_address = "香港中环荆威广场17楼";

function callBaiduMapApi(company,map_address) {
    // 百度地图API功能
    var map = new BMap.Map("map-container");
    var point = new BMap.Point(114.167791, 22.284156);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.centerAndZoom(point, 16); //15指地图的缩放程度
    var opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: company, // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: ""
    }
    var infoWindow = new BMap.InfoWindow(map_address, opts); // 创建信息窗口对象 
    marker.addEventListener("click", function() {
        map.openInfoWindow(infoWindow, point); //开启信息窗口
    });
}
$(function() {
    callBaiduMapApi(company,map_address);
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
                    company = "my company";
                    map_address = "17/F, Silver Fortune Plaza, No.1 Wellington Street, Central";
                    break;
                case "zh":
                    load_path = loadPath_zh;
                    lang = "zh";
                    company = "我们公司";
                    map_address = "香港中环荆威广场17楼";
                    break;
                default:
                    load_path = loadPath_zh;
                    lang = "zh";
                    company = "我们公司";
                    map_address = "香港中环荆威广场17楼";
            }
            callBaiduMapApi(company,map_address);
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
