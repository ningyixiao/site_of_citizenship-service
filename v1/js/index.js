// use plugins and options as needed, for options, detail see
// http://i18next.com/docs/
i18next.use(i18nextXHRBackend).init({
    backend :{
        loadPath: '../locales/zh/zh-CN-index.json'
    }
}, function(err, t) {
    // for options see
    // https://github.com/i18next/jquery-i18next#initialize-the-plugin
    jqueryI18next.init(i18next, $);
    // start localizing, details:
    // https://github.com/i18next/jquery-i18next#usage-of-selector-function
    $('title').localize();
});
