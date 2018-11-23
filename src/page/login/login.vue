<template>
    <div class="login-content">
        <div class="logo_box animated rollIn">
        </div>
        <div class="ad_register">
            <h1 id="system_title" class="system_title   animated zoomIn  "><label class="hvr-bounce-in">流量交易系统 V1.0</label></h1>
            <hr <span class=""></span>
            <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px">
                <el-form-item label="" prop="name">
                    <el-input placeholder="帐 号" v-model="loginForm.name" auto-complete="on" class="name animated fadeInLeft">
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input placeholder="密 码" type="password" v-model="loginForm.pass" auto-complete="on" @keyup.enter.native="submitForm('loginForm')" class="password animated fadeInRight"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="login animated fadeInUp">登录</el-button>
            </el-form>
            <p class="pass_box">
                <a href="javascript:;" class="get_passw forget-pws animated fadeInUp">忘记密码</a>
            </p>
        </div>
        <p class="copy_txt animated fadeInUp">copy Copyright 2008-2016 All Rights Reserved 科达股份集团有限公司</p>
    </div>
</template>

<script>
import axios from "../../common/axios";
import {
    mapState,
    mapActions
} from "vuex";
import {
    login
} from "../../service/index";
import store from "store";
import {
    RSAencrypt
} from "../../common/utils";
// import {
//   Base64
// } from 'js-base64';
let Base64 = require("base64-utf8");
export default {
    beforeCreate: function () {
        document.getElementsByTagName("body")[0].className = "bg-active";
    },
    beforeDestroy: function () {
        document.body.removeAttribute("class", "bg-active");
    },
    data() {
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("姓名不能为空"));
            } else {
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            loginForm: {
                pass: "",
                name: ""
            },
            rules2: {
                pass: [{
                    validator: validatePass,
                    trigger: "blur"
                }],
                name: [{
                    validator: validateName,
                    trigger: "blur"
                }]
            },
            customizeClass: "active"
        };
    },
    mounted() {
        if (store.get("user")) {
            this.loginForm.name = store.get("user").email;
        }
    },
    components: {
        // headTop
    },
    computed: {
        ...mapState({
            currentuser: "currentuser"
        })
    },
    methods: {
        ...mapActions([
            "doLogin",
            "setDefaultOpends",
            "getSideBar",
            "getPublickKeyAciton",
            "getCurrentUser",
            "setHeader"
        ]),
        getMenuData(data, val) {
            return _.compact(_.map(data, item => {

                if (item.pid == val) {
                    return {
                        icon: item.icon,
                        name: item.name,
                        path: item.route_name,
                        id: item.id,
                        pid: item.pid,
                        chiled: this.getMenuData(data, item.id)

                    }
                }

            }));

        },

        loginSystem(val) {
            login
                .login({}, {
                    email: this.loginForm.name,
                    password: this.loginForm.pass
                })
                .then(res => {
                    if (res.data.success) {
                        let data = res.data;
                        store.clearAll();

                        store.set("sidebar", JSON.stringify(data.data));

                        store.set("token", res.data.token);
                        store.set("userId", res.data.userId);
                        this.setHeader({
                            token: res.data.token,
                            userId: res.data.userId
                        });


                        let menu = _.filter(_.compact(this.getMenuData(data.data, 0)), item => {
                            return item.id != 49 && item.id != 37 && item.id != 44

                        });

                        console.log(menu);

                        this.$router.push({
                            path: "/" + menu[0].chiled[0].path
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                });
        },
        submitForm(formName) {
            //清除缓存数据
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // login.getPublickKey().then(res => {
                    //     store.set("publicKey", res.data);
                    //     console.log(store.get("publicKey"));
                    //     let val = RSAencrypt(res.data, JSON.stringify({
                    //         username: this.loginForm.name,
                    //         pasw: this.loginForm.pass
                    //     }), this);
                    // });
                    this.loginSystem();
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import "../../style/mixin";
@import "../../style/common"; // 只针对Login页面的body添加的背景className

// 只针对Login页面的body添加的背景className
.bg-active {
    background: url("../../style/image/login/login_bg.jpg") no-repeat center;
    background-size: "1920px 1080px";
}

.login-content {
    width: 100%;

    .el-form-item__content {
        margin-left: 0 !important;
    }

    // 修改chrome浏览器自带填充表单功能默认样式
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
    }

    .el-input__inner {
        width: 300px;
        text-align: center;
        color: #bcbcbc;
        background-color: transparent !important;
    }

    .el-button {
        span {
            color: #fff;
            letter-spacing: 2.6px;
        }
    }

    .logo_box {
        position: absolute;
        top: 40px;
        left: 60px;
        background-image: url("../../style/image/login/logo.svg");
        background-size: 100% 100%;
        width: 148px;
        height: 61px;
    }

    .ad_register {
        width: 305px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -150px 0 0 -150px;

        hr {
            border: 1px solid #007ee5;
            width: 60px;
            margin: 17px auto 31px;
        }
    }

    .el-button,
    .el-input {
        margin: 0 0 0 3px;
        float: left;
    }

    .el-button {
        display: block;
        width: 300px;
        background-color: #1968de;
        border-color: #1968de;

        &:hover {
            background-color: #1660cf;
            border-color: #1660cf;
        }
    }

    .get_passw {
        font-size: 14px;
        float: left;
        color: $fc;
        margin: 20px 0 0 128px;
        font-family: "微软雅黑";
    }

    .system_title {
        font-size: 26px;
        font-weight: normal;
        color: $fc;
        letter-spacing: 2.6px;
    }

    .pass_box {
        text-align: center;
    }

    .copy_txt {
        font-size: 14px;
        font-family: "微软雅黑";
        position: absolute;
        bottom: 20px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        color: $fc;
    }

    #system_title {
        animation-duration: 1s;
        animation-delay: 0s; // animation-iteration-count: infinite;
        animation-iteration-count: 1;
    }

    .name {
        animation-duration: 0.7s;
        animation-delay: 1.1s;
    }

    .password {
        animation-duration: 0.6s;
        animation-delay: 1.1s;
    }

    .login {
        animation-duration: 0.6s;
        animation-delay: 1.7s;
    }

    .forget-pws {
        animation-duration: 0.5s;
        animation-delay: 2.3s;
    }

    .copy_txt {
        animation-duration: 0.5s;
        animation-delay: 2.8s;
    }

    .logo_box {
        animation-duration: 0.5s;
        animation-delay: 3.3s;
    }
}
</style>
