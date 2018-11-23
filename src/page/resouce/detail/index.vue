<template>
    <div class="resource-list">
        <el-main>
            <el-row class="resource-list-content">
                <el-col :span="24">
                    <div class="resource-bd">
                        <div class="template-hd">资源列表</div>
                        <!-- checkboxs group -->
                        <div class="creative-param">
                            <div class="creative-nav-row c-size clear">
                                <el-collapse v-model="activeNames" @change="handleChange" v-show="meadiaData.length">
                                    <el-collapse-item name="1">
                                        <template slot="title">

                                            <span class="fold-iron"></span>
                                            <span class="hd left">媒体：</span>

                                            <el-checkbox-group v-model="selectMeadia" @change="handleCheckedMeadiaChange">
                                                <el-checkbox v-for="(item,index) in meadiaData" :label="item.name" :key="index">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </el-collapse-item>
                                </el-collapse>

                            </div>
                            <div class="creative-nav-row c-type clear">
                                <span class="hd left">类型：</span>
                                <div class="bd">

                                    <el-checkbox-group v-model="selectType" @change="handleResourceTypesChange">
                                        <el-checkbox v-for="(item,index) in typeData" :label="item.name" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="resource-bd border-bottom-2">
                        <!-- 搜索 -->
                        <div class="creative-btn-control">
                            <div class="creative-btn-row">
                                <div class="search-input">
                                    <div class="el-input el-input--prefix">

                                        <input autocomplete="off" placeholder="请输入关键词" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="searchkey" @keyup="keySearchData(searchkey)" />
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
                        </div>
                        <!-- 数据表格 -->
                        <el-table :data="listData.data" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                            <!-- <el-table-column type="selection">
                            </el-table-column> -->
                            <el-table-column prop="name" label="媒体名称">
                                <template slot-scope="scope">
                                    {{ scope.row.name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="media_id" label="媒体id">
                                <template slot-scope="scope">
                                    {{ scope.row.foreign_Id }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_name" label="广告位名称">
                                <template slot-scope="scope">
                                    {{ scope.row.ad_name }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_id" label="广告位id">
                                <template slot-scope="scope">
                                    {{ scope.row.ad_id }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="sources_type" label="广告样式">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="link-jump" @click="customeInfo(scope.row.mediaAdListStyles)">{{scope.row.mediaStyleName}}</a>
                                    <el-dialog class="adStyleList" title="广告样式详情" width="400" :show-close="true" :visible.sync="advertiseVisible">
                                        <el-table :data="subData" style="width: 100%;">
                                            <el-table-column prop="ch_name" label="广告样式">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.ch_name }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="style_id" label="广告规范">
                                                <template slot-scope="subscope">
                                                    <div v-if="subscope.row.image_wh&&subscope.row.cast_id!=4&&subscope.row.cast_id!=5">
                                                        尺寸:{{ subscope.row.image_wh }}类型:{{ subscope.row.image_style }}
                                                    </div>
                                                    <div v-else-if="subscope.row.image_wh&&(subscope.row.cast_id==5||subscope.row.cast_id==4)">
                                                        尺寸:{{ subscope.row.video_w+'*'+subscope.row.video_h}}类型:{{ subscope.row.video_style }}
                                                    </div>
                                                    <div v-else>
                                                        "—"
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="media_cost" label="媒介采购价格">
                                                <template slot-scope="subscope">
                                                    {{ toThousands(subscope.row.media_cost) }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="selling_price" label="资源售卖价格">
                                                <template slot-scope="subscope">
                                                    {{ toThousands(subscope.row.selling_price) }}
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                        <!-- <div class="block resourcePage">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="adStyleList&&adStyleList.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="adStyleList&&adStyleList.per_page" layout="total, sizes, prev, pager, next, jumper"
                                                :total="adStyleList&&adStyleList.total">
                                            </el-pagination>
                                        </div> -->
                                    </el-dialog>
                                </template>

                            </el-table-column>

                            <el-table-column prop="sources_type" label="预估总pv/天">
                                <template slot-scope="scope">
                                    {{ toThousands(scope.row.pv) }}
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- paganation -->
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listData&&listData.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="listData&&listData.per_page" layout="total, sizes, prev, pager, next, jumper" :total="listData&&listData.total">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import {
    resource,
    common
} from "../../../service/index";
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from "store";
import {
    callback,
    switchLogin,
    toThousands
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            searchkey: "", //表格的搜索关键词
            clearIt: false, //关闭图标设置

            activeNames: ["1"],
            advertiseVisible: false,

            //detail

            pageList: [],
            listData: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            meadiaData: [],
            //1：图片，2：图文，3：组图，4：短视频，5：视频
            typeData: [{
                    id: 1,
                    name: "图片"
                },
                {
                    id: 2,
                    name: "图文"
                },
                {
                    id: 3,
                    name: "组图"
                },
                {
                    id: 4,
                    name: "短视频"
                },
                {
                    id: 5,
                    name: "视频"
                }
            ],
            selectMeadia: [],
            selectType: [],
            header: "",
            subData: []
        };
    },
    computed: {},
    components: {},
    methods: {
        ...mapActions(["setBreadCrumb", "getCurrentUser"]),

        toThousands(val) {
            return toThousands(val);
        },

        getIdsByName(data, val) {
            let result = [];
            _.forEach(data, p => {
                _.forEach(val, s => {
                    if (p.name == s) {
                        result.push(p.id);
                    }
                });
            });

            return result;
        },

        customeInfo(val) {
            this.advertiseVisible = true;
            this.subData = val;

        },
        handleCheckedMeadiaChange(val) {
            let data = this.getIdsByName(this.meadiaData, val);
            this.loading = true;

            this.getList({
                pagenum: 1,
                pagesize: this.pageSize,
                mediaIds: data.toString(),
                mediaStyleIds: this.getIdsByName(
                    this.typeData,
                    this.selectType
                ).toString()
            });
        },
        handleResourceTypesChange(val) {
            let data = this.getIdsByName(this.typeData, val);
            this.loading = true;

            this.getList({
                pagenum: 1,
                pagesize: this.pageSize,
                mediaStyleIds: data.toString(),
                mediaIds: this.getIdsByName(
                    this.meadiaData,
                    this.selectMeadia
                ).toString()
            });
        },
        keySearchData(val) {
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                // mediaStyleIds: data.toString(),
                mediaIds: this.getIdsByName(
                    this.meadiaData,
                    this.selectMeadia
                ).toString(),
                ad_name: val
            });
        },
        clearInput() {},
        handleSelectionChange() {},
        filterData(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize
            });

        },
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.filterData();
        },
        handleCurrentChange(val) {
            this.loading = true;
            this.currentPage = val;
            this.filterData();
        },
        handleChange() {},
        getList(data) {

            resource
                .detailListRes({
                    token: this.header.token,
                    userId: this.header.userId
                }, data)
                .then(res => {
                    
                    this.listData = res.data;
                    this.loading = false;
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
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    beforeMount() {},
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

        common.meadiaListRes(this.header).then(res => {
            this.meadiaData = res.data.data;
        });
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
};
</script>

<style lang="scss">
@import "../../../style/mixin";

.resource-list {
    .el-main {
        background-color: transparent;
    }

    // background
    .resource-bd {
        background-color: #ffffff;
    }

    // head padding
    .template-hd {
        padding: 17px 0 15px 30px;
    }

    // checkbox group
    .creative-param {
        padding: 9px 0 10px 30px;
        border-bottom: 2px solid #e1e7f0;

        span {
            font-size: 12px;
            line-height: 20px;
        }

        .hd {
            @include sc(12px, $firstc);
        }

        .align-right {
            margin-right: 30px;
        }

        .creative-nav-row {
            padding: 8px 0;
            position: relative;
        }

        .el-checkbox-group {
            padding: 0 45px 0 36px;
        }

        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 11px;
            right: 30px;
            height: 28px;
            width: 39px;
            @include borderRadius(5px);
        }

        .el-collapse-item__arrow {
            float: none;
            position: absolute;
            top: 1px;
            right: 35px;
            z-index: 20;
            color: #ffffff;
            transform: rotate(90deg);
        }

        .el-collapse-item__arrow.is-active {
            transform: rotate(-90deg);
        }

        .el-checkbox__input {
            margin-top: 2px;
        }

        .el-checkbox__label,
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
        }

        // collapse style
        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;

            .hd {
                line-height: 50px;
            }
        }

        .el-collapse {
            border: 0 none;
        }

        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border-bottom: 0 none;

            .hd {
                line-height: 50px;
            }
        }

        .el-collapse-item__header.is-active {
            height: 100%;
            -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
            transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }

    // button and search
    .creative-btn-control {
        margin-top: 20px;

        .creative-btn-row {
            padding: 20px 30px;
        }

        .search-input {
            width: 180px;

            .el-input-group__append,
            .el-input-group__prepend {
                padding: 0 !important;
                background-color: #fff;
            }

            .el-input-group__append {
                border-color: #e1e7f0;

                .el-button {
                    padding: 3px 27px 21px !important;
                }
            }

            .el-icon-search {
                color: #a5a6bb !important;

                &:before {
                    font-size: 18px !important;
                }
            }

            .el-input__suffix {
                right: 25px;
            }

            .el-input--prefix .el-input__inner {
                padding-left: 20px;
            }

            .el-input__prefix {
                left: 83% !important;
            }
        }
    }

    .el-table {

        th:first-child,
        td:first-child {
            padding-left: 16px;
        }

        th:nth-child(2),
        td:nth-child(2) {
            padding-left: 20px;
        }

        // th:nth-child(6),
        // td:nth-child(6),
        // th:nth-child(8),
        // td:nth-child(8),
        // th:nth-child(9),
        // td:nth-child(9),
        // th:nth-child(10),
        // td:nth-child(10){
        //     text-align: center;
        // }
        // th:nth-child(11),
        // td:nth-child(11){
        //     text-align: right;
        //     padding-right: 20px;
        // }
    }

    //new add by lq
    .el-checkbox {
        float: left;
        margin: 0 30px 0 0;
    }

    .setLink {
        color: #1e9fff;

        &:hover {
            text-decoration: underline;
        }
    }

    // pop layer style
    .el-dialog__header {
        padding-left: 30px;
    }

    .el-dialog__body {
        padding: 0;
    }

    .adStyleList {
        .el-table th>.cell {
            padding-left: 13px;
        }
    }

    // pagenation
    .block .el-pagination {
        padding: 20px 30px;
    }
}
</style>
