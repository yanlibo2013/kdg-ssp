<template>
    <div class="creative-template" name="banner">
        <el-main>
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="mup-ingredient">
                    <el-form ref="form" :model="form">
                        <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
                            <el-tab-pane class="border-bottom-2" name="first">
                                <span slot="label">媒体</span>
                                <template>
                                    <div class="medida-func">
                                        <div class="grid-content ">
                                            <div class="function-list">
                                                <a href="javascript:void(0);" class="single-link el-link-add" @click="createMedia">
                                                    <i class="add-iron">+</i>
                                                    <span class="add-msg">新建媒体</span>
                                                </a>
                                                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                                                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
                                                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                                            </div>
                                            <div class="seek-box">
                                                <el-select v-model="adUser" placeholder="请选择" @change="changStatus(adUser)">
                                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <div class="el-input el-input--prefix">
                                                    <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="keyWords" @keyup="searchDataByName(keyWords)" />
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
                                        <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                                            <el-table-column type="selection" width="55">
                                            </el-table-column>
                                            <el-table-column prop="name" label="媒体ID">
                                                <template slot-scope="scope">
                                                    <div class="firm-name-adjust">
                                                        <span class="space-adjust">{{ scope.row.foreign_id }}</span>
                                                        <!-- <a href="javascript:void(0);" class="el-icon-revise" @click="modify(scope.row.id)"></a> -->
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="name" label="媒体名称" width="180">
                                                <template slot-scope="scope">
                                                    <a class="firm-name-adjust" href="javascript:void(0);">

                                                        <a class="space-adjust link-jump self-link-jump" style="cursor:hand; padding:0;display:inline-block;width:90px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;" @click="goRelation(scope.row.id)">{{ scope.row.name }}</a>

                                                    <a href="javascript:void(0);" class="el-icon-revise"  @click="modify(scope.row.id)"></a>
                                                    </a>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="status" label="状态">
                                                <template slot-scope="scope">
                                                    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                                    </el-switch>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="num" label="包名">
                                                <template slot-scope="scope">
                                                    <span>Android:{{scope.row.package_A?scope.row.package_A:"—"}}
                                                        <br/>
                                                        iOS:{{scope.row.package_I?scope.row.package_I:"—"}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="num" label="接入方式">
                                                <template slot-scope="scope">
                                                    <span>{{ scope.row.accpet_type }}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="authority" label="媒体分类">
                                                <template slot-scope="scope">
                                                    <span>一级分类 {{scope.row.media_category_name}}</span>
                                                    <br/>
                                                    <span>二级分类 {{scope.row.media_category_sed_name}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="authority" label="审核规范">
                                                <template slot-scope="scope">
                                                    <!-- <a href="javascript:void(0);" class="link-jump" @click="materialType()"></a> -->
                                                    {{scope.row.path_name}}

                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="date" label="最后更新时间" width="115">
                                                <template slot-scope="scope">
                                                    {{ scope.row.update_time }}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!-- pagenation -->
                                        <div class="block">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="pageList&&pageList.per_page" layout="total, sizes, prev, pager, next, jumper" :total="pageList&&pageList.total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </template>
                            </el-tab-pane>

                            <el-tab-pane class="border-bottom-2" name="second">

                                <span slot="label">平台</span>
                                <template>
                                    <div class="medida-func">
                                        <div class="grid-content ">
                                            <div class="function-list">
                                                <a href="javascript:void(0);" class="single-link el-link-add" @click="createPlatform">
                                                    <i class="add-iron">+</i>
                                                    <span class="add-msg">新建平台</span>
                                                </a>
                                                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="openAD">开启</el-button>
                                                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="closeAD">关闭</el-button>
                                                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="delAD">删除</el-button>
                                            </div>
                                        </div>

                                        <PlatformList ref="platlist"></PlatformList>

                                    </div>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </el-col>
        </el-main>
    </div>
</template>

<script>
import {
    resource,
    common
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from "store";
import {
    callback,
    warning
} from "../../../common/utils.js";
import PlatformList from "./PlatformList";
export default {
    data: function () {
        return {
            header: "",
            multipleSelection: [],
            keyWords: "",
            form: {},
            create: "",
            options: [{
                    //请选择客户
                    value: "选项1",
                    label: "客户1"
                },
                {
                    value: "选项2",
                    label: "客户2"
                },
                {
                    value: "选项3",
                    label: "客户3"
                }
            ],
            //列表
            list: [],
            isLighten: false,
            clearIt: false, //清空图标是否显示
            currentpage: "",
            searchkey: "", //表格的搜索关键词
            statusOptions: [{
                    value: 0,
                    label: "请选择"
                },
                {
                    value: 1,
                    label: "开启"
                },
                {
                    value: 2,
                    label: "关闭"
                }
                // , {
                //     value: 3,
                //     label: "删除"
                // }
            ],
            adUser: "",

            dialogMaterialTypeVisible: false,
            isShowImage: false,
            isShowNative: false,
            isShowVideo: false,
            isShowPatch: false,

            bannerData: [],
            nativeData: [],
            videoData: [],
            patchData: [],

            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            activeName: "first"
        };
    },
    computed: {
        // ...mapState(["currentTab"])
        // ...mapState({
        //     currentTab: state => state.currentTab
        // }),
        // route() {
        //     return this.$store.state.currentTab
        // }
        currentTab: {
            // getter
            get: function () {
                return this.$store.state.currentTab
            },
            // setter
            set: function (newValue) {
                // var names = newValue.split(' ')
                // this.firstName = names[0]
                // this.lastName = names[names.length - 1]
            }
        }

    },
    components: {
        PlatformList
    },
    methods: {
        ...mapActions(["setBreadCrumb", "getCurrentUser", "setCurentTab"]),
        createMedia() {
            // if(!this.value){
            //         this.$message({
            //         message: '请选择广告主!',
            //         type: 'warning'
            //     });
            //     return;
            // }
            this.$router.push({
                path: "/createmedia"
            });
        },
        handleClick(val) {

            this.setCurentTab(val);
        },
        createPlatform() {
            this.$router.push({
                path: "/createplatform" //createplatform
            });
        },
        closeDialog() {
            //console.log("closeDialog");
            this.isShowImage = false;
            this.isShowNative = false;
            this.isShowVideo = false;
            this.isShowPatch = false;
        },
        materialType(data, val) {
            //console.log(val);
            this.dialogMaterialTypeVisible = true;

            this.bannerData = val.banner;
            this.nativeData = val.native;
            this.videoData = val["video-native"];
            this.patchData = val.video;

            _.forEach(data, val => {
                if (val == "图片") {
                    this.isShowImage = true;
                }
                if (val == "原生图文") {
                    this.isShowNative = true;
                }
                if (val == "原生视频") {
                    this.isShowVideo = true;
                }
                if (val == "贴片视频") {
                    this.isShowPatch = true;
                }
            });
        },
        clearInput() {},
        modifyStatus(val, flag) {

            resource.modifyStatusMeadia(this.header, {
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
        getCheckedIds(val) {
            let data = _.map(this.multipleSelection, val => {
                return val.id;
            });

            return data;

        },
        isEmpty() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请至少选择一条记录!',
                    type: 'warning'
                });
                return false;

            }

            return true;
        },
        open() {
            if (!this.isEmpty(this.multipleSelection)) {
                return;
            }

            resource.modifyStatusMeadia(this.header, {
                ids: this.getCheckedIds(this.multipleSelection),
                flag: 1
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
        close() {
            if (!this.isEmpty(this.multipleSelection)) {
                return;
            }

            resource.modifyStatusMeadia(this.header, {
                ids: this.getCheckedIds(this.multipleSelection),
                flag: 2
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
        isDelItem(val) {

            for (let j = 0; j < val.length; j++) {
                if (val[j].status == 0) {
                    return false;
                }

            }

            return true;

        },
        del() {

            if (!this.isEmpty(this.multipleSelection)) {
                return;
            }

            if (this.isDelItem(this.multipleSelection)) {
                warning("选中记录已经删除!", this)
                this.getList({
                    pagenum: this.currentPage,
                    pagesize: this.pageSize
                });
                return;
            }

            resource.delMeadia(this.header, {
                ids: this.getCheckedIds(this.multipleSelection)
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
        searchDataByName(val) {
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                name: val
            });

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.isLighten = true;

            } else {
                this.isLighten = false;

            }

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
        getList(data) {
            resource.getMeadiaList(this.header, data).then(res => {
                if (res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                this.pageList = res.data;
                // callback(res.data, () => {
                //     this.pageList = res.data;
                // }, this);
                this.loading = false;
            });

        },
        changStatus(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                flag: val
            });

        },
        modify(val) {
            this.$router.push("/editmedia/" + val);

        },
        openAD() {
            this.$refs.platlist.open();

        },
        closeAD() {
            this.$refs.platlist.close();

        },
        delAD() {
            this.$refs.platlist.del();

        },
        goRelation(val) { //跳转到广告位页面
            this.$router.push({
                path: "/adlist/" + val
            });
        },

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

        this.activeName = _.cloneDeep(this.$store.state.currentTab);

    },

    beforeCreate() {},
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };
    },
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
};
</script>

<style lang="scss">
@import "../../../style/mixin";

.mup-ingredient {
    .self-link-jump:hover {
        white-space: normal !important;
    }

    // tabs style
    .el-tabs {
        background-color: #fff;
    }

    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        margin-right: 20px;
    }

    .el-tabs__item {
        padding: 0 14px !important;
        height: 54px;
        line-height: 54px;
    }

    .el-tabs__active-bar {
        width: 56px !important;
        height: 3px;
    }

    .el-tabs__nav-wrap:after {
        height: 1px !important;
    }

    .el-tabs__nav-scroll {
        padding-left: 30px;
    }

    .el-tabs__item {
        padding: 0 15px;
    }

    .el-tabs__header {
        margin-bottom: 0;
    }

    // buttons and search
    .grid-content {
        position: relative;

        .function-list {
            margin: 19px 30px 20px;
        }

        .single-link {
            vertical-align: -3px;
            margin-right: 16px;
        }

        .el-button,
        .el-button+.el-button {
            margin: 0 6px 0 0;
        }

        .seek-box {
            position: absolute;
            right: 30px;
            top: 0;

            .el-input {
                width: 180px;
            }

            .el-input--suffix {
                width: 110px;
                margin-right: 8px;
            }
        }
    }

    // table img and text style
    .platform-img {
        border-radius: 5px;
        margin-right: 20px;
    }

    .firm-name {
        display: table-cell;
        vertical-align: middle;
        height: 60px;
    }

    // table
    .el-table {

        th:first-child .cell,
        td:first-child .cell {
            padding-left: 30px;
        }

        // th:nth-child(2),
        // td:nth-child(2) {
        //     text-align: center;
        // }
        .link-jump {
            color: #6cabff;
            padding-right: 21px;

            &:hover {
                text-decoration: underline;
            }
        }

        // edit icon
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
    }

    //material type poplayer
    .material-type-poplayer {
        .el-dialog__header {
            border-bottom: 2px solid #e1e7f0;
            padding: 26px 30px 14px;
        }

        .el-dialog__headerbtn {
            right: 30px;
            top: 27px;
        }

        .el-dialog__body {
            padding: 0;
        }

        .el-tabs__header {
            margin-bottom: 0;
        }

        .el-tabs__nav {
            margin-left: 30px;
        }

        // nav border bottom
        .el-tabs__nav-wrap::after {
            height: 1px;
            background-color: #e1e7f0;
        }

        th {
            display: none;
        }

        // blue line height setting
        .el-tabs__active-bar {
            height: 4px;
        }

        .el-tabs__nav {
            margin-left: 30px;
        }

        .el-tabs__item {
            height: 50px;
            line-height: 50px;
            @include sc(12px,
            #bdbecd);

            &.is-active {
                color: #515974;
            }
        }
    }
}
</style>
