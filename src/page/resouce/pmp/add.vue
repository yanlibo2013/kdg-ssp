<template>
    <div class="custome-create">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <el-col :span="24" class="margin-bottom-10 border-bottom-2">
                    <h1 class="template-hd">基本设置</h1>
                    <div class="base-bd">
                        <!-- 企业全称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>PMP名称</label>
                            <el-input placeholder="请输入PMP名称" v-model="form.name"></el-input>
                        </div>
                        <!-- 企业全称： end -->
                        <!-- 企业简称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>Deal ID：</label>
                            <el-input placeholder="请输入Deal ID" v-model="form.id"></el-input>
                        </div>
                        <!-- 企业简称： end -->

                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>平台：</label>
                            <el-select class="filter-input" v-model="form.plat" placeholder="全部">
                                <el-option v-for="(item,index) in demandList" :key="index" :label="item.value" :value="item.key">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="create-row" v-for="(item,index) in meadiaAdList" :key="index">
                            <label for="" class="data-item">{{meadiaAdList.length!=0&&index==0?"媒体-广告位:":""}}</label>

                            <label for="" class="data-item list-data-item ">

                                <div class="list-item" v-if="parseInt(item.media_name.length)<=5">{{item.media_name}}</div> 
                                <el-tooltip class="item" effect="dark" :content="item.media_name" placement="top" v-else>
                                     <div class="list-item">{{item.media_name}}</div>
                                    </el-tooltip>
                                <div class="list-item" v-if="parseInt(item.ad_name.length)<=5">{{item.ad_name}}</div>
                                 <el-tooltip class="item" effect="dark" :content="item.ad_name" placement="top" v-else>
                                     <div class="list-item">{{item.ad_name}}</div> 
                                    </el-tooltip>
                                <i class="el-icon-close icon-del" @click="del(index)"></i>
                                </label>
                        </div>

                        <div class="create-row">
                            <label for="" class="data-item">{{meadiaAdList.length==0?"媒体-广告位:":""}}</label>
                            <el-button @click="addOterTemp" class="el-input">
                                <span class="el-icon-plus"></span>
                            </el-button>
                        </div>
                        <!-- <div class="create-row">
                            <label for="" class="data-item">媒体名称:</label>
                            <el-input placeholder="请输入媒体名称" v-model="form.media_name"></el-input>
                        </div>
                        <div class="create-row">
                            <label for="" class="data-item">媒体包名:</label>
                            <el-input placeholder="请输入媒体包名" v-model="form.mediabag_name"></el-input>
                        </div>
                        <div class="create-row">
                            <label for="" class="data-item">广告名称:</label>
                            <el-input placeholder="请输入广告名称" v-model="form.ad_name"></el-input>
                        </div>
                        <div class="create-row">
                            <label for="" class="data-item">广告位ID:</label>
                            <el-input placeholder="请输入广告位ID" v-model="form.ad_id"></el-input>
                        </div> -->
                        <div class="create-row">
                            <label for="" class="data-item">结算类型:</label>
                            <el-radio-group v-model="form.type">
                                <el-radio :label="1">CPM</el-radio>
                                <!-- <el-radio :label="2">CPC</el-radio> -->
                            </el-radio-group>
                        </div>
                        <div class="create-row">
                            <label for="" class="data-item">虚拟金额:</label>
                            <el-input placeholder="请输入虚拟金额" v-model.number="form.virtual_money"></el-input>
                        </div>
                    </div>
                </el-col>

                <el-col :span="24" class="margin-bottom-20">
                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                        <el-button type="cancel" @click="goBack">取消</el-button>
                    </div>
                </el-col>
            </el-form>

            <el-dialog title="添加媒体-广告位" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-form :model="formDialog" ref="formDialog">
                    <el-form-item label="媒体名称" :label-width="formLabelWidth" :rules="[
      { required: true, message: '媒体名称', trigger: 'blur' }
    ]" prop="media_name">
                        <el-input v-model="formDialog.media_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体包名" :label-width="formLabelWidth" :rules="[
      { required: true, message: '媒体包名', trigger: 'blur' }
    ]" prop="mediabag_name">
                        <el-input v-model="formDialog.mediabag_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位名称" :label-width="formLabelWidth" :rules="[
      { required: true, message: '广告位名称', trigger: 'blur' }
    ]" prop="ad_name">
                        <el-input v-model="formDialog.ad_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="广告位ID" :label-width="formLabelWidth" :rules="[
      { required: true, message: '广告位ID', trigger: 'blur' }
    ]" prop="ad_id">
                        <el-input v-model="formDialog.ad_id" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="dialogSubmit('formDialog',{
                media_name: formDialog.media_name,
                ad_name: formDialog.ad_name,
                mediabag_name: formDialog.mediabag_name,
                ad_id: formDialog.ad_id
            })">确 定</el-button>
  </span>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
