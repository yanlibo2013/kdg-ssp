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
                            >
                        </div>
                        <div class="customer-column clear">
                            <label for="" class="data-item resource-data-item left">客户维度：</label>
                            <table width="40%" class="customer-msg resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="客户" key="客户" v-model="checkedCustomId" multiple collapse-tags @change="changeCustom(checkedCustomId)">
                                                    客户：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>
                                            <el-select class="ajust-full-width" v-model="valueAdvertiser" placeholder="请选择" multiple collapse-tags @change="getAdvertiser(valueAdvertiser)" filterable>
                                                <el-option v-for="item in advertiser" :key="item.id" :label="item.com_name" :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr class="space-under">
                                        <td>
                                            <template>
                                                <el-checkbox label="计划" key="计划" v-model="checkedPlan" @change="changePlan(checkedPlan)">
                                                    计划：</el-checkbox>
                                            </template>
                                        </td>
                                        <td>

                                            <el-select class="ajust-full-width" v-model="valuePlan" placeholder="请选择计划1" multiple collapse-tags @change="getPlan">
                                                <el-option v-for="item in planOptions" :key="item.value" :label="item.label" :value="item.value">
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

                                            <el-select class="ajust-full-width" v-model="checkedCreateList" placeholder="请选择" multiple collapse-tags @change="creativity">
                                                <el-option v-for="item in creativeList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr class="space-under">
                                        <el-button type="confirm" @click="onSubmit">查询</el-button>
                                        <el-button type="cancel" @click="clearForm">重置</el-button>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 客户维度 end -->
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

                        <el-table :data="initData" style="width: 100%" element-loading-text="拼命加载中">
                            <el-table-column v-for="(col,index) in cols" :prop="col.prop" :label="col.label" :key="index">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- pagenation -->
                    <div class="block ">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="reportList&&reportList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="reportList&&reportList.per_page" layout="total, sizes, prev, pager, next, jumper" :total="reportList&&reportList.total">
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
    report
} from "../../../service/index";
import {
    home
} from "../../../service/index";
import {
    put,
    creative
} from "../../../service/index";

