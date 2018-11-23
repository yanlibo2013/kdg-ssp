<template>
    <div>
        <!-- <div v-show="isFixedHeader" class="fixedHeader" :style="{'width':bodywidth}">fixedHeader</div> -->
        <el-header>
            <div class="path left" ref="myheader">
                <template v-for="item in currentbreadcrumb">
                    <template v-if="!item.last">
                        <router-link :to="item.path" :key="item.id">{{item.title}}</router-link>
                        <i class="path-split el-icon-arrow-right" :key="item.title"></i>
                    </template>
                    <template v-else>
                        <span class="hd-title" :key="item.id">{{item.title}}</span>
                    </template>
                </template>
            </div>

            <div class="hd-bd">

                <span v-show="setIshowCustome" class="seperate-line"></span>
                <span class="register-name">{{currentuser&& currentuser.name}}</span>
                <div class="register-image"></div>
                <i class="down_arrow_white" @click="switchOut"></i>
                <ul class="individual-menu" v-show="isShowOut">
                    <li>
                        <a href="javascript:;" class="person-item">
                        <i class="el-icon-password"></i>
                        修改密码
                    </a>
                    </li>
                    <li>
                        <a href="javascript:;" class="person-item">
                        <i class="el-icon-check"></i>
                        审核文档
                    </a>
                    </li>
                    <li>
                        <a href="javascript:;" class="person-item">
                        <i class="el-icon-linehelp"></i>
                        在线帮助
                    </a>
                    </li>
                    <li class="exit-item" @click="loginoutFn">
                        <a href="javascript:;" class="person-item">
                        <i class="el-icon-exit"></i>
                        退出
                    </a>
                    </li>
                </ul>
                <!-- <em 
            v-show="isShowOut"
            @click="loginoutFn"
            class="loginout"
            >退出</em> -->

            </div>
        </el-header>
    </div>
</template>

<script>
import {
    login
} from "../../service/index";
import {
    setCookie,
    getCookie,
    delCookie,
    getElementTopLeft,
    getScrollTop
} from "../../common/utils";
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import custome from "../common/custome"
export default {
    data: function () {
        return {
            isShowOut: false,
            isShowCustome: false,
            isFixedHeader: false,
            bodywidth: ""
        }
    },
    components: {
        custome
    },
    computed: {
        ...mapState({
            currentuser: "currentuser",
            currentbreadcrumb: "currentbreadcrumb"
        }),

        setIshowCustome() {

            if (this.$route.path.replace("/", "") == "home" || this.$route.path.replace("/", "") == "config" || this.$route.path.replace("/", "").indexOf("plantable/") == 0 || this.$route.path.replace("/", "").indexOf("relation/") == 0 || this.$route.path.replace("/", "").indexOf("editplan/") == 0 || this.$route.path.replace("/", "").indexOf("createplan/") == 0) {
                return this.isShowCustome = true
            } else {
                return this.isShowCustome = false;
            }
        }
    },
    methods: {
        //   ...mapActions(["setBreadCrumb"]),
        switchOut() {
            this.isShowOut = !this.isShowOut
        },
        loginoutFn() { //退出按钮
            this.$router.push("/login");
            // let that = this;
            // login.doLoginOut().then(res => {
            //     if (res.data.code == 0) {
            //         delCookie("token");
            //         that.$router.push({
            //             path: '/login',
            //         });
            //     }

            //     if (res.data.code == -1) {
            //         this.$router.push({
            //             path: "/login"
            //         });
            //     }
            // });
            // this.isShowOut = false;
        }

    },
    created() {
        // 点击其他不在的区域触发事件
        document.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.isShowOut = false;
            }
        })
    },
    mounted() {

    }
};
</script>     

<style lang="scss">
@import '../../style/mixin'; // header common style

.fixedHeader {
    position: fixed;
    background-color: $fc !important;
    padding: 0 30px !important; // position: fixed;
    height: 72px !important;
    line-height: 72px !important;
    border-bottom: 2px solid #e1e7f0;
    top: 0;
    left: 220px;
    z-index: 1002;
    width: 100%;
}

