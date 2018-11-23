<template>
    <div class=" demand creative-template" name="banner">
        <el-main>
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="demand-wrap border-bottom-2">
                    <div class="grid-content ">
                        <div class="function-list">
                            <a href="javascript:void(0);" class="single-link el-link-add" @click="createDemander">
                                <i class="add-iron">+</i>
                                <span class="add-msg">新建PMP</span>
                            </a>
                            <!-- <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                            <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button> -->
                            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                        </div>
                        <!-- <div class="seek-box">
                            <el-select v-model="adUser" placeholder="请选择" @change="changStatus(adUser)">
                                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keyWords" @keyup="searchDataByName(keyWords)" />
                                <span class="el-input__prefix">
                                        <i class="el-input__icon el-icon-search"></i>
                                    </span>
                                <span class="el-input__prefix custom__close" v-show="clearIt">
                                        <span class="el-input__prefix-inner">
                                            <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearInput"></i>
                                        </span>
                                </span>
                            </div>
                        </div> -->
                    </div>
                    <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="media_name" label="名称">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                                <a href="javascript:void(0);" class=" el-icon-revise" @click="modify(scope.row.id)"></a>
                            </template>
                        </el-table-column>

                        <el-table-column prop="media_name" label="所属媒体">
                            <template slot-scope="scope">
                                <!-- {{scope.row.media_name==''?'-':scope.row.media_name}} -->
                                <i v-if="scope.row.media_name">
                                    {{scope.row.media_name}}
                                </i>
                                <i v-else class="el-icon-minus"></i>
                            </template>
                        </el-table-column>

                        <el-table-column prop="media_name" label="Deal ID">
                            <template slot-scope="scope">
                                {{scope.row.deal_id}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="media_name" label="结算类型">
                            <template slot-scope="scope">
                                <!-- {{scope.row.type==''?"-":scope.row.type==1?"cpm":"cpc"}} -->
                                <i v-if="scope.row.type">
                                    {{scope.row.type==1?"cpm":"cpc"}}
                                </i>
                                <i v-else class="el-icon-minus"></i>
                            </template>
                        </el-table-column>

                        <el-table-column prop="media_name" label="虚拟价格">
                            <template slot-scope="scope">
                                {{scope.row.virtual_money}}
                            </template>
                        </el-table-column>

                    </el-table>

                    <!-- pagenation -->
                    <div class="block">
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
export default {
    data: function () {
        return {
            dialogFormVisible: false,
            header: "",
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
            // pageList: [],
            dialogMaterialTypeVisible: false,
            isShowImage: false,
            isShowNative: false,
            isShowVideo: false,
            isShowPatch: false,

            // dialog

            bannerData: [],
            nativeData: [],
            videoData: [],
            patchData: [],

            pageList2: [{
                    media_name: 'abc',
                    status: '2',
                    operation: '请选择'
                },
                {
                    media_name: 'abc',
                    status: '2',
                    operation: '请选择'
                },
                {
                    media_name: 'abc',
                    status: '1',
                    operation: '请选择'
                }
            ],

            multipleSelection: [],
            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
        }
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),

        charge(val) {
            this.dialogFormVisible = val;
            //this.$refs.chargeDialog.resetForm("formCharge");

        },
        createDemander() {
            this.$router.push({
                path: "/addpmp"
            });
        },
        modify(val) {
            this.$router.push({
                path: "/editpmp/" + val
            });

        },
        policySet(val) {
            this.$router.push({
                path: "/policyset/" + val.id
            });
        },
        flowSet(val) {
            this.$router.push({
                path: "/flowset/" + val.id
            });
        },
        createPlatform() {
            this.$router.push({
                path: "/createPlatform"
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

            })
        },
        clearInput() {

        },
        modifyStatus(val, flag) {
            flow.modifyStatus(this.header, {
                ids: [val],
                flag: flag
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
                        pagesize: this.pageSize,
                    })
                }, this);
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
        isDelItem(val) {

            for (let j = 0; j < val.length; j++) {
                if (val[j].status == 0) {
                    return false;
                }

            }

            return true;

        },
        del() {

            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请至少选择一条记录',
                    type: 'warning'
                });
                return;
            }

            // if (this.isDelItem(this.multipleSelection)) {
            //     warning("选中记录已经删除!", this)
            //     this.getList({
            //         pagenum: this.currentPage,
            //         pagesize: this.pageSize
            //     });
            //     return;
            // }

            let data = _.map(this.multipleSelection, val => {
                return val.id;

            });

            resource.delPmp(this.header, {
                ids: data
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

                //this.$switchLogin(res.data, this);
            });

        },
        searchDataByName(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                short_name: val
            })

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
        onSubmit() {

        },
        goBack() {
            this.$router.go(-1);

        },
        changStatus(val) {
            this.getList({
                pagenum: 1,
                pagesize: 10,
                flag: val
            });
        },
        getList(data) {
            resource.configPmp(this.header, data).then(res => {
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
                //     this.pageList = res.data;
                // }, this);
                this.loading = false;
            });

        },

    },
    mounted() {

        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

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

.demand {
    .el-dialog {
        width: 600px !important
    }

    // tabs style
    .demand-wrap {
        background-color: #fff;

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
                padding: 19px 30px 20px;
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
                top: 19px;

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
}
</style>
