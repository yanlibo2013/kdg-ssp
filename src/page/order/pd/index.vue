<template>
    <div class="pd-list">
        <el-main>
            <!-- 审核筛选 start -->
            <el-col :span="24" class="">
                <h1 class="template-hd">PD订单列表</h1>
                <div class="template-bd border-bottom-2">
                    <el-form :model="form">
                        <el-form-item>
                            <label for="" class="data-item">需求方：</label>
                            <el-select class="filter-input" v-model="form.innerStatus" placeholder="全部" @change="filterData">
                                <el-option v-for="(item,index) in demandList" :key="index" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                            <label for="" class="data-item">订单编号：</label>
                            <input autocomplete="off" placeholder="请输入订单编号" type="text" rows="2" validateevent="true" clearable class="el-input__inner filter-input" v-model="form.outerStatus" @keyup="filterData" />
                            <div class="last-item">
                                <label for="" class="data-item">订单状态：</label>
                                <el-select class="filter-input order-status" v-model="form.checkedStatus" placeholder="全部" @change="filterData">
                                    <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>

                            </div>
                        </el-form-item>
                    </el-form>
                    <!-- 数据表格 -->
                    <el-table :data="pageList.data" style="width: 100%" ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-table-column prop="demand_id" label="需求方">
                            <template slot-scope="scope">
                                <!-- <a href="javascript:void(0);" class="link-jump" @click="toDashboard(scope.row.order_no)">{{ scope.row.short_name }}</a> -->
                                <a href="javascript:void(0);" class="link-jump" @click="editItem(scope.row.id)">{{ scope.row.short_name }}</a>
                            </template>
                            <!-- <template slot-scope="scope">
                                {{ scope.row.demand_id }}
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="order_number" label="订单编号">
                            <template slot-scope="scope">
                                <!-- <a href="javascript:void(0);" class="link-jump" @click="editItem(scope.row.id)">{{scope.row.order_no}}</a> -->
                                <!-- <a href="javascript:void(0);" class="link-jump" @click="toDashboard(scope.row.order_no)">{{scope.row.order_no}}</a> -->
                                {{scope.row.order_no}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sources_type" label="开始时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.start_time}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column prop="sources_type" label="结束时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.end_time}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column prop="sources_type" label="状态">
                            <template slot-scope="scope">
                                <!-- <span>{{scope.row.orderSta_name}}</span> -->
                                <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                </el-switch>

                            </template>
                        </el-table-column>
                        <el-table-column prop="sources" label="资源">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" class="link-jump" @click="sourceList(scope.row.mediaAdList)">{{scope.row.mediaStyleName?scope.row.mediaStyleName:"—"}}</a>
                                <el-dialog class="sourceInfo" title="资源详情" width="400" :show-close="true" :visible.sync="sourceVisible">
                                    <el-table :data="subData" style="width: 100%;">
                                        <!-- <el-table-column label="行业">
                                            <template prop="name" slot-scope="subscope">
                                                阅读
                                            </template>
                                        </el-table-column> -->
                                        <el-table-column label="媒体">
                                            <template prop="simplename" slot-scope="subscope">
                                                {{subscope.row.name==""?"-":subscope.row.name}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="广告位">
                                            <template prop="simplename" slot-scope="subscope">
                                                {{subscope.row.ad_name}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="素材规范">
                                            <template prop="simplename" slot-scope="subscope">
                                                <div v-html="subscope.row.material"></div>

                                            </template>
                                        </el-table-column>
                                        <el-table-column label="日均PV">
                                            <template prop="simplename" slot-scope="subscope">
                                                {{toThousands(subscope.row.pv)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单价">
                                            <template prop="simplename" slot-scope="subscope">
                                                {{toThousands(subscope.row.settlement_price)}}元/CPM
                                            </template>
                                        </el-table-column>

                                    </el-table>
                                    <!-- <div class="block resourcePage">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="sourceInfo&&sourceInfo.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="sourceInfo&&sourceInfo.per_page" layout="total, sizes, prev, pager, next, jumper" :total="sourceInfo&&sourceInfo.total">
                                        </el-pagination>
                                    </div> -->
                                </el-dialog>

                            </template>
                        </el-table-column>
                        <el-table-column prop="pv" label="预估总pv">
                            <template slot-scope="scope">
                                <span>{{scope.row.totalpv}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column prop="pv" label="成交均价">
                            <template slot-scope="scope">
                                <span>{{scope.row.average_price.toFixed(2)}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column prop="pv" label="订单状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.orderSta_name}}</span>

                            </template>
                        </el-table-column>

                    </el-table>
                    <!-- paganation -->
                    <div class="block resourcePage">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.per_page" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                        </el-pagination>
                    </div>
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
import {
    callback,
    uniqCollection,
    getValueByKey,
    getKeyByValue
} from "../../../common/utils.js";
import store from 'store';
export default {
    data: function () {
        return {
            sourceVisible: false,
            form: {
                innerStatus: "",
                outerStatus: "",
                companyId: "",
                outerId: "",
                keyWords: "",
                type: "",
                checkedStatus: ""
            },
            industryData: [],
            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            subData: [],
            demandList: [{
                key: -1,
                value: "全部"
            }],
            orderStatus: [{
                label: "全部",
                value: -1
            }, {
                label: "未开始",
                value: 1
            }, {
                label: "执行中",
                value: 2
            }, {
                label: "已结束",
                value: 3
            }, {
                label: "暂停",
                value: 4
            }]
        }
    },
    computed: {

    },
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
        toThousands(val) {
            return this.$toThousands(val);
        },
        modifyStatus(val, flag) {

            order.modifyStatus(this.header, {
                ids: [val],
                flag: flag == 1 ? 2 : 1
            }).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                callback(res.data, () => {
                    this.getList({
                        pagenum: this.currentPage,
                        pagesize: this.pageSize
                    });
                }, this);

            });

        },
        getStatus(val) {
            let status = "";
            //订单状态code 编码 1：未开始 2：执行中 3：已结束 4:暂停

            if (val == 1) {
                status = "未开始";

            }
            if (val == 2) {
                status = "执行中";

            }
            if (val == 3) {
                status = "已结束";

            }
            if (val == 4) {
                status = "暂停";

            }

            return status;
        },
        gitIndustyItem(data) {
            return _.map(data, val => {
                let data = {};
                _.forEach(this.industryData, item => {

                    if (item.id == parseInt(val.key)) {
                        data = {
                            key: item.id,
                            value: item.name
                        }
                    }

                })
                return data;

            })

        },
        getParameterData(val) {
            let _that = this
            let ad = [];
            let meadia = [];
            let industry = [];
            let customers = [];
            let pv = [];
            let price = [];

            _.forEach(val.mediaAdList, item => {
                //广告位
                ad.push({
                    key: item.ad_id,
                    value: item.ad_name
                });
                //媒体
                meadia.push({
                    key: item.media_id,
                    value: item.name
                });
                // //涵盖行业
                // industry.push({
                //     key: item.industry_ids,
                //     value: ""
                // });
                // //使用客户
                // customers = _.concat(customers, item.customers && item.customers.split(","));
                // //日均pv
                // pv.push(item.day_pv);

            });
            //涵盖行业
            _.forEach(val.industry_ids && val.industry_ids.split(","), item => {

                // industry.push({
                //     key: item,
                //     value: ""
                // });
                if (val.industry_ids.split(",").length == 2) {
                    industry.push({
                        key: item,
                        value: ""
                    });
                } else {
                    let parentID = _that.findParaents(item);
                    if (parentID) {
                        industry.push({
                            key: item,
                            value: ""
                        }, {
                            key: parentID,
                            value: ""
                        });
                    } else {
                        industry.push({
                            key: item,
                            value: ""
                        });
                    }

                }
            });

            //适用客户
            _.forEach(val.customers && val.customers.split(","), item => {

                customers.push({
                    key: item,
                    value: ""
                });

            });

            //日均pv
            pv.push(val.day_pv);

            price.push(val.order_price);
            console.log(industry);
            return {
                ad: uniqCollection(ad),
                meadia: uniqCollection(meadia),
                industry: this.gitIndustyItem(uniqCollection(industry)),
                customers: this.gitIndustyItem(uniqCollection(customers)),
                pv: _.uniq(pv),
                id: val.id,
                start: val.start_time,
                end: val.end_time,
                order_price: price[0],
                demand_id: val.demand_id
            }

        },
        findParaents(param) {
            let _that = this;
            let paraentID = '';
            let paraentName = '';
            for (let i = 0; i < _that.industryData.length; i++) {
                if (param == _that.industryData[i].id) {
                    paraentID = _that.industryData[i].pid;
                }
            }
            return paraentID;
        },
        editItem(val) {
            order.getOrderItem(this.header, {
                id: val
            }).then(res => {
                let data = this.getParameterData(res.data.data);

                console.log("订单编辑");
                console.log(data);
                store.set("order", JSON.stringify(data));
                this.$router.push({
                    path: "/editsetorder/" + data.id
                })

            });

        },
        toDashboard(val) {
            this.$router.push({
                path: "/pdashboard/" + val
            })

            // this.$router.push({
            //     path: "/pdashboard/O20183518943755815"
            // })
        },
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize,
            });

        },
        handleCurrentChange(val) {
            this.loading = true;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize,
            });
            this.currentPage = val;

        },
        getMaterialData(val) {
            let size = [],
                type = [];

            _.forEach(val, item => {
                size = _.concat(size, item.image_wh ? item.image_wh.split(",") : []);
                type = _.concat(type, item.image_style ? item.image_style.split(",") : []);

            });

            return "尺寸:" + _.uniq(size).toString() + " <br> " + " 类型:" + _.uniq(type)

        },
        sourceList(val) {
            this.sourceVisible = true;

            let data = _.map(val, item => {
                return {
                    name: item.name,
                    ad_name: item.ad_name,
                    settlement_price: item.settlement_price.toFixed(2),
                    status: this.getStatus(item.flag),
                    pv: item.pv,
                    material: this.getMaterialData(item.mediaAdListStyles)
                };
            });

            this.subData = data;

        },
        getList(data) {
            order.getOrderList(this.header, data).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                this.pageList = res.data;
                // callback(res.data, () => {
                // }, this);

                this.loading = false;
            });

        },
        filterData(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                short_name: getValueByKey(this.demandList, [this.form.innerStatus == -1 ? undefined : this.form.innerStatus])[0], //需求方
                order_no: this.form.outerStatus, //订单编号
                orderSta_code: this.form.checkedStatus == -1 ? undefined : this.form.checkedStatus //订单状态
            });

        }
    },
    beforeCreate() {},
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

        store.remove("order");

    },
    beforeMount() {

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
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

        const meadiaPromis = common.meadiaList(this.header).then(res => {
            return res.data.data;

        });

        const industryPromis = common.getIndustry(this.header).then(res => {
            return res.data.data;
        });

        Promise.all([meadiaPromis, industryPromis]).then(res => {
            this.industryData = res[1];
            // console.log(this.industryData);
        })
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

    // head style
    .bg-white {
        background-color: #fff;
    }

    .template-hd {
        padding: 20px 0 20px 30px;
        border-bottom: 1px solid $bc;
        @include bg-white($fc);
    }

    // body style
    .template-bd {
        @include bg-white($fc);

        .select-info-tip {
            color: #ff7a81;
            padding: 10px 0 0 16px;
        }

        .el-form-item {
            margin: 0 0 18px 30px;
        }

        .order-status {
            width: 120px;
        }

        .filter-input {
            width: 240px;
            margin: 0 15px 0 0;
        }

        .last-item {
            display: inline-block;
            margin-top: 20px;
        }
    }

    // table
    .el-table {

        th:first-child .cell,
        td:first-child .cell {
            padding-left: 30px;
        }
    }

    // pop layer
    .el-dialog__header {
        padding: 15px 30px 16px;

        .el-dialog__headerbtn {
            right: 30px;
        }
    }

    .el-dialog__body {
        padding: 0;
    }
}
</style>
