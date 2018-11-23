<template>
    <div class="pd-list">
        <el-main>
            <!-- 审核筛选 start -->
            <el-col :span="24" class="filter-term margin-bottom-20 border-bottom-2">
                <div class="term-hd">
                    <!-- <label for="" class="data-item">需求方：</label>
                    <el-select class="filter-input" v-model="form.innerStatus" placeholder="全部" @change="filterData">
                        <el-option v-for="(item,index) in demandList" :key="index" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select> -->
                    <div class="time-select">
                        <label for="" class="data-item">时间范围：</label>
                        <el-date-picker v-model="timePeriod" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                        </el-date-picker>
                    </div>

                    订单编号:
                    <div class="time-select">
                        <input autocomplete="off" placeholder="请输入订单编号" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="form.keyWords" @keyup="filterData()" />
                    </div>
                        <el-button :type='defaultDate=="今天"?"date default-date":"date"' @click='shortcuts("今天")' style="margin-left:10px">今天</el-button>
                        <el-button :type='defaultDate=="昨天"?"date default-date":"date"' @click='shortcuts("昨天")'>昨天</el-button>
                        <el-button :type='defaultDate=="过去7天"?"date default-date":"date"' @click='shortcuts("过去7天")'>过去7天</el-button>
                        <!-- default-date -->
                        <el-button :type='defaultDate=="过去30天"?" date default-date":"date"' @click='shortcuts("过去30天")'>过去30天</el-button>
                    </div>
                    <div class="term-bd">
                        <el-col :span="24" class="change-flex">
                            <el-col :span="5" class="txt-center">
                                <p class="term-item-hd">订单编号</p>
                                <p class="term-item-bd">
                                    <!-- {{pageList.order_no}} -->
                                    <i v-if="pageList.order_no">
                                    {{pageList.order_no}}
                                </i>
                                    <i v-else class="el-icon-minus"></i>
                                </p>
                            </el-col>
                            <el-col :span="2" class="txt-center">
                                <p class="term-item-hd">总计曝光数</p>
                                <p class="term-item-bd">{{toThousands(pageList.view_sum)}}</p>

                            </el-col>
                            <el-col :span="2" class="txt-center">
                                <p class="term-item-hd">曝光率</p>
                                <p class="term-item-bd">
                                    <!-- {{pageList.view_rate?pageList.view_rate.toFixed(2)+"%":""}} -->

                                    <i v-if="pageList.view_rate">
                                    {{toThousands(pageList.view_rate.toFixed(2))+"%"}}
                                </i>
                                    <i v-else class="el-icon-minus"></i>
                                </p>
                                <!-- <p class="term-item-bd">{{156.325556.toFixed(2)}}</p> -->

                            </el-col>
                            <el-col :span="3" class="txt-center">
                                <p class="term-item-hd">千次曝光价格（元）</p>
                                <p class="term-item-bd">{{toThousands(pageList.ecpm)}}</p>

                            </el-col>
                            <el-col :span="3" class="">
                                <p class="term-item-hd">总计点击次数</p>
                                <p class="term-item-bd">{{toThousands(pageList.click_sum)}}</p>

                            </el-col>
                            <el-col :span="3" class="txt-center">
                                <p class="term-item-hd">点击率</p>
                                <p class="term-item-bd">
                                    <!-- {{pageList.click_rate?pageList.click_rate.toFixed(2)+"%":""}} -->
                                    <i v-if="pageList.click_rate">
                                    {{toThousands(pageList.click_rate.toFixed(2))+"%"}}
                                </i>
                                    <i v-else class="el-icon-minus"></i>
                                </p>

                            </el-col>
                            <el-col :span="3" class="">
                                <p class="term-item-hd">平均点击单价（元）</p>
                                <p class="term-item-bd">{{toThousands(pageList.ecpc)}}</p>

                            </el-col>
                            <el-col :span="3" class="">
                                <p class="term-item-hd">消耗金额（元）</p>
                                <p class="term-item-bd">{{toThousands(pageList.consume_sum)}}</p>

                            </el-col>
                        </el-col>
                    </div>
            </el-col>
            <!-- 消耗量 -->
            <el-col :span="24" class="consumption border-bottom-2">
                <div class="consumption-hd">
                    <el-select class="left" v-model="form.innerStatus" placeholder="消耗量" @change="chartFilter">
                        <el-option v-for="item in wastageList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <p>消耗量趋势</p>
                </div>
                <div class="consumption-bd" style="padding-bottom:10px" ref="chart">
                    <!-- <LineBar></LineBar> -->
                    <chart :option='option' ref="chartDiv"></chart>

                </div>

            </el-col>

            <!-- 导出报表 -->
            <el-col :span="24" class="export-report border-bottom-2">
                <div class="export-hd">
                    <label for="" class="export-title">导出报表：</label>
                    <el-select class="ajust-full-width" v-model="paramsObj.ext" placeholder="请选择">
                        <el-option v-for="item in reporttypeList" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>

                    <label for="" class="export-title">文件名称：</label>
                    <!-- <el-input placeholder="请输入文件名称" prefix-icon="el-icon-search" v-model="paramsObj.filename">
                    </el-input> -->
                    <el-input v-model="input" class="kdg-input" placeholder="请输入文件名称"></el-input>
                    <el-button type="confirm" @click="download">导出</el-button>

                </div>
                <!-- 数据表格 -->
                <el-table :data="pageList.orderReports" style="width: 100%" ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column prop="sources_type" label="日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.dt?scope.row.dt:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="request_name" label="需求方">
                        <template slot-scope="scope">
                            <span>{{scope.row.demand_name?scope.row.demand_name:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_number" label="订单编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.order_no?scope.row.order_no:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="消耗(元)">
                        <template slot-scope="scope">
                            <span>{{scope.row.consume?scope.row.consume:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="媒体">
                        <template slot-scope="scope">
                            <span>{{scope.row.media_name?scope.row.media_name:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources" label="广告位">
                        <template slot-scope="scope">
                            <span>{{scope.row.adlist_name?scope.row.adlist_name:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pv" label="曝光数">
                        <template slot-scope="scope">
                            <span>{{scope.row.view?scope.row.view:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pv" label="曝光率">
                        <template slot-scope="scope">
                            <span>{{scope.row.view_rate?scope.row.view_rate:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="点击数">
                        <template slot-scope="scope">
                            <span>{{scope.row.click?scope.row.click:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="点击率">
                        <template slot-scope="scope">
                            <span>{{scope.row.click_rate?scope.row.click_rate:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="ECPM(元)">
                        <template slot-scope="scope">
                            <span>{{scope.row.ecpm?scope.row.ecpm:"—"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sources_type" label="平均CPC(元)">
                        <template slot-scope="scope">
                            <span>{{scope.row.ecpc?scope.row.ecpc:"—"}}</span>

                        </template>
                    </el-table-column>
                </el-table>

                <!-- paganation -->
                <div class="block resourcePage">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.per_page" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                    </el-pagination>
                </div>
            </el-col>
        </el-main>
    </div>
</template>

<script>
import {
    order,
    resource,
    common
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from 'store';
import moment from "../../../common/moment";
import {
    callback
} from "../../../common/utils.js";
import dwonloadfile from "js-file-download";
import XLSX from 'xlsx';
import fileServer from 'file-saver';
import chart from "../../../components/echarts/index";
export default {
    data: function () {
        return {
            defaultDate: "昨天",
            header: "",
            innerAudit: [{
                label: "请选择",
                value: -1,
            }, {
                label: "审核拒绝",
                value: 2
            }],
            form: {
                innerStatus: "",
                outerStatus: "",
                companyId: "",
                outerId: "",
                keyWords: "",
                type: "",
                checkedStatus: ""
            },
            type: [],
            paramsObj: {
                ext: "1",
                filename: ""
            },
            reporttypeList: [{
                key: "1",
                value: "Excel"
            }, {
                key: "2",
                value: "Txt"
            }],
            searchkey: "",
            checked: true,
            pageList2: [{
                request_name: '优智广告',
                order_number: '1515980691',
                sources_type: '2018-05-10',
                sources: '图片、视频',
                pv: '10000000'
            }, {
                request_name: '优智广告2',
                order_number: '15159806911',
                sources_type: '2018-05-12',
                sources: '图片、视频2',
                pv: '100000002'
            }],
            wastageList: [{
                label: "日消耗",
                value: 4
            }, {
                label: "月消耗",
                value: 5
            }],
            timePeriod: [],

            //报表
            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            subData: [],
            demandList: [{
                key: -1,
                value: "全部"
            }],
            startDate: "",
            endDate: "",
            chartData: [{
                "name": "点击",
                "月份": "2019-01",
                "月均降雨量": 18.9,

            }, {
                "name": "点击",
                "月份": "2019-02",
                "月均降雨量": 28.8
            }, {
                "name": "点击",
                "月份": "2019-09",
                "月均降雨量": 39.3
            }, {
                "name": "点击",
                "月份": "2019-04",
                "月均降雨量": 81.4
            }, {
                "name": "点击",
                "月份": "2019-05",
                "月均降雨量": 47
            }, {
                "name": "点击",
                "月份": "2019-06",
                "月均降雨量": 20.3
            }, {
                "name": "点击",
                "月份": "2019-07",
                "月均降雨量": 24
            }, {
                "name": "点击",
                "月份": "2019-08",
                "月均降雨量": 35.6
            }, {
                "name": "曝光",
                "月份": "2019-01",
                "月均降雨量": 12.4
            }, {
                "name": "曝光",
                "月份": "2019-02",
                "月均降雨量": 23.2
            }, {
                "name": "曝光",
                "月份": "2019-04",
                "月均降雨量": 34.5
            }, {
                "name": "曝光",
                "月份": "2019-05",
                "月均降雨量": 99.7
            }, {
                "name": "曝光",
                "月份": "2019-06",
                "月均降雨量": 52.6
            }, {
                "name": "曝光",
                "月份": "2019-07",
                "月均降雨量": 35.5
            }, {
                "name": "曝光",
                "月份": "2019-08",
                "月均降雨量": 37.4
            }, {
                "name": "曝光",
                "月份": "2019-09",
                "月均降雨量": 42.4
            }],
            input: "",
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
                                color: '#418AEB'
                            }
                        },
                        name: '曝光率',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#6CABFF'
                            }
                        },
                        name: '曝光量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#79B3FF',
                            }
                        },
                        name: '点击量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            }
        }
    },
    components: {
        chart
    },
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
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

            this.changeDate();
        },
        toThousands(val) {
            return this.$toThousands(val);
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
        downloadTxt(val, filename) {
            console.log(filename);
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
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.getList({
                // pagenum: val,
                // pagesize: this.pageSize,
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                short_name: this.form.innerStatus,
                // short_name:
                order_no: this.$route.params.id,
                start_time: this.startDate,
                end_time: this.endDate
            });

        },
        handleCurrentChange(val) {
            this.loading = true;
            this.currentPage = val;

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                short_name: this.form.innerStatus,
                // short_name:
                order_no: this.$route.params.id,
                start_time: this.startDate,
                end_time: this.endDate
            });

        },
        chartFilter(val) {
            if (val == 4) {
                this.$refs.chartDiv.draw({
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
                                    color: '#418AEB'
                                }
                            },
                            name: '曝光率',
                            type: 'bar',
                            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 15.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                        },
                        {
                            itemStyle: {
                                normal: {
                                    color: '#6CABFF'
                                }
                            },
                            name: '曝光量',
                            type: 'bar',
                            data: [2.6, 0.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            itemStyle: {
                                normal: {
                                    color: '#79B3FF',
                                }
                            },
                            name: '点击量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 3.4, 23.0, 6.5, 1.0, 6.2]
                        }
                    ]
                })
            } else {
                this.$refs.chartDiv.draw({
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
                                    color: '#418AEB'
                                }
                            },
                            name: '曝光率',
                            type: 'bar',
                            data: [1.0, 8.9, 17.0, 33.2, 25.6, 66.7, 75.6, 182.2, 82.6, 20.0, 10.4, 1.3]
                        },
                        {
                            itemStyle: {
                                normal: {
                                    color: '#6CABFF'
                                }
                            },
                            name: '曝光量',
                            type: 'bar',
                            data: [3.6, 1.9, 10.0, 25.4, 29.7, 72.7, 174.6, 180.2, 45.7, 17.8, 10.0, 5.3]
                        },
                        {
                            itemStyle: {
                                normal: {
                                    color: '#79B3FF',
                                }
                            },
                            name: '点击量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [3.0, 5.2, 7.3, 8.5, 9.3, 10.2, 20.3, 9.4, 23.0, 10.5, 2.0, 9.2]
                        }
                    ]
                })
            }
        },
        changeDate(val) {
            if (!this.timePeriod) {
                return;
            }
            this.startDate = moment(this.timePeriod[0]).format(
                "YYYY-MM-DD"
            );
            this.endDate = moment(this.timePeriod[1]).format(
                "YYYY-MM-DD"
            );
            this.filterData();
        },
        filterData() {
            //form.innerStatus
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                short_name: this.form.innerStatus == -1 ? undefined : this.form.innerStatus,
                // short_name:
                order_no: this.$route.params.id,
                pd_id: this.form.keyWords,
                start_time: this.startDate,
                end_time: this.endDate
            });

            //chart

            //this.$refs.draw();
        },
        download() {

            order.exportFile(this.header, {
                order_no: this.$route.params.id,
                start_time: this.startDate,
                end_time: this.endDate
            }).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
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
        getList(data) {
            order.getReportList(this.header, data).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                this.pageList = res.data.data;
                this.loading = false;
            });

        },
    },
    beforeCreate() {},
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    beforeMount() {

    },
    mounted() {
        //console.log(this.$refs);
        const date = new Date();
        date.setTime(date.getTime() - 3600 * 1000 * 24);
        this.timePeriod = [date, date]

        this.setBreadCrumb(this.$route.path.replace("/", ""));

        this.getList({
            pagenum: 1,
            pagesize: 10,
            // order_no: "O20183293",
            order_no: this.$route.params.id
        });

        common.getDemandList(this.header).then(res => {

            let data = _.map(res.data.data, val => {
                return {
                    value: val.short_name,
                    key: val.id
                }
            });

            this.demandList = _.concat(this.demandList, data);

        });

        //this.setChart();
    },

    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">
@import "../../../style/mixin";

.pd-list {
    .el-col-24 {
        background-color: #fff;
    }

    .change-flex {
        display: flex;

        .el-col-5 {
            flex: 2;
            width: auto;
        }

        .el-col-2 {
            flex: 1;
            width: auto;
        }

        .el-col-3 {
            flex: 1.5;
            width: auto;
        }
    }

    .el-date-editor .el-range__close-icon {
        padding-right: 12px;
    }

    //user filter term
    .filter-term {
        .term-hd {
            padding: 20px 0 20px 0px;
            /*padding: 20px 0 20px 30px;*/
            border-bottom: 1px solid #e1e7f0;

            .time-select {
                display: inline-block;
                margin: 0 0 0 15px;
            }

            .el-date-editor {
                vertical-align: 0px !important;
            }
        }

        .term-item-hd {
            @include sc(14px, #a5a6bb);
            padding: 17px 0 2px;
            padding-left: 20%;
            text-align: center;
        }

        .term-item-bd {
            @include sc(24px, #515974);
            padding-bottom: 18px;
            padding-left: 20%;
            text-align: center;
        }

        .el-col-5,
        .el-col-2,
        .el-col-3 {
            border-right: 1px solid #e1e7f0;
            margin: 19px 0;

            &:last-child {
                border-right: 0 none;
            }
        }

        .txt-center {
            text-align: center;

            .term-item-hd,
            .term-item-bd {
                text-align: center;
                padding-left: 0;
            }
        }
    }

    //consumption
    .consumption {
        .consumption-hd {
            padding: 13px 0 12px 30px;
            border-bottom: 1px solid #e1e7f0;

            p {
                text-align: center;
                line-height: 28px;
                @include sc(18px, #7b839b);
            }

            .el-select {
                width: 120px;
                height: 28px;
            }

            .el-input__inner {
                height: 28px !important;
                line-height: 28px !important;
            }

            .el-input__suffix {
                top: 7px;
            }

            .is-focus .el-input__suffix {
                top: -5px;
            }
        }

        .consumption-bd {
            padding: 30px 25px 30px 30px;
            position: relative;

            .titile-span {
                position: absolute;
                top: 9px;
                color: #A5A6BB
            }
        }
    }

    // report export
    .export-report {
        margin-top: 20px;

        .export-hd {
            padding: 20px 0 20px 30px;
        }

        .export-title {
            color: $firstc;
            padding-right: 1px;
        }

        .ajust-full-width {
            margin-right: 16px;
        }

        .kdg-input {
            width: 180px;
            margin-right: 5px;
        }

        .el-input__prefix {
            left: 83% !important;
        }
    }

    .term-item-bd {
        font-size: 1.2rem !important;
    }

    // table
    .el-table {

        th:first-child .cell,
        td:first-child .cell {
            padding-left: 30px;
        }
    }
}

@media screen and (max-width:1920px) {}

@media screen and (max-width:1680px) {}

@media screen and (max-width:1366px) {
    .pd-list .filter-term .term-item-hd {
        text-align: center;
        font-size: 12px;
        padding-left: 10%;
    }

    .pd-list .filter-term .term-item-bd {
        text-align: center;
        font-size: 20px;
        padding-left: 10%;
    }
}
</style>
