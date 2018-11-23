<template>
    <div class="resource-commend">
        <el-main>
            <el-row class="resource-list-content">
                <el-col :span="24">
                    <div class="resource-bd">
                        <div class="template-hd">资源列表</div>
                        <!-- checkboxs group -->
                        <div class="creative-param">
                            <div class="creative-nav-row industry-row clear">
                                <span class="hd left">所属行业：</span>
                                <el-cascader :options="options" v-model="selectedOptions3" @change="changeIndustry(selectedOptions3)" clearable></el-cascader>
                            </div>
                            <div class="creative-nav-row resource-type">
                                <span class="hd left">资源类型：</span>
                                <div class="bd">
                                    <el-checkbox-group class="clear" v-model="selectType" @change="handleResourceTypesChange">
                                        <el-checkbox v-for="(item,index) in typeData" :label="item.name" :key="index">{{item.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="creative-nav-row">
                                <el-collapse v-model="activeMedia" @change="handleChange">
                                    <el-collapse-item name="1">
                                        <template slot="title">

                                            <span class="fold-iron"></span>
                                            <span class="hd left">推荐媒体：</span>

                                            <el-checkbox-group v-model="selectMeadia" @change="handleCheckedMeadiaChange">
                                                <el-checkbox v-for="(item,index) in meadiaData" :label="item.name" :key="index">{{item.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </el-collapse-item>
                                </el-collapse>

                            </div>
                        </div>
                    </div>

                    <div class="resource-bd border-bottom-2">
                        <div class="creative-btn-control">
                            <div class="creative-btn-row">
                                <!-- 批量配置 -->
                                <el-button type="click" @click='batchSwithResource'>批量配置</el-button>

                                <!-- 搜索 -->
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
                        <el-table :data="listData.data" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="name" label="媒体名称">
                                <template slot-scope="scope">
                                    {{ scope.row.name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="foreign_Id" label="媒体包名">
                                <template slot-scope="scope">
                                    {{ scope.row.packageMedia }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_name" label="广告位名称">
                                <template slot-scope="scope">
                                    {{ scope.row.ad_name }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_id" label="广告位id">
                                <template slot-scope="scope">
                                    {{ scope.row.packageAd }}

                                </template>
                            </el-table-column>
                            <el-table-column prop="ad_id" label="广告样式">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="link-jump" @click="createAdStyle(scope.row.mediaAdListStyles)" v-if="scope.row.mediaStyleName">{{ scope.row.mediaStyleName }}</a>
                                    <i class="el-icon-minus" v-else></i>
                                    <el-dialog class="adStyleList" title="广告样式详情" width="400" :show-close="true" :visible.sync="advertiseVisible">
                                        <el-table :data="subData" height="250" style="width: 100%;">
                                            <el-table-column prop="ch_name" label="广告样式">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.ch_name }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="style_id" label="广告规范">
                                                <template prop="name" slot-scope="subscope">
                                                    <!-- {{subscope.row.ope_user_name}} -->
                                                    <span v-if="subscope.row.ch_name =='图片'">
                广告类型:图片; &nbsp;图片数量:{{subscope.row.image_num}};&nbsp; 图片尺寸:{{subscope.row.image_w}}x{{subscope.row.image_h}};&nbsp; 图片类型:{{subscope.row.image_style}};&nbsp; 是否logo:{{subscope.row.islogo?'是':'否'}}
            </span>

                                                    <span v-if="subscope.row.ch_name =='组图'">
                广告类型：组图;&nbsp;图片数量:{{subscope.row.image_num}};&nbsp;图片尺寸:{{subscope.row.image_w}}x{{subscope.row.image_h}}; 标题字数:{{subscope.row.title?subscope.row.title:0}};&nbsp;描述字数:{{subscope.row.des?subscope.row.des:"无"}};&nbsp;是否logo:{{subscope.row.islogo?'是':'否'}}
            </span>

                                                    <span v-if="subscope.row.ch_name =='短视频 '||subscope.row.ch_name =='短视频'">
                广告类型:短视频;&nbsp;图片数量:{{subscope.row.image_num}};&nbsp;图片尺寸:{{subscope.row.image_w}}x{{subscope.row.image_h}};&nbsp;图片类型:{{subscope.row.image_style}};&nbsp;视频尺寸:{{subscope.row.video_w}}x{{subscope.row.video_h}};&nbsp;视频格式:{{subscope.row.video_style}};&nbsp;视频时长:{{subscope.row.video_time}}s;&nbsp;
                 标题字数:{{subscope.row.title?subscope.row.title:0}};&nbsp;描述字数:{{subscope.row.des?subscope.row.des:"无"}};&nbsp;是否logo:{{subscope.row.islogo?'是':'否'}}
            </span>

                                                    <span v-if="subscope.row.ch_name =='图文'">
                广告类型:图文;&nbsp;图片数量:{{subscope.row.image_num}};&nbsp;图片尺寸:{{subscope.row.image_w}}x{{subscope.row.image_h}};&nbsp;图片类型:{{subscope.row.image_style}};&nbsp;
                标题字数:{{subscope.row.title?subscope.row.title:0}};&nbsp;描述字数:{{subscope.row.des?subscope.row.des:"无"}},是否logo:{{subscope.row.islogo?'是':'否'}}
            </span>

                                                    <span v-if="subscope.row.ch_name =='视频'||subscope.row.ch_name =='视频 '">
                广告类型:视频;&nbsp;视频尺寸:{{subscope.row.video_w}}x{{subscope.row.video_h}};&nbsp;视频格式:{{subscope.row.video_style}};&nbsp;视频时长:{{subscope.row.video_time}}s
            </span>

                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="media_cost" label="媒介采购价格">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.media_cost }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="selling_price" label="资源售卖价格">
                                                <template slot-scope="subscope">
                                                    {{ subscope.row.selling_price }}
                                                </template>
                                            </el-table-column>

                                        </el-table>
                                    </el-dialog>

                                </template>
                            </el-table-column>
                            <el-table-column prop="e_price" label="预估价格">
                                <template slot-scope="scope">
                                    {{ !scope.row.e_price?"0.00": parseFloat(scope.row.e_price).toFixed(2) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="sources_type" label="预估总pv/天">
                                <template slot-scope="scope">
                                    {{ toThousands(scope.row.pv) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="sources_type" label="操作">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="link-jump" @click="setOrder(scope.row)">配置订单</a>

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
} from "../../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import {
    callback,
    uniqCollection,
    getValueByKey,
    getKeyByValue
} from "../../../common/utils.js";
import store from 'store';
export default {
    data: function () {
        return {
            header: "",
            activeMedia: "",
            adStyleList: [],
            selectMeadia: "",
            searchkey: "",
            clearIt: false,
            pageList2: [],
            advertiseVisible: false,
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
            selectedOptions3: ['zujian', 'data', 'tag'],

            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            meadiaData: [],
            //1：图片，2：图文，3：组图，4：短视频，5：视频
            typeData: [{
                id: 1,
                name: "图片",
            }, {
                id: 2,
                name: "图文",
            }, {
                id: 3,
                name: "组图",
            }, {
                id: 4,
                name: "短视频",
            }, {
                id: 5,
                name: "视频",
            }],
            selectMeadia: [],
            selectType: [],
            multipleSelection: [],
            industryData: [],
            subData: [],
            listData: []
        }
    },
    computed: {},
    components: {},
    methods: {

        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser",
            "getCurrentOrderItem"
        ]),
        changeIndustry(val) {
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                // mediaIds: data.toString(),
                // mediaStyleIds: this.getIdsByName(this.typeData, this.selectType).toString()
                media_category_sed: val[1]
            });

        },
        handleCheckedMeadiaChange(val) {
            let data = this.getIdsByName(this.meadiaData, val);
            this.loading = true;

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                packageMedia: data.toString(),
                mediaStyleIds: this.getIdsByName(this.typeData, this.selectType).toString()
            });

        },
        handleResourceTypesChange(val) {
            let data = this.getIdsByName(this.typeData, val);
            this.loading = true;

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                mediaStyleIds: data.toString(),
                packageMedia: this.getIdsByName(this.meadiaData, this.selectMeadia).toString()
            });

        },
        keySearchData(val) {
            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                // mediaStyleIds: data.toString(),
                // mediaIds: this.getIdsByName(this.meadiaData, this.selectMeadia).toString()
                ad_name: val
            });
        },
        clearInput() {

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;

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
        filterData(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize
            });

        },
        handleChange() {

        },
        batchSwithResource() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请选择一条记录',
                    type: 'warning'
                });
                return;
            }

            let data = this.getParameterData(this.multipleSelection);

            store.set("order", JSON.stringify(data));
            this.$router.push({
                path: "/setorder"
            });
        },
        getList(data) {
            resource.detailList(this.header, data).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                this.listData = res.data;
                this.loading = false;
            });

        },
        getIdsByName(data, val) {
            let result = [];
            _.forEach(data, p => {
                _.forEach(val, s => {

                    if (p.name == s) {
                        result.push(p.packageMedia);
                    }

                });

            });

            return result;

        },
        setOrder(val) {
            console.log(val);
            let data = this.getParameterData([val]);
            store.remove("order");
            store.set("order", JSON.stringify(data));
            this.$router.push({
                path: "/setorder"
            });
        },
        toThousands(val) {
            return this.$toThousands(val);
        },

        createAdStyle(val) {
            this.advertiseVisible = true;
            this.subData = val;

        },
        getParameterData(val) {

            let _that = this;
            let ad = [];
            let meadia = [];
            let industry = [];
            let customers = [];
            let pv = [];
            // let price = [];

            _.forEach(val, item => {
                let parentID = _that.findParaents(item.media_category_sed);
                //广告位
                ad.push({
                    key: item.ad_id,
                    value: item.ad_name
                });
                //媒体
                meadia.push({
                    key: item.media_id,
                    value: item.name
                });
                //涵盖行业
                if (parentID) {
                    industry.push({
                        key: item.media_category_sed,
                        value: ""
                    }, {
                        key: parentID,
                        value: ""
                    });
                } else {
                    industry.push({
                        key: item.media_category_sed,
                        value: ""
                    });
                }
                //使用客户
                customers = _.concat(customers, item.customers && item.customers.split(","));
                //日均pv
                pv.push(item.pv);

                // price.push(item.order_price);

            });

            customers = _.map(customers, val => {
                return {
                    key: parseInt(val),
                    value: ""
                }
            });

            console.log("///////////////   /KDG   //////////////");

            console.log(val);
            console.log(meadia);

            console.log(uniqCollection(meadia));

            // console.log(ad);
            // console.log(uniqCollection(ad));

            return {
                ad: uniqCollection(ad),
                meadia: uniqCollection(meadia),
                industry: this.gitIndustyItem(uniqCollection(industry)),
                customers: this.gitIndustyItem(uniqCollection(customers)),
                pv: _.uniq(pv),
                // order_price: price[0]
            }

        },
        gitIndustyItem(data) {
            console.log(data);
            return _.map(data, val => {
                let data = {};
                _.forEach(this.industryData, item => {

                    if (item.id == parseInt(val.key)) {
                        data = {
                            key: item.id,
                            value: item.name
                        }
                    }

                })
                return data;

            })

        },
        initData() {

            const meadiaPromis = common.meadiaList(this.header).then(res => {
                return res.data.data;

            });

            const industryPromis = common.getIndustry(this.header).then(res => {
                return res.data.data;
            });

            Promise.all([meadiaPromis, industryPromis]).then(res => {
                this.meadiaData = res[0];
                this.industryData = res[1];

                let data = _.map(this.getCurrentData(res[1], 0), val => {

                    return {
                        value: val.id,
                        label: val.name,
                        children: _.map(this.getCurrentData(res[1], val.id), s => {
                            return {
                                value: s.id,
                                label: s.name,
                                // children:[]
                            }
                        })

                    }
                });

                this.options = data;

            });

        },
        findParaents(param) {
            let _that = this;
            let paraentID = '';
            let paraentName = '';
            for (let i = 0; i < _that.industryData.length; i++) {
                if (param == _that.industryData[i].id) {
                    paraentID = _that.industryData[i].pid;
                    // for(let i=0;i<_that.industryData.length;i++){
                    //     if(paraentID==_that.industryData[i].id){
                    //         paraentName=_that.industryData[i].name;
                    //     }
                    // }
                }
            }
            return paraentID;
        },
        getCurrentData(data, pid) {

            return _.filter(data, (val) => {
                return val.pid == pid;
            })

        }
    },
    beforeCreate() {
        store.remove("order");
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    beforeMount() {

    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

        common.meadiaList(this.header).then(res => {
            // callback(res.data, () => {
            //     this.meadiaData = res.data.data;
            // }, this);
            this.meadiaData = res.data.data;
        });

        this.initData();

    },

    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {

    },

}
</script>

