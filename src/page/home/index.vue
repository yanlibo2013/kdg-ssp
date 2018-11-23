<template>
    <div class="kd-home">
        <div class="Grid row">
            <div class="Grid-cell cell">
                <div class="item">
                    <div class="item-content Grid  Grid--center">
                        <img src="../../style/image/home/1.png" alt="" style="width:1.5rem;height:1.5rem;margin-right:3px">
                        <span class="top">
                            平台流水（元）
                        </span>
                    </div>
                    <div class="item-content Grid  Grid--center">
                        <span class="bottom">
                            1,501,776.52
                        </span>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="Grid-cell cell">
                <div class="item">
                    <div class="item-content Grid  Grid--center">
                        <img src="../../style/image/home/2.png" alt="" style="width:1.5rem;height:1.5rem;margin-right:3px">
                        <span class="top">
                            资源总量级（次）
                        </span>
                    </div>
                    <div class="item-content Grid  Grid--center">
                        <span class="bottom">
                            238,030,022
                        </span>
                    </div>
                </div>
            </div>
            <div class="Grid-cell cell">
                <div class="item">
                    <div class="item-content Grid  Grid--center">
                        <img src="../../style/image/home/3.png" alt="" style="width:1.5rem;height:1.5rem;margin-right:3px">
                        <span class="top">
                            整体填充率
                        </span>
                    </div>
                    <div class="item-content Grid  Grid--center">
                        <span class="bottom">
                            92.38%
                        </span>
                    </div>
                </div>
            </div>
            <div class="Grid-cell cell">
                <div class="item">
                    <div class="item-content Grid  Grid--center">
                        <img src="../../style/image/home/4.png" alt="" style="width:1.5rem;height:1.5rem;margin-right:3px">
                        <span class="top">
                            曝光总数（次）
                        </span>
                    </div>
                    <div class="item-content Grid  Grid--center">
                        <span class="bottom">
                            3,483,214
                        </span>
                    </div>
                </div>
            </div>
            <div class="Grid-cell cell">
                <div class="item">
                    <div class="item-content Grid  Grid--center">
                        <img src="../../style/image/home/5.png" alt="" style="width:1.5rem;height:1.5rem;margin-right:3px">
                        <span class="top">
                            eCPM（元）
                        </span>
                    </div>
                    <div class="item-content Grid  Grid--center">
                        <span class="bottom">
                           2.31
                        </span>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col Grid Grid--left col-item self-change">
                <span class="date-span"> 时间范围：</span>
                <!-- <el-date-picker  v-model="filters.column.create_start_date" type="date" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerBeginDateBefore">
                </el-date-picker> -->

                <el-date-picker v-model="filters.column.create_start_date" type="daterange" :picker-options="pickerBeginDateBefore" format="yyyy-MM-dd" placeholder="">
                </el-date-picker>
            </div>

            <div class="col3">
                <div class=" title-center">
                    <span class="item-title span-text">
                        DSP消耗排行(Top10)
                    </span>

                    <!-- <el-radio-group v-model="radio4" size="medium">
                        <el-radio-button label="媒体"></el-radio-button>
                        <el-radio-button label="样式"></el-radio-button>
                        <el-radio-button label="尺寸"></el-radio-button>
                        <el-radio-button label="地域"></el-radio-button>
                    </el-radio-group> -->
                </div>
                <Bar ref="bar"></Bar>
            </div>

            <div class="col3">
                <div class=" title ">
                    DSP填充排行(Top10)
                </div>
                <LineBar ref="linebar"></LineBar>
            </div>

            <!-- <div class="col3">
                <div class=" title ">
                    DSP消耗排行(Top10)
                </div>
                <Pie ref="pie"></Pie>
            </div> -->

        </div>

    </div>

</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import store from "store";
import {
    getQueryString
} from "../../common/utils";
import {
    login,
    home
} from "../../service/index.js";
import LineBar from "../../components/echarts/LineBar";
import Bar from "../../components/echarts/Bar";
import Pie from "../../components/echarts/Pie";