import _ from "lodash";
import dwonloadfile from "js-file-download"
import {
    isPositiveInteger
} from "../../../common/utils"
import fileServer from 'file-saver';
import XLSX from 'xlsx';
// import {
//     extend
// } from "../../../common/utils"
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
        put.mediaMediaName().then(res => {
            if (res.data.data && res.data.data.code == "401") {
                this.$switchLogin("", this);
                return;
            }
            if (res.data.data && res.data.data.code == "402") {
                this.$message(res.data.data.error);
                return;
            }
            let meadia = [];
            for (var j = 0; j < res.data.data.length; j++) {
                meadia.push({
                    key: res.data.data[j].plat_id,
                    value: res.data.data[j].media_name
                });
            }
            this.meadiaList = meadia;
        });
        home.publicAdvertiserInfo().then(res => {
            if (res.data.code == 0) {
                this.advertiser = res.data.data;
            }
            if (res.data.code == -1) {
                this.$router.push({
                    path: "/login"
                });
            }
        });
        //this.setDefaultTime();
        this.clearForm();

        //创意尺寸
        creative.creativeSizeList().then(res => {
            if (res.data.code == 0) {
                let arr = res.data.data.slice(0);
                arr = arr.map((item) => {
                    let obj = {};
                    obj.value = item;
                    obj.key = item;
                    return obj;
                });
                this.sizeData = [...arr];
            }
            if (res.data.code == -1) {
                this.$router.push({
                    path: "/login"
                });
            }
        });

        //获取平台接口  plantform-getalllog
        put.plantformGetrange().then(res => {
            if (res.data.code == 0) {
                this.platOptions = res.data.data;
            }
        });
    },
    watch: {

    },
    data: function () {
        return {
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
                value: 'android',
                key: 'android'
            }, {
                value: 'ios',
                key: 'ios'
            }]

            //报表下载 参数key值  类型 ext  文件名称 filename
        };
    },
    components: {
        // vDialog
    },
    methods: {
        ...mapActions(["setBreadCrumb", "getReportList"]),
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
            report.centerlist(data).then(res => { //centerlist 
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                if (res.data.code == 0) {
                    if (res.data.data.data[0]) {
                        this.cols = [];
                        this.currentItem = res.data.data.data[0];
                        for (let key in this.currentItem) {
                            let label = "";
                            let index = "";
                            if (key == "date") {
                                label = "日期";
                                index = 0;
                            }
                            if (key == "uid") {
                                label = "客户";
                                index = 1;
                            }
                            if (key == "campaign_id") {
                                label = "计划";
                                index = 2;
                            }
                            if (key == "creative_id") {
                                label = "创意";
                                index = 3;

                            }
                            if (key == "media_id") {
                                label = "媒体";
                                index = 4;
                            }
                            if (key == "adposition_id") {
                                label = "广告位";
                                index = 5;
                            }
                            if (key == "type_id") {
                                label = "展现类型";
                                index = 6;
                            }
                            if (key == "view") {
                                label = "曝光数";
                                index = 7;
                            }
                            if (key == "viewrate") {
                                label = "曝光率";
                                index = 8
                            }
                            if (key == "click") {
                                label = "点击数";
                                index = 9;
                            }
                            if (key == "cost") {
                                label = "成本";
                                index = 10;
                            }
                            if (key == "consume") {
                                label = "消耗";
                                index = 11;
                            }
                            if (key == "clickrate") {
                                label = "点击率";
                                index = 12;
                            }
                            if (key == "adSize") {
                                label = "尺寸";
                                index = 13;
                            }
                            if (key == "avg") {
                                label = "平均成本";
                                index = 14;
                            }

                            label != "" && this.cols.push({
                                prop: key,
                                label: label,
                                index: index
                            });

                        }

                        this.cols = _.orderBy(this.cols, ['index'], ['asc']); //升序  asc  降序  desc

                    }
                    this.getReportList(res.data.data);
                } else {}

                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
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

            let self = this;
            self.parameter = this.params();
            this.getData(self.parameter);

            this.cols = [];
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
            this.cols = []
        },

        // key = [null,null,null]

        download(url) {
            let self = this;
            report.downfile(this.parameter).then(res => {
                if (res.data.code == 0) {
                    if (self.paramsObj.ext == "1") {
                        self.downloadCSV(res.data.data, self.paramsObj.filename ? self.paramsObj.filename : "report");
                    } else {
                        self.downloadTxt(res.data.data, self.paramsObj.filename.filename ? self.paramsObj.filename : "report");
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                } else {}

                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
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
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                this.timePeriod = [date, date]
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
            this.valuePlan = [];
            this.checkedCreateList = [];
            this.getPlanByAdvertiser(this.valueAdvertiser);
            if (this.valueAdvertiser.length > 0) {
                this.checkedCustomId = true;
            }
        },
        // getPlan(currentAdId,planId) {
        getPlan() { //计划的下拉的形式
            if (this.valuePlan) {
                this.checkedPlan = true;
            }
            creative.publicCreativeAll({
                id: this.valuePlan,
            }).then(res => {
                if (res.data.code == 0) {
                    this.creativeList = [];
                    this.checkedCreateList = [];
                    let data = res.data.data;
                    for (var j = 0; j < data.length; j++) {
                        this.creativeList.push({
                            value: data[j].id,
                            label: data[j].name
                        });
                    }

                }
            });
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
            let self = this;
            this.adList = [];
            put.mediaadName({
                media_id: val
            }).then(res => {
                this.form.ad = "";
                _.forEach(res.data.data, function (item) {
                    self.adList.push({
                        key: item.ad_id,
                        value: item.ad_id,
                        label: item.ad_name
                    })
                });
                //console.log(self.adList);
            });
            if (val.length > 0) {
                //this.chekcboxResource.push("媒体");
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
                this.valueAdvertiser = [];
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
