<template>

    <div style="width:100%;height:600px;" ref="chart"></div>

</template>

<script>
import echarts from "../../common/echart/echarts.common.min.js"
export default {
    props: {
        option: Object //定义传值的类型<br>   
    },
    data: function () {
        return {
            myChart: ""
        }
    },
    computed: {},
    components: {},
    methods: {
        draw(data) {
            this.myChart = echarts.init(this.$refs.chart)
            // 绘制图表
            this.myChart.setOption(data);

        }
    },
    mounted() {

        this.draw(this.option);

        window.onresize = () => {

            this.myChart.resize();

        }

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
