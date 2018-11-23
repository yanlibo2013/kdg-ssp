<template>
    <div class="create-edit-account">
        <el-main>
            <!-- 个人信息 start -->
            <el-col :span="24">
                <div class="up-ingredient">
                    <el-form>
                        <el-col :span="24" class="margin-bottom-20 border-bottom-2">
                            <h1 class="template-hd">基本设置</h1>
                            <div class="base-bd">
                                <!-- 帐户： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">帐户：</label>
                                    <el-input placeholder="请输入账户" v-model="form.account"></el-input>
                                </div>
                                <!-- 帐户： end -->
                                <!-- 原始密码： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">密码：</label>
                                    <el-input type="password" placeholder="请输入密码" v-model="form.oldPassw"></el-input>
                                </div>
                                <!-- 原始密码： end -->
                                <!-- 新密码： start -->
                                <!-- <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">新密码：</label>
                                    <el-input type="password" placeholder="2到64个文字，不输入表示不修改密码" v-model="form.newPassw"></el-input>
                                    <i class="el-see-password"></i>
                                </div> -->
                                <!-- 新密码： end -->
                                <!-- 确认密码： start -->
                                <!-- <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">确认密码：</label>
                                    <el-input type="password" placeholder="2到64个文字，不输入表示不修改密码" v-model="form.confirmPassw"></el-input>
                                    <i class="el-see-password"></i>
                                </div> -->
                                <!-- 确认密码： end -->
                                <!-- 姓名： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">Email：</label>
                                    <el-input placeholder="请输入Email" v-model="form.email"></el-input>
                                </div>
                                <!-- 姓名： end -->
                                <!-- 联系电话： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item ">联系电话：</label>
                                    <el-input class="" placeholder="请输入联系电话" v-model="form.phone">
                                    </el-input>
                                </div>
                                <!-- 联系电话： end -->
                            </div>
                        </el-col>
                        <el-col :span="24" class="border-bottom-2">
                            <p class="template-hd">角色</p>
                            <div class="base-bd">
                                <div class="basic-set-row">
                                    <label class="data-item">角色名称：</label>
                                    <el-select class="rolename" v-model="role" placeholder="请选择角色" multiple>
                                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>

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
                </div>

            </el-col>
        </el-main>
    </div>
</template>

<script>
import {
    permission,
    common
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import {
    callback,
    testPhone,
    testEmail,
    warning,
    validateForm
} from "../../../common/utils.js";
import store from 'store';
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
            adUser: "",
            pageList: [],

            optionsRole: [],
            banValue: [],
            banList: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"
            ],

            form: {
                name: "",
                oldPassw: "",
                newPassw: "",
                account: "",
                phone: "",
                role: [],
                confirmPassw: "",
                flag: ""
            },
            role: [],

            roleList: []
        }
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
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
            // this.getList({
            //     page: 1,
            //     pagesize: this.pageSize,
            // });
        },
        handleCurrentChange(val) {
            //创意列表
            // this.getList({
            //     page: val,
            //     pagesize: this.pageSize,
            // });

            this.currentPage = val;
        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.optionsBan = this.banList.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 100);
            } else {
                this.optionsBan = [];
            }
        },
        onSubmit() {

            let isValidateForm = validateForm([{
                    key: this.form.account,
                    value: "请填写账户!"
                }, {
                    key: this.form.oldPassw,
                    value: "请填写密码!!"
                }
                // , {
                //     key: this.form.newPassw,
                //     value: "请填写新密码!"
                // }, {
                //     key: this.form.confirmPassw,
                //     value: "请确认密码!"
                // }
                , {
                    key: this.form.email,
                    value: "请填写Email!"
                }, {
                    key: this.form.phone,
                    value: "请填写联系方式!"
                }
                // , {
                //     key: this.form.role,
                //     value: "请填写角色!"
                // }
            ], this);

            if (isValidateForm) {
                if (!testEmail(this.form.email)) {
                    isValidateForm = false;
                    warning("请填写有效的邮箱地址", this);
                } else if (testPhone(this.form.phone)) {
                    isValidateForm = false;
                    warning("请填写11位数字的电话号码", this);
                }
            }

            if (isValidateForm) {

                // if (this.form.newPassw != this.form.confirmPassw) {
                //     this.$message({
                //         message: "两次输入密码不一致",
                //         type: "warning"
                //     });
                //     return;
                // }

                if (this.$route.params.id) {
                    permission.modifyAccount(this.header, {
                        id: this.$route.params.id,
                        name: this.form.account,
                        email: this.form.email,
                        password: this.form.oldPassw,
                        tel: this.form.phone,
                        role_id: this.role.toString(),
                        flag: this.form.flag
                    }).then(res => {
                        callback(res.data, () => {
                            this.$router.go(-1);
                        }, this);
                    });

                } else {
                    permission.addAccount(this.header, {
                        //   id: this.$route.id,
                        name: this.form.account,
                        email: this.form.email,
                        password: this.form.oldPassw,
                        tel: this.form.phone,
                        role_id: this.role.toString()
                    }).then(res => {
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

    },
    mounted() {

        this.setBreadCrumb(this.$route.path.replace("/", ""));

        common.getRoleList(this.header).then(res => {
            if (res.data.data && res.data.data.code == "401") {
                this.$switchLogin("", this);
                return;
            }
            if (res.data.data && res.data.data.code == "402") {
                this.$message(res.data.data.error);
                return;
            }
            this.roleList = res.data.data;
            // callback(res.data, () => {
            //     this.roleList = res.data.data;
            // }, this);

        });

        if (this.$route.params.id) {

            permission.getAccounItem(this.header, {
                id: this.$route.params.id
            }).then(res => {

                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                // 

                let data = res.data.data;
                this.form = {
                    account: data.name,
                    oldPassw: data.password,
                    // newPassw: "",
                    // account: "",
                    phone: data.tel,
                    role: data.role_id.split(","),
                    // confirmPassw: ""
                    email: data.email,
                    flag: data.flag
                };
                this.role = _.map(data.role_id.split(","), val => {
                    return parseInt(val)

                });

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

.create-edit-account {

    .template-hd,
    .base-bd {
        background-color: #fff;
    }

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .template-hd {
        padding: 20px 0 18px 30px;
        font-size: 16px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 20px 30px;
    }

    // single row
    .basic-set-row {
        margin-bottom: 13px;

        &:last-child {
            margin-bottom: 0;
        }

        .el-input {
            width: 240px;
        }

        .el-checkbox__label {
            @include sc(12px, $firstc);
        }

        .sibling-elem {
            margin: 10px 0 0 119px;
        }

        .el-checkbox {
            width: 105px;
        }

        .el-checkbox+.el-checkbox {
            margin: 0 20px 0 0;
        }

        //eye style
        .el-see-password {
            @include svgbg("../../../style/image/system/seeye.svg");
            display: inline-block;
            width: 20px;
            height: 16px;
            margin-left: 6px;
            vertical-align: -2px;
        }
    }

    // single row title
    .data-item {
        color: $firstc;
        width: 70px;
        display: inline-block;
    }

    // need user to fill tip
    .item-needed {
        color: $redc;
        width: 7px;
        margin-right: 7px;
        vertical-align: -2px;
    }

    // confirm and cancel
    .is-confirm {
        padding-left: 30px;
    }
}
</style>
