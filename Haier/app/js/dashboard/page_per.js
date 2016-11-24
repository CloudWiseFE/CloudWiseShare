define(function (require, exports, module) {
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
                itemStyle: {
                    normal: {
                        labelLine: {
                            length: 10
                        }
                    }
                },
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
                radius: [0, 40],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner'
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: [
                    {value: 20, name: '连接建立'},
                    {value: 100, name: '首字节'}
                ]
            },
            {
                name: '页面性能',
                type: 'pie',
                radius: [50, 70],
                itemStyle: {
                    normal: {
                        labelLine: {
                            length: 10
                        }
                    }
                },
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
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner'
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: [
                    {value: 20, name: '连接建立'},
                    {value: 100, name: '首字节'}
                ]
            },
            {
                name: '页面性能',
                type: 'pie',
                radius: [60, 80],
                itemStyle: {
                    normal: {
                        labelLine: {
                            length: 10
                        }
                    }
                },
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

});