<template>

    <div style="width:100%;height:600px;" ref="linebar"></div>

</template>

<script>
import echarts from "../../common/echart/echarts.common.min.js"
export default {
    // props: {
    //     option: Object //定义传值的类型<br>   
    // },
    data: function () {
        return {
            myChart: "",
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {},
                legend: {
                    data: ['曝光率', '曝光量', '点击量'],
                    y: "bottom"
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }],
                yAxis: [{
                        type: 'value',
                        name: '曝光点击量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        },
                        color: '#E1E7F0'
                    },
                    {
                        type: 'value',
                        name: '曝光率',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [{
                        itemStyle: {
                            normal: {
                                color: '#FFCC82',
                            }
                        },
                        name: '点击量',
                        type: 'line',
                        yAxisIndex: 1,
                        // areaStyle: {
                        //     normal: {
                        //         color: '#F0F6FF',
                        //     }
                        // },
                        // areaStyle: {
                        //     normal: {
                        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        //             offset: 0,
                        //             color: '#16D9F0'
                        //         }, {
                        //             offset: 1,
                        //             color: '#fff'
                        //         }])
                        //     }
                        // },
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }, {
                        itemStyle: {
                            normal: {
                                color: '#6CABFF'
                            }
                        },
                        name: '曝光率',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#FFC673'
                            }
                        },
                        name: '曝光量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    // {
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#79B3FF',
                    //         }
                    //     },
                    //     name: '点击量',
                    //     type: 'line',
                    //     yAxisIndex: 1,
                    //     data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    // }

                ]
            },
        }
    },
    computed: {},
    components: {},
    methods: {
        draw(data) {
            this.myChart = echarts.init(this.$refs.linebar)
            // 绘制图表
            this.myChart.setOption(data);

        }
    },
    mounted() {

        this.draw(this.option);

    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">

</style>