export default {
    data: function () {
        return {
            filters: {
                column: {
                    create_start_date: '',
                    create_end_date: ''
                },
            },
            pickerBeginDateBefore: {
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                    // return time.getTime() > Date.now() - 8.64e7;//不可选当天
                }
            },
            pickerBeginDateAfter: {
                disabledDate: (time) => {
                    let beginDateVal = this.filters.column.create_start_date;
                    if (beginDateVal) {
                        return time.getTime() < beginDateVal;
                    }
                }
            },

            radio4: "媒体",
            pickerOptions2: {
                shortcuts: [{
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        }
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        }
                    }
                ]
            },
            value6: "",
            value7: "",
            header: {}
        };
    },
    computed: {},
    components: {
        Bar,
        LineBar,
        Pie
    },
    methods: {
        ...mapActions(["setBreadCrumb"])
    },
    beforeCreate() {},
    created() {

        let user = getQueryString("email");
        let pws = getQueryString("password");

        if (user && pws) {
            login
                .login({}, {
                    email: user,
                    password: pws
                })
                .then(res => {
                    if (res.data.success) {
                        let data = res.data;
                        store.clearAll();

                        store.set("sidebar", JSON.stringify(data.data));

                        store.set("token", res.data.token);
                        store.set("userId", res.data.userId);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                });
        }

        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };
    },
    beforeMount() {

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));

        window.onresize = () => {

            if (this.$route.path.replace("/", "") == "home") {
                this.$refs.bar.bar.resize();
                this.$refs.linebar.myChart.resize();
                // this.$refs.pie.pie.resize();

            }

        };

        // console.log(home);

        home.getHomeData(this.header, {
            start_time: "2018-09-10",
            end_time: "2018-12-10"
        })
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
};
</script>

<style lang="scss">
@import "../../style/flexgird/index.scss";

.kd-home {
    .self-change .el-range__close-icon {
        font-size: 14px;
        color: #c0c4cc;
        width: 25px;
        display: inline-block;
        /* float: right; */
        line-height: 32px;
        /* margin-left: -7px; */
        position: absolute;
        right: 27px;
    }

    font-size: 1rem;

    .row {
        margin: 30px;
        background: #ffffff;

        .cell {
            margin: 30px 0 30px 0;
        }

        .col {
            display: flex;
            align-items: center;

            padding: 27px 30px 0 30px;

            .col-item {
                max-width: 50%;
            }

            .date-span {
                font-size: 14px;
                color: #515974;
            }
        }

        .col2,
        .col3 {
            display: flex;
            align-items: top;
            flex-direction: column;

            padding: 27px 30px 0 30px;

            .title {
                border-bottom: 1px solid #e1e7f0;
                height: 46px;
                width: 100%;
                color: #515974;
                font-size: 16px;
                font-weight: Bold;
                margin: 0 30px 0 30px;
            }

            .title-center {
                border-bottom: 1px solid #e1e7f0;
                height: 46px;
                width: 100%;
                color: #515974;
                font-size: 16px;
                font-weight: Bold;
                margin: 0 30px 0 30px;
                display: flex;
                justify-content: center; // align-items: center;
                // flex: 1

                position: relative;

                .item-title {
                    // align-self: center;
                    position: absolute;
                    left: 0;
                    top: 0;
                    line-height: 46px
                }

                .span-text {
                    color: #515974;
                    font-size: 16px;
                    font-weight: Bold;
                }

            }
        }

        .item {
            display: flex;
            flex-direction: column;
            height: 7rem;
            // background: #FFFFFF;

            border-right: 1px solid #e1e7f0;

            .item-content {
                flex: 1;

                .top {
                    font-size: 14px;
                    color: #a5a6bb;
                }

                // .top:before {
                //     content: url('../../style/image/home/1.png');
                //     width: 7000px;
                //     height: 10px
                // }
                .title-icon {
                    background: url('../../style/image/home/1.png') no-repeat 1rem 1rem;
                    width: 1rem;
                    height: 1rem
                }

                .bottom {
                    font-size: 2rem;
                    color: #515974;

                }
            }
        }
    }
}
</style>
