<template>
    <div class="creative-template" name="banner">
        <el-main>
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="advertise-list">
                    <div class="medida-func border-bottom-2">
                        <div class="grid-content ">
                            <div class="function-list">
                                <a href="javascript:void(0);" class="single-link el-link-add" @click="createAdvertise">
                                    <i class="add-iron">+</i>
                                    <span class="add-msg">创建广告位</span>
                                </a>
                                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
                                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                            </div>
                            <div class="seek-box">
                                <el-select v-model="adUser" placeholder="请选择" @change="changStatus">
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
                        <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column prop="name" label="ID">
                                <template slot-scope="scope">
                                    <div class="firm-name-adjust">
                                        <span class="space-adjust">{{scope.row.id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="广告位名称">
                                <template slot-scope="scope">
                                    <div class="firm-name-adjust">
                                        <span class="space-adjust">{{ scope.row.ad_name }}</span>
                                        <a href="javascript:void(0);" class="el-icon-revise" @click="edit(scope.row.id)"></a>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="广告位ID">
                                <template slot-scope="scope">
                                    <div class="firm-name-adjust">
                                        <span class="space-adjust">{{scope.row.ad_id}}</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
                                <template slot-scope="scope">
                                    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                    </el-switch>
                                </template>
                            </el-table-column>

                            <el-table-column prop="num" label="广告样式">
                                <template slot-scope="scope">
                                    <span class="link-jump self-cursor" @click="adDetailDialog(scope.row.mediaAdListStyles)">{{scope.row.mediaStyleName}}</span>

                                    <el-dialog class="adStyleList" title="广告样式" width="952" :show-close="true" :visible.sync="adStyleVisible">

                                        <el-table :data="mediaAdListStyles" height="250" style="width: 100%">
                                            <el-table-column label="广告样式">
                                                <template prop="name" slot-scope="scope">
                                                    {{scope.row.ch_name}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="广告位规范" width="300">
                                                <template prop="name" slot-scope="scope">

                                                    <span v-if="scope.row.cast_id ==1">
                广告类型:图片; &nbsp;图片数量:{{scope.row.image_num}};&nbsp; 图片尺寸:{{scope.row.image_w}}x{{scope.row.image_h}};&nbsp;&nbsp; 是否logo:{{scope.row.islogo == 1?'是':'否'}}
            </span>

                                                    <span v-if="scope.row.cast_id ==2">
                广告类型:图文;&nbsp;图片数量:{{scope.row.image_num}};&nbsp;图片尺寸:{{scope.row.image_w}}x{{scope.row.image_h}};&nbsp;&nbsp;
                标题字数:{{scope.row.title}};&nbsp;描述字数:{{scope.row.des}},是否logo:{{scope.row.islogo == 1 ?'是':'否'}}
            </span>

                                                    <span v-if="scope.row.cast_id ==3">
                广告类型：组图;&nbsp;图片数量:{{scope.row.image_num}};&nbsp;图片尺寸:{{scope.row.image_w}}x{{scope.row.image_h}};&nbsp;&nbsp;标题字数:{{1 || 0}};&nbsp;描述字数:{{scope.row.des}};&nbsp;是否logo:{{scope.row.islogo == 1?'是':'否'}}
            </span>

                                                    <span v-if="scope.row.cast_id ==4">
                广告类型:短视频;&nbsp;图片数量:{{scope.row.image_num}};&nbsp;图片尺寸:{{scope.row.image_w}}x{{scope.row.image_h}};&nbsp;&nbsp;视频尺寸:{{scope.row.video_w}}x{{scope.row.video_h}};&nbsp;视频格式:{{scope.row.video_style}};&nbsp;视频时长:{{scope.row.video_time}}s;&nbsp;
                标题字数:{{scope.row.title}};&nbsp;描述字数:{{scope.row.des}};&nbsp;是否logo:{{scope.row.islogo == 1?'是':'否'}}
            </span>

                                                    <span v-if="scope.row.cast_id ==5">
                广告类型:视频;&nbsp;视频尺寸:{{scope.row.video_w}}x{{scope.row.video_h}};&nbsp;视频格式:{{scope.row.video_style}};&nbsp;视频时长:{{scope.row.video_time}}s
            </span>

                                                </template>
                                            </el-table-column>
                                            <el-table-column label="媒价采购价格">
                                                <template prop="simplename" slot-scope="scope">
                                                    {{scope.row.media_cost}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="资源售卖价格">
                                                <template prop="remark" slot-scope="scope">
                                                    {{scope.row.selling_price}}
                                                </template>
                                            </el-table-column>
                                        </el-table>

                                    </el-dialog>

                                </template>
                            </el-table-column>

                            <!-- <el-table-column prop="num" label="广告位规范">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.tel }}</span>
                                </template>
                            </el-table-column> -->

                            <el-table-column prop="authority" label="采购价格">
                                <template slot-scope="scope">
                                    <span>{{scope.row.settlement_price}}</span>
                                </template>
                            </el-table-column>

                            <!-- <el-table-column prop="authority" label="损耗系数">
                                <template slot-scope="scope">
                                    <span>5%</span>
                                </template>
                            </el-table-column> -->

                            <el-table-column prop="authority" label="每日预计PV">
                                <template slot-scope="scope">
                                    <span>{{scope.row.pv}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" label="最后更新时间" width="115">
                                <template slot-scope="scope">
                                    <span class="link-jump">{{ scope.row.update_time }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- pagenation -->
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list&&list.current_num" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="list&&list.total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-main>
    </div>
</template>

<script>
import store from "store";
import {
    resource
} from "../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data: function () {
        return {
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
                    label: '全部'
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
            adUser: 0,
            pageList: [],
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

            postData: { //广告位向后台进行穿参数
                mediaIds: null, //媒体id
                pagesize: 10, //每页显示数据
                pagenum: 1, //当前页码
            },

            adStyleVisible: false,

            mediaAdListStyles: [], //每个广告位详情的信息

        }
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser"
        ]),
        //样式的弹框
        adDetailDialog(val) {
            this.adStyleVisible = true;
            this.mediaAdListStyles = val;

            console.log(val);
        },
        edit(val) { //跳转到广告位编辑页面
            if (!val) {
                this.$router.push({
                    path: "/createad/" + this.$route.params.id,
                });
            } else {
                this.$router.push({
                    path: "/createad/" + this.$route.params.id + "/" + val,
                });
            }
        },
        createAdvertise() {
            this.$router.push({
                path: "/createad/" + this.$route.params.id
            });
        },
        closeDialog() {
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
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.isLighten = true;

            } else {
                this.isLighten = false;

            }

        },
        getids() { //复选框的id
            let ids = [];
            for (var j = 0; j < this.multipleSelection.length; j++) {
                ids.push(this.multipleSelection[j].id);
            }
            return ids;
        },
        modifyStatus(val, flag) { // id和当前的状态
            let arr = [];
            arr.push(val);
            flag = flag == 1 ? 2 : 1;
            resource.openAdList(this.header, {
                ids: arr,
                flag: flag
            }).then(res => {
                if (res.data.success == true) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.getList(this.postData)
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error"
                    });
                }
            })

        },
        open() {
            if (this.getids().length == 0) {
                this.$message({
                    message: '请选择操作记录',
                    type: 'warning'
                });
                return;
            }
            resource.openAdList(this.header, {
                ids: this.getids(),
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
                if (res.data.success == true) {
                    this.$message({
                        message: "开启成功",
                        type: "success"
                    });
                    this.getList(this.postData)
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error"
                    });
                }
            })

        },
        close() {
            if (this.getids().length == 0) {
                this.$message({
                    message: '请选择操作记录',
                    type: 'warning'
                });
                return;
            }
            resource.openAdList(this.header, {
                ids: this.getids(),
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
                if (res.data.success == true) {
                    this.$message({
                        message: "关闭成功",
                        type: "success"
                    });
                    this.getList(this.postData)
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error"
                    });
                }
            })

        },
        del() {
            if (this.getids().length == 0) {
                this.$message({
                    message: '请选择操作记录',
                    type: 'warning'
                });
                return;
            }
            resource.delAdList(this.header, {
                ids: this.getids()
            }).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                if (res.data.success == true) {
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.getList(this.postData)
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: "error"
                    });
                }
            })

        },
        searchDataByName(keys) {
            this.postData.ad_name = keys;
            this.getList(this.postData)
        },
        handleSizeChange(val) {
            this.postData.pagesize = val;
            this.postData.pagenum = 1;

            this.getList(this.postData);
        },
        handleCurrentChange(val) {
            this.postData.pagenum = val;
            this.getList(this.postData);
        },
        changStatus(val) {
            //下拉选中的值
            this.postData.flag = val;
            this.getList(this.postData);
        },
        getList(data) {
            let that = this;
            resource.getAdList(this.header, data).then(res => {
                if (res.data.success == true) {
                    this.list = res.data;
                }
            })
        }

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.postData.mediaIds = this.$route.params.id || ""; //默认值
        this.getList(this.postData);
    },

}
</script>

<style lang="scss">
@import "../../style/mixin";

.advertise-list {

    // tabs style
    .medida-func {
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

        .self-cursor {
            cursor: pointer;
        }

        // edit icon
        .el-icon-revise {
            cursor: pointer;
            margin-left: 20px;
            background: url("../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            vertical-align: -4px;

            &:hover {
                background: url("../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
    }

    // pagenation
    .block .el-pagination {
        padding: 30px 30px 25px 20px;
    }
}
</style>
