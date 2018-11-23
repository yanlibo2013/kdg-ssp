<template>
    <div class="re-orientation-item left">
        <el-input placeholder="搜索内容..." prefix-icon="el-icon-search" v-model="search" clearable @change="searchDataBykeyword(search)">
        </el-input>
        <div class="orientation-bd innerbox clear">
            <el-col :span="12">
                <div class="label-wrap clear">
                    <el-checkbox class="left " v-model="checkAll" @change="handleCheckAllData">全选</el-checkbox>
                </div>
                <!-- <el-checkbox :indeterminate="item.isIndeterminate" :v-model="item.checkAll" @change="handleCheckAllChange(item.id)" v-for="item in resourceData" :key="item.name">{{item.name}}</el-checkbox> -->
                <el-checkbox :indeterminate="isIndeterminatebeijing" v-model="checkAllbeijing" @change='handleCheckAllChange("北京市")' v-show='isshow.join(",").indexOf("北京市")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("北京市")'>北京市</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatetianjing" v-model="checkAlltianjing" @change='handleCheckAllChange("天津市")' v-show='isshow.join(",").indexOf("天津市")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("天津市")'>天津市</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatehebei" v-model="checkAllhebei" @change='handleCheckAllChange("河北省")' v-show='isshow.join(",").indexOf("河北省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("河北省")'>河北省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateshanxi" v-model="checkAllshanxi" @change='handleCheckAllChange("山西省")' v-show='isshow.join(",").indexOf("河北省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("山西省")'>山西省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateneimeng" v-model="checkAllneimeng" @change='handleCheckAllChange("内蒙古自治区")' v-show='isshow.join(",").indexOf("内蒙古自治区")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("内蒙古自治区")'>内蒙古自治区</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateliaoning" v-model="checkAllliaoning" @change='handleCheckAllChange("辽宁省")' v-show='isshow.join(",").indexOf("辽宁省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("辽宁省")'>辽宁省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatejiling" v-model="checkAlljiling" @change='handleCheckAllChange("吉林省")' v-show='isshow.join(",").indexOf("吉林省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("吉林省")'>吉林省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateheilongjiang" v-model="checkAllheilongjiang" @change='handleCheckAllChange("黑龙江省")' v-show='isshow.join(",").indexOf("黑龙江省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("黑龙江省")'>黑龙江省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateshanghai" v-model="checkAllshanghai" @change='handleCheckAllChange("上海市")' v-show='isshow.join(",").indexOf("上海市")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("上海市")'>上海市</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatejiangsu" v-model="checkAlljiangsu" @change='handleCheckAllChange("江苏省")' v-show='isshow.join(",").indexOf("江苏省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("江苏省")'>江苏省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatezhejiang" v-model="checkAllzhejiang" @change='handleCheckAllChange("浙江省")' v-show='isshow.join(",").indexOf("浙江省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("浙江省")'>浙江省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateanhui" v-model="checkAllanhui" @change='handleCheckAllChange("安徽省")' v-show='isshow.join(",").indexOf("安徽省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("安徽省")'>安徽省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatefujian" v-model="checkAllfujian" @change='handleCheckAllChange("福建省")' v-show='isshow.join(",").indexOf("福建省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("福建省")'>福建省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatejiangxi" v-model="checkAlljiangxi" @change='handleCheckAllChange("江西省")' v-show='isshow.join(",").indexOf("江西省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("江西省")'>江西省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateshandong" v-model="checkAllshandong" @change='handleCheckAllChange("山东省")' v-show='isshow.join(",").indexOf("山东省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("山东省")'>山东省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatehenan" v-model="checkAllhenan" @change='handleCheckAllChange("河南省")' v-show='isshow.join(",").indexOf("河南省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("河南省")'>河南省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatehubei" v-model="checkAllhubei" @change='handleCheckAllChange("湖北省")' v-show='isshow.join(",").indexOf("湖北省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("湖北省")'>湖北省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatehunan" v-model="checkAllhunan" @change='handleCheckAllChange("湖南省")' v-show='isshow.join(",").indexOf("湖南省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("湖南省")'>湖南省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateguangdong" v-model="checkAllguangdong" @change='handleCheckAllChange("广东省")' v-show='isshow.join(",").indexOf("广东省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("广东省")'>广东省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateguangxi" v-model="checkAllguangxi" @change='handleCheckAllChange("广西壮族自治区")' v-show='isshow.join(",").indexOf("广西壮族自治区")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("广西壮族自治区")'>广西壮族自治区</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatehainan" v-model="checkAllhainan" @change='handleCheckAllChange("海南省")' v-show='isshow.join(",").indexOf("海南省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("海南省")'>海南省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatechongqing" v-model="checkAlchongqing" @change='handleCheckAllChange("重庆市")' v-show='isshow.join(",").indexOf("重庆市")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("重庆市")'>重庆市</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatesichong" v-model="checkAllsichong" @change='handleCheckAllChange("四川省")' v-show='isshow.join(",").indexOf("四川省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("四川省")'>四川省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatezhuizhou" v-model="checkAllguizhou" @change='handleCheckAllChange("贵州省")' v-show='isshow.join(",").indexOf("贵州省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("贵州省")'>贵州省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateyunnan" v-model="checkAllyunnan" @change='handleCheckAllChange("云南省")' v-show='isshow.join(",").indexOf("云南省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("云南省")'>云南省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatexizang" v-model="checkAllxizang" @change='handleCheckAllChange("西藏自治区")' v-show='isshow.join(",").indexOf("西藏自治区")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("西藏自治区")'>西藏自治区</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateshanxi2" v-model="checkAllshanxi2" @change='handleCheckAllChange("陕西省")' v-show='isshow.join(",").indexOf("陕西省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("陕西省")'>陕西省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminategansu" v-model="checkAllgansu" @change='handleCheckAllChange("甘肃省")' v-show='isshow.join(",").indexOf("甘肃省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("甘肃省")'>甘肃省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateqinhai" v-model="checkAllqinghai" @change='handleCheckAllChange("青海省")' v-show='isshow.join(",").indexOf("青海省")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("青海省")'>青海省</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateningxia" v-model="checkAllningxia" @change='handleCheckAllChange("宁夏回族自治区")' v-show='isshow.join(",").indexOf("宁夏回族自治区")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("宁夏回族自治区")'>宁夏回族自治区</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatexinjiang" v-model="checkAllxinjiang" @change='handleCheckAllChange("新疆维吾尔自治区")' v-show='isshow.join(",").indexOf("新疆维吾尔自治区")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("新疆维吾尔自治区")'>新疆维吾尔自治区</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatexianggang" v-model="checkAllxianggang" @change='handleCheckAllChange("香港")' v-show='isshow.join(",").indexOf("香港")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("香港")'>香港</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminateaomeng" v-model="checkAllaomeng" @change='handleCheckAllChange("澳门")' v-show='isshow.join(",").indexOf("澳门")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("澳门")'>澳门</div>
                </el-checkbox>
                <el-checkbox :indeterminate="isIndeterminatetaiwan" v-model="checkAlltaiwan" @change='handleCheckAllChange("台湾")' v-show='isshow.join(",").indexOf("台湾")>-1'>
                    <div class="checkbox__label" v-on:mouseover='preview("台湾")'>台湾</div>
                </el-checkbox>
            </el-col>
            <el-col :span="12">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <!-- <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox> -->
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    common
} from "../../../service/index";
import _ from "lodash";
import store from 'store';
import {
    cloneObj
} from "../../../common/utils";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
    data() {
        return {
            header: "",
            search: "",
            currentItem: "",
            checkAll: "",
            //北京市
            checkAllbeijing: false,
            isIndeterminatebeijing: false,
            //天津市
            checkAlltianjing: false,
            isIndeterminatetianjing: false,
            //河北省
            checkAllhebei: false,
            isIndeterminatehebei: false,
            //山西省
            checkAllshanxi: false,
            isIndeterminateshanxi: false,
            //内蒙古自治区
            checkAllneimeng: false,
            isIndeterminateneimeng: false,
            //辽宁省
            checkAllliaoning: false,
            isIndeterminateliaoning: false,
            //吉林省
            checkAlljiling: false,
            isIndeterminatejiling: false,
            //黑龙江省
            checkAllheilongjiang: false,
            isIndeterminateheilongjiang: false,
            //上海市
            checkAllshanghai: false,
            isIndeterminateshanghai: false,
            //江苏省
            checkAlljiangsu: false,
            isIndeterminatejiangsu: false,
            //浙江省
            checkAllzhejiang: false,
            isIndeterminatezhejiang: false,
            //安徽省
            checkAllanhui: false,
            isIndeterminateanhui: false,
            //福建省
            checkAllfujian: false,
            isIndeterminatefujian: false,
            //江西省
            checkAlljiangxi: false,
            isIndeterminatejiangxi: false,
            //山东省
            checkAllshandong: false,
            isIndeterminateshandong: false,
            //河南省
            checkAllhenan: false,
            isIndeterminatehenan: false,
            //湖北省
            checkAllhubei: false,
            isIndeterminatehubei: false,
            //湖南省
            checkAllhunan: false,
            isIndeterminatehunan: false,
            //广东省
            checkAllguangdong: false,
            isIndeterminateguangdong: false,
            //广西壮族自治区
            checkAllguangxi: false,
            isIndeterminateguangxi: false,
            //海南省
            checkAllhainan: false,
            isIndeterminatehainan: false,
            //重庆市
            checkAlchongqing: false,
            isIndeterminatechongqing: false,
            //四川省
            checkAllsichong: false,
            isIndeterminatesichong: false,
            //贵州省
            checkAllguizhou: false,
            isIndeterminatezhuizhou: false,
            //云南省
            checkAllyunnan: false,
            isIndeterminateyunnan: false,
            //西藏自治区
            checkAllxizang: false,
            isIndeterminatexizang: false,
            //陕西省
            checkAllshanxi2: false,
            isIndeterminateshanxi2: false,
            //甘肃省
            checkAllgansu: false,
            isIndeterminategansu: false,
            //青海省
            checkAllqinghai: false,
            isIndeterminateqinhai: false,
            //宁夏回族自治区
            checkAllningxia: false,
            isIndeterminateningxia: false,
            //新疆维吾尔自治区
            checkAllxinjiang: false,
            isIndeterminatexinjiang: false,
            //香港
            checkAllxianggang: false,
            isIndeterminatexianggang: false,
            //澳门
            checkAllaomeng: false,
            isIndeterminateaomeng: false,
            //台湾
            checkAlltaiwan: false,
            isIndeterminatetaiwan: false,
            //公用 存放数据
            checkedCities: [],
            cities: [],
            parent: [],
            filterData: [],

            //否首次操作初始化数据

            isInitHebei: true,
            isInitshanxi: true,
            resourceData: []
        };
    },
    props: ["isShow"],
    methods: {
        ...mapActions(["addCities", "getAllProvinceCities"]),
        preview(val) {
            this.currentItem = val;

            _.forEach(this.resourceData, (value, key) => {
                if (value.name == val) {
                    this.cities = this.getData(value.chiled);
                    this.checkedCities = this.getCheckedItem(val);
                }
            });
        },
        searchDataBykeyword(val) {
            let data = _.filter(this.parent, function (item) {
                return item.indexOf(val) > -1;
            });
            this.filterData = data;
            //console.log(this.filterData);
        },
        add(self, key, name, data) {
            self.addCities({
                key: key,
                type: "parent",
                name: name,
                data: data
            });
        },
        //    add(self, data) {
        //        console.log("///////////////////////");
        //        console.log(data);
        //       self.addCities(data);

        // },
        isFirstParentAdd(val) {
            // console.log("isFirstParentAdd");
            // console.log(_.cloneDeep(this.terrainResult));

            let isAdd = true;
            let item = "";

            _.forEach(_.cloneDeep(this.terrainResult), item => {
                if (item.name == val) {
                    isAdd = false;
                    item = item;
                }
            });

            // return {
            //     isAdd:isAdd,
            //     item:item
            // };

            return isAdd;
        },
        handleCheckAllData(val) {
            if (val) {
                this.$store.state.terrainResult = _.cloneDeep(this.resourceData);
                this.init(
                    this.$store.state.terrainSourceData,
                    this.$store.state.terrainResult
                );
            } else {
                this.clearLocal();
                this.$store.state.terrainResult = [];
            }
        },
        getCityDataByName(data) {
            let result = [];
            let currentItem = {};
            let subItem = [];
            _.forEach(this.resourceData, val => {
                if (val.name == data.parent) {
                    currentItem = _.cloneDeep(val);
                    _.forEach(val.chiled, sub => {
                        _.forEach(data.sub, checkedSub => {
                            if (sub.name == checkedSub) {
                                subItem.push(sub);
                            }
                        });
                    });
                    currentItem.chiled = subItem;
                }
            });

            return currentItem;
        },
        getCheckedItem(val) {
            let result = [];
            _.forEach(_.cloneDeep(this.terrainResult), item => {
                if (item.name == val) {
                    _.forEach(_.cloneDeep(item.chiled), s => {
                        result.push(s.name);
                    });
                }
            });
            return result;
        },
        handleCheckAllChange(val) {
            this.currentItem = val;
            let self = this;
            _.forEach(this.resourceData, function (value, key) {
                if (value.name == val) {
                    self.cities = self.getData(value.chiled);
                    if (val == "北京市") {
                        self.checkedCities = self.checkAllbeijing ? self.cities : [];
                        self.isIndeterminatebeijing = false;
                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "天津市") {
                        self.checkedCities = self.checkAlltianjing ? self.cities : [];
                        self.isIndeterminatetianjing = false;
                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "河北省") {
                        self.checkedCities = self.checkAllhebei ? self.cities : [];
                        self.isIndeterminatehebei = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "山西省") {
                        self.checkedCities = self.checkAllshanxi ? self.cities : [];
                        self.isIndeterminateshanxi = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });

                    }
                    if (val == "内蒙古自治区") {
                        self.checkedCities = self.checkAllneimeng ? self.cities : [];
                        self.isIndeterminateneimeng = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    //辽宁省
                    if (val == "辽宁省") {
                        self.checkedCities = self.checkAllliaoning ? self.cities : [];
                        self.isIndeterminateliaoning = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "吉林省") {
                        self.checkedCities = self.checkAlljiling ? self.cities : [];
                        self.isIndeterminatejiling = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "黑龙江省") {
                        self.checkedCities = self.checkAllheilongjiang ? self.cities : [];
                        self.isIndeterminateheilongjiang = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "上海市") {
                        self.checkedCities = self.checkAllshanghai ? self.cities : [];
                        self.isIndeterminateshanghai = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "江苏省") {
                        self.checkedCities = self.checkAlljiangsu ? self.cities : [];
                        self.isIndeterminatejiangsu = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "浙江省") {
                        self.checkedCities = self.checkAllzhejiang ? self.cities : [];
                        self.isIndeterminatezhejiang = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "安徽省") {
                        self.checkedCities = self.checkAllanhui ? self.cities : [];
                        self.isIndeterminateanhui = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "福建省") {
                        self.checkedCities = self.checkAllfujian ? self.cities : [];
                        self.isIndeterminatefujian = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "江西省") {
                        self.checkedCities = self.checkAlljiangxi ? self.cities : [];
                        self.isIndeterminatejiangxi = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "山东省") {
                        self.checkedCities = self.checkAllshandong ? self.cities : [];
                        self.isIndeterminateshandong = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "河南省") {
                        self.checkedCities = self.checkAllhenan ? self.cities : [];
                        self.isIndeterminatehenan = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "湖北省") {
                        self.checkedCities = self.checkAllhubei ? self.cities : [];
                        self.isIndeterminatehubei = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "湖南省") {
                        self.checkedCities = self.checkAllhunan ? self.cities : [];
                        self.isIndeterminatehunan = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "广东省") {
                        self.checkedCities = self.checkAllguangdong ? self.cities : [];
                        self.isIndeterminateguangdong = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "广西壮族自治区") {
                        self.checkedCities = self.checkAllguangxi ? self.cities : [];
                        self.isIndeterminateguangxi = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "海南省") {
                        self.checkedCities = self.checkAllhainan ? self.cities : [];
                        self.isIndeterminatehainan = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "重庆市") {
                        self.checkedCities = self.checkAlchongqing ? self.cities : [];
                        self.isIndeterminatechongqing = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "四川省") {
                        self.checkedCities = self.checkAllsichong ? self.cities : [];
                        self.isIndeterminatesichong = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "贵州省") {
                        self.checkedCities = self.checkAllguizhou ? self.cities : [];
                        self.isIndeterminatezhuizhou = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "云南省") {
                        self.checkedCities = self.checkAllyunnan ? self.cities : [];
                        self.isIndeterminateyunnan = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "西藏自治区") {
                        self.checkedCities = self.checkAllxizang ? self.cities : [];
                        self.isIndeterminatexizang = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "陕西省") {
                        self.checkedCities = self.checkAllshanxi2 ? self.cities : [];
                        self.isIndeterminateshanxi2 = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "甘肃省") {
                        self.checkedCities = self.checkAllgansu ? self.cities : [];
                        self.isIndeterminategansu = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "青海省") {
                        self.checkedCities = self.checkAllqinghai ? self.cities : [];
                        self.isIndeterminateqinhai = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "宁夏回族自治区") {
                        self.checkedCities = self.checkAllningxia ? self.cities : [];
                        self.isIndeterminateningxia = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "新疆维吾尔自治区") {
                        self.checkedCities = self.checkAllxinjiang ? self.cities : [];
                        self.isIndeterminatexinjiang = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "香港") {
                        self.checkedCities = self.checkAllxianggang ? self.cities : [];
                        self.isIndeterminatexianggang = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "澳门") {
                        self.checkedCities = self.checkAllaomeng ? self.cities : [];
                        self.isIndeterminateaomeng = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                    if (val == "台湾") {
                        self.checkedCities = self.checkAlltaiwan ? self.cities : [];
                        self.isIndeterminatetaiwan = false;

                        let firstItem = self.isFirstParentAdd(val);
                        self.addCities({
                            isAdd: firstItem,
                            data: self.getCityDataByName({
                                parent: val,
                                sub: self.checkedCities
                            })
                        });
                    }
                }
            });
        },
        handleCheckedCitiesChange(item) {
            let checkedCount = item.length;
            if (this.currentItem == "北京市") {
                this.checkAllbeijing = checkedCount === this.cities.length;
                this.isIndeterminatebeijing =
                    checkedCount > 0 && checkedCount < this.cities.length;

                ;
            }
            if (this.currentItem == "天津市") {
                this.checkAlltianjing = checkedCount === this.cities.length;
                this.isIndeterminatetianjing =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "河北省") {
                this.checkAllhebei = checkedCount === this.cities.length;
                this.isIndeterminatehebei =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "山西省") {
                this.checkAllshanxi = checkedCount === this.cities.length;
                this.isIndeterminateshanxi =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "内蒙古自治区") {
                this.checkAllneimeng = checkedCount === this.cities.length;
                this.isIndeterminateneimeng =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "辽宁省") {
                this.checkAllliaoning = checkedCount === this.cities.length;
                this.isIndeterminateliaoning =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "吉林省") {
                this.checkAlljiling = checkedCount === this.cities.length;
                this.isIndeterminatejiling =
                    checkedCount > 0 && checkedCount < this.cities.length;;
            }
            if (this.currentItem == "黑龙江省") {
                this.checkAllheilongjiang = checkedCount === this.cities.length;
                this.isIndeterminateheilongjiang =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "上海市") {
                this.checkAllshanghai = checkedCount === this.cities.length;
                this.isIndeterminateshanghai =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "江苏省") {
                this.checkAlljiangsu = checkedCount === this.cities.length;
                this.isIndeterminatejiangsu =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "浙江省") {
                this.checkAllzhejiang = checkedCount === this.cities.length;
                this.isIndeterminatezhejiang =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "安徽省") {
                this.checkAllanhui = checkedCount === this.cities.length;
                this.isIndeterminateanhui =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "福建省") {
                this.checkAllfujian = checkedCount === this.cities.length;
                this.isIndeterminatefujian =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "江西省") {
                this.checkAlljiangxi = checkedCount === this.cities.length;
                this.isIndeterminatejiangxi =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "山东省") {
                this.checkAllshandong = checkedCount === this.cities.length;
                this.isIndeterminateshandong =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "河南省") {
                this.checkAllhenan = checkedCount === this.cities.length;
                this.isIndeterminatehenan =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "湖北省") {
                this.checkAllhubei = checkedCount === this.cities.length;
                this.isIndeterminatehubei =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "湖南省") {
                this.checkAllhunan = checkedCount === this.cities.length;
                this.isIndeterminatehunan =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "广东省") {
                this.checkAllguangdong = checkedCount === this.cities.length;
                this.isIndeterminateguangdong =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "广西壮族自治区") {
                this.checkAllguangxi = checkedCount === this.cities.length;
                this.isIndeterminateguangxi =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "海南省") {
                this.checkAllhainan = checkedCount === this.cities.length;
                this.isIndeterminatehainan =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "重庆市") {
                this.checkAlchongqing = checkedCount === this.cities.length;
                this.isIndeterminatechongqing =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "四川省") {
                this.checkAllsichong = checkedCount === this.cities.length;
                this.isIndeterminatesichong =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "贵州省") {
                this.checkAllguizhou = checkedCount === this.cities.length;
                this.isIndeterminatezhuizhou =
                    checkedCount > 0 && checkedCount < this.cities.length;
            }
            if (this.currentItem == "云南省") {
                this.checkAllyunnan = checkedCount === this.cities.length;
                this.isIndeterminateyunnan =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "西藏自治区") {
                this.checkAllxizang = checkedCount === this.cities.length;
                this.isIndeterminatexizang =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "陕西省") {
                this.checkAllshanxi2 = checkedCount === this.cities.length;
                this.isIndeterminateshanxi2 =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "甘肃省") {
                this.checkAllgansu = checkedCount === this.cities.length;
                this.isIndeterminategansu =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "青海省") {
                this.checkAllqinghai = checkedCount === this.cities.length;
                this.isIndeterminateqinhai =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "宁夏回族自治区") {
                this.checkAllningxia = checkedCount === this.cities.length;
                this.isIndeterminateningxia =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "新疆维吾尔自治区") {
                this.checkAllxinjiang = checkedCount === this.cities.length;
                this.isIndeterminatexinjiang =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "香港") {
                this.checkAllxianggang = checkedCount === this.cities.length;
                this.isIndeterminatexianggang =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "澳门") {
                this.checkAllaomeng = checkedCount === this.cities.length;
                this.isIndeterminateaomeng =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }
            if (this.currentItem == "台湾") {
                this.checkAlltaiwan = checkedCount === this.cities.length;
                this.isIndeterminatetaiwan =
                    checkedCount > 0 && checkedCount < this.cities.length;

            }

            let firstItem = this.isFirstParentAdd(this.currentItem);

            this.addCities({
                isAdd: firstItem,
                data: this.getCityDataByName({
                    parent: this.currentItem,
                    sub: item
                })
            });
        },
        getData(val) {
            let result = [];
            _.forEach(val, function (value, key) {
                result.push(value.name);
            });
            return result;
        },
        clearLocal() {
            // console.log("clearlocal");
            //北京
            this.checkAllbeijing = false;
            this.isIndeterminatebeijing = false;
            //天津
            this.checkAlltianjing = false;
            this.isIndeterminatetianjing = false;
            //河北
            this.checkAllhebei = false;
            this.isIndeterminatehebei = false;
            //山西省
            this.checkAllshanxi = false;
            this.isIndeterminateshanxi = false;
            //内蒙古自治区
            this.checkAllneimeng = false;
            this.isIndeterminateneimeng = false;
            //辽宁省
            this.checkAllliaoning = false;
            this.isIndeterminateliaoning = false;
            //吉林省
            this.checkAlljiling = false;
            this.isIndeterminatejiling = false;
            //黑龙江省
            this.checkAllheilongjiang = false;
            this.isIndeterminateheilongjiang = false;
            //上海市
            this.checkAllshanghai = false;
            this.isIndeterminateshanghai = false;
            //江苏省
            this.checkAlljiangsu = false;
            this.isIndeterminatejiangsu = false;
            //浙江省
            this.checkAllzhejiang = false;
            this.isIndeterminatezhejiang = false;
            //安徽省
            this.checkAllanhui = false;
            this.isIndeterminateanhui = false;
            //福建省
            this.checkAllfujian = false;
            this.isIndeterminatefujian = false;
            //江西省
            this.checkAlljiangxi = false;
            this.isIndeterminatejiangxi = false;
            //山东省
            this.checkAllshandong = false;
            this.isIndeterminateshandong = false;
            //河南省
            this.checkAllhenan = false;
            this.isIndeterminatehenan = false;
            //湖北省
            this.checkAllhubei = false;
            this.isIndeterminatehubei = false;
            //湖南省
            this.checkAllhunan = false;
            this.isIndeterminatehunan = false;
            //广东省
            this.checkAllguangdong = false;
            this.isIndeterminateguangdong = false;
            //广西壮族自治区
            this.checkAllguangxi = false;
            this.isIndeterminateguangxi = false;
            //海南省
            this.checkAllhainan = false;
            this.isIndeterminatehainan = false;
            //重庆市
            this.checkAlchongqing = false;
            this.isIndeterminatechongqing = false;
            //四川省
            this.checkAllsichong = false;
            this.isIndeterminatesichong = false;
            //贵州省
            this.checkAllguizhou = false;
            this.isIndeterminatezhuizhou = false;
            //云南省
            this.checkAllyunnan = false;
            this.isIndeterminateyunnan = false;
            //西藏自治区
            this.checkAllxizang = false;
            this.isIndeterminatexizang = false;
            //陕西省
            this.checkAllshanxi2 = false;
            this.isIndeterminateshanxi2 = false;
            //甘肃省
            this.checkAllgansu = false;
            this.isIndeterminategansu = false;
            //青海省
            this.checkAllqinghai = false;
            this.isIndeterminateqinhai = false;
            //宁夏回族自治区
            this.checkAllningxia = false;
            this.isIndeterminateningxia = false;
            //新疆维吾尔自治区
            this.checkAllxinjiang = false;
            this.isIndeterminatexinjiang = false;
            //香港
            this.checkAllxianggang = false;
            this.isIndeterminatexianggang = false;
            //澳门
            this.checkAllaomeng = false;
            this.isIndeterminateaomeng = false;
            //台湾
            this.checkAlltaiwan = false;
            this.isIndeterminatetaiwan = false;
            //公用 存放数据
            this.checkedCities = [];
            this.cities = [];
        },
        getSubCity(val) {
            let result = [];
            let data = _.forEach(val, function (value) {
                result.push(value.name);
            });
            //console.log(data);
            return result;
        },
        init(source, currentData) {
            let self = this;
            _.forEach(currentData, function (current) {
                _.forEach(source, function (item) {
                    if (current.name == item.name && current.name == "北京市") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            console.log("北京 全选");
                            self.checkAllbeijing = true;
                            self.isIndeterminatebeijing = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            console.log("北京 部分全选");
                            self.checkAllbeijing = true;
                            self.isIndeterminatebeijing = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //      console.log("北京 全部不选");
                        //     self.checkAllbeijing = false;
                        //     self.isIndeterminatebeijing = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "天津市") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlltianjing = true;
                            self.isIndeterminatetianjing = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlltianjing = true;
                            self.isIndeterminatetianjing = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAlltianjing = false;
                        //     self.isIndeterminatetianjing = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "河北省") {
                        console.log(current.name);
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            console.log("全选");
                            self.checkAllhebei = true;
                            self.isIndeterminatehebei = false;
                            //break;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            console.log("部分选择");
                            self.checkAllhebei = true;
                            self.isIndeterminatehebei = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            console.log("全部不选");
                            self.checkAllhebei = false;
                            self.isIndeterminatehebei = false;
                        }
                    }
                    if (current.name == item.name && current.name == "山西省") {
                        console.log("山西省");
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            console.log("全选");
                            self.checkAllshanxi = true;
                            self.isIndeterminateshanxi = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            console.log("部分选择");
                            self.checkAllshanxi = true;
                            self.isIndeterminateshanxi = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            console.log("全部不选");
                            self.checkAllshanxi = false;
                            self.isIndeterminateshanxi = false;
                        }
                    }
                    if (current.name == item.name && current.name == "内蒙古自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllneimeng = true;
                            self.isIndeterminateneimeng = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllneimeng = true;
                            self.isIndeterminateneimeng = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllneimeng = false;
                            self.isIndeterminateneimeng = false;
                        }
                    }
                    if (current.name == item.name && current.name == "内蒙古自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllneimeng = true;
                            self.isIndeterminateneimeng = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllneimeng = true;
                            self.isIndeterminateneimeng = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllneimeng = false;
                            self.isIndeterminateneimeng = false;
                        }
                    }
                    if (current.name == item.name && current.name == "辽宁省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllliaoning = true;
                            self.isIndeterminateliaoning = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllliaoning = true;
                            self.isIndeterminateliaoning = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllliaoning = false;
                            self.isIndeterminateliaoning = false;
                        }
                    }
                    if (current.name == item.name && current.name == "吉林省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlljiling = true;
                            self.isIndeterminatejiling = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlljiling = true;
                            self.isIndeterminatejiling = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAlljiling = false;
                            self.isIndeterminatejiling = false;
                        }
                    }
                    if (current.name == item.name && current.name == "黑龙江省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllheilongjiang = true;
                            self.isIndeterminateheilongjiang = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllheilongjiang = true;
                            self.isIndeterminateheilongjiang = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllheilongjiang = false;
                            self.isIndeterminateheilongjiang = false;
                        }
                    }
                    if (current.name == item.name && current.name == "上海市") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllshanghai = true;
                            self.isIndeterminateshanghai = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllshanghai = true;
                            self.isIndeterminateshanghai = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAllshanghai = false;
                        //     self.isIndeterminateshanghai = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "江苏省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlljiangsu = true;
                            self.isIndeterminatejiangsu = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlljiangsu = true;
                            self.isIndeterminatejiangsu = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAlljiangsu = false;
                            self.isIndeterminatejiangsu = false;
                        }
                    }
                    if (current.name == item.name && current.name == "浙江省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllzhejiang = true;
                            self.isIndeterminatezhejiang = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllzhejiang = true;
                            self.isIndeterminatezhejiang = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllzhejiang = false;
                            self.isIndeterminatezhejiang = false;
                        }
                    }
                    if (current.name == item.name && current.name == "安徽省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllanhui = true;
                            self.isIndeterminateanhui = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllanhui = true;
                            self.isIndeterminateanhui = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllanhui = false;
                            self.isIndeterminateanhui = false;
                        }
                    }
                    if (current.name == item.name && current.name == "福建省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllfujian = true;
                            self.isIndeterminatefujian = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllfujian = true;
                            self.isIndeterminatefujian = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllfujian = false;
                            self.isIndeterminatefujian = false;
                        }
                    }
                    if (current.name == item.name && current.name == "江西省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlljiangxi = true;
                            self.isIndeterminatejiangxi = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlljiangxi = true;
                            self.isIndeterminatejiangxi = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAlljiangxi = false;
                            self.isIndeterminatejiangxi = false;
                        }
                    }
                    if (current.name == item.name && current.name == "山东省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllshandong = true;
                            self.isIndeterminateshandong = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllshandong = true;
                            self.isIndeterminateshandong = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllshandong = false;
                            self.isIndeterminatejiangxi = false;
                        }
                    }
                    if (current.name == item.name && current.name == "河南省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllhenan = true;
                            self.isIndeterminatehenan = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllhenan = true;
                            self.isIndeterminatehenan = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllhenan = false;
                            self.isIndeterminatehenan = false;
                        }
                    }
                    if (current.name == item.name && current.name == "湖北省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllhubei = true;
                            self.isIndeterminatehubei = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllhubei = true;
                            self.isIndeterminatehubei = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllhubei = false;
                            self.isIndeterminatehubei = false;
                        }
                    }
                    if (current.name == item.name && current.name == "湖南省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllhunan = true;
                            self.isIndeterminatehunan = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllhunan = true;
                            self.isIndeterminatehunan = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllhunan = false;
                            self.isIndeterminatehunan = false;
                        }
                    }
                    if (current.name == item.name && current.name == "广东省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllguangdong = true;
                            self.isIndeterminateguangdong = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllguangdong = true;
                            self.isIndeterminateguangdong = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllguangdong = false;
                            self.isIndeterminateguangdong = false;
                        }
                    }
                    if (current.name == item.name && current.name == "广西壮族自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllguangxi = true;
                            self.isIndeterminateguangxi = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllguangxi = true;
                            self.isIndeterminateguangxi = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllguangxi = false;
                            self.isIndeterminateguangxi = false;
                        }
                    }
                    if (current.name == item.name && current.name == "海南省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllhainan = true;
                            self.isIndeterminatehainan = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllhainan = true;
                            self.isIndeterminatehainan = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllhainan = false;
                            self.isIndeterminatehainan = false;
                        }
                    }
                    if (current.name == item.name && current.name == "重庆市") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlchongqing = true;
                            self.isIndeterminatechongqing = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlchongqing = true;
                            self.isIndeterminatechongqing = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAlchongqing = false;
                        //     self.isIndeterminatechongqing = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "四川省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllsichong = true;
                            self.isIndeterminatesichong = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllsichong = true;
                            self.isIndeterminatesichong = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllsichong = false;
                            self.isIndeterminatesichong = false;
                        }
                    }
                    if (current.name == item.name && current.name == "贵州省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllguizhou = true;
                            self.isIndeterminatezhuizhou = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllguizhou = true;
                            self.isIndeterminatezhuizhou = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllguizhou = false;
                            self.isIndeterminatezhuizhou = false;
                        }
                    }
                    if (current.name == item.name && current.name == "云南省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllyunnan = true;
                            self.isIndeterminateyunnan = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllyunnan = true;
                            self.isIndeterminateyunnan = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllyunnan = false;
                            self.isIndeterminateyunnan = false;
                        }
                    }
                    if (current.name == item.name && current.name == "西藏自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllxizang = true;
                            self.isIndeterminatexizang = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllxizang = true;
                            self.isIndeterminatexizang = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllxizang = false;
                            self.isIndeterminatexizang = false;
                        }
                    }
                    if (current.name == item.name && current.name == "陕西省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllshanxi2 = true;
                            self.isIndeterminateshanxi2 = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllshanxi2 = true;
                            self.isIndeterminateshanxi2 = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllshanxi2 = false;
                            self.isIndeterminateshanxi2 = false;
                        }
                    }
                    if (current.name == item.name && current.name == "甘肃省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllgansu = true;
                            self.isIndeterminategansu = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllgansu = true;
                            self.isIndeterminategansu = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllgansu = false;
                            self.isIndeterminategansu = false;
                        }
                    }
                    if (current.name == item.name && current.name == "青海省") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllqinghai = true;
                            self.isIndeterminateqinhai = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllqinghai = true;
                            self.isIndeterminateqinhai = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllqinghai = false;
                            self.isIndeterminateqinhai = false;
                        }
                    }
                    if (current.name == item.name && current.name == "宁夏回族自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllningxia = true;
                            self.isIndeterminateningxia = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllningxia = true;
                            self.isIndeterminateningxia = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllningxia = false;
                            self.isIndeterminateningxia = false;
                        }
                    }
                    if (current.name == item.name && current.name == "新疆维吾尔自治区") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllxinjiang = true;
                            self.isIndeterminatexinjiang = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllxinjiang = true;
                            self.isIndeterminatexinjiang = true;
                        }
                        //全部不选
                        if (current.chiled.length == 0) {
                            self.checkAllxinjiang = false;
                            self.isIndeterminatexinjiang = false;
                        }
                    }
                    if (current.name == item.name && current.name == "香港") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllxianggang = true;
                            self.isIndeterminatexianggang = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllxianggang = true;
                            self.isIndeterminatexianggang = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAllxianggang = false;
                        //     self.isIndeterminatexianggang = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "澳门") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAllaomeng = true;
                            self.isIndeterminateaomeng = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAllaomeng = true;
                            self.isIndeterminateaomeng = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAllaomeng = false;
                        //     self.isIndeterminateaomeng = false;
                        // }
                    }
                    if (current.name == item.name && current.name == "台湾") {
                        //全选
                        if (item.chiled.length == current.chiled.length) {
                            self.checkAlltaiwan = true;
                            self.isIndeterminatetaiwan = false;
                        }
                        //部分选择
                        if (item.chiled.length > current.chiled.length) {
                            self.checkAlltaiwan = true;
                            self.isIndeterminatetaiwan = true;
                        }
                        //全部不选
                        // if (current.chiled.length == 0) {
                        //     self.checkAlltaiwan = false;
                        //     self.isIndeterminatetaiwan = false;
                        // }
                    }
                    //初始化数组元素最后一项
                    let last = _.last(currentData);
                    if (item.name == last.name) {
                        //初始化
                        self.checkedCities = self.getSubCity(current.chiled);
                        self.cities = self.getSubCity(item.chiled);
                        self.currentItem = last.name;
                    }
                });
            });
        },

        getResourceData() {

            return this.resourceData;

        }
    },
    mounted() {

        console.log("地域组件");

        let self = this;
        common
            .getArea(this.header)
            .then(res => {
                this.resourceData = cloneObj(res.data.data);
                this.getAllProvinceCities(cloneObj(res.data.data));
                _.forEach(res.data.data, function (value) {
                    self.parent.push(value.name);
                });

            });
        this.filterData = this.parent;
        if (this.$store.state.terrainResult.length > 0) {
            console.log("初始化地域组件");
            this.init(
                this.$store.state.terrainSourceData,
                this.$store.state.terrainResult
            );
            // console.log(this.checkedCities);
        }
    },
    computed: {
        ...mapState({
            terrainResult: "terrainResult"
        }),
        stateterrainResult() {
            return this.$store.state.isEditcity;
        },
        isshow() {
            return this.filterData;
        }
    },
    watch: {
        stateterrainResult() {
            // console.log('vuex变化啦')
            this.init(
                this.$store.state.terrainSourceData,
                this.$store.state.terrainResult
            );
        }
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
};
</script>

<style lang="scss">
.checkbox__label {
    color: #bdbecd;
    width: 100px
}
</style>
