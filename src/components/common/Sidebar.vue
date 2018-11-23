<template>
    <div class="sidebar innerbox">
        <el-aside>
            <div class="logo_box">
                <div class="logo">
                </div>
                <span class="navindent right"></span>
            </div>
            <div class="menuBox">
                <el-menu :default-active="onRoutes" class="self-menu" :router="true" :default-openeds="defaultOpeneds" @select="selectMenu" @open="menuOpen" ref="menuRef">
                    <template v-for="item in items">
                        <template v-if="item.chiled">
                            <el-submenu :index="item.id.toString()" :key="item.id.toString()">
                                <template slot="title">
                                    <i :class="item.icon"></i>{{ item.name }}
                                </template>
                                <el-menu-item v-for="(subItem,i) in item.chiled" :key="i" :index="subItem.path" :route='{ path: "/"+subItem.path }' @click="activeMenu">{{ subItem.name }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.path" :route='{ path: "/"+subItem.path }' :key="item.id.toString()">
                                <i :class="item.icon"></i>{{ item.n }}

                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
        </el-aside>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    setCookie,
    getCookie,
    delCookie
} from "../../common/utils";
import store from 'store';
import _ from "lodash";
import {
    configPmp
} from '../../service/resource';
export default {
    mounted() {

        let data = JSON.parse(store.get("sidebar"));
        this.items = _.compact(this.getMenuData(data, 0));
        // this.items = _.filter(_.compact(this.getMenuData(data, 0)), item => {
        //     return item.id != 49 && item.id != 37 && item.id != 44

        // });

        // console.log(this.items);

    },
    data: function () {
        return {
            activeSubMenuIndex: "49",
            menuIndex: '',
            items: []

            // items: [{
            //         "name": "资源管理",
            //         "icon": "el-icon-resourcemanage",
            //         "path": null,
            //         "id": 1,
            //         "pid": 0,
            //         "chiled": [{
            //             "name": "资源明细",
            //             "icon": "",
            //             "path": "detail",
            //             "id": 60,
            //             "pid": 1,
            //             "chiled": [],

            //         }, {
            //             "name": "接入配置",
            //             "icon": "",
            //             "path": "config",
            //             "id": 61,
            //             "pid": 1,
            //             "chiled": [],

            //         }, {
            //             "name": "PMP配置",
            //             "icon": "",
            //             "path": "pmp",
            //             "id": 61,
            //             "pid": 1,
            //             "chiled": [],

            //         }]
            //     }, {
            //         "name": "流量设置",
            //         "icon": "el-icon-flowset",
            //         "path": null,
            //         "id": 2,
            //         "pid": 0,
            //         "chiled": [{
            //                 "name": "需求方管理",
            //                 "icon": null,
            //                 "path": "demand",
            //                 "id": 147,
            //                 "pid": 2,
            //                 "chiled": []
            //             }
            //             // , {
            //             //     "name": "反作弊管理",
            //             //     "icon": null,
            //             //     "path": "cheat",
            //             //     "id": 179,
            //             //     "pid": 2,
            //             //     "chiled": []
            //             // }
            //         ]
            //     }, {
            //         "name": "订单",
            //         "icon": "el-icon-order",
            //         "path": null,
            //         "id": 3,
            //         "pid": 0,
            //         "chiled": [{
            //                 "name": "资源推荐",
            //                 "icon": null,
            //                 "path": "resourse",
            //                 "id": 21,
            //                 "pid": 3,
            //                 "chiled": []

            //             },
            //             {
            //                 "name": "PD订单",
            //                 "icon": null,
            //                 "path": "pd",
            //                 "id": 24,
            //                 "pid": 3,
            //                 "chiled": []
            //             },
            //             // {
            //             //     "name": "GD订单",
            //             //     "icon": null,
            //             //     "path": "gd",
            //             //     "id": 25,
            //             //     "pid": 3,
            //             //     "chiled": []
            //             // },
            //         ]
            //     },
            //     {
            //         "name": "报表",
            //         "icon": "el-icon-report",
            //         "path": "",
            //         "id": 4,
            //         "pid": 0,
            //         "chiled": [{
            //                 "name": "竞价消耗报表",
            //                 "icon": null,
            //                 "path": "consumption",
            //                 "id": 36,
            //                 "pid": 4,
            //                 "chiled": []
            //             }
            //             // , {
            //             //     "name": "竞价失败分析",
            //             //     "icon": null,
            //             //     "path": "failure",
            //             //     "id": 37,
            //             //     "pid": 4,
            //             //     "chiled": []
            //             // }
            //         ]
            //     },
            //     {
            //         "name": "审核",
            //         "icon": "el-icon-audit",
            //         "path": null,
            //         "id": 5,
            //         "pid": 0,
            //         "chiled": [{
            //                 "name": "广告主审核",
            //                 "icon": null,
            //                 "path": "advertisers",
            //                 "id": 40,
            //                 "pid": 5,
            //                 "chiled": []
            //             }, {
            //                 "name": "创意素材审核",
            //                 "icon": null,
            //                 "path": "creative",
            //                 "id": 61,
            //                 "pid": 5,
            //                 "chiled": []
            //             },
            //             // {
            //             //     "name": "审核政绩管理",
            //             //     "icon": null,
            //             //     "path": "achievements",
            //             //     "id": 62,
            //             //     "pid": 5,
            //             //     "chiled": []
            //             // },
            //         ]
            //     },
            //     {
            //         "name": "财务",
            //         "icon": "el-icon-finance",
            //         "path": "",
            //         "id": 6,
            //         "pid": 0,
            //         "chiled": [{
            //                 "name": "财务信息",
            //                 "icon": null,
            //                 "path": "flowfinance",
            //                 "id": 37,
            //                 "pid": 4,
            //                 "chiled": []
            //             }
            //             // , {
            //             //     "name": "财务记录",
            //             //     "icon": null,
            //             //     "path": "recording",
            //             //     "id": 39,
            //             //     "pid": 4,
            //             //     "chiled": []
            //             // }
            //         ]
            //     },
            //     {
            //         "name": "系统配置",
            //         "icon": "el-icon-systemset",
            //         "path": "",
            //         "id": 7,
            //         "pid": 0,
            //         "chiled": [{
            //             "name": "权限管理",
            //             "icon": null,
            //             "path": "permission",
            //             "id": 31,
            //             "pid": 4,
            //             "chiled": []
            //         }]
            //     }
            // ]
        }
    },
    methods: {
        ...mapActions(["getSideBar", "setCurentTab"]),
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

        activeMenu() {

        },
        selectMenu(index, indexPath) {
            let arr = [49, 1, 2, 3, 42, 44, 37, 4];
            if (parseInt(index) !== parseInt(indexPath[0])) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] != parseInt(indexPath[0])) {
                        this.$refs["menuRef"].close((parseInt(arr[i])).toString());
                    }
                }
            }
            this.activeSubMenuIndex = indexPath[0];
            this.menuIndex = indexPath[0];
        },
        menuOpen(index, indexPath) {
            // console.log(index, indexPath);
            for (let i in this.items) {
                if (parseInt(index) !== parseInt(this.activeSubMenuIndex) &&
                    parseInt(index) !== parseInt(this.menuIndex)) {
                    if (this.menuIndex && (parseInt(this.menuIndex) !== parseInt(this.activeSubMenuIndex))) {
                        this.$refs["menuRef"].close((parseInt(this.menuIndex)).toString());
                    }
                    this.menuIndex = index;
                }
            }

        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    computed: {
        onRoutes() {
            // alert(this.$route.path);
            return this.$route.path.replace("/", "");
        },
        ...mapState({
            sidebar: "sidebar",
            currentbreadcrumb: "currentbreadcrumb",
            defaultOpeneds: "defaultOpeneds"
        })
    }
}
</script>

