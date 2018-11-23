<template>
    <!-- 基础数据报表 -->
    <div class="base-data-report">
        <el-main>
            <el-col :span="24">
                <el-form ref="form" :model="form" class="effectform">
                    <h1 class="template-hd">查询维度</h1>
                    <div class="base-bd">
                        <!-- 日期 start -->
                        <div class="base-row">
                            <label for="" class="data-item">日期：</label>
                            <el-date-picker v-model="timePeriod" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                            </el-date-picker>
                            <el-button :type='defaultDate=="今天"?"date default-date":"date"' @click='shortcuts("今天")'>今天</el-button>
                            <el-button :type='defaultDate=="昨天"?"date default-date":"date"' @click='shortcuts("昨天")'>昨天</el-button>
                            <el-button :type='defaultDate=="过去7天"?"date default-date":"date"' @click='shortcuts("过去7天")'>过去7天</el-button>
                            <!-- default-date -->
                            <el-button :type='defaultDate=="过去30天"?" date default-date":"date"' @click='shortcuts("过去30天")'>过去30天</el-button>
                        </div>
                        <!-- 日期 end -->
                        <!-- 报表间隔 start -->
                        <div class="base-row">
                            <label for="" class="data-item">报表间隔：</label>
                            <!-- <el-radio label="0">无</el-radio> -->
                            <el-radio v-model="form.interval" label="1">天</el-radio>
                            <el-radio v-model="form.interval" label="2">小时</el-radio>
                        </div>
                        <div class="customer-column clear">
                            <label for="" class="data-item resource-data-item left">客户维度：</label>
                            <table width="40%" class="customer-msg resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="客户" key="客户" v-model="checkedCustomId" @change="changeCustom(checkedCustomId)">
                                                    需求方:</el-checkbox>
                                            </template>
                                        </td>
                                        <td>

                                            <el-select class="ajust-full-width" v-model="demand" placeholder="请选择" @change="getAdvertiser(demand)">
                                                <el-option v-for="item in demandList" :key="item.key" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="计划" key="计划" v-model="checkedPlan" @change="changePlan(checkedPlan)">
                                                    广告主：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>

                                            <el-select class="ajust-full-width" v-model="valuePlan" placeholder="请选择广告主" multiple @change="getPlan">
                                                <el-option v-for="item in adList" :key="item.value" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="创意" key="创意" v-model="checkedCreative" @change="changeCreative(checkedCreative)">
                                                    创意：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>

                                            <el-select class="ajust-full-width" v-model="checkedCreateList" placeholder="请选择" multiple @change="creativity">
                                                <el-option v-for="item in creativeList" :key="item.key" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 客户维度 end -->
                        <!-- 资源维度 start -->
                        <div class="base-row">
                            <label for="" class="data-item resource-data-item left">资源维度：</label>
                            <table width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="尺寸" key="尺寸" v-model="checkedSize" @change="changeSize(checkedSize)">
                                                    尺寸：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>
                                            <el-select v-model="size" placeholder="请选择尺寸" multiple @change="selectSize(size)" filterable class="ajust-full-width">
                                                <el-option v-for="item in sizeData" :key="item.value" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>

                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="设备类型" key="设备类型" v-model="checkedServiceType" @change="changeServiceType(checkedServiceType)">
                                                    设备类型:</el-checkbox>
                                            </template>
                                        </td>
                                        <td>
                                            <el-select class="ajust-full-width" multiple v-model="service" placeholder="请选择" @change="showService(service)">
                                                <el-option v-for="item in serviceList" :key="item.value" :label="item.value" :value="item.key">
                                                </el-option>

                                            </el-select>
                                        </td>
                                    </tr>

                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="平台" key="平台" v-model="checkedPlatType" @change="changePlatTypeCheck(checkedPlatType)">
                                                    平台：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>

                                            <el-select class="ajust-full-width" v-model="plant" placeholder="请选择" multiple @change="changePlatType(plant)">
                                                <el-option v-for="item in planOptions" :key="item.key" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>

                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="媒体" key="媒体" v-model="checkedMeadia" @change="changeMeadia(checkedMeadia)">
                                                    媒体：</el-checkbox>
                                            </template>
                                        </td>

                                        <td>

                                            <el-select class="ajust-full-width" multiple v-model="media" placeholder="请选择" @change='getAdList(media)'>
                                                <el-option v-for="item in meadiaList" :key="item.key" :label="item.value" :value="item.key">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <!-- <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="广告位" key="广告位" v-model="checkedSpace" @change="changeSoace(checkedSpace)">
                                                    广告样式：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>
                                            <el-select class="ajust-full-width" v-model="space" placeholder="请选择" multiple collapse-tags @change="getSpace(space)">
                                                <el-option v-for="item in adList" :key="item.key" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr> -->
                                </tbody>
                            </table>
                        </div>
                        <!-- 资源维度 end -->
                    </div>
                    <!-- 呈现维度 start -->
                    <div class="display-dimension border-bottom-2">
                        <h2 class="template-hd">呈现维度</h2>

                        <el-checkbox-group v-model="checkboxView" @change="handleCheckedViewChange">

                            <div class="show-bd">
                                <div class="checkbox-group-item clear">
                                    <label for="" class="show-title left">消耗：</label>
                                    <el-checkbox label="总花费" key="总花费">媒体消耗</el-checkbox>
                                    <el-checkbox label="需求方消耗" key="需求方消耗">需求方消耗</el-checkbox>
                                </div>
                                <div class="checkbox-group-item clear">
                                    <label for="" class="show-title left">填充：</label>
                                    <el-checkbox label="返回数" key="返回数">返回数</el-checkbox>
                                    <el-checkbox label="返回率" key="返回率">返回率</el-checkbox>
                                    <el-checkbox label="请求数" key="请求数">请求数</el-checkbox>
                                </div>
                                <div class="checkbox-group-item clear">
                                    <label for="" class="show-title left">展示：</label>
                                    <el-checkbox label="曝光数" key="曝光数">曝光数</el-checkbox>
                                    <el-checkbox label="曝光率" key="曝光率">曝光率</el-checkbox>
                                    <el-checkbox label="千次曝光成本" key="千次曝光成本">千次曝光成本</el-checkbox>
                                </div>
                                <div class="checkbox-group-item clear">
                                    <label for="" class="show-title left">效果：</label>
                                    <el-checkbox label="点击数" key="点击数">点击数</el-checkbox>
                                    <el-checkbox label="点击率" key="点击率">点击率</el-checkbox>
                                    <el-checkbox label="点击单价" key="点击单价">点击单价</el-checkbox>
                                </div>
                                <div class="is-confirm">
                                    <el-button type="confirm" @click="onSubmit">查询</el-button>
                                    <el-button type="cancel" @click="clearForm">重置</el-button>
                                </div>
                            </div>
                        </el-checkbox-group>
                    </div>
                </el-form>

                <!-- 呈现维度 end -->
                <!-- 导出报表 start -->
                <div class="export-report border-bottom-2">
                    <div class="export-hd">
                        <label for="" class="export-title">导出报表：</label>
                        <el-select class="ajust-full-width" v-model="paramsObj.ext" placeholder="请选择">
                            <el-option v-for="item in reporttypeList" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>

                        <label for="" class="export-title">文件名称：</label>
                        <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="paramsObj.filename">
                        </el-input>
                        <el-button type="confirm" @click="download">导出</el-button>
                    </div>
                    <div class="export-bd">
                        <el-table :data="pageList" style="width: 100%" element-loading-text="拼命加载中">
                            <el-table-column v-for="(col,index) in cols" :prop="col.prop" :label="col.label" :key="index">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- pagenation -->
                    <div class="block ">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.per_page" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                        </el-pagination>
                    </div>
                </div>
                <!-- 导出报表 end -->

            </el-col>
        </el-main>
    </div>
