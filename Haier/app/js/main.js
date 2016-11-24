seajs.use([], function () {
    var body = $('body');

    // 左侧导航操作
    $('#js_main_sidebar_hide').on('click', function (e) {
        e.preventDefault();
        body.toggleClass('main-sidebar-lt');
    });

});