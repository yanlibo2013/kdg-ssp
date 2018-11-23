<template>
    <div class="policy-set">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <el-col :span="24" class="margin-bottom-10 border-bottom-2">
                    <h1 class="template-hd">基本设置</h1>
                    <div class="base-bd">
                        <!-- 信用金： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>信用金：</label>
                            <div class="per-unit" :class="{ 'error-border': isCredit == 'credit' }">
                                <div class="unit-setting i-yellow">
                                    <el-input placeholder="大于或者等于100的倍数，不能为负" @change='checkNum' v-model="form.credit"></el-input>
                                    <span class="unit meta">元</span>
                                </div>
                                <span class="error-tip">请填写数字，精确到0.01</span>
                            </div>
                        </div>
                        <!-- 信用金： end -->
                        <!-- 服务费率： start -->
                        <div class="create-row m22">
                            <label for="" class="data-item"><i class="item-needed">*</i>服务费率：</label>
                            <div class="per-unit" :class="{ 'error-border': isService == 'service' }">
                                <div class="unit-setting i-blue">
                                    <el-input placeholder="数字类型，保留小数点后两位" v-model="form.rate"></el-input>
                                    <span class="unit">%</span>
                                </div>
                                <span class="error-tip">请填写小于一百的数字，精确到0.01</span>
                            </div>
                        </div>
                        <!-- 服务费率： end -->
                        <!-- 交易类型： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>交易类型：</label>
                            <el-checkbox-group v-model="checkedTrade" @change="handleCheckedTypeChange">
                                <el-checkbox v-for="(item,index) in tradeType" :label="item.value" :key="index">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 交易类型： end -->
                    </div>
                </el-col>
                <!-- 验证消息 -->
                <el-col :span="24" class="qualify-file margin-bottom-10 border-bottom-2">
                    <h1 class="template-hd">审核政策</h1>
                    <div class="base-bd">
                        <!-- 需求方ID： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>免审权限：</label>
                            <el-button :class="this.form.audit_power==1?'clicked':''" @click="setReview(1)">审核</el-button>
                            <el-button :class="this.form.audit_power==2?'clicked':''" @click="setReview(2)">免审</el-button>
                        </div>
                        <!-- 需求方ID： end -->
                    </div>
                </el-col>
                <!-- QPS规则 -->
                <!-- <el-col :span="24" class="qualify-file border-bottom-2">
                    <h1 class="template-hd">QPS规则</h1>
                    <div class="base-bd">
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>分配QPS：</label>
                            <div class="per-unit" :class="{ 'error-border': isService == 'service' }">
                                <div class="unit-setting i-blue">
                                    <el-input placeholder="" v-model="form.qps_allot"></el-input>
                                    <span class="unit">次/秒</span>
                                </div>
                                <span class="error-tip">请填写小于一百的数字，精确到0.01</span>
                            </div>
                        </div>
                    </div>
                </el-col> -->
                <el-col :span="24" class="margin-bottom-20">
                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                        <el-button type="cancel" @click="goBack">取消</el-button>
                    </div>
                </el-col>
            </el-form>
        </el-main>
    </div>
</template>

