<template>
    <div class="flow-set">
        <el-main>
            <el-form ref="form" :model="form" label-width="">

                <!-- 流量来源 start -->
                <el-col :span="24" class="flow-source margin-bottom-20">
                    <h2 class="template-hd"><i class="flow-hd-needed" style="margin-right:5px">*</i>流量来源</h2>
                    <div class="template-bd border-bottom-2">
                        <el-checkbox-group v-model="checkedSource" @change="handleCheckedCitiesChange(checkedSource)">
                            <el-checkbox v-for="(item,index) in flowSource" :label="item.value" :key="index">
                                <!-- <img src="http://adodemosv.keda-digital.com/storage/plantform/9/7vkIMr1q9VzIaVkiFiG0ncoq3Gh9WIvcvzvWfLAL.png" alt="" class="put-img" width="98" height="68" />
                            <span class="flow-source-name">科达集团股份有限公司技术分公司</span> -->
                                <img :src='item.img?item.img:"http://adodemosv.keda-digital.com/storage/plantform/9/7vkIMr1q9VzIaVkiFiG0ncoq3Gh9WIvcvzvWfLAL.png"' alt="" class="put-img" width="98" height="68" />
                                <span class="flow-source-name">{{item.value}}</span>
                            </el-checkbox>
                        </el-checkbox-group>

                    </div>
                </el-col>
                <!-- 流量来源 end -->
                <el-col :span="24" class="basic-setting margin-bottom-20 border-bottom-2">
                    <!-- <h2 class="template-hd">基本设置</h2> -->
                    <div class="base-bd">
                        <!-- 流量类型： start -->
                        <div class="create-row">
                            <label for="" class="data-item">流量类型：</label>
                            <el-checkbox-group v-model="checkedType" @change="handleCheckedFlowChange">
                                <el-checkbox v-for="(item,index) in flowType" :label="item.value" :key="index">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 流量类型： end -->
                        <!-- 设备类型： start -->
                        <div class="create-row">
                            <label for="" class="data-item">设备类型：</label>
                            <el-checkbox-group v-model="checedDevice" @change="handleCheckedEquipChange">
                                <el-checkbox v-for="(item,index) in flowDevice" :label="item.value" :key="index">{{item.value}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 设备类型： end -->
                        <!-- 广告样式： start -->
                        <div class="create-row">
                            <label for="" class="data-item">广告样式：</label>
                            <el-checkbox-group v-model="checkedStyle" @change="handleCheckedAdChange(checkedStyle)">
                                <el-checkbox v-for="(item,index) in adStyle" :label="item.value" :key="index">{{item.value}}</el-checkbox>
                            </el-checkbox-group>

                        </div>
                        <!-- 广告样式： end -->
                    </div>
                </el-col>
                <!-- 尺寸 -->
                <el-col :span="24" class="size-module margin-bottom-20">
                    <h2 class="template-hd">尺寸</h2>
                    <el-table ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" highlight-current-row>
                        <!-- <el-table-column property="account" label="状态">
                            <template slot-scope="scope">
                                <el-switch :v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                </el-switch>
                            </template>
                        </el-table-column> -->
                        <el-table-column type="selection" width="70">
                            <template slot-scope="scope">
                                <!-- {{scope.row.id}} -->
                                <el-checkbox v-model="scope.row.checked" @change="handleSelectionChange([scope.row.size])"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column property="name" label="尺寸" width="350">
                            <template slot-scope="scope">
                                {{scope.row.size}}
                            </template>
                        </el-table-column>
                        <el-table-column property="name" label="样式" wwidth="350">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column property="name" label="预估量级">
                            <template>
                                100,000,000
                            </template>
                        </el-table-column> -->
                    </el-table>
                </el-col>
                <!-- 地域 -->
                <el-col :span="24" class="orientation-wrap border-bottom-2">
                    <h2 class="template-hd">地域</h2>
                    <div class="base-bd">
                        <el-tabs type="card" v-model="activeNamebudget" @tab-click="handleClick">
                            <el-tab-pane name="1-1">
                                <span slot="label">
                                            <span class="select-item ">无限制</span>
                                <i class="el-vertical-line"></i>
                                </span>
                            </el-tab-pane>
                            <el-tab-pane name="1-2">
                                <span slot="label">
                                            <span class="select-item">选择地域</span>
                                <i class="el-vertical-line"></i>
                                </span>
                                <div class="">
                                    <!-- 地域组件 start -->
                                    <vLocal ref="vlocal" :isShow='isShow'></vLocal>

                                    <!-- 地域组件 end -->
                                </div>
                                <div class="area-list">
                                    <span class="turn-iron"></span>
                                    <div class="inferior-hd" @click="allClear">全部清除</div>
                                    <div class="inferior-bd clear">
                                        <div class="innerbox">
                                            <template v-for="(item,index) in terrainResult">
                                                <template v-if="item.chiled">
                                                    <div class="area-item-row" :key="index">
                                                        <p class="area-province">{{item.name}}</p>
                                                        <!-- <label v-for="(subItem,i) in item.cityies" :key="i" >{{subItem}}</label> -->
                                                        <el-checkbox-group v-model="checkedCities1">
                                                            <el-checkbox v-for="(subItem,i) in item.chiled" :label="subItem.name" :disabled="true" :checked='true' :key="i">{{subItem.name}}</el-checkbox>
                                                        </el-checkbox-group>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <p class="area-province" :key="index">
                                                        {{item.name}}</p>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                </div>

                            </el-tab-pane>

                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="24" class="margin-bottom-20">
                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                        <el-button type="cancel" @click="goBack">取消</el-button>
                    </div>
                </el-col>
            </el-form>
        </el-main>
    </div>
</template>

<script>
import {
    flow,
    common
} from "../../../service/index";
import {
    mapState,
    mapActions
} from "vuex";
import vLocal from "./local";
import _ from "lodash";
import store from "store";
import {
    callback,
    validateForm,
    getValueByKey,
    getKeyByValue,
    uniq
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            header: "",
            list: [],
            currentpage: "",
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
            ],
            logofile: "",
            checkedImages: "",
            putImages: "",
            checkedflow: "",
            checkedequip: "",
            checkedad: "",
            activeNamebudget: "1-1",
            isShow: false,
            sizeList: [], //{size:"",style:""}
            checkedCities1: [],

            tableData: [],

            //流量设置

            flowData: [],

            flowSource: [],
            flowType: [
                //流量类型 1:Mobile-APP 2:Mobile-WEB 3:PC-WEB
                {
                    key: 1,
                    value: "移动APP"
                },
                {
                    key: 2,
                    value: "移动网页"
                },
                {
                    key: 3,
                    value: "PC网页"
                }
            ],
            flowDevice: [{
                    key: 1,
                    value: "Android"
                },
                {
                    key: 2,
                    value: "ios"
                },
                {
                    key: 3,
                    value: "未知"
                }
            ], //设备类型 1:Android 2:iOS 3:未知

            adStyle: [{
                    key: 1,
                    value: "图片"
                },
                {
                    key: 2,
                    value: "图文"
                },
                {
                    key: 3,
                    value: "组图"
                },
                {
                    key: 4,
                    value: "短视频"
                },
                {
                    key: 5,
                    value: "视频贴片"
                }
            ], //广告样式 此处与页面上对应的5中类型对应 1：图片 2：图文 3：组图 4：短视频 5：视频

            checkedSource: [],
            checkedType: [],
            checedDevice: [],
            checkedStyle: [],

            listData: [],
            form: {
                id: "",
                demandinfo_id: "", //需求方ID
                flow_source: [], //流量来源
                flow_type: [], //流量类型 1:Mobile-APP 2:Mobile-WEB 3:PC-WEB
                adlist_type: [], //广告样式 此处与页面上对应的5中类型对应 1：图片 2：图文 3：组图 4：短视频 5：视频
                area: "", //地域
                device_type: [], //设备类型 1:Android 2:iOS 3:未知
                demandFlowStylesChoosed: [] //流量样式
            },
            multipleSelection: [],
            checked: true
        };
    },
    computed: {
        ...mapState({
            terrainResult: "terrainResult"
        })
    },
    components: {
        vLocal
    },
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser",
            "addCities",
            "updateTerrain"
        ]),

        getSubData(value) {
            _.forEach(this.flowData, item => {
                _.forEach(value, s => {
                    if (s == item.name) {
                        this.sizeList = _.concat(
                            this.sizeList,
                            item.banner,
                            item.native_num,
                            item.native_video,
                            item.video,
                            item.native_text
                        );
                    }
                });
            });

            this.sizeList = _.map(_.cloneDeep(this.sizeList), val => {
                return {
                    checked: false,
                    size: val.wh,
                    name: val.name,
                    id: val.cast_id,
                    style_id: val.style_id
                };
            });

        },
        handleCheckedCitiesChange(value) {
            this.sizeList = [];
            this.getSubData(value);
            this.handleCheckedAdChange(this.checkedStyle);
        },

        getSizeData(resourceData, checked) {
            let result = [];
            _.forEach(checked, p => {
                _.forEach(resourceData, s => {
                    if (p == s.id) {
                        _.forEach(s.plantInfoStyles, item => {
                            result.push(item);
                        });
                    }
                });
            });

            return result;
        },
        handleCheckedFlowChange() {},
        handleCheckedEquipChange() {},
        handleCheckedAdChange(value) {
            // this.tableData = this.filterDataByKey(getKeyByValue(this.adStyle, value));
            // console.log(value);
            // console.log(this.adStyle);
            // console.log(this.filterDataByKey(getKeyByValue(this.adStyle, value)));

            this.tableData = this.getTableData(this.filterDataByKey(getKeyByValue(this.adStyle, value)));

        },

        getTableData(val) {
            let data = [];
            let groupData = _.groupBy(val, "size");

            _.forEach(groupData, (value, key) => {
                let name = [],
                    id = "",
                    checked = false;

                _.forEach(value, (s, index) => {

                    if ((index + 1) == value.length) {
                        // name += s.name;
                        id += s.style_id;

                    } else {
                        // name += s.name + ",";
                        id += s.style_id + ",";
                    }

                    if (s.checked) {
                        checked = s.checked;
                    }

                    name.push(s.name);

                });

                data.push({
                    checked: checked,
                    id: id,
                    name: _.uniq(name).toString(),
                    size: key
                });

            });

            return data;

        },
        filterDataByKey(val) {

            let result = [];
            _.forEach(val, item => {
                _.forEach(this.sizeList, s => {
                    if (item == s.id) {
                        result.push(s);
                    }
                });
            });

            return result;
        },
        handleClick() {
            if (this.activeNamebudget == "1-1") {
                //this.form.area = "";
                this.updateTerrain([]);
                this.$refs.vlocal.clearLocal();
            }

            if (this.activeNamebudget == "1-2") {}
        },
        allClear() {
            this.updateTerrain([]);
            this.$refs.vlocal.clearLocal();
        },
        isUpload() {},
        selectLogo() {},
        uploadLogo() {},
        clearInput() {},
        modifyStatus(val, flag) {},
        handleSelectionChange(val) {
            _.forEach(this.tableData, p => {
                if (val.length > 0) {
                    _.forEach(val, s => {
                        if (p.size == s.size) {
                            p.checked = true;
                        }
                    });
                } else {
                    p.checked = false;
                }
            });

            if (this.multipleSelection.length > 0) {
                this.isLighten = true;

            } else {
                this.isLighten = false;

            }
        },
        open() {},
        close() {},
        del() {},
        searchDataByName() {},
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        getAllCitiesIds(data) {
            let parent = [];
            let sub = [];
            _.forEach(data, function (value) {
                parent.push(value.region_id);
                if (value.chiled) {
                    _.forEach(value.chiled, function (subValue) {
                        sub.push(subValue.region_id);
                    });
                }
            });

            return {
                pro_id: parent,
                city: sub
            };
        },
        onSubmit() {

            // console.log(this.checkedStyle);
            // console.log(this.adStyle);
            // return;
            let isValidateForm = validateForm(
                [{
                    key: this.checkedSource.length == 0 ? false : true,
                    value: "请选择流量来源!"
                }],
                this
            );

            let styleList = _.filter(this.tableData, val => {
                return val.checked;
            });

            // let styleData = _.map(styleList, val => {
            //     return {
            //         size: val.size,
            //         style_name: val.name,
            //         style_ids: val.id
            //     }
            // });

            // console.log(styleList);
            // console.log(styleData);
            // return;

            if (isValidateForm) {
                let data = {
                    id: this.form.id ? parseInt(this.form.id) : undefined,
                    demandinfo_id: this.form.demandinfo_id ?
                        parseInt(this.form.demandinfo_id) : parseInt(this.$route.params.id),
                    flow_source: getKeyByValue(
                        this.flowSource,
                        this.checkedSource
                    ).toString(),
                    device_type: getKeyByValue(
                        this.flowDevice,
                        this.checedDevice
                    ).toString(),
                    flow_type: getKeyByValue(this.flowType, this.checkedType).toString(),
                    adlist_type: getKeyByValue(
                        this.adStyle,
                        this.checkedStyle
                    ).toString(),

                    areaVO: this.$store.state.terrainResult.length == 0 ?
                        undefined : this.getAllCitiesIds(this.$store.state.terrainResult),

                    demandFlowStylesChoosed: styleList.length == 0 ? undefined : _.map(styleList, val => {
                        return {
                            size: val.size,
                            style_name: val.name,
                            style_ids: val.id
                        }
                    })
                };

                flow.editSetFlowTtem(this.header, data).then(res => {

                    if (res.data.data && res.data.data.code == "401") {
                        this.$switchLogin("", this);
                        return;
                    }
                    if (res.data.data && res.data.data.code == "402") {
                        this.$message(res.data.data.error);
                        return;
                    }
                    callback(
                        res.data,
                        () => {
                            this.updateTerrain([]);
                            this.$router.go(-1);
                        },
                        this
                    );
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        changStatus() {},
        getCityData(res, checked) {
            let checkedCityList = [];
            _.forEach(checked.pro_id, function (checkedItem) {
                _.forEach(res, function (resourDataItem) {
                    if (checkedItem == resourDataItem.region_id) {
                        let checkedSubCity = [];
                        let checkedCity = _.cloneDeep(resourDataItem);
                        _.forEach(checked.city, function (checkedSub) {
                            _.forEach(resourDataItem.chiled, function (resSub) {
                                if (checkedSub == resSub.region_id) {
                                    checkedSubCity.push(resSub);
                                }
                            });
                            checkedCity.chiled = checkedSubCity;
                        });
                        checkedCityList.push(checkedCity);
                    }
                });
            });

            return checkedCityList;
        },
        async initData() {
            this.updateTerrain([]);
            const getData = await flow.getSetFlowItem(this.header, {
                id: this.$route.params.id
            });

            const platList = await common.getPlatFormList(this.header, {
                id: this.$route.params.id
            });
            const [item, plat] = await Promise.all([getData, platList]);

            this.flowSource = _.map(plat.data.data, val => {
                return {
                    key: val.id,
                    value: val.name,
                    img: val.logo
                };
            });

            //流量设置编辑
            if (item.data.data) {
                let data = item.data.data;
                //流量来源

                let flowId = _.map(data.flow_source.split(","), val => {
                    return parseInt(val);
                });
                this.checkedSource = getValueByKey(
                    _.map(plat.data.data, val => {
                        return {
                            key: val.id,
                            value: val.name
                        };
                    }),
                    flowId
                );

                //流量设备

                this.checedDevice = getValueByKey(
                    this.flowDevice,
                    data.device_type.split(",")
                );
                let checkedItem = _.map(data.device_type.split(","), val => {
                    return parseInt(val);
                });

                //设备类型
                this.checkedType = getValueByKey(
                    this.flowType,
                    data.flow_type.split(",")
                );

                //广告样式
                this.checkedStyle = getValueByKey(
                    this.adStyle,
                    data.adlist_type.split(",")
                );

                //地域
                let city = _.cloneDeep(this.$store.state.terrainSourceData)

                if (data.areaVO) {
                    let checkedCity = this.getCityData(city, data.areaVO);
                    this.$store.state.terrainResult = checkedCity;
                    this.$refs.vlocal.init(city, checkedCity);

                    if (checkedCity.length > 0) {
                        this.activeNamebudget = "1-2";
                    }
                }

                this.form.id = data.id;
                this.form.demandinfo_id = data.demandinfo_id;

                this.flowData = plat.data.data;
                this.getSubData(this.checkedSource);

                //尺寸 列表
                this.handleCheckedAdChange(this.checkedStyle);

                this.handleSelectionChange(_.map(item.data.data.demandFlowStylesChoosed, val => {

                    return {
                        size: val.size,
                        //name: val.style,
                        //id: val.ope_user_id
                    };

                }));
            } else {
                this.flowData = plat.data.data;
                // this.getSubData(this.checkedSource);

                //尺寸 列表
                // this.handleCheckedAdChange(this.checkedStyle);
            }

            // //尺寸 列表
            // this.handleCheckedAdChange(this.checkedStyle);

            // this.handleSelectionChange(_.map(item.data.data.demandFlowStylesChoosed, val => {

            //     return {
            //         size: val.size,
            //         //name: val.style,
            //         //id: val.ope_user_id
            //     };

            // }));
        }
    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.initData();
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

.flow-set {

    // background color set
    .el-main {
        background: transparent;
    }

    .el-col-24 {
        background-color: #ffffff;
    }

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .template-hd {
        padding: 17px 0 16px 30px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 30px 30px;
    }

    // single row
    .create-row {
        margin-bottom: 13px;
    }

    // flow source
    .flow-source {
        .el-checkbox-group {
            padding: 20px 30px 17px;
        }

        .flow-hd-needed {
            color: $redc;
            display: inline-block;
            width: 7px;
            margin-left: 7px;
            vertical-align: -3px;
        }

        .put-img {
            margin-bottom: 6px;
            border: 1px solid #e1e7f0;
            border-radius: 5px;
            display: block;
        }

        .el-checkbox__input {
            vertical-align: 13px;
        }

        .flow-source-name {
            width: 100px;
            display: inline-block;
            white-space: normal;
            @include sc(12px, #515974);
        }

        .is-checked .put-img {
            border: 1px solid #6cabff;
            background-color: #f0f6ff;
        }

        .el-checkbox+.el-checkbox {
            margin-left: 20px;
        }
    }

    // basic setting
    .basic-setting {
        .el-checkbox-group {
            display: inline-block;
        }

        .el-checkbox__label {
            @include sc(12px, #515974);
        }

        .el-checkbox+.el-checkbox {
            margin-left: 20px;
        }

        .data-item {
            color: $firstc;
            margin-right: 6px;
            width: 71px;
            display: inline-block;
        }

        .create-row {
            margin-bottom: 16px;
        }

        .create-row:last-child {
            margin-bottom: 0;
        }
    }

    //size
    .size-module {
        border-bottom: 1px solid #e1e7f0;

        .template-hd {
            border-bottom-width: 0;
        }

        .el-table {
            th:first-child .cell {
                padding-left: 40px;
            }

            td:first-child .cell {
                padding-left: 30px;
            }
        }
    }

    // orientation
    .orientation-wrap {
        position: relative;

        .base-bd {
            padding: 18px 0 20px 30px;
        }

        // tabs
        .el-tabs--card>.el-tabs__header {
            border: 0 none;
            margin-bottom: 6px;
        }

        .el-tabs--card>.el-tabs__header .el-tabs__nav,
        .el-tabs--card>.el-tabs__header .el-tabs__item {
            border: 0 none;
        }

        .el-tabs__header .el-tabs__item {
            padding: 0 0 0 9px;

            &:first-child {
                padding: 0;
            }
        }

        .select-item {
            @include sc(12px, #515974);
            display: inline-block;
            height: 32px;
            line-height: 32px;
            padding: 0 30px;
            border: 1px solid #e9ecf0;
            border-radius: 5px; // float: left;
        }

        .is-active .select-item {
            background-color: #ecf3fb;
            border: 1px solid #6cabff;
            color: #6cabff;
        }

        //tabs end
    }

    // area direct content left
    .re-orientation-item {
        width: 300px;

        .orientation-bd {
            height: 363px;
            border: 1px solid #e1e7f0;
            border-top: 0 none;
            @include bottomLeftRadius(5px);
            @include bottomRightRadius(5px);

            .el-col-12:first-child {
                border-right: 1px solid #e1e7f0;
            }
        }

        .el-checkbox {
            display: block;
            padding: 8px 0 8px 20px;

            &.is-checked,
            &:hover {
                background-color: #f6f8fa;

                .el-checkbox__label {
                    color: #515974;
                }
            }
        }

        .el-input {
            width: 100%;
        }

        .el-checkbox__label {
            font-size: 12px;

            .el-icon-arrow-right {
                position: absolute;
                top: 39%;
                right: 7px;
                margin-top: -1px;
            }
        }

        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }

        .el-input__inner {
            padding-left: 12px !important;
            @include bottomRightRadius(0);
            @include bottomLeftRadius(0);
        }

        .el-checkbox-group {
            padding: 0 0 8px;
        }

        // district head
        .district-hd {
            height: 38px;
            line-height: 38px;
            border: 1px solid #e1e7f0;
            padding-left: 19px;

            span {
                @include sc(12px, #7f8599);
            }
        }

        .district-bd {
            border-right: 1px solid #e1e7f0;
        }

        .el-col-8 {
            height: 100%;

            &:last-child .district-hd {
                border-right: 0 none;
            }
        }

        .el-col-12 {

            &:nth-child(2) .district-hd,
            &:nth-child(2) .district-bd {
                border-left: 0 none;
            }
        }
    }

    // area direct content right
    .area-list {
        margin-left: 340px;
        border: 1px solid #e1e7f0;
        position: relative;
        border-radius: 5px;
        max-width: 584px;

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

            .clear-all {
                @include sc(12px, #e95058);
                cursor: pointer;
            }
        }

        .inferior-bd {
            padding: 0 0 0 20px;
            height: 363px;
            overflow-y: hidden;
        }

        .el-checkbox-group {
            padding: 7px 0 8px;
        }

        .area-item-row {
            &:first-child {
                padding: 7px 0 10px;
            }

            .search-item {
                padding: 0 15px 0 19px;
                height: 36px;
                line-height: 36px;
                position: relative;
                cursor: pointer;

                &:hover {
                    background-color: #f6f8fa;
                }
            }

            .account-name {
                @include sc(12px, #515974);
            }

            .el-icon-close {
                color: #515974;
                position: absolute;
                top: 12px;
                right: 13px;
                cursor: pointer;
            }

            .area-province {
                padding: 10px 0 2px;
            }

            .el-checkbox {
                margin: 0 20px 15px 0;
            }
        }
    }

    .el-input--suffix {
        margin-right: 5px;
    }

    // confirm and cancel
    .is-confirm {
        padding-left: 30px;
    }
}
</style>