import {
    common,
    resource
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
    mitulineHide,
    getStringLength
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            meadiaAdList: [],
            dialogVisible: false,
            formLabelWidth: "120px",
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
                name: "",
                id: "",
                plat: "",
                media_name: "",
                mediabag_name: "",
                ad_name: "",
                ad_id: "",
                type: "",
                virtual_money: ""
            },
            demandList: [],
            meadiaData: [],
            formDialog: {
                media_name: "",
                ad_name: "",
                mediabag_name: "",
                ad_id: ""

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
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            this.dialogVisible = false;
            this.resetForm("formDialog");
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        dialogSubmit(formName, data) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.meadiaAdList.push(data);
                    this.dialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        addOterTemp() {

            this.dialogVisible = true;
            this.formDialog = {
                media_name: "",
                ad_name: "",
                mediabag_name: "",
                ad_id: ""

            };

        },
        isCheck(val) {
            let result = isHasSpecChart(val);

            console.log(result);
            if (result) {
                warning("全称或简称不可包含特殊字符!", this)
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
        searchDataByName() {},
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {

            this.currentPage = val;
        },
        getStringLength(val) {
            // console.log(this.getStringLength(val));
            return this.getStringLength(val);

        },
        onSubmit() {

            let isValidateForm = validateForm([{
                    key: this.form.name,
                    value: "请输入PMP名称!"
                },
                {
                    key: this.form.id,
                    value: "请输入Deal ID"
                }, {
                    key: this.form.plat,
                    value: "请选择平台!"
                }
                // , {
                //     //key: _.isNumber(this.form.virtual_money),
                //     key: this.form.virtual_money,
                //     value: "金额必须是数字类型!"
                // }
            ], this);

            if (isValidateForm) {

                if (isHasSpecChart(this.form.full_name || isHasSpecChart(this.form.short_name))) {
                    warning("全称或简称不可包含特殊字符", this);
                    return;
                }

                if (this.form.virtual_money && !_.isNumber(this.form.virtual_money)) {
                    warning("金额必须是数字类型!", this);
                    return;

                }

                if (this.form.virtual_money && this.form.virtual_money <= 0) {
                    warning("金额必须是正数!", this);
                    return;

                }

                if (this.$route.params.id) {
                    resource.editPmp(this.header, {
                        name: this.form.name,
                        deal_id: this.form.id,
                        plant_id: this.form.plat,
                        media_name: this.form.media_name,
                        mediabag_name: this.form.mediabag_name,
                        ad_name: this.form.ad_name,
                        ad_id: this.form.ad_id,
                        type: this.form.type,
                        virtual_money: this.form.virtual_money,
                        id: this.$route.params.id,
                        pmpMediaAdLists: this.meadiaAdList
                    }).then(res => {
                        callback(res.data, () => {
                            this.$router.go(-1);
                        }, this);
                    });

                } else {

                    resource.addPmp(this.header, {
                        name: this.form.name,
                        deal_id: this.form.id,
                        plant_id: this.form.plat,
                        // media_name: this.form.media_name,
                        // mediabag_name: this.form.mediabag_name,
                        // ad_name: this.form.ad_name,
                        // ad_id: this.form.ad_id,
                        type: this.form.type,
                        virtual_money: this.form.virtual_money,
                        pmpMediaAdLists: this.meadiaAdList
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

            }

        },
        del(val) {
            this.meadiaAdList.splice(val, 1);

        },
        goBack() {
            this.$router.go(-1);

        },
        changStatus() {},

        async initForm(val) {

            const getData = await resource.getItemPmp(this.header, {
                id: val
            });

            const [data] = await Promise.all([getData]);

            let item = data.data.data;
            this.form = {
                name: item.name, //企业名称
                id: item.deal_id, //简称
                plat: item.plant_id, //logo
                media_name: item.media_name,
                mediabag_name: item.mediabag_name,
                ad_name: item.ad_name,
                ad_id: item.ad_id,
                type: parseInt(item.type),
                virtual_money: item.virtual_money,

            }
            this.meadiaAdList = item.pmpMediaAdLists;

            // media_name: this.form.media_name,
            // mediabag_name: this.form.mediabag_name,
            // ad_name: this.form.ad_name,
            // ad_id: this.form.ad_id,
            // type: this.form.type,
            // virtual_money: this.form.virtual_money
        }

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        if (this.$route.params.id) {
            this.initForm(this.$route.params.id);
        }

        common.getPlatFormList(this.header).then(res => {
            if (res.data.data && res.data.data.code == "401") {
                this.$switchLogin("", this);
                return;
            }
            if (res.data.data && res.data.data.code == "402") {
                this.$message(res.data.data.error);
                return;
            }

            let data = _.map(res.data.data, val => {
                return {
                    value: val.name,
                    key: val.id
                }
            });

            this.demandList = data;

        });

        // console.log("==============================");
        // //console.log(this.$refs.meadiaText);
        // console.log(document.getElementById("meadiaText"));
        // mitulineHide(2, document.getElementById("meadiaText"));

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

    .el-dialog__header {
        border-bottom: 1px solid #E1E7F0;
    }

    // background color set
    .el-main {
        background: transparent;
    }

    .list-item {
        display: inline-block;
        width: 100px;
        padding: 0 5px;
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px double #E1E7F0;

        // margin-right: 1px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .icon-del {
        position: absolute;
        right: 11px;
        top: 30%;
        display: none
    }

    .list-data-item:hover {
        background: #F6F8FA;
        // border: 1px double #E1E7F0;

        .icon-del {
            display: block;
        }
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
        margin-left: 5px
    }

    .list-data-item {
        width: 240px;
        position: relative;
        /* padding: 0 5px; */
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
