define(function (require, exports, module) {
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

    // 点击操作
    var EVENT = echarts.config.EVENT;
    var nameMapReverse = {};
    for (var key in lang_country) {
        nameMapReverse[lang_country[key]] = key;
    }
    var mapStatus = 'world';
    map.on(EVENT.CLICK, function (param) {
        try {
            if (mapStatus == 'province') {
                window.location.href = '/pages/availability.html';
            } else {
                var isChina = (param.name == '中国');
                var isChinaProvince = china_province.indexOf(param.name) > -1;
                // 中国和中国省份操作
                if (isChina || isChinaProvince) {
                    var mapType = param.name;

                    if (nameMapReverse[param.name]) {
                        mapType = nameMapReverse[param.name].toLowerCase();
                    }
                    option5.series[0].mapType = mapType;
                    option5.series[0].data = [
                        {name: '北京', value: 10},
                        {name: '上海', value: 100},
                        {name: '山西', value: 300},
                        {name: '河北', value: 600},
                        {name: '山东', value: 1000},
                        {name: '天津', value: 1300}
                    ];
                    map.clear();
                    map.setOption(option5, true);

                    if (isChina) {
                        mapStatus = 'country';
                    } else if (isChinaProvince) {
                        mapStatus = 'province';
                    }
                }
            }

        } catch (e) {
            console.log(e);
        }
    });

    /*  function mapDrill() {

     }*/

    // 运营商首屏时间
    var time = echarts.init(document.getElementById('js_fc_time'));
    var option6 = {
        title: {
            show: false
        },
        grid: {
            x: 80,
            y: 10,
            x2: 10,
            y2: 10,
            borderWidth: 0
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
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: ['移动', '联通', '电信', '教育网'],
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '运营商首屏时间',
                type: 'bar',
                data: [10, 30, 50, 70],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inside'
                        }
                    }
                }
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
        grid: {
            x: 80,
            y: 10,
            x2: 10,
            y2: 10,
            borderWidth: 0
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
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                data: ['乌鲁木齐电信', '北京移动', '上海电信', '上海移动', '河北移动', '河北电信', '天津移动', '天津电信', '山西电信', '山西移动'],
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '首屏时间',
                type: 'bar',
                data: [10, 30, 50, 70, 70, 70, 70, 70, 70, 70],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inside'
                        }
                    }
                }
            }
        ]
    };
    top10.setOption(option7);

});