<script>
import {
    flow
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from "store";
import {
    callback,
    validateForm,
    getValueByKey,
    getKeyByValue
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            header: "",
            multipleSelection: [],
            keyWords: "",
            form: {},
            create: "",
            options: [{ //请选择客户
                value: '选项1',
                label: '客户1'
            }, {
                value: '选项2',
                label: '客户2'
            }, {
                value: '选项3',
                label: '客户3'
            }],
            //列表
            list: [],
            isLighten: false,
            clearIt: false, //清空图标是否显示
            currentpage: "",
            searchkey: '', //表格的搜索关键词
            statusOptions: [{
                    value: 0,
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '开启'
                },
                {
                    value: 2,
                    label: '关闭'
                }
            ],
            adUser: "",
            pageList: [],
            logofile: "",
            checkedType: "",
            tradeType: [{
                    key: 1,
                    value: "公开竞价-OA"
                }, {
                    key: 2,
                    value: "私有交易-PD"
                }
                // , {
                //     key: 3,
                //     value: "包量交易-GD"
                // }
            ],
            isCredit: "",
            isService: "",
            form: {
                id: "", //政策配置ID
                demandinfo_id: "", //需求方ID
                credit: "", //信用金
                rate: "", //服务费率
                deal_type: [], //交易类型: 1:公开竞价-OA 2:私有交易-PD 3:包量交易-GD
                audit_power: "", //免审权限： 1：审核 2：免审
                qps_allot: "" //分配QPS
            },
            checkedTrade: ["公开竞价-OA"]
        }
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
        isUpload() {},
        selectLogo() {},
        uploadLogo() {},
        clearInput() {

        },
        setReview(val) {
            this.form.audit_power = val;

        },
        handleCheckedTypeChange() {
            this.checkedTrade.push("公开竞价-OA");

        },
        modifyStatus(val, flag) {

        },
        handleSelectionChange(val) {},
        open() {},
        close() {},
        del() {},
        searchDataByName() {},
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {

            this.currentPage = val;
        },
        getIdByValue(checkedData, resData) {
            let result = [];
            _.forEach(checkedData, val => {
                _.forEach(resData, r => {
                    if (val == r.value) {
                        result.push(r.key);
                    }

                });

            });

            return result;

        },
        checkNum(val) {
            this.isNumberBy100(val)
        },
        isNumberBy100(ssn) {
            var re = /^[0-9]*[0-9]$/i; //校验是否为数字
            if (!ssn) {
                this.$message({
                    message: "请填写信用金",
                    type: "warning"
                });
                return false;
            }
            if (re.test(ssn) && ssn % 100 === 0) {

            } else {
                this.$message({
                    message: "信用金大于或者等于100的倍数，不能为负",
                    type: "warning"
                });
                return false;
            }

            return true
        },
        onSubmit() {

            let isValidateForm = validateForm([{
                    key: this.form.credit,
                    value: "请填写信用金!"
                }, {
                    key: this.form.rate != "" ? true : false,
                    value: "请填写服务费率!"
                }, {
                    key: this.checkedTrade.length == 0 ? false : true,
                    value: "请选择交易类型"
                }, {
                    key: this.form.audit_power,
                    value: "请选择审核政策!"
                }
                // , {
                //     key: this.form.qps_allot,
                //     value: "请填写分配OPS!"
                // }
            ], this);;

            let credit = this.isNumberBy100(this.form.credit);

            if (credit && isValidateForm) {

                // id: "", //政策配置ID
                //     demandinfo_id: "", //需求方ID
                //     credit: "", //信用金
                //     rate: "", //服务费率
                //     deal_type: [], //交易类型: 1:公开竞价-OA 2:私有交易-PD 3:包量交易-GD
                //     audit_power: "", //免审权限： 1：审核 2：免审
                //     qps_allot: "" //分配QPS

                flow.editPolicy(this.header, {
                    id: this.form.id ? parseInt(this.form.id) : undefined,
                    demandinfo_id: this.form.demandinfo_id ? parseInt(this.form.demandinfo_id) : parseInt(this.$route.params.id),
                    credit: parseInt(this.form.credit),
                    rate: parseFloat(this.form.rate).toFixed(2),
                    deal_type: _.uniq(getKeyByValue(this.tradeType, this.checkedTrade)).toString(),
                    audit_power: parseInt(this.form.audit_power),
                    qps_allot: parseInt(this.form.qps_allot)
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
                        this.$router.go(-1);
                    }, this);
                });

            }

        },
        goBack() {

            this.$router.go(-1);

        },
        changStatus() {},
        async initForm(val) {
            const getData = await flow.getPolicyItem(this.header, {
                id: val
            });
            const [item] = await Promise.all([getData]);

            // console.log("政策配置");
            // console.log(item.data.data);

            //编辑操作
            if (item.data.data) {
                let data = item.data.data;

                this.form = {

                    id: data.id, //政策配置ID
                    demandinfo_id: data.demandinfo_id, //需求方ID
                    credit: data.credit, //信用金
                    rate: (data.rate * 100).toFixed(2), //服务费率
                    deal_type: data.deal_type.split(","), //交易类型: 1:公开竞价-OA 2:私有交易-PD 3:包量交易-GD
                    audit_power: data.audit_power, //免审权限： 1：审核 2：免审
                    qps_allot: data.qps_allot //分配QPS

                };

                this.checkedTrade = getValueByKey(this.tradeType, this.form.deal_type);

                console.log("编辑操作");
                console.log(this.checkedTrade);

            }
        }

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.initForm(this.$route.params.id);
        // this.initForm(this.$route.params.id);
        // console.log(this.$route.params.id);
        // console.log(this.$route.params.demand);

        console.log(this.checkedTrade);

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
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">
@import "../../../style/mixin";

