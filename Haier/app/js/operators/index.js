seajs.use([], function () {

    var barChart = echarts.init($('#js_bar').get());
    var option = {
        title: {
            show: false
        },
        grid: {
            y: 20
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y: 'bottom',
            data: ['最小延时(ms)', '平均延时(ms)', '最大延时(ms)', '最小丢包率(%)', '平均丢包率(%)', '最大丢包率(%)']
        },
        xAxis: [
            {
                type: 'category',
                data: ['电信', '联通', '移动', '教育网', '海外']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return value + ' ms';
                    }
                },
            }
        ],
        series: [
            {
                name: '最小延时(ms)',
                type: 'bar',
                data: [200, 500, 300, 1000, 1200]
            },
            {
                name: '平均延时(ms)',
                type: 'bar',
                data: [40, 700, 200, 100, 900]
            },
            {
                name: '最大延时(ms)',
                type: 'bar',
                data: [1200, 50, 1300, 500, 400]
            },
            {
                name: '最小丢包率(%)',
                type: 'bar',
                data: [30, 10, 2, 4, 70]
            },
            {
                name: '平均丢包率(%)',
                type: 'bar',
                data: [12, 54, 32, 89, 60]
            },
            {
                name: '最大丢包率(%)',
                type: 'bar',
                data: [20, 50, 30, 10, 20]
            }
        ]
    };
    barChart.setOption(option);

});