<style lang="scss">
@import "../../style/mixin";
@import "../../style/common"; // content background color

.container-wrap {
    overflow: hidden;
    background-color: #fbfbfb;
    height: 100% !important;

    .menuBox {
        padding-top: 72px;
        height: 100%;
    }

    .el-aside,
    .main-container {
        min-height: 200px;
        height: 100% !important;
        height: 200px;
    }

    .self-menu {
        height: 100%;
        overflow: hidden;
        overflow-y: visible;
        width: 238px;

        .el-submenu {
            width: 220px;
        }
    }

    .el-aside {
        position: relative;
        overflow: hidden;
    }

    .main-container {
        padding-top: 72px;
        margin-left: 220px;
        margin-bottom: -99999px;
        padding-bottom: 99999px;
    }

    // left large container
    .sidebar {
        background-color: #2f323a; // position: fixed;
        // z-index: 301;
        float: left;
        width: 220px !important;
        position: fixed;
    }

    .el-aside {
        width: 220px !important;

        .menubar {
            border-right: 0 none;
        }

        .logo_box {
            background-color: #2f323a;
            padding: 14px 0 14px 20px;
            border-bottom: 2px solid #181a1e;
            position: absolute;
            top: 0;
            left: 0;
            width: 220px;
            height: 72px;
        }

        .logo {
            @include svgbg("../../style/image/role/logo.svg");
            width: 100px;
            height: 42px;
        }

        .navindent {
            @include svgbg("../../style/image/common/navindent.svg");
            width: 20px;
            height: 18px;
            margin: -29px 25px 0 0;
            cursor: pointer;
        }

        // siderbar menu
        .el-menu {
            background-color: #2f323a !important;
            border-right: 0 none;
        }

        // menu small icon
        .el-icon-home,
        .el-icon-resourcemanage,
        .el-icon-finance,
        .el-icon-systemset,
        .el-icon-flowset,
        .el-icon-order,
        .el-icon-report,
        .el-icon-audit {
            width: 14px !important;
            height: 14px;
        }

        .el-submenu [class^="el-icon-"] {
            margin-right: 22px !important;
            vertical-align: -2px !important;
        }

        .el-icon-home {
            @include svgbg("../../style/image/common/home.svg");
        }

        .el-icon-resourcemanage {
            @include svgbg("../../style/image/common/resourcemanage.svg");
        }

        .el-icon-finance {
            @include svgbg("../../style/image/common/finance.svg");
        }

        .el-icon-systemset {
            @include svgbg("../../style/image/common/systemset.svg");
        }

        .el-icon-flowset {
            @include svgbg("../../style/image/common/flowset.svg");
        }

        .el-icon-order {
            @include svgbg("../../style/image/common/order.svg");
        }

        .el-icon-report {
            @include svgbg("../../style/image/common/report.svg");
        }

        .el-icon-audit {
            @include svgbg("../../style/image/common/audit.svg");
        }

        .el-submenu__icon-arrow {
            right: 27px;
            color: #a8adaf;
        }

        // authority msg num
        .authority {
            padding-left: 14px;
        }

        .authority-item {
            padding-left: 20px;

            .num {
                @include xx(30px, 30px, 14px)
            }
        }

        .el-menu-item-group {
            position: relative;
        }

        .el-stencil {
            position: relative;

            .num {
                position: absolute;
                top: 13px;
                right: 21px;
            }
        }

        // open menu style
        // arrow style
        .el-icon-arrow-down {
            &:before {
                content: "\E604";
            }
        }

        //hover svg style
        .hover-svg-color {
            .el-icon-resourcemanage {
                @include svgbg("../../style/image/common/resourcemanage_hover.svg");
            }

            .el-icon-finance {
                @include svgbg("../../style/image/common/finance_hover.svg");
            }

            .el-icon-systemset {
                @include svgbg("../../style/image/common/systemset_hover.svg");
            }

            .el-icon-flowset {
                @include svgbg("../../style/image/common/flowset_hover.svg");
            }

            .el-icon-order {
                @include svgbg("../../style/image/common/order_hover.svg");
            }

            .el-icon-report {
                @include svgbg("../../style/image/common/report_hover.svg");
            }

            .el-icon-audit {
                @include svgbg("../../style/image/common/audit_hover.svg");
            }
        }

        .el-menu-item,
        .el-submenu__title {
            height: 54px;
            line-height: 54px;
            border-left: 5px solid #2f323a;

            &:focus,
            &:hover {
                background-color: #2f323a;
                border-color: #2f323a;
                color: #fff !important;
            }
        }

        .el-menu-item {
            padding-left: 48px !important; // &:focus,
            // &:hover {
            //     // border-left: 5px solid #ff6870 !important;
            //     color: #fff !important;
            // }
        }

        .el-submenu__title {
            padding-left: 15px !important;
            color: #a8adaf !important;

            &:hover {
                .el-icon-arrow-down {
                    color: #fff;
                }

                @extend .hover-svg-color;
            }
        }

        // .el-submenu {
        //     &:focus,
        //     &:hover {
        //         color: #fff;
        //     }
        // }
        .is-opened {
            .el-menu-item {
                color: #a8adaf;
            }

            .el-icon-arrow-down:before {
                content: "\E605";
                color: #fff;
            }

            .el-submenu__title {
                color: #fff !important;
            }

            @extend .hover-svg-color;
        }

        .el-menu-item.is-active {
            background-color: #181a1e;
            border-left: 5px solid #ff6870;
            color: #fff;
        }

        .el-menu-item-group__title {
            padding: 0 0 0 20px;
        }
    }

    // main content
    .el-main {
        padding: 30px;
        font-size: 14px;
        display: block;
    }
}

@media screen and (max-width:1920px) {
    .container-wrap {
        min-height: 1080px;
    }
}

@media screen and (max-width:1680px) {
    .container-wrap {
        min-height: 1050px;
    }
}

@media screen and (max-width:1366px) {
    .container-wrap {
        min-height: 680px;
    }
}
</style>