.policy-set {

    // background color set
    .el-main {
        background: transparent;
    }

    .el-col-24 {
        background-color: #ffffff;
    }

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .template-hd {
        padding: 17px 0 17px 30px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 20px 30px;
    }

    // upload button common margin left
    // single row
    .create-row {
        margin-bottom: 13px;

        &.m22 {
            margin-bottom: 21px;
        }

        .el-input {
            width: 240px;
        }

        .el-checkbox__label {
            @include sc(12px, $firstc);
        }

        .upload-wrap {
            display: inline-block;
        }

        .el-button--upload {
            margin-left: 4px;
        }

        &:last-child {
            margin-bottom: 0;
        }

        td:first-child {
            width: 250px;
        }

        td:last-child {
            .el-input {
                vertical-align: 1px;
            }
        }
    }

    // unit style
    .unit {
        @include bottomRightRadius(5px);
        @include topRightRadius(5px);
    }

    .special-logo {
        .el-input {
            width: 205px;
        }
    }

    // single row title
    .data-item {
        color: $firstc;
        margin-right: 6px;
        width: 86px;
        display: inline-block;
    }

    // need user to fill tip
    .item-needed {
        color: $redc;
        display: inline-block;
        width: 7px;
        margin-right: 7px;
        vertical-align: -2px;
    }

    .el-checkbox-group {
        display: inline-block;
    }

    // remove button
    .el-button--danger {
        margin-left: 6px;
    }

    // qulify file row
    .rule-set {
        .data-item {
            margin: 9px 3px 0 0;
            width: 98px;
        }

        .inferior-title {
            color: $secondc;
            margin: 9px 6px 0 0;
        }

        .space-under>td {
            padding-bottom: 15px;
        }

        .el-button--default {
            border-style: dashed;
            width: 593px;
        }
    }

    // adjust border with 0
    .border-none {
        border-bottom: 0 none;
        padding-bottom: 15px;
    }

    .el-input--suffix {
        margin-right: 5px;
    }

    // confirm and cancel
    .is-confirm {
        padding-left: 30px;
    }

    // remarks module
    .remarks {
        .el-textarea {
            margin: 20px 0 30px 30px;
        }

        .el-textarea__inner {
            width: 600px;
            height: 120px;
        }
    }

    // request address
    .request-ad {
        .data-item {
            vertical-align: top;
            margin-top: 6px;
        }

        .request-address {
            width: 320px;

            .el-textarea__inner {
                height: 98px;
            }
        }
    }

    .el-button--default {
        span {
            color: #7f8599;
        }

        &:hover,
        &:focus,
        &.clicked {
            background-color: #e2eeff;
            border-color: #6cabff;

            span {
                color: #74afff;
            }
        }
    }
}
</style>