.el-header {
    background-color: $fc !important;
    padding: 0 30px !important; // position: fixed;
    // z-index: 300;
    // width: 100%;
    // margin-left: -220px;
    // padding: 0 30px 0 250px!important;
    height: 72px !important;
    line-height: 72px !important;
    border-bottom: 2px solid #e1e7f0;
    position: absolute;
    top: 0;
    left: 220px;
    width: calc(100% - 222px);
    z-index: 1002;

    .hd-title {
        @include sc(18px, #515974);
        font-weight: bold;
    }

    // right role style
    .hd-bd {
        position: relative;

        .el-select {
            position: absolute;
            width: 460px;
            right: 155px;
            margin-right: 16px;

            .el-select__caret {
                line-height: 38px;
                vertical-align: 15px;
            }

            .el-input__inner {
                padding-right: 62px;
                text-align: right;
            }
        }

        .el-input__inner {
            font-size: 18px;
            border-color: #fff !important;
            padding-left: 0 !important;
        }

        .el-input__suffix {
            height: 38px;
            width: 38px;
            border-radius: 5px;
            border: 1px solid #e1e7f0;
            top: 16px;
        }

        .register-image {
            @include svgbg("../../style/image/role/role_men_on.svg");
            width: 46px;
            height: 46px;
            position: absolute;
            right: 32px;
            top: 13px;
        }

        .seperate-line {
            position: absolute;
            right: 154px;
            top: 17px;
            border-left: 1px solid #e1e7f0;
            height: 37px;
        }

        .register-name {
            @include sc(14px, #515974);
            position: absolute;
            right: 94px;
            top: 15px;
            line-height: 38px;
            padding-left: 20px;
        }

        .down_arrow_white {
            cursor: pointer;
            @include svgbg("../../style/image/common/down_arrow_gray.svg");
            width: 14px;
            height: 7px;
            position: absolute;
            right: 0;
            top: 30px;
        }

        // .loginout{
        //     position: absolute;
        //     right: 0px;
        //     top: 44px;
        //     font-size: 12px;
        //     border: 1px solid #6cabff; 
        //     font-style: normal;
        //     padding: 0px 26px;
        //     line-height: 30px;
        //     cursor: pointer;
        //     border-radius: 5px;
        //  }
        //  .loginout:hover{
        //     text-decoration: underline;
        //     color:#6cabff;
        //  }
        //  个人菜单
        .individual-menu {
            position: absolute;
            top: 61px;
            right: -1px;
            z-index: 1000;
            background-color: #fff;
            border: 1px solid #f3f3f3;
            border-top: 0 none;
            padding-top: 15px;
            width: 180px;
            -webkit-box-shadow: 0 2px 4px 0 rgba(7, 17, 27, .06);
            -moz-box-shadow: 0 2px 4px 0 rgba(7, 17, 27, .06);
            box-shadow: 0 2px 4px 0 rgba(7, 17, 27, .06);
            @include bottomRightRadius(5px);
            @include bottomLeftRadius(5px);

            li {
                line-height: 36px;
                height: 36px;
            }

            a {
                padding-left: 16px;
                display: block;
                @include sc(14px, #595959);

                &:hover {
                    background-color: #c2dcff;
                }
            }

            .exit-item {
                border-top: 2px solid #f3f3f3;
                line-height: 55px;
                height: 55px;
                margin-top: 7px;
            }

            [class^="el-icon-"] {
                width: 14px;
                height: 14px;
                vertical-align: -2px;
                margin-right: 3px;
            }

            .el-icon-password {
                @include svgbg("../../style/image/common/password.svg");
            }

            .el-icon-check {
                @include svgbg("../../style/image/common/check.svg");
            }

            .el-icon-linehelp {
                @include svgbg("../../style/image/common/linehelp.svg");
            }

            .el-icon-exit {
                @include svgbg("../../style/image/common/exit.svg");
            }
        }
    }

    // bread crumb row
    .path {
        height: 72px;
        line-height: 72px;

        a,
        i {
            @include sc(18px, #a5a6bb);
            float: left;
        }

        a:hover {
            color: #515974;
        }

        .router-link-active:hover {
            color: #a5a6bb;
        }

        i {
            margin: 0 10px;
            line-height: 72px;
        }

        span {
            vertical-align: top;
        }
    }
}
</style>