</template>

<script>
import moment from "../../../common/moment";
import {
    report,
    common
} from "../../../service/index";
import store from "store";
import _ from "lodash";
import dwonloadfile from "js-file-download"
import {
    isPositiveInteger
} from "../../../common/utils"
import fileServer from 'file-saver';
import XLSX from 'xlsx';
import {
    callback
} from "../../../common/utils"
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
// import vDialog from "./dialog";
export default {
    computed: {
        ...mapState({
            reportList: "reportList"
        }),
        ...mapGetters({
            isShowColumn: "isShowColumn",
            stateReportlist: "stateReportlist"
        }),
        initData() {
            return this.$store.state.reportList.data;

        }
    },

    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));

        this.setYesterDay();

        //this.clearForm();

        //需求方
        // common.getDemandList(this.header).then(res => {

        //     let data = _.map(res.data.data, val => {
        //         return {
        //             value: val.short_name,
        //             key: val.id
        //         }
        //     });
        //     this.demandList = data;
        // });

        //平台
        // common.getPlatFormList(this.header).then(res => {

        //     let data = _.map(res.data.data, val => {
        //         return {
        //             value: val.name,
        //             key: val.id
        //         }
        //     });
        //     this.platOptions = data;
        // });

        //媒体
        // common.meadiaList(this.header).then(res => {

        //     let data = _.map(res.data.data, val => {
        //         return {
        //             value: val.name,
        //             key: val.id
        //         }
        //     });
        //     this.meadiaList = data;
        // });

        common.filterReport(this.header).then(res => {
            if (res.data.data && res.data.data.code == "401") {
                this.$switchLogin("", this);
                return;
            }
            if (res.data.data && res.data.data.code == "402") {
                this.$message(res.data.data.error);
                return;
            }
            let data = res.data.data;

            //需求方
            this.demandList = _.map(data.demandInfoVOS, val => {
                return {
                    value: val.short_name,
                    key: val.demand_sideid
                }
            });

            //广告主
            this.adList = _.map(data.advertiserInfoVOS, val => {
                return {
                    value: val.advertiser_name,
                    key: val.advertiser_id
                }
            });

            //创意
            this.creativeList = _.map(data.creativeInfoVOS, val => {
                return {
                    value: val.creative_id,
                    key: val.creative_id
                }
            });

            //平台
            this.planOptions = _.map(data.plantInfoVOS, val => {
                return {
                    value: val.name,
                    key: val.id
                }
            });

            //媒体
            this.meadiaList = _.map(data.mediaInfoVOS, val => {
                return {
                    value: val.name,
                    key: val.id
                }
            });

            //sizeData

            //媒体
            this.sizeData = _.map(data.adSizes, val => {
                return {
                    value: val,
                    key: val
                }
            });

        });

    },
    watch: {

    },
    data: function () {
        return {
            adList: [],
            pageList: [],
            demand: "",
            demandList: [],
            header: "",
            sizeData: [],
            currentPage: 1,
            pageSize: 10,
            checked: false,
            // value:'',
            dialogTableVisible: false,
            isIndeterminate: false,
            list: "",
            //时间间隔 时间间隔（1天，2小时）默认为：1
            customer_val: [],
            customer: [], //	维度（1客户，2计划，3创意，5类型，6媒体，7广告位）
            present: [], //	呈现维度（1消耗，2成本，3曝光，4曝光率，5曝光价格，6点击，7点击率，8点击价格，9返回数）
            form: {
                range: "", //日期
                interval: "1", //报表间隔
                size: [], //尺寸
                type: [], //展现类型
                media: [], //媒体
                plat: [], //平台
                ad: [], //广告位
                width: "",
                height: "",
                creative: [], //创意
                valueAdvertiser: [], //客户
                valuePlan: [], //计划
                adSpace: ""
            },
            space: [], //广告位
            // 资源维度（1客户，2计划，3创意，4 渠道,5类型，6媒体，7广告位，8尺寸）
            sourceData: [{
                    key: "客户",
                    value: "1"
                }, {
                    key: "计划",
                    value: "2"
                }, {
                    key: "创意",
                    value: "3"
                }, {
                    key: "渠道",
                    value: "4"
                }, {
                    key: "尺寸",
                    value: "8"
                },
                {
                    key: "展现类型",
                    value: "5"
                },
                {
                    key: "媒体",
                    value: "6"
                },
                {
                    key: "广告位",
                    value: "7"
                }
            ],
            //chekcboxResource: ["尺寸", "展现类型", "媒体类型", "广告位"],
            chekcboxResource: [],
            //呈现维度（1消耗，2成本，3曝光，4曝光率，5曝光价格，6点击，7点击率，8点击价格，9返回数）
            viewData: [{
                    key: "消耗",
                    value: "1"
                },
                {
                    key: "成本",
                    value: "2"
                },
                {
                    key: "曝光",
                    value: "3"
                },
                {
                    key: "曝光率",
                    value: "4"
                },
                {
                    key: "曝光价格",
                    value: "5"
                },
                {
                    key: "点击",
                    value: "6"
                }, {
                    key: "点击率",
                    value: "7"
                },
                {
                    key: "点击价格",
                    value: "8"
                },
                {
                    key: "返回数",
                    value: "9"
                }
            ],
            creativeList: [],
            typeList: [{
                key: "1",
                value: "Banner"
            }, {
                key: "2",
                value: "Video"
            }, {
                key: "3",
                value: "Native"
            }, {
                key: "4",
                value: "Video-Native"
            }],
            checkboxView: [], //呈现维度
            meadiaList: [],
            adList: [],
            reporType: "1", //报表类型
            reporttypeList: [{
                key: "1",
                value: "Excel"
            }, {
                key: "2",
                value: "Txt"
            }],
            checkedResource: [], //资源维度
            // checkedCustom: [], //客户维度
            paramsObj: {
                ext: "1",
                filename: ""
            },
            defaultDate: "昨天",
            timePeriod: [],
            //客户
            valueAdvertiser: [],
            advertiser: [],
            checkedAd: "",
            //计划
            planOptions: [],
            valuePlan: [], //计划
            parameter: {},
            checkedCreateList: [],

            size: [], //尺寸
            type: [], //展现类型
            plat: [], //平台
            media: [], //媒体

            checkedPlatType: false,
            checkedCustomId: [],
            checkedPlan: false,
            checkedCreative: false,
            checkedSize: false,
            checkedViewType: false,
            checkedMeadia: false,
            checkedSpace: false,

            currentItem: {},
            cols: [],
            platOptions: [],

            //添加设备类型
            checkedServiceType: false,
            service: [],
            serviceList: [{
                    key: "Android",
                    value: "Android"
                },
                {
                    key: "IOS",
                    value: "IOS"
                },
            ],
            plant: [],
            bodyData: ""
            // serviceList: [{
            //         key: 1,
            //         value: "图片"
            //     },
            //     {
            //         key: 2,
            //         value: "图文"
            //     },
            //     {
            //         key: 3,
            //         value: "组图"
            //     },
            //     {
            //         key: 4,
            //         value: "短视频"
            //     },
            //     {
            //         key: 5,
            //         value: "视频"
            //     }
            // ]

            //报表下载 参数key值  类型 ext  文件名称 filename
        };
    },
    components: {
        // vDialog
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    methods: {
        ...mapActions(["setBreadCrumb", "getReportList"]),
        setYesterDay() {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            this.timePeriod = [date, date]

        },
        getList(data) {
            report.reportList(this.header, data);

        },
        changeAd(val) {
            if (val) {} else {
                this.valueAdvertiser = [];
            }
        },
        changeServiceType(val) {
            if (!val) {
                this.service = []
            }
        },
        selectSize(val) { //尺寸下拉
            if (val.length > 0) {
                this.checkedSize = true
            } else {
                //this.checkedSize = false;
            }
        },

        showService(val) { //设备类型
            if (val.length > 0) {
                this.checkedServiceType = true
            }
        },
        changePlatTypeCheck(val) {
            if (!val) {
                this.plat = []
            }
        },
        changePlatType(val) {
            if (val.length > 0) {
                this.checkedPlatType = true
            }
        },
        getData(data) {
            report.reportList(this.header, data).then(res => {

                if (res.data.data && res.data.data.code && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                if (res.data.data.length > 0) {
                    this.cols = [];
                    let rows = res.data.data[0];
                    for (let key in rows) {
                        let label = "";
                        let index = "";
                        if (key == "tm") {
                            label = "日期";
                            index = 1;
                        }
                        if (key == "dsp_name") {
                            label = "需求方";
                            index = 2;
                        }
                        if (key == "adver_name") {
                            label = "广告主";
                            index = 3;
                        }
                        if (key == "plat_name") {
                            label = "平台名称";
                            index = 4;
                        }
                        if (key == "media_name") {
                            label = "媒体名称";
                            index = 5;
                        }
                        if (key == "crv_id") {
                            label = "创意";
                            index = 6;
                        }
                        if (key == "os") {
                            label = "设备类型";
                            index = 7;

                        }
                        if (key == "ad_size") {
                            label = "广告尺寸";
                            index = 8;
                        }
                        if (key == "style_name") {
                            label = "广告样式";
                            index = 9;
                        }
                        if (key == "dsp_rsp_req") {
                            label = "返回数";
                            index = 10;
                        }
                        if (key == "dsp_rsp_req_rate") {
                            label = "返回率";
                            index = 11;
                        }
                        if (key == "dsp_imp") {
                            label = "曝光数";
                            index = 12
                        }
                        if (key == "dsp_imp_rate") {
                            label = "曝光率";
                            index = 13;
                        }
                        if (key == "media_deal_price") {
                            label = "媒体消耗";
                            index = 14;
                        }
                        if (key == "dsp_deal_price") {
                            label = "需求方消耗";
                            index = 15;
                        }
                        if (key == "dsp_clk") {
                            label = "点击数";
                            index = 16;
                        }
                        if (key == "dsp_clk_rate") {
                            label = "点击率";
                            index = 17;
                        }
                        if (key == "dsp_clk_price") {
                            label = "点击单价";
                            index = 18;
                        }
                        if (key == "dsp_imp_price") {
                            label = "千次曝光价格";
                            index = 19;
                        }

                        label != "" && this.cols.push({
                            prop: key,
                            label: label,
                            index: index
                        });

                    }

                    // this.cols = _.orderBy(this.cols, ['index'], ['asc']); //升序  asc  降序  desc

                    this.cols = _.orderBy(this.cols, ['index'], ['asc']); //升序  asc  降序  desc

                    this.pageList = _.map(res.data.data, val => {

                        if (val.dsp_name.length > 10) {
                            val.dsp_name = val.dsp_name.substring(10, 0) + "..."

                        }

                        return val;

                    });

                    console.log(this.pageList);

                } else {
                    this.pageList = [];
                }
                // callback(res.data, () => {

                // }, this);
            });
        },
        params() {
            var parameter = {
                start_date: moment(this.timePeriod[0]).format("YYYY-MM-DD"),
                end_date: moment(this.timePeriod[1]).format("YYYY-MM-DD"),
                interval: this.form.interval,
                customer: {
                    uid: { //客户
                        "ch": this.checkedCustomId,
                        "val": this.valueAdvertiser
                    },
                    campaign_id: { //计划
                        "ch": this.checkedPlan,
                        "val": this.valuePlan
                    },
                    creative_id: { //创意
                        "ch": this.checkedCreative,
                        "val": this.checkedCreateList
                    },

                    adSize: { //尺寸
                        "ch": this.checkedSize,
                        //  "val":this.form.width!=""?this.form.width+"*"+this.form.height:""
                        "val": this.size
                    },
                    deviceType: { //设备类型
                        "ch": this.checkedServiceType,
                        "val": this.service,
                    },
                    type_id: { //展现类型
                        "ch": this.checkedViewType,
                        "val": this.type,
                    },

                    plat_id: { //平台
                        "ch": this.checkedPlatType,
                        "val": this.plat,
                    },

                    media_id: { //媒体
                        "ch": this.checkedMeadia,
                        "val": this.media,
                    },
                    adposition_id: { //广告位
                        "ch": this.checkedSpace,
                        "val": this.space,
                    }
                },
                present: _.uniq(this.checkboxView)
            }

            for (let attr in parameter.customer) {
                let _val = parameter.customer[attr];
                if (!_val.ch) { //删除空的对象
                    delete(parameter.customer[attr])
                }

                for (let aa in _val) { //删除空的数组
                    if (aa == 'val' && _val[aa].length <= 0) {
                        delete _val[aa]
                    }
                }
            }

            parameter.customer = JSON.stringify(parameter.customer)
            return parameter;
        },
        handleCheckedResourceChange(value) {
            if (this.checkedResource.length >= value.length) { //取消选中
                let difference = _.difference(this.checkedResource, this.chekcboxResource);
                if (difference[0] == "媒体") {
                    this.form.media = "";
                }
                if (difference[0] == "尺寸") {
                    this.form.width = "";
                    this.form.height = "";
                }
                if (difference[0] == "展现类型") {
                    this.form.type = "";
                }
                if (difference[0] == "广告位") {
                    this.form.ad = "";
                }
            } else {
                let difference = _.difference(value, this.checkedResource);
            }
            this.checkedResource = value;
        },
        handleCheckedViewChange(value) {},
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData(this.params(), {
                page: this.currentPage,
                pageSize: val
            });
        },
        handleCurrentChange(val) {
            this.getData(_.assign(this.params(), {
                page: val,
                pagesize: this.pageSize
            }));
            this.currentPage = val;
        },
        getIdsByName(source, data) {
            let result = [];
            for (var j = 0; j < data.length; j++) {
                for (var k = 0; k < source.length; k++) {
                    if (data[j] == source[k].key) {
                        result.push(source[k].value);
                    }
                }
            }
            return result;
        },
        onSubmit() {

            this.bodyData = {
                start_time: this.timePeriod && this.timePeriod.length != 0 ? moment(this.timePeriod[0]).format("YYYY-MM-DD") : undefined, //开始时间 string
                end_time: this.timePeriod && this.timePeriod.length != 0 ? moment(this.timePeriod[1]).format("YYYY-MM-DD") : undefined, //结束时间 string
                type: parseInt(this.form.interval), //类型0：无，1：天，2：小时 number
                dsp_id: this.demand != "" ? this.demand : undefined, //需求方 string
                adver_id: this.valuePlan.length != 0 ? this.valuePlan : undefined, //广告主ID array
                crv_id: this.checkedCreateList != 0 ? this.checkedCreateList : undefined, //创意ID array
                plat_id: this.plat.length != 0 ? this.plant : undefined, //平台ID array
                media_id: this.media.length != 0 ? this.media : undefined, //媒体ID array
                os: this.service.length != 0 ? this.service : undefined, //设备类型传输，[Android,iOS]
                // cast_id: [], //广告样式 array
                size: this.size.length != 0 ? this.size : undefined, //尺寸 array

                isDsp: this.checkedCustomId ? 1 : 0, //是否需求方（0：否，1：是）
                isAdver: this.checkedPlan ? 1 : 0, //是否广告主（0：否，1：是）
                isCrvId: this.checkedCreative ? 1 : 0, //是否创意（0：否，1：是）
                isPlat: this.checkedPlatType ? 1 : 0, //是否平台（0：否，1：是）
                isMedia: this.checkedMeadia ? 1 : 0, //是否媒体（0：否，1：是）
                isOs: this.checkedServiceType ? 1 : 0, //是否设备类型（0：否，1：是）
                isAdsize: this.checkedSize ? 1 : 0, //是否尺寸（0：否，1：是）

                isCon: this.presentData("isCon"), //是否总花费（0：否，1：是） number
                isDspCon: this.presentData("isDspCon"), //是否需求方（0：否，1：是） number
                isRspReq: this.presentData("isRspReq"), //是否返回数（0：否，1：是）
                isRspReqRate: this.presentData("isRspReqRate"), //返回率（0：否，1：是）
                isImp: this.presentData("isImp"), //曝光数（0：否，1：是）
                isImpRate: this.presentData("isImpRate"), //曝光率（0：否，1：是）
                isMediaPrice: this.presentData("isMediaPrice"), //千次曝光成本（0：否，1：是）
                isClk: this.presentData("isClk"), //点击数（0：否，1：是）
                isClkRate: this.presentData("isClkRate"), //点击率（0：否，1：是）
                isClkPrice: this.presentData("isClkPrice"), //点击单价（0：否，1：是）
                isReq: this.presentData("isReq"), //点击单价（0：否，1：是）
                pagenum: this.currentPage,
                pagesize: this.pageSize,

            }

            this.getData(this.bodyData);
            this.cols = [];
        },
        isChecked(val) {
            return this.checkboxView.toString().indexOf(val) >= 0 ? 1 : 0

        },
        presentData(val) {

            if (val == "isCon") {
                return this.isChecked("总花费");

            }

            if (val == "isDspCon") {
                return this.isChecked("需求方消耗");

            }
            if (val == "isRspReq") {
                return this.isChecked("返回数");

            }
            if (val == "isRspReqRate") {
                return this.isChecked("返回率");

            }
            if (val == "isImp") {
                return this.isChecked("曝光数");

            }
            if (val == "isImpRate") {
                return this.isChecked("曝光率");

            }
            if (val == "isMediaPrice") {
                return this.isChecked("千次曝光");

            }
            if (val == "isClk") {
                return this.isChecked("点击数");

            }
            if (val == "isClkRate") {
                return this.isChecked("点击率");

            }
            if (val == "isClkPrice") {
                return this.isChecked("点击单价");

            }

            if (val == "isReq") {
                return this.isChecked("请求数");

            }

        },
        clearForm() {
            this.form = {
                range: "", //日期
                interval: "1", //报表间隔
                size: "", //尺寸
                type: "", //展现类型
                media: "", //媒体
                ad: "", //广告位
                width: "",
                height: ""
            };
            this.checkedCustom = [];
            this.chekcboxResource = [];
            this.checkboxView = [];
            this.timePeriod = [];
            this.defaultDate = "昨天";
            this.valueAdvertiser = [];
            this.valuePlan = [];
            this.customer = [];
            this.customer_val = [];
            this.setDefaultTime();
            this.$store.state.reportList = [];
            this.checkedCreateList = [];

            this.checkedCustomId = false;
            this.checkedPlan = false;
            this.checkedCreative = false;
            this.checkedSize = false;
            this.checkedViewType = false;
            this.checkedMeadia = false;
            this.checkedSpace = false;

            this.space = [];
            this.cols = [];

            this.checkedServiceType = false;
            this.checkedPlatType = false;

            this.service = [];
            this.plant = [];
            this.media = [];
            this.demand = "";
            this.size = [];
        },

        // key = [null,null,null]

        download(url) {

            report.exportReport(this.header, this.bodyData).then(res => {
                // callback(res.data, () => {

                // }, this);
                if (this.paramsObj.ext == "1") {
                    this.downloadCSV(res.data.data, this.paramsObj.filename ? this.paramsObj.filename : "report");
                }

                if (this.paramsObj.ext == "2") {
                    this.downloadTxt(res.data.data, this.paramsObj.filename ? this.paramsObj.filename : "report");
                }

            });
        },
        downloadTxt(val, filename) {
            let str = ""
            _.forEach(val, function (item) {
                _.forEach(item, function (val, key) {
                    if (key == item.length - 1) {
                        str += val + "\r\n"
                    } else {
                        str += val + " ";
                    }
                })
            });
            var blob = new Blob([str], {
                type: "text/plain;charset=utf-8"
            });
            fileServer.saveAs(blob, filename + ".txt");
        },
        downloadCSV(val, filename) {
            function datenum(v, date1904) {
                if (date1904) v += 1462;
                var epoch = Date.parse(v);
                return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
            }

            function sheet_from_array_of_arrays(data, opts) {
                var ws = {};
                var range = {
                    s: {
                        c: 10000000,
                        r: 10000000
                    },
                    e: {
                        c: 0,
                        r: 0
                    }
                };
                for (var R = 0; R != data.length; ++R) {
                    for (var C = 0; C != data[R].length; ++C) {
                        if (range.s.r > R) range.s.r = R;
                        if (range.s.c > C) range.s.c = C;
                        if (range.e.r < R) range.e.r = R;
                        if (range.e.c < C) range.e.c = C;
                        var cell = {
                            v: data[R][C]
                        };
                        if (cell.v == null) continue;
                        var cell_ref = XLSX.utils.encode_cell({
                            c: C,
                            r: R
                        });
                        if (typeof cell.v === 'number') cell.t = 'n';
                        else if (typeof cell.v === 'boolean') cell.t = 'b';
                        else if (cell.v instanceof Date) {
                            cell.t = 'n';
                            cell.z = XLSX.SSF._table[14];
                            cell.v = datenum(cell.v);
                        } else cell.t = 's';
                        ws[cell_ref] = cell;
                    }
                }
                if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            }

            function Workbook() {
                if (!(this instanceof Workbook)) return new Workbook();
                this.SheetNames = [];
                this.Sheets = {};
            }
            var key = XLSX.utils.encode_cell({
                c: 0,
                r: 0
            });
            var ws = sheet_from_array_of_arrays(val);
            var workbook = new Workbook();
            workbook.SheetNames.push("kdg");
            workbook.Sheets["kdg"] = ws;
            var wbout = XLSX.write(workbook, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'binary'
            });

            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            fileServer.saveAs(new Blob([s2ab(wbout)], {
                type: ""
            }), filename + ".xlsx");
        },
        parseParam(param) {
            let url = "?";
            for (var key in param) {
                url += key + "=" + param[key] + "&"
            }
            return url;
        },
        shortcuts(val) {
            this.defaultDate = val;
            if (val == "今天") {
                this.timePeriod = [new Date(), new Date()]
            }
            if (val == "昨天") {
                // const date = new Date();
                // date.setTime(date.getTime() - 3600 * 1000 * 24);
                // this.timePeriod = [date, date]
                this.setYesterDay();
            }
            if (val == "过去7天") {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                this.timePeriod = [start, end]
            }
            if (val == "过去30天") {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                this.timePeriod = [start, end]
            }
        },
        changeDate() {
            this.defaultDate = "";

        },
        getAdvertiser(val) {
            if (val) {
                this.checkedCustomId = true;
            }

        },
        // getPlan(currentAdId,planId) {
        getPlan() { //计划的下拉的形式
            if (this.valuePlan) {
                this.checkedPlan = true;
            }
            // creative.publicCreativeAll({
            //     id: this.valuePlan,
            // }).then(res => {
            //     if (res.data.code == 0) {
            //         this.creativeList = [];
            //         this.checkedCreateList = [];
            //         let data = res.data.data;
            //         for (var j = 0; j < data.length; j++) {
            //             this.creativeList.push({
            //                 value: data[j].id,
            //                 label: data[j].name
            //             });
            //         }

            //     }
            // });
        },
        //获得投放计划
        getPlanByAdvertiser(id) {
            let that = this;
            home.publicCampaignAll({
                id: id
            }).then(res => {

                if (res.data.code == 0) {
                    that.planOptions = res.data.data;
                    let Data = res.data.data;
                    let result = [];
                    Data.forEach(function (item, index) {
                        result.push({
                            value: item.id,
                            label: item.name
                        })
                    })
                    that.planOptions = result;
                }
            });
        },
        getAdList(val) {
            if (val.length > 0) {
                this.checkedMeadia = true;
            }
        },
        setDefaultTime() {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            this.timePeriod = [date, date]
        },
        creativity() {
            if (this.checkedCreateList) {
                this.checkedCreative = true;
            }
        },
        showType(val) {
            if (val.length > 0) {
                this.checkedViewType = true;
            }
            //console.log(this.checkedResource);
        },
        showPlat(val) {
            if (val.length > 0) {
                this.checkedPlatType = true;
            }
        },
        ad() {
            if (this.form.ad) {
                this.checkedSpace = true;
            }
        },
        getSpace(val) {
            if (val.length > 0) {
                this.checkedSpace = true;
            }
        },
        changeCustom(val) {
            if (!val) {
                this.demand = "";
            }
        },
        changePlan(val) {
            if (!val) {
                this.valuePlan = [];
            }
        },
        changeCreative(val) {
            if (!val) {
                this.checkedCreateList = [];
            }
        },
        changeSize(val) {
            if (!val) {
                //  this.form.width="";
                //  this.form.height="";
                this.size = [];
            }

        },
        changeViewType(val) {
            if (!val) {
                this.type = [];
            }
        },
        changeMeadia(val) {
            if (!val) {
                this.media = [];
            }
        },
        changeSoace(val) {
            if (!val) {
                this.space = [];
            }
        }

    }
};
</script>

