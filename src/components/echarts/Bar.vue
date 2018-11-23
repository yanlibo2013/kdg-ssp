<template>

    <div style="width:100%;height:600px;" ref="bar"></div>

</template>

<script>
import echarts from "../../common/echart/echarts.common.min.js"
export default {
    // props: {
    //     option: Object //定义传值的类型<br>   
    // },
    data: function () {
        return {
            bar: "",
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    name: '消费(万元)',
                }],
                series: [{
                    itemStyle: {
                        normal: {
                            color: '#6CABFF'
                        }
                    },
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }]
            }
        }
    },
    computed: {},
    components: {},
    methods: {
        draw(data) {
            this.bar = echarts.init(this.$refs.bar)
            // 绘制图表
            this.bar.setOption(data);

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
