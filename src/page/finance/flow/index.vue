<template>
    <div class="resource-list">
        <el-main>
            <el-row class="resource-list-content">
                <el-col :span="24">

                    <div class="resource-bd border-bottom-2">

                        <!-- 搜索 -->
                        <div class="creative-btn-control">
                            <div class="creative-btn-row">
                                查询周期:
                                <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="setDate(searchDate)">
                                </el-date-picker>
                                <div class="search-input">
                                    <div class="el-input el-input--prefix" style="    top: 5px">

                                        <input autocomplete="off" placeholder="请输入关键词" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="searchkey" @keyup="filterDataBVName(searchkey)" />
                                        <span class="el-input__prefix">
                                                    <i class="el-input__icon el-icon-search"></i>
                                                </span>
                                        <span class="el-input__prefix custom__close" v-show="clearIt">
                                                    <span class="el-input__prefix-inner">
                                                        <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearInput"></i>
                                                    </span>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- 数据表格 -->
                        <el-table :data="pageList.data" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                            <!-- <el-table-column type="selection">
                            </el-table-column> -->
                            <el-table-column prop="name" label="需求方名称">
                                <template slot-scope="scope">
                                    {{ scope.row.demand_name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="media_id" label="账户状态">
                                <template slot-scope="scope">
                                    {{ scope.row.flag==1? "有效": "失效" }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_name" label="授信额度">
                                <template slot-scope="scope">
                                    {{ toThousands(scope.row.credit) }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_id" label="本月消耗">
                                <template slot-scope="scope">
                                    {{ toThousands(scope.row.consume) }}

                                </template>
                            </el-table-column>

                            <el-table-column prop="sources_type" label="账户余额">
                                <template slot-scope="scope">
                                    {{ toThousands(scope.row.account_balance) }}
                                    <a href="javascript:void(0);" class=" el-icon-revise" @click="charge(true,{id:scope.row.demandinfo_id,name:scope.row.demand_name})"></a>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="sources_type" label="上次充值日期">
                                <template slot-scope="scope">
                                  
                                </template>
                            </el-table-column> -->

                            <el-table-column prop="sources_type" label="上次充值日期">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="link-jump" @click="customeInfo(scope.row.financials)">  {{ formatDt(scope.row.dt) }}</a>
                                    <el-dialog class="adStyleList" title="财务明细" width="400" :show-close="true" :visible.sync="advertiseVisible">
                                        <el-table :data="subData" style="width: 100%;">
                                            <el-table-column prop="ch_name" label="日期" width="180">>
                                                <template slot-scope="subscope">
                                                    {{subscope.row.dt}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="style_id" label="需求方ID">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.demandinfo_id }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="media_cost" label="操作类型">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.type=="1"?"充值":"退款" }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="selling_price" label="金额">
                                                <template slot-scope="subscope">
                                                    {{ toThousands(subscope.row.recharge_amount) }}
                                                </template>
                                            </el-table-column>
                                            <!-- <el-table-column prop="selling_price" label="账户余额">
                                                <template slot-scope="subscope">
                                                     {{ subscope.row.account_balance?subscope.row.account_balance:"0.00" }}
                                                </template>
                                            </el-table-column> -->
                                            <el-table-column prop="selling_price" label="操作人">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.ope_user_name }}
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                        <div class="block resourcePage">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_num" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.current_size" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                                            </el-pagination>
                                        </div>
                                    </el-dialog>
                                </template>

                            </el-table-column>
                        </el-table>
                        <!-- paganation -->
                        <div class="block resourcePage">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_num" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.current_size" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-dialog title="" :visible.sync="dialogFormVisible" @close="closeForm">
                <Recharge ref="chargeDialog" @charge="charge" :demand="demand" @getList="getList" @closeDialog="closeDialog"></Recharge>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
import {
    resource,
    common,
    finance
} from "../../../service/index";
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from "store";
import {
    callback,
} from "../../../common/utils.js";
import moment from "../../../common/moment";
import Recharge from "./Recharge"
export default {
    data: function () {
        return {
            searchkey: "", //表格的搜索关键词
            clearIt: false, //关闭图标设置

            startDate: "",
            endDate: "",

            activeNames: ["1"],
            advertiseVisible: false,

            searchDate: [],

            //detail

            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            meadiaData: [],
            //1：图片，2：图文，3：组图，4：短视频，5：视频
            typeData: [{
                    id: 1,
                    name: "图片"
                },
                {
                    id: 2,
                    name: "图文"
                },
                {
                    id: 3,
                    name: "组图"
                },
                {
                    id: 4,
                    name: "短视频"
                },
                {
                    id: 5,
                    name: "视频"
                }
            ],
            selectMeadia: [],
            selectType: [],
            header: "",
            subData: [],
            dialogFormVisible: false,
            demand: ""
        };
    },
    computed: {},
    components: {
        Recharge
    },
    methods: {
        ...mapActions(["setBreadCrumb", "getCurrentUser"]),
        handleSelectionChange() {

        },

        toThousands(val) {
            return this.$toThousands(val);
        },

        getIdsByName(data, val) {
            let result = [];
            _.forEach(data, p => {
                _.forEach(val, s => {
                    if (p.name == s) {
                        result.push(p.id);
                    }
                });
            });

            return result;

        },

        customeInfo(val) {
            this.advertiseVisible = true;
            this.subData = _.map(val, item => {
                return {
                    dt: moment(item.dt).format("YYYY-MM-DD hh:mm:ss"),
                    demandinfo_id: item.demandinfo_id,
                    recharge_amount: item.recharge_amount,
                    type: item.type,
                    total_recharge_amount: item.total_recharge_amount,

                    ope_user_name: item.ope_user_name

                }

            });

        },
        handleCheckedMeadiaChange(val) {
            let data = this.getIdsByName(this.meadiaData, val);
            this.loading = true;

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                mediaIds: data.toString(),
                mediaStyleIds: this.getIdsByName(
                    this.typeData,
                    this.selectType
                ).toString()
            });
        },
        handleResourceTypesChange(val) {
            let data = this.getIdsByName(this.typeData, val);
            this.loading = true;

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                mediaStyleIds: data.toString(),
                mediaIds: this.getIdsByName(
                    this.meadiaData,
                    this.selectMeadia
                ).toString()
            });
        },
        keySearchData(val) {
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                // mediaStyleIds: data.toString(),
                mediaIds: this.getIdsByName(
                    this.meadiaData,
                    this.selectMeadia
                ).toString(),
                ad_name: val
            });
        },
        clearInput() {},
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize
            });
        },
        handleCurrentChange(val) {
            this.loading = true;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize
            });
            this.currentPage = val;

            if (this.multipleSelection.length > 0) {
                this.isLighten = true;

            } else {
                this.isLighten = false;

            }
        },
        handleChange() {},
        getList(data) {

            finance
                .finaceList(this.header, data)
                .then(res => {
                    if (res.data.data && res.data.data.code == "401") {
                        this.$switchLogin("", this);
                        return;
                    }
                    if (res.data.data && res.data.data.code == "402") {
                        this.$message(res.data.data.error);
                        return;
                    }
                    this.pageList = res.data;
                    this.loading = false;
                });
        },
        filterData() {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                start_time: this.startDate != "" ? this.startDate : undefined,
                end_time: this.endDate != "" ? this.endDate : undefined,
                demand_name: this.searchkey != "" ? this.searchkey : undefined
            });

        },

        setDate(val) {
            this.startDate = val ? moment(val[0]).format("YYYY-MM-DD") : "";
            this.endDate = val ? moment(val[1]).format("YYYY-MM-DD") : "";
            this.filterData();
        },
        formatDt(val) {
            return moment(val).format("YYYY-MM-DD HH:mm:ss") || "";
        },
        filterDataBVName(val) {
            this.filterData();
        },
        charge(val, demand) {
            this.dialogFormVisible = val;
            this.demand = JSON.stringify(demand);
        },
        closeForm() {
            this.$refs["chargeDialog"].resetForm("formCharge");
        },
        closeDialog(val) {
            this.dialogFormVisible = val;

        }
    },

    beforeCreate() {},
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    beforeMount() {},
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.loading = false;
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
};
</script>

