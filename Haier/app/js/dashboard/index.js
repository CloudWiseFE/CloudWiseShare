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

    // 页面性能
    var pie2 = echarts.init(document.getElementById('js_pie2'));
    var option2 = {
        title: {
            show: false
        },
        legend: {
            show: false,
            data: ['DNS性能', 'SSL连接建立', '正常', '连接建立', '首字节']
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '页面性能',
                type: 'pie',
                radius: [0, 45],
                data: [
                    {value: 20, name: '连接建立'},
                    {value: 100, name: '首字节'}
                ]
            },
            {
                name: '页面性能',
                type: 'pie',
                radius: [60, 80],
                data: [
                    {value: 10, name: 'DNS性能'},
                    {value: 10, name: 'SSL连接建立'},
                    {value: 80, name: '正常'}
                ]
            }
        ]
    };
    pie2.setOption(option2);

    //内容可用性
    var pie3 = echarts.init(document.getElementById('js_pie3'));
    var option3 = {
        title: {
            show: false
        },
        legend: {
            show: false,
            data: ['DNS性能', 'SSL连接建立', '正常', '连接建立', '首字节']
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '页面性能',
                type: 'pie',
                radius: [0, 45],
                data: [
                    {value: 20, name: '连接建立'},
                    {value: 100, name: '首字节'}
                ]
            },
            {
                name: '页面性能',
                type: 'pie',
                radius: [60, 80],
                data: [
                    {value: 10, name: 'DNS性能'},
                    {value: 10, name: 'SSL连接建立'},
                    {value: 80, name: '正常'}
                ]
            }
        ]
    };
    pie3.setOption(option3);

    // 资源性能
    var radar4 = echarts.init(document.getElementById('js_radar4'));
    var option4 = {
        title: {
            show: false
        },
        legend: {
            show: false,
            data: ['资源性能']
        },
        tooltip: {
            trigger: 'axis'
        },
        calculable: false,
        polar: [
            {
                indicator: [
                    {text: 'Content', max: 100},
                    {text: 'Cookie', max: 50},
                    {text: 'CSS', max: 100},
                    {text: 'Image', max: 100},
                    {text: 'JS', max: 80},
                    {text: 'Server', max: 100}
                ],
                radius: 70
            }
        ],
        series: [
            {
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data: [
                    {
                        value: [97, 32, 74, 95, 88, 92],
                        name: '资源性能'
                    }
                ]
            }
        ]
    };
    radar4.setOption(option4);

    // 首屏时间
    var map = echarts.init(document.getElementById('js_map'));
    var option5 = {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'item'
        },
        dataRange: {
            textStyle: {
                itemStyle: {
                    color: 'red'
                }
            },
            splitList: [{
                start: 1500
            }, {
                start: 900,
                end: 1500
            }, {
                start: 310,
                end: 1000
            }, {
                start: 200,
                end: 300
            }, {
                start: 10,
                end: 200,
                label: '10 到 200（自定义label）'
            }, {
                start: 5,
                end: 5,
                label: '5（自定义特殊颜色）',
                color: '#333333'
            }, {
                end: 10
            }],
            color: ['orangered', 'yellow', 'lightskyblue']
        },
        series: [
            {
                name: '首屏时间',
                type: 'map',
                mapType: 'world',
                nameMap: lang_country,
                data: [
                    {name: '中国', value: 10},
                    {name: '美国', value: 100},
                    {name: '俄罗斯', value: 300},
                    {name: '德国', value: 600},
                    {name: '法国', value: 1000},
                    {name: '加拿大', value: 1300}
                ]
            }
        ]
    };
    map.setOption(option5);

    // 运营商首屏时间
    var time = echarts.init(document.getElementById('js_fc_time'));
    var option6 = {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: false,
            data: ['运营商首屏时间']
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: ['移动', '联通', '电信', '教育网']
            }
        ],
        series: [
            {
                name: '运营商首屏时间',
                type: 'bar',
                data: [10, 30, 50, 70]
            }
        ]
    };
    time.setOption(option6);

    // top10
    var top10 = echarts.init(document.getElementById('js_top10'));
    var option7 = {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: false,
            data: ['首屏时间']
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: ['北京电信', '北京移动', '上海电信', '上海移动', '河北移动', '河北电信', '天津移动', '天津电信', '山西电信', '山西移动']
            }
        ],
        series: [
            {
                name: '首屏时间',
                type: 'bar',
                data: [10, 30, 50, 70, 70, 70, 70, 70, 70, 70]
            }
        ]
    };
    top10.setOption(option7);


});