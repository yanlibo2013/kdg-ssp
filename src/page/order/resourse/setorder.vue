<template>
    <div class="order-setting">
        <el-main>
            <el-row class="order-setting-content">
                <el-col :span="24">
                    <div class="order-option margin-bottom-20 border-bottom-2">
                        <h2 class="template-hd">订单选择</h2>
                        <!-- checkboxs group -->
                        <div class="option-param">
                            <div class="order-nav-row clear">
                                <span class="hd left"><i class="item-needed">*</i>需求方：</span>

                                <el-select v-model="admodel" placeholder="请选择..." @change="linechange(admodel)" filterable :disabled='isEdit'>
                                    <el-option v-for="(item,index) in demandList" :key="index" :label="item.short_name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="order-nav-row">
                                <span class="hd left"><i class="item-needed">*</i>订单有效期：</span>

                                <el-date-picker :disabled='isEdit' v-model="timePeriod" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                                </el-date-picker>

                            </div>
                        </div>
                    </div>

                    <div class="order-detail-wrap border-bottom-2">
                        <h2 class="template-hd">订单详情</h2>
                        <div class="order-detail-bd">
                            <div class="basic-set-row clear">
                                <label for="" class="config-title left">媒体-广告位：</label>
                                <el-col class="ad-detail" :span="24">
                                    <el-col :span="12" class="innerbox">
                                        <ul>
                                            <li v-for="(item, index) in meadia" :key="index" :label="item.value" :value="item.value" @mouseover="selectMeadia(index)" @mouseout="liout(index)">
                                                <span class="ad-txt">{{item.value}}</span>
                                                <i class="el-icon-close" @click.stop="delMedia(index)" v-show="indexFigure==index"></i>
                                            </li>
                                        </ul>
                                    </el-col>
                                    <el-col :span="12" class="innerbox">
                                        <ul>
                                            <li v-for="(item, index) in ad" :key="index" :label="item.value" :value="item.value" @mouseover="selectAd(index)" @mouseout="lioutad(index)">
                                                <span class="ad-txt">{{item.value}}</span>
                                                <i class="el-icon-close" @click.stop="delAd(index)" v-show="indexFigureAd==index"></i>
                                            </li>
                                        </ul>
                                    </el-col>
                                </el-col>
                            </div>
                            <div class="basic-set-row clear">
                                <label for="" class="config-title left" style="margin-left: -9px"><i class="item-needed" style="color:red;margin-right:3px">*</i>订单价格:</label>
                                <el-input type="text" v-model.number="price" class="daily-pv-num self-m-l" :disabled='isEdit'></el-input>
                            </div>
                            <div class="basic-set-row clear">
                                <label for="" class="config-title left">涵盖行业：</label>
                                <el-input type="textarea" v-model="industry.toString()" class="daily-pv-num" :disabled="true"></el-input>

                            </div>
                            <div class="basic-set-row clear">
                                <label for="" class="config-title left">适用客户：</label>
                                <el-input type="textarea" v-model="customers.toString()" class="daily-pv-num" :disabled="true"></el-input>

                                <!-- <el-collapse class="custom-padding clear">
                                    <el-collapse-item name="2">
                                        <template slot="title">
                                            <span class="role-detail" v-for="item in Customers" :key="item.id" :label="item.name" :value="item.name" :id="item.id">
                                                {{item.name}}
                                            </span>

                                        </template>
                                    </el-collapse-item>
                                </el-collapse> -->
                            </div>
                            <div class="basic-set-row clear">
                                <label for="" class="config-title left">日均PV：</label>
                                <el-input type="textarea" v-model="pv.toString()" class="daily-pv-num" :disabled="true"></el-input>
                            </div>

                        </div>
                    </div>

                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit" v-show="!isEdit">确认</el-button>
                        <el-button type="cancel" @click="goBack" v-show="!isEdit">取消</el-button>

                        <el-button type="cancel" @click="goBack" v-show="isEdit">返回</el-button>
                    </div>

                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import {
    resource,
    common,
    order
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import {
    callback,
    validateForm
} from "../../../common/utils.js";
import moment from "../../../common/moment";
import _ from "lodash";
import store from 'store';
export default {
    data: function () {
        return {
            header: "",
            resoureType: ['图片', '信息流', '短视频', '贴片视频'], //选择的资源类型
            admodel: "",
            activeMedia: "",
            selectResource: "",
            adStyleList: [],
            searchkey: "",
            clearIt: false,
            pageList: [],
            pageList2: [],
            timePeriod: "",

            //订单设置

            meadiaAdList: [],
            demandList: [],
            industryList: [],
            form: {
                meadia: [],
                ad: [],
                industry: [],
                client: [],
                pv: ""
            },
            inIndustries: [], //展示行业
            inCustomers: [], //展示客户
            correspondAd: [],
            paramId: [], //页面链接上的id参数
            dailyPv: 0, //每日PV
            detailData: "",

            pvRequest: {
                pagenum: 1,
                pagesize: 10
            },
            mediaNames: [], //媒体名称
            mediaAdList: [], //广告位
            indexFigure: -1, //索引值，用于点击灰
            indexFigureAd: -1,
            lineCategories: [], //行业
            customersList: [], //客户
            industryData: [], //ajax行业数据
            // adIndex:0,

            industyList: [],
            pepoleList: [],

            ad: [],
            meadia: [],
            industry: [],
            customers: [],
            pv: [],

            price: "",

            detailList: "",
            isEdit: false
        }
    },
    watch: {},
    computed: {
        ...mapState([
            'editOrderItem'
        ]),
    },
    components: {},
    methods: {

        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
        selectAd(val) {
            this.indexFigureAd = val;

        },
        selectMeadia(val) {
            this.indexFigure = val;

        },
        liout() {

            this.indexFigure = -1;

        },
        lioutad() {
            this.indexFigureAd = -1

        },
        delMedia(val) {

            this.meadia.splice(val, 1);

        },
        delAd(val) {

            this.ad.splice(val, 1);

        },
        linechange() {

        },
        handleCheckedMeadiaChange() {

        },
        handleResourceTypesChange() {

        },
        keySearchData() {},
        clearInput() {

        },
        handleSelectionChange() {

        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        },
        handleChange() {

        },
        batchSwithResource() {},
        onSubmit() {

            let isValidateForm = validateForm([{
                key: this.admodel,
                value: "请选择需求方!"
            }, {
                key: this.timePeriod.length == 0 ? false : true,
                value: "请选择订单有效时间!"
            }, {
                key: this.price,
                value: "请填写订单价格!"
            }, {
                key: _.isNumber(this.price),
                value: "订单价格必须是数字!"
            }], this);

            if (isValidateForm) {

                let customerItem = _.map(this.detailList.customers, val => {
                    return val.key
                }).toString();

                let data = {
                    demand_id: this.admodel, //需求方ID
                    start_time: moment(this.timePeriod[0]).format(
                        "YYYY-MM-DD"
                    ), //开始时间
                    end_time: moment(this.timePeriod[1]).format(
                        "YYYY-MM-DD"
                    ), //结束时间
                    adlist_ids: _.map(this.ad, val => {
                        return val.key
                    }).toString(), //广告位
                    industry_ids: _.map(this.detailList.industry, val => {
                        return val.key
                    }).toString(), //涵盖行业
                    customers: customerItem, //客户
                    day_pv: this.dailyPv, //日均pv
                    //flag: "", //1 开启，2 关闭
                    order_price: this.price,
                    id: parseInt(this.$route.params.id)

                };
                
                if (this.$route.params.id) {

                    //modifyOrder
                    order.modifyOrder(this.header, data).then(res => {
                        if (res.data.data && res.data.data.code == "401") {
                            this.$switchLogin("", this);
                            return;
                        }
                        if (res.data.data && res.data.data.code == "402") {
                            this.$message(res.data.data.error);
                            return;
                        }
                        callback(res.data, () => {
                            //this.pageList = res.data;
                            this.$router.go(-1);
                        }, this);
                    });

                } else {
                    order.addOrder(this.header, data).then(res => {
                        if (res.data.data && res.data.data.code == "401") {
                            this.$switchLogin("", this);
                            return;
                        }
                        if (res.data.data && res.data.data.code == "402") {
                            this.$message(res.data.data.error);
                            return;
                        }
                        callback(res.data, () => {
                            //this.pageList = res.data;
                            this.$router.go(-1);
                        }, this);
                    });

                }

            }

        },
        goBack() {
            this.$router.go(-1);
        },
        setOrder() {
            this.$router.push({
                path: "/setorder"
            })
        },
        changeDate(val) {
            // if (!this.timePeriod) {
            //     return;
            // }
            // this.startDate = moment(this.timePeriod[0]).format(
            //     "YYYY-MM-DD"
            // );
            // this.endDate = moment(this.timePeriod[1]).format(
            //     "YYYY-MM-DD"
            // );
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
        getList(data) {
            resource.detailList(this.header, data).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                callback(res.data, () => {
                    this.detailData = res.data.data;
                    this.getEprice();
                }, this);

            });

        },
        getEprice() {
            // console.log(this.detailData);//queryall list
            // console.log(this.paramId);//pass ids in route link
            _.forEach(this.detailData, d => {
                _.forEach(this.paramId, p => {
                    if (d.id == p) {
                        this.dailyPv += Number(d.e_price);
                        this.mediaNames.push({
                            name: d.name,
                            media_id: d.media_id
                        });
                        this.mediaNames = _.uniqBy(this.mediaNames, 'media_id');

                        this.mediaAdList.push({
                            ad_name: d.ad_name,
                            ad_id: d.id,
                            media_id: d.media_id,
                            media_name: d.name
                        })

                        this.lineCategories.push(d.media_category_sed); //行业
                        this.lineCategories = _.uniq(this.lineCategories);
                        this.customersList.push(d.customers); //客户
                        this.customersList = _.uniq(this.customersList.toString().split(','));

                    }
                })
            })
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
        this.setBreadCrumb(this.$route.path.replace("/", ""));

        //需求方
        common.getDemandList(this.header).then(res => {
            this.demandList = res.data.data;

            // console.log("需求方式数据");
            // console.log(this.demandList);
        });

        //order.getOrderItem();

        // this.industryList = _.map(this.$store.state.editOrderItem.industry, val => {
        //     return val.value;
        // });

        //   let ad = [];
        //             let meadia = [];
        //             let industry = [];
        //             let customers = [];
        //             let pv = [];
        this.detailList = JSON.parse(store.get("order"));
        let item = this.detailList;

        console.log("数据项");
        console.log(item);

        if (this.detailList.id) {
            //this.admodel = this.detailList.id;
            this.admodel = item.demand_id;

        }

        if (this.detailList.start) {
            this.timePeriod = [new Date(this.detailList.start), new Date(this.detailList.end)];

        }

        this.ad = item.ad;
        this.meadia = item.meadia;
        this.industry = _.map(item.industry, val => {
            return val.value;
        });
        this.customers = _.map(item.customers, val => {
            return val.value;
        });
        this.pv = item.pv;

        this.price = item.order_price ? item.order_price : "";

        if (this.$route.params.id) {
            this.isEdit = true;

        }

    },
    beforeUpdate() {},
    updated() {

    },
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">
@import '../../../style/mixin';

.order-setting {

    // background
    .order-option,
    .order-detail-wrap {
        background-color: #ffffff;
    }

    .template-hd {
        padding: 17px 0 15px 30px;
    }

    // order option
    .order-option {
        .option-param {
            padding: 20px 0 8px 30px;
        }

        .hd {
            line-height: 38px;
            width: 109px;
        }

        .item-needed {
            color: $redc;
            width: 7px;
            margin-right: 7px;
            vertical-align: -2px;
        }

        .el-select {
            width: 255px;
        }

        .order-nav-row {
            margin-bottom: 10px;
        }
    }

    //order detail
    .order-detail-wrap {
        .basic-set-row {
            margin-bottom: 12px;
            position: relative;
        }

        .config-title {
            width: 95px;
            color: #515974;
            margin-top: 8px;
        }

        .order-detail-bd {
            padding: 20px 0 8px 30px;
        }

        .ad-detail {
            width: 300px;
            height: 338px;
            margin-bottom: 9px;
            border: 1px solid #e1e7f0;
            border-radius: 3px;
            height: 338px;

            li {
                position: relative;
                line-height: 42px;
                cursor: pointer;
                padding: 0 14px 0 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:hover,
                &.lightItem {
                    background-color: #f6f6f6;
                }
            }

            .el-col {
                &:first-child {
                    width: 138px;
                    max-height: 338px;
                    border-right: 1px solid #e1e7f0;
                }

                &:last-child {
                    width: 160px;
                }
            }

            .ad-txt {
                @include sc(12px, #515974);
            }

            .el-icon-close {
                position: absolute;
                right: 2px;
                top: 15px;
            }
        }

        //collapse
        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 0px;
            right: 30px;
            height: 38px;
            width: 38px;
            @include borderRadius(5px);
        }

        .el-collapse-item__arrow {
            float: none;
            position: absolute;
            top: -4px;
            right: 35px;
            z-index: 20;
            color: #ffffff;
        }

        .el-collapse-item__arrow.is-active {
            transform: rotate(90deg);
        }

        // collapse style
        .custom-padding {
            padding: 0 74px 0 78px;
        }

        .role-detail {
            display: inline-block;
            height: 38px;
            line-height: 38px;
            background-color: #f6f6f6;
            font-size: 12px;
            color: #515974;
            padding: 0 20px;
            margin: 0 6px 10px 0;
            border-radius: 3px;
        }

        .el-collapse {
            border: 0 none;
        }

        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__header {
            height: 38px;
            line-height: 38px;
            overflow: hidden;
            border-bottom: 0 none;
        }

        .el-collapse-item__header.is-active {
            height: 100%;
            -webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
            transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }

        //daily pv
        .daily-pv-num {
            width: 240px;
        }

        .self-m-l input {
            margin-left: 9px;
        }
    }

    //confirm and cancel button
    .is-confirm {
        padding: 20px 0 0 30px;
    }
}
</style>