<style lang="scss">
@import "../../../style/mixin";

.resource-list {
    .el-dialog {
        width: 600px !important
    }

    .el-icon-revise {
        cursor: pointer;
        margin-left: 20px;
        background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
        height: 19px;
        width: 19px;
        vertical-align: -4px;

        &:hover {
            background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
        }
    }

    .el-main {
        background-color: transparent;
    }

    // background
    .resource-bd {
        background-color: #ffffff;
    }

    // head padding
    .template-hd {
        padding: 17px 0 15px 30px;
    }

    // checkbox group
    .creative-param {
        padding: 9px 0 10px 30px;
        border-bottom: 2px solid #e1e7f0;

        span {
            font-size: 12px;
            line-height: 20px;
        }

        .hd {
            @include sc(12px,
            $firstc);
        }

        .align-right {
            margin-right: 30px;
        }

        .creative-nav-row {
            padding: 8px 0;
            position: relative;
        }

        .el-checkbox-group {
            padding: 0 45px 0 36px;
        }

        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 11px;
            right: 30px;
            height: 28px;
            width: 39px;
            @include borderRadius(5px);
        }

        .el-collapse-item__arrow {
            float: none;
            position: absolute;
            top: 1px;
            right: 35px;
            z-index: 20;
            color: #ffffff;
            transform: rotate(90deg);
        }

        .el-collapse-item__arrow.is-active {
            transform: rotate(-90deg);
        }

        .el-checkbox__input {
            margin-top: 2px;
        }

        .el-checkbox__label,
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
        }

        // collapse style
        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;

            .hd {
                line-height: 50px;
            }
        }

        .el-collapse {
            border: 0 none;
        }

        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border-bottom: 0 none;

            .hd {
                line-height: 50px;
            }
        }

        .el-collapse-item__header.is-active {
            height: 100%;
            -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
            transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }

    // button and search
    .creative-btn-control {
        margin-top: 20px;

        .creative-btn-row {
            padding: 20px 30px;
        }

        .search-input {
            display: inline-block;
            width: 180px;

            .el-input-group__append,
            .el-input-group__prepend {
                padding: 0 !important;
                background-color: #fff;
            }

            .el-input-group__append {
                border-color: #e1e7f0;

                .el-button {
                    padding: 3px 27px 21px !important;
                }
            }

            .el-icon-search {
                color: #a5a6bb !important;

                &:before {
                    font-size: 18px !important;
                }
            }

            .el-input__suffix {
                right: 25px;
            }

            .el-input--prefix .el-input__inner {
                padding-left: 20px;
            }

            .el-input__prefix {
                left: 83% !important;
            }
        }
    }

    .el-table {

        th:first-child,
        td:first-child {
            padding-left: 16px;
        }

        th:nth-child(2),
        td:nth-child(2) {
            padding-left: 20px;
        }

        // th:nth-child(6),
        // td:nth-child(6),
        // th:nth-child(8),
        // td:nth-child(8),
        // th:nth-child(9),
        // td:nth-child(9),
        // th:nth-child(10),
        // td:nth-child(10){
        //     text-align: center;
        // }
        // th:nth-child(11),
        // td:nth-child(11){
        //     text-align: right;
        //     padding-right: 20px;
        // }
    }

    //new add by lq
    .el-checkbox {
        float: left;
        margin: 0 30px 0 0;
    }

    .setLink {
        color: #1e9fff;

        &:hover {
            text-decoration: underline;
        }
    }

    // pop layer style
    .el-dialog__header {
        padding-left: 30px;
    }

    .el-dialog__body {
        padding: 0;
    }

    .adStyleList {
        .el-table th>.cell {
            padding-left: 13px;
        }
    }

    // pagenation
    .block .el-pagination {
        padding: 20px 30px;
    }
}
</style>
