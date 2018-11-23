<template>
    <div class="custome-create">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <el-col :span="24" class="margin-bottom-10 border-bottom-2">
                    <h1 class="template-hd">基本设置</h1>
                    <div class="base-bd">
                        <!-- 企业全称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>企业全称：</label>
                            <el-input placeholder="20字以内，允许汉字或英文;必填" v-model="form.full_name" @blur="isCheck(form.full_name)"></el-input>
                        </div>
                        <!-- 企业全称： end -->
                        <!-- 企业简称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>简称：</label>
                            <el-input placeholder="6字以内，允许汉字或英文;必填" v-model="form.short_name" @blur="isCheck(form.short_name)"></el-input>
                        </div>
                        <!-- 企业简称： end -->
                        <!-- 企业LOGO： start -->
                        <div class="create-row special-logo">
                            <label for="" class="data-item"><i class="item-needed">*</i>LOGO：</label>
                            <!-- <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="格式:JPG/PNG,不超过500KB。" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedlogo')"></i>
                            </el-input> -->
                            <el-input class="upload-control" placeholder="格式:JPG/PNG,不超过500KB。" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedlogo')"></i>
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="image/gif, image/jpeg" id="fileLogo" @change="uploadLogo" style="display:none" />
                            <span class="tips-important"></span>
                        </div>
                        <!-- 企业LOGO： end -->
                        <!-- 联系人： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>联系人：</label>
                            <el-input class="" placeholder="汉字或英文;必填" v-model="form.linkman">
                            </el-input>
                        </div>
                        <!-- 联系人： end -->
                        <!-- 联系方式： start -->
                        <div class="create-row">
                            <label for="" class="data-item "><i class="item-needed">*</i>联系方式：</label>
                            <el-input class="" placeholder="固话或移动电话;必填" v-model="form.contact_way">
                            </el-input>
                        </div>
                        <!-- 联系方式： end -->
                        <!-- email： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed"></i>email：</label>
                            <el-input class="" placeholder="邮箱格式" clearable v-model="form.email">
                            </el-input>
                        </div>
                        <!-- email： end -->
                        <!-- 公司地址： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed"></i>公司地址：</label>
                            <el-input placeholder="40字以内，允许汉字或英文;必填" v-model="form.address"></el-input>
                        </div>
                        <!-- 公司地址： end -->
                        <!-- 状态： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">&nbsp;</i>状态：</label>
                            <el-switch v-model="form.flag" active-text="关闭" inactive-text="开启" @change="modifyStatus()">
                            </el-switch>
                        </div>
                        <!-- 状态： end -->
                    </div>
                </el-col>
                <!-- 验证消息 -->
                <el-col :span="24" class="qualify-file margin-bottom-10 border-bottom-2">
                    <h1 class="template-hd">验证消息</h1>
                    <div class="base-bd">
                        <!-- 需求方ID： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>需求方ID：</label>
                            <el-input class="" :disabled="true" placeholder="系统自动分配" v-model="form.demand_sideid">
                            </el-input>
                        </div>
                        <!-- 需求方ID： end -->
                        <!-- Token： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>Token：</label>
                            <el-input class="" :disabled="true" placeholder="系统自动分配" v-model="form.token">
                            </el-input>
                        </div>
                        <!-- Token： end -->
                        <!-- 价格密匙： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>价格密匙：</label>
                            <el-input class="" :disabled="true" placeholder="系统自动分配" v-model="form.price_key">
                            </el-input>
                        </div>
                        <!-- 价格密匙： end -->
                    </div>
                </el-col>
                <!-- 请求地址 -->
                <el-col :span="24" class="request-ad border-bottom-2">
                    <h1 class="template-hd">请求地址</h1>
                    <div class="base-bd">
                        <!-- 正式请求地址： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>正式请求地址：</label>
                            <el-input class="request-address" type="textarea" :rows="2" resize="none" placeholder="请填写请求地址" v-model="form.formal_request">
                            </el-input>
                        </div>
                        <!-- 正式请求地址： end -->
                        <!-- 测试请求地址： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>测试请求地址：</label>
                            <el-input class="request-address" type="textarea" :rows="2" resize="none" placeholder="请填写请求地址" v-model="form.test_request">
                            </el-input>
                        </div>
                        <!-- 测试请求地址： end -->
                    </div>
                </el-col>
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
    isHasSpecChart,
    warning,
    testPhone,
    checkUrl,
    checksum,
    testEmail
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            header: "",
            multipleSelection: [],
            keyWords: "",
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
            form: {
                full_name: "", //企业名称
                short_name: "", //简称
                file: "", //logo
                linkman: "", //联系人
                contact_way: "", //联系方式
                email: "",
                address: "",
                token: "",
                address: "", //公司地址
                flag: true, //状态 1开启，2关闭
                demand_sideid: "", //需求方ID
                price_key: "", //价格秘钥
                formal_request: "", //正式
                test_request: "" //测试
            }
        }
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
        isCheck(val) {
            let result = isHasSpecChart(val);

            console.log(result);
            if (result) {
                warning("全称或简称不可包含特殊字符!", this)
            }

        },
        isChinaOrLett(s) {
            var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
            var re = new RegExp(regu);
            return re.test(s);
        },

        ValidatePhone(val) {
            var isPhone = /^1[3|4|5|7|8][0-9]{9}$/; //手机//手机号码
            var isMobDiff = /^0[\d]{2,3}[\d]{7,8}$/; // 座机格式中间无-
            var isMob = /^0[\d]{2,3}-[\d]{7,8}$/; // 座机格式中间含有-
            if (isMob.test(val) || isPhone.test(val) || isMobDiff.test(val)) {
                return true;
            } else {
                return false;
            }
        },
        ValidateEmail(val) {
            var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (regEmail.test(val)) {
                return true;
            } else {
                return false;
            }
        },
        isUpload() {},
        selectLogo() {
            this.$el.querySelector("#fileLogo").click();

        },
        upload() {

        },
        uploadLogo() {
            this.form.file = this.$el.querySelector("#fileLogo").files[0];
            this.logofile = this.form.file.name;
        },
        clearInput() {

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
        onSubmit() {
            // console.log(checkUrl(this.form.test_request));
            // return;

            let isValidateForm = validateForm([{
                    key: this.form.full_name,
                    value: "请填写企业名称!"
                }
                // , {
                //     key: this.form.short_name,
                //     value: "请填写企业简称!"
                // }
                ,
                {
                    key: this.logofile,
                    value: "请填上传企业LOGO"
                }, {
                    key: this.form.linkman,
                    value: "请填写联系人!"
                }, {
                    key: this.form.contact_way,
                    value: "请填写联系方式!"
                },
                // {
                //     key: this.form.demand_sideid,
                //     value: "请填写需求方ID!"
                // },
                // {
                //     key: this.form.token,
                //     value: "请填写Token!"
                // },
                // {
                //     key: this.form.price_key,
                //     value: "请填写价格秘钥!"
                // },
                {
                    key: this.form.formal_request,
                    value: "请填写正式请求地址!"
                },
                {
                    key: this.form.test_request,
                    value: "请填写测试请求地址!"
                }
            ], this);

            if (isValidateForm) {
                // if ((checksum(this.form.full_name) / 2) > 20) {
                //     warning("企业名称20字以内!", this);
                //     return;

                // }

                // if ((checksum(this.form.short_name) / 2) > 6) {
                //     warning("企业名称20字以内!", this);
                //     return;

                // }
                // if (testPhone(this.form.contact_way)) {
                //     warning("手机号码无效!", this);
                //     return;
                //
                // }

                if (checksum(this.form.full_name) > 250) {
                    warning("企业名称长度不可以超过250字符!", this);
                    return;

                }
                // if (!this.ValidateEmail(this.form.email)) {
                //     warning("请输入正确的邮箱地址!", this);
                //     return;
                // }

                if (!this.ValidatePhone(this.form.contact_way)) {
                    warning("联系方式无效!", this);
                    return;
                }
                if (!this.isChinaOrLett(this.form.linkman)) {
                    warning("联系人只能是汉字或英文!", this);
                    return;
                }
                if (isHasSpecChart(this.form.full_name || isHasSpecChart(this.form.short_name))) {
                    warning("全称或简称不可包含特殊字符", this);
                    return;
                }

                if (this.form.email && !testEmail(this.form.email)) {
                    warning("邮箱格式不正确", this);
                    return;

                }

                if (!checkUrl(this.form.formal_request)) {
                    warning("请输入有效网址!", this);
                    return;

                }

                if (checksum(this.form.formal_request) > 250) {
                    warning("正式请求地址长度不可以超过250字符!", this);
                    return;

                }

                if (!checkUrl(this.form.test_request)) {
                    warning("请输入有效网址!", this);
                    return;

                }

                if (checksum(this.form.test_request) > 250) {
                    warning("测试请求地址长度不可以超过250字符!", this);
                    return;

                }

                let fileData = new FormData();
                fileData.append("full_name", this.form.full_name);
                fileData.append("short_name", this.form.short_name);
                if (this.form.file) {
                    fileData.append("file", this.form.file);
                }
                fileData.append("linkman", this.form.linkman);
                fileData.append("contact_way", this.form.contact_way);
                fileData.append("email", this.form.email);
                fileData.append("token", this.form.token);
                fileData.append("address", this.form.address);

                fileData.append("flag", this.form.flag ? 1 : 2);
                fileData.append("demand_sideid", this.form.demand_sideid);
                fileData.append("price_key", this.form.price_key);
                fileData.append("formal_request", this.form.formal_request);
                fileData.append("test_request", this.form.test_request);

                if (this.$route.params.id) {

                    fileData.append("id", this.$route.params.id);

                    flow.editFlow(this.header, fileData).then(res => {
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

                } else {

                    flow.addFlow(this.header, fileData).then(res => {
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

            }

        },
        goBack() {
            this.$router.go(-1);

        },
        changStatus() {},

        async initForm(val) {
            const getData = await flow.getFlowItem(this.header, {
                id: val
            });
            const [data] = await Promise.all([getData]);

            let item = data.data.data;
            this.form = {
                full_name: item.full_name, //企业名称
                short_name: item.short_name, //简称
                file: "", //logo
                linkman: item.linkman, //联系人
                contact_way: item.contact_way, //联系方式
                email: item.email,
                token: item.token,
                address: item.address, //公司地址
                flag: item.flag == 1 ? true : false, //状态
                demand_sideid: item.demand_sideid, //需求方ID
                price_key: item.price_key, //价格秘钥
                formal_request: item.formal_request, //正式
                test_request: item.test_request //测试

            }
            this.logofile = item.name_logo;
        }

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        if (this.$route.params.id) {
            this.initForm(this.$route.params.id);
        } else {
            flow.getVerificationMessage(this.header).then(res => {

                let data = res.data.data;
                this.form.demand_sideid = data.demand_sideid;
                this.form.token = data.token;
                this.form.price_key = data.price_key;

            });
        }

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

.custome-create {

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
        padding: 20px 0 20px 30px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 30px 30px;
    }

    // upload button common margin left
    // single row
    .create-row {
        margin-bottom: 13px;

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

    // customer authority different data-item
    .customer-authority-wrap {
        .data-item {
            width: 86px;
            margin: 0;
        }

        .unit {
            @include bottomRightRadius(5px);
            @include topRightRadius(5px);
        }
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
        width: 114px;
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

    // important tip
    .tips-important {
        display: inline-block;
        @include svgbg("../../../style/image/creative/tips-important.svg");
        height: 24px;
        width: 24px;
        vertical-align: -7px;
        margin-left: 11px;
        @include transX(180deg);
    }

    // 资质文件
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

    // account dispatch module start
    .account-search-wrap {
        width: 300px;

        .el-input {
            width: 100%;
        }

        .account-search-bd {
            height: 360px;
            border: 1px solid #e1e7f0;
            @include bottomLeftRadius(5px);
            @include bottomRightRadius(5px);
            border-top: 0 none;
        }

        // input search remove bottom radius
        .el-input__inner {
            @include bottomLeftRadius(0);
            @include bottomRightRadius(0);
        }

        .el-checkbox__label {
            @include sc(12px, #bdbecd);
        }

        .is-checked+.el-checkbox__label {
            @include sc(12px, #515974);
        }
    }

    // search each item
    .search-item {
        height: 36px;
        line-height: 36px;
        padding: 0 20px;

        &:hover,
        &.active {
            background-color: #f6f8fa;
        }
    }

    // all remove
    .account-list {
        margin-left: 338px;
        position: relative;
        border: 1px solid #e1e7f0;
        width: 300px;
        @include borderRadius(5px);

        .turn-iron {
            @include svgbg("../../../style/image/put/turn.svg");
            width: 20px;
            height: 17px;
            position: absolute;
            top: 50%;
            margin-top: -8px;
            left: -30px;
        }

        .inferior-hd {
            padding: 11px 0 9px 18px;
            font-size: 12px;
            color: #e95058;
            border-bottom: 1px solid #e1e7f0;
            cursor: pointer;
        }

        .account-clear-bd {
            height: 360px;
        }

        .search-item {
            padding: 0 15px 0 19px;
        }

        .account-name {
            @include sc(12px, #7f8599);
        }

        .account-delete {
            color: #515974;
            float: right;
            cursor: pointer;
        }
    }

    // account dispatch module end
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
}
</style>
