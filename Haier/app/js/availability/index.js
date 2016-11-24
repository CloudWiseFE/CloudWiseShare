seajs.use([], function () {
    // 时间控件
    $("#js_datepicker_start").datetimepicker({
        onSelect: function () {
            console.log(arguments);
        }
    });
    $("#js_datepicker_end").datetimepicker({
        onSelect: function () {
            console.log(arguments);
        }
    });

    // 散点图
    var datetimes = [
        '2016-11-11 11:00', '2016-11-11 12:00', '2016-11-11 13:00',
        '2016-11-11 14:00', '2016-11-11 15:00', '2016-11-11 16:00',
        '2016-11-11 17:00'
    ];
    var pointsChart = echarts.init($('#js_points').get());
    var option = {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        legend: {
            data: ['正常', '警告', '内容错误', '页面错误'],
            y: 'bottom'
        },
        xAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return datetimes[value];
                    }
                },
                axisTick: {
                    show: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '性能',
                axisTick: {
                    show: true
                }
            }
        ],
        series: [
            {
                name: '正常',
                type: 'scatter',
                symbol: 'circle',
                data: [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                    [4, 4],
                    [5, 5],
                    [6, 6],
                    [7, 7]
                ],
            }, {
                name: '警告',
                type: 'scatter',
                symbol: 'circle',
                data: [
                    [1, 11],
                    [2, 12],
                    [3, 13],
                    [4, 14],
                    [5, 15],
                    [6, 16],
                    [7, 17]
                ]
            }, {
                name: '内容错误',
                type: 'scatter',
                symbol: 'circle',
                data: [
                    [1, 21],
                    [2, 22],
                    [3, 23],
                    [4, 24],
                    [5, 25],
                    [6, 26],
                    [7, 27]
                ]
            }, {
                name: '页面错误',
                type: 'scatter',
                symbol: 'circle',
                data: [
                    [1, 31],
                    [2, 32],
                    [3, 33],
                    [4, 34],
                    [5, 35],
                    [6, 36],
                    [7, 37]
                ]
            }
        ]
    };
    pointsChart.setOption(option);

});