<style lang="scss">
@import "../../../style/mixin";

@import "../../../style/common";

.base-data-report {

    /* .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    } */

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .el-main {
        background-color: transparent;
    }

    .template-hd,
    .base-bd,
    .display-dimension,
    .export-report {
        background-color: #fff;
    }

    .template-hd {
        padding: 20px 0 20px 30px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 0 30px;
    }

    // single row
    .base-row {
        margin-bottom: 23px;

        &:last-child {
            margin-bottom: 0;
        }

        .el-radio__label {
            @include sc(12px, $secondc);
        }

        .el-button--date {
            padding: 0 21px !important;
        }
    }

    .customer-column {
        margin-top: -3px;
    }

    // date style
    .el-date-editor {
        vertical-align: -3px !important;
        margin-right: 8px;
        width: 255px;
    }

    // row label
    .data-item {
        margin-right: 5px;
        font-weight: bold;
        color: $firstc !important;
    }

    .el-checkbox+.el-checkbox {
        margin: 0 0 0 16px;
    }

    .el-checkbox__label {
        color: $secondc !important;
        @extend .font12;
    }

    .resource-data-item {
        margin-top: 9px;
    }

    // resource row style
    .resource-wrap {
        .el-input {
            width: 99px;
        }

        .multiply {
            margin: 0 14px;
            @include sc(14px, #515974);
        }

        tr.space-under>td {
            padding-bottom: 15px;
        }

        .ajust-full-width {
            margin-left: 5px;

            .el-input {
                min-width: 375px;
            }
        }

        .classify {
            .el-input {
                width: 115px;
            }

            &:first-child {
                margin-right: 7px;
            }
        }
    }

    .customer-msg {
        tr.space-under>td {
            padding-bottom: 15px;
        }
    }

    // display dimension
    .display-dimension {
        .template-hd {
            padding-top: 7px;
        }

        // solve font size problem in el-checkbox-group
        .el-checkbox-group {
            font-size: 14px;
        }

        .show-bd {
            padding: 20px 0 30px 30px;
        }

        .checkbox-group-item {
            margin-bottom: 20px;
        }

        .show-title {
            color: $secondc;
            margin-right: 5px;
        }

        .el-checkbox__label {
            color: $secondc !important;
            @extend .font12;
        }

        .is-confirm {
            padding-top: 10px;
            background-color: $fc;
        }
    }

    // export report template
    .export-report {
        margin-top: 20px;

        .export-hd {
            padding: 20px 0 20px 30px;
        }

        .el-table th:first-child,
        .el-table td:first-child {
            padding-left: 20px;
        }

        .export-title {
            color: $firstc;
            padding-right: 1px;
        }

        .ajust-full-width {
            margin-right: 16px;
        }

        .el-input--prefix {
            width: 180px;
            margin-right: 5px;
        }

        .el-input__prefix {
            left: 83% !important;
        }
    }
}
</style>