<style lang="scss">
@import '../../../style/mixin';

.el-cascader-menu>li {
    font-size: 12px !important;
}

.resource-commend {

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

        span.el-cascader__label {
            line-height: 38px
        }

        .hd {
            @include sc(12px, $firstc);
        }

        .align-right {
            margin-right: 30px;
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
                margin: 0 45px 0 64px;
            }

            .el-checkbox__input {
                margin-top: 2px;
            }

            .el-checkbox__label,
            .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #7f8599;
            }

            .fold-iron {
                background-color: #6cabff;
                position: absolute;
                top: 17px;
                right: 30px;
                height: 28px;
                width: 39px;
                @include borderRadius(5px);
            }

            .el-collapse-item__arrow {
                float: none;
                position: absolute;
                top: 7px;
                right: 35px;
                z-index: 20;
                color: #ffffff;
            }

            .el-collapse-item__arrow.is-active {
                transform: rotate(90deg);
            }

            .el-checkbox__input {
                margin-top: 2px;
            }

            .el-checkbox__label,
            .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #7f8599;
            }

            // collapse style
            .el-collapse {
                border: 0 none;
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
            -webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
            transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }

        .industry-row {
            .hd {
                margin: 7px 4px 0 0;
            }
        }

        .resource-type {
            padding: 11px 0 4px;
        }
    }

    // button and search
    .creative-btn-control {
        margin-top: 20px;

        .creative-btn-row {
            padding: 20px 30px;
            position: relative;
        }

        .search-input {
            width: 180px;
            position: absolute;
            top: 20px;
            right: 30px;

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
        color: #1E9FFF;

        &:hover {
            text-decoration: underline;
        }
    }

    // pop layer style
    .el-dialog__header {
        padding-left: 30px;
    }

    .el-dialog__title {
        font-size: 16px;
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
