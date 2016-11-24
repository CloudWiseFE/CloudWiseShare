seajs.use([], function () {
    // 可用性
    var pie1 = echarts.init(document.getElementById('js_pie1'));
    var option1 = {
        title: {
            show: false
        },
        legend: {
            show: false,
            data: ['DNS解析', '400错误', '500错误', '连接超时', '服务器未响应']
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: false,
        series: [
            {
                name: '可用性',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 335, name: 'DNS解析'},
                    {value: 310, name: '400错误'},
                    {value: 234, name: '500错误'},
                    {value: 135, name: '连接超时'},
                    {value: 1548, name: '服务器未响应'}
                ]
            }
        ]
    };
    pie1.setOption(option1);

});