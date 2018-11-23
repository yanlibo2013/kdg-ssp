<template>
    <!-- 基础数据报表 -->
    <div class="media-create">
        <el-main>
            <el-form ref="form" :model="form">
                <el-col :span="24">
                    <h1 class="template-hd">基本资料</h1>
                    <div class="base-bd border-bottom-2">
                        <!-- 媒体名称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体名称：</label>
                            <el-input placeholder="必填" v-model="form.meadiaName"></el-input>
                        </div>
                        <!-- 媒体名称： end -->
                        <!-- app包名： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>App包名：</label>
                            <el-checkbox v-model="checkAndroid" v-show="isShowCheckAndroid">Android包名</el-checkbox>
                            <el-input placeholder="请选择" v-model="form.packgAndriod" @change='packageChange("android")' v-show="isShowCheckAndroid"></el-input>
                            <span class="tips-important"></span>
                            <div class="sibling-elem" v-show="isShowCheckIos">
                                <el-checkbox v-model="checkIos">iOS包名</el-checkbox>
                                <el-input placeholder="请选择" v-model="form.packageIos" @change='packageChange("ios")'></el-input>
                                <span class="tips-important"></span>
                            </div>
                        </div>
                        <!-- app包名： end -->
                        <!-- 媒体分类 start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体分类：</label>
                            <el-select class="ajust-full-width" id="my_media_first" placeholder="一级分类" @change="changeMediaCategory(form.meadiaFirst)" v-model="form.meadiaFirst">
                                <el-option v-for="item in media_category_options" :key="item.id" :label="item.name" :value="item.id.toString()">
                                </el-option>
                            </el-select>
                            <el-select class="ajust-full-width" id="my_media_second" placeholder="二级分类" v-model="form.meadiaSec" @change="changeMeaidaSec">
                                <el-option v-for="item in media_category_sed_options" :key="item.id" :label="item.name" :value="item.id.toString()">
                                </el-option>
                            </el-select>
                        </div>
                        <!-- 媒体分类 end -->
                        <!-- 接入方式： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>接入方式：</label>

                            <el-select class="ajust-full-width" id="my_media_accept" v-model="form.type" placeholder="请选择">
                                <el-option label="API" value="API"></el-option>
                                <el-option label="SDK" value="SDK"></el-option>
                                <el-option label="JS" value="JS"></el-option>
                                <!-- <el-option label="KAPI" value="KAPI"></el-option> -->
                            </el-select>
                            <el-checkbox v-model="checkAcceptPrice" v-show="isAcceptPrice">是否参与竞价？</el-checkbox>
                            <el-checkbox v-model="checkAcceptKAPI" v-show="isAcceptKAPI">是否使用KAPI协议</el-checkbox>
                            <span class="tips-important"></span>
                        </div>
                        <!-- 接入方式： end -->
                        <!-- 状态 start -->
                        <div class="create-row tip-space status-item">
                            <label for="" class="data-item"><i class="item-needed">*</i>状态：</label>
                            <el-switch v-model="form.flag" active-text="关闭" inactive-text="开启">
                            </el-switch>
                        </div>
                        <!-- 状态 end -->
                        <!-- 审核规范 start -->
                        <div class="create-row audit-speci clear">
                            <label for="" class="data-item"><i class="item-needed">*</i>审核规范：</label>
                            <el-input :class="{'upload-input':isUpload}" placeholder="请上传审核规范" v-model="logofile" :readonly="false" clearable @clear='clearFile'>
                                <!-- <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedlogo')"></i> -->
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="application/pdf" id="fileLogo" @change="upload" style="display:none" />
                        </div>
                            <!-- 审核规范 end -->
                            <!-- 禁投行业 start -->
                            <div class="create-row">
                                <label for="" class="data-item left"><i class="item-needed">*</i>禁投行业：</label>
                                <!-- <el-select class="banIndustry" v-model="form.industry" multiple="" filterable="" remote="" reserve-keyword="" placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                                <el-option v-for="item in optionsBan" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select> -->

                                <el-select class="ajust-full-width" id="my_media_first" placeholder="一级分类" @change="changeIndustryCategory([form.industryFirst])" v-model="form.industryFirst" multiple>
                                    <el-option v-for="item in media_category_options" :key="item.id" :label="item.name" :value="item.id.toString()">
                                    </el-option>
                                </el-select>
                                <el-select class="ajust-full-width" id="my_media_second" placeholder="二级分类" v-model="form.industrySec" multiple>
                                    <el-option v-for="(item,index) in industry_category_sed_options" :key="index" :label="item.name" :value="item.id.toString()">
                                    </el-option>
                                </el-select>

                            </div>
                            <!-- 禁投行业 end -->
                        </div>
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
import store from "store";
import {
    resource,
    common
} from "../../service/index"
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";

import {
    callback,
    validateForm
} from "../../common/utils.js";
export default {
    data: function () {
        return {
            header: "",
            optionsBan: [],
            banValue: [],
            banList: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
                "Arkansas", "California", "Colorado",
                "Connecticut", "Delaware", "Florida",
                "Georgia", "Hawaii", "Idaho", "Illinois",
                "Indiana", "Iowa", "Kansas", "Kentucky",
                "Louisiana", "Maine", "Maryland",
                "Massachusetts", "Michigan", "Minnesota",
                "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire",
                "New Jersey", "New Mexico", "New York",
                "North Carolina", "North Dakota", "Ohio",
                "Oklahoma", "Oregon", "Pennsylvania",
                "Rhode Island", "South Carolina",
                "South Dakota", "Tennessee", "Texas",
                "Utah", "Vermont", "Virginia",
                "Washington", "West Virginia", "Wisconsin",
                "Wyoming"
            ],
            sourceData: [{
                    key: "1",
                    value: "PC-Web"
                },
                {
                    key: "2",
                    value: "PC-视频"
                },
                {
                    key: "3",
                    value: "Mobile-APP"
                },
                {
                    key: "4",
                    value: "Mobile-Web"
                },
                {
                    key: "5",
                    value: "Mobile-视频"
                },
                {
                    key: "6",
                    value: "其他"
                },
                {
                    key: "7",
                    value: "Banner"
                },
                {
                    key: "8",
                    value: "Native"
                },
                {
                    key: "9",
                    value: "Video"
                }
            ],
            checkedCities: [],
            cities: [
                "PC-Web",
                "PC-视频",
                "Mobile-APP",
                "Mobile-Web",
                "Mobile-视频",
                "其他",
                "Banner",
                "Native",
                "Video"
            ],

            options: [{
                    value: "API",
                    lable: "API"
                },
                {
                    value: "SDK",
                    lable: "SDK"
                },
                {
                    value: "JS",
                    lable: "JS"
                },
                // {
                //     value: "KAPI",
                //     lable: "KAPI"
                // },
            ],
            chargTypes: [{
                    value: 1,
                    lable: "包段资源"
                },
                {
                    value: 2,
                    lable: "私有交易（PD）"
                },
                {
                    value: 3,
                    lable: "公开竞价（RTB）"
                }
            ],
            media_category_options: [], //一级分类
            media_category_sed_options: [], //一级分类
            industry_category_sed_options: [], //一级分类
            stateList: ["开启", "关闭"], //状态集合 1开启 2 关闭
            flag: false,
            logofile: "",
            isUpload: "",
            checkAndroid: false,
            checkIos: false,
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            restaurants: [],
            state3: '',
            checkAcceptPrice: false,
            checkAcceptKAPI: false,
            isAcceptPrice: false,
            isAcceptKAPI: false,
            isShowCheckAndroid: true,
            isShowCheckIos: true,
            platformlist: [],

            form: {
                meadiaName: "",
                packgAndriod: "",
                packageIos: "",
                meadiaFirst: "",
                meadiaSec: "",
                type: "",
                standard: "",
                //industry: "",
                flag: true,
                industryFirst: [],
                industrySec: [],
            },
            industryData: [],
        }
    },
    computed: {},
    components: {

    },
    methods: {
        ...mapActions([
            "setBreadCrumb",
            "getCurrentUser",
            "setCurentTab"
        ]),

        clearFile() {
            this.logofile = "";
            this.form.standard = "";

        },

        packageChange(val) {

            if (val == "android") {

                if (this.form.packgAndriod) {
                    this.checkAndroid = true;

                } else {
                    this.checkAndroid = false;
                }

            }

            if (val == "ios") {

                if (this.form.packageIos) {
                    this.checkIos = true;

                } else {
                    this.checkIos = false;
                }

            }

        },

        customeInfo() {
            this.advertiseVisible = true
        },
        //媒体分类
        changeMediaCategory(val) {
            this.media_category_sed_options = this.getMeadiaData(this.industryData, val);
            this.form.meadiaSec = "";
        },
        changeMeaidaSec() {
            //console.log(this.form.meadiaSec);
        },
        //行业
        changeIndustryCategory(val) {
            // _.forEach(val, item => {
            //     this.industry_category_sed_options = _.concat(this.industry_category_sed_options, this.getMeadiaData(this.industryData, item));

            // });
            let _val = [...val];
            if (Array.isArray(val[0])) {
                _val = [...val[0]]
            }
            let result = [];
            _val.forEach((item) => {
                this.industryData.forEach((iitem, inndex) => {
                    if (item == iitem.pid) {
                        result.push(iitem)
                    }
                })
            })
            this.industry_category_sed_options = [...result]
        },
        selectLogo() {
            this.$el.querySelector("#fileLogo").click();
        },
        upload() {
            this.form.standard = this.$el.querySelector("#fileLogo").files[0];
            this.logofile = this.form.standard.name;
        },
        querySearch() {

        },
        handleSelect() {

        },
        clearItem() {

        },
        onSubmit() {

            //   meadiaName: "",
            //     packgAndriod: "",
            //     packageIos: "",
            //     meadiaFirst: "",
            //     meadiaSec: "",
            //     type: "",
            //     standard: "",
            //     industry: "",
            //     flag:true

            if (!this.form.meadiaName) {
                this.$message({
                    message: '请填写媒体名称！',
                    type: "warning"
                });
                return false;
            }

            if (!this.form.packgAndriod && !this.form.packageIos) {
                this.$message({
                    message: 'Android包名或者IOS包名至少填写一个！',
                    type: "warning"
                });
                return false;
            }

            let isValidateForm = validateForm([{
                key: this.form.meadiaFirst,
                value: "请选择一级媒体分类!"
            }, {
                key: this.form.meadiaSec,
                value: "请选择二级媒体分类!"
            }, {
                key: this.form.type,
                value: "请选择接入方式"
            }, {
                key: this.logofile,
                value: "请填上传审核规范!"
            }, {
                key: this.form.industrySec.length == 0 ? false : true,
                value: "请填写禁投行业!"
            }], this);

            if (isValidateForm) {
                let fileData = new FormData();
                fileData.append("name", this.form.meadiaName);

                if (this.checkAndroid) {
                    fileData.append("package_A", this.form.packgAndriod);
                } else {
                    fileData.append("package_A", '');
                }
                if (this.checkIos) {
                    fileData.append("package_I", this.form.packageIos);
                } else {
                    fileData.append("package_I", '');
                }

                fileData.append("media_category", parseInt(this.form.meadiaFirst));
                fileData.append("media_category_sed", parseInt(this.form.meadiaSec));
                fileData.append("accpet_type", this.form.type);
                fileData.append("flag", this.form.flag ? 1 : 2);
                fileData.append("prohibit", this.form.industrySec.toString());
                if (this.form.standard) {
                    fileData.append("file", this.form.standard);

                }

                if (this.$route.params.id) {

                    fileData.append("id", this.$route.params.id);

                    resource.modifyMeadia(this.header, fileData).then(res => {
                        if (res.data.data && res.data.data.code == "401") {
                            this.$switchLogin("", this);
                            return;
                        }
                        if (res.data.data && res.data.data.code == "402") {
                            this.$message(res.data.data.error);
                            return;
                        }
                        callback(res.data, () => {
                            this.$router.go(-1);
                            this.setCurentTab("first");
                        }, this);
                    });

                } else {

                    resource.addMeadia(this.header, fileData).then(res => {
                        if (res.data.data && res.data.data.code == "401") {
                            this.$switchLogin("", this);
                            return;
                        }
                        if (res.data.data && res.data.data.code == "402") {
                            this.$message(res.data.data.error);
                            return;
                        }

                        callback(res.data, () => {
                            this.$router.go(-1);
                            this.setCurentTab("first");
                        }, this);
                    });

                }

            }

        },
        goBack() {
            this.$router.go(-1);

        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.optionsBan = this.banList.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 100);
            } else {
                this.optionsBan = [];
            }
        },
        getParantItem(data, sub) {
            let result = [];
            _.forEach(sub, p => {
                _.forEach(data, s => {

                    if (s.id.toString() == p) {

                        result.push(s.pid);

                    }

                });

            });

            return result;

        },
        initData() {
            let self = this;
            //行业/common/getIndustry
            const industryPromise = common.getIndustry(this.header).then(res => {
                return res.data.data

            });

            let meadiaItemPromis = null;
            //编辑操作
            if (self.$route.params.id) {

                meadiaItemPromis = resource.getMeadiaItem(this.header, {
                    id: self.$route.params.id
                }).then(res => {
                    return res.data.data
                });

            }

            Promise.all([industryPromise, meadiaItemPromis])
                .then(function (res) {
                    // console.log('Promise.all', res);
                    self.industryData = res[0];
                    self.media_category_options = self.getMeadiaData(res[0], 0);

                    //编辑操作 初始化表单
                    if (res[1]) {
                        let data = res[1];

                        self.form.meadiaName = data.name;

                        self.form.packgAndriod = data.package_A;
                        self.form.packageIos = data.package_I;
                        if (data.package_A) {
                            self.checkAndroid = true;

                        }
                        if (data.package_I) {
                            self.checkIos = true;
                        }

                        self.form.meadiaFirst = data.media_category.toString();
                        self.changeMediaCategory(data.media_category);
                        self.form.meadiaSec = data.media_category_sed.toString();
                        self.form.type = data.accpet_type;
                        self.logofile = data.path_name;

                        //console.log(data.prohibit.split(","));

                        //通过二级获得一级数据 56,55,54

                        let industryFirst = _.uniq(self.getParantItem(self.industryData, data.prohibit.split(",")));

                        self.form.industryFirst = _.map(industryFirst, (val) => {
                            return val.toString();
                        });

                        self.changeIndustryCategory(self.form.industryFirst);
                        self.form.industrySec = data.prohibit.split(",");

                        self.form.flag = data.flag == 1 ? true : false;
                    }

                })
                .catch(function (err) {
                    console.error('Promise.all error', err);
                });
        },
        getMeadiaData(data, pid) {
            return _.filter(data, (val) => {
                return val.pid == pid;
            })
        }

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
    mounted() {

        this.setBreadCrumb(this.$route.path.replace("/", ""));

        this.initData();

        // if (this.$route.params.id) {

        //     resource.getMeadiaItem({
        //         id: this.$route.params.id
        //     }).then(res => {

        //         callback(res.data, () => {
        //             let data = res.data.data;
        //             this.form = {
        //                 meadiaName: data.name,
        //                 packgAndriod: data.package_A,
        //                 packageIos: data.package_I,
        //                 meadiaFirst: data.media_category.toString(),
        //                 meadiaSec: data.media_category_sed,
        //                 type: data.accpet_type,
        //                 standard: "",
        //                 industry: data.prohibit,
        //                 flag: data.flag==1?true:false
        //             };
        //             this.role = _.map(data.role_id.split(","), val => {
        //                 return parseInt(val)

        //             });

        //         }, this);

        //     });
        // }
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">
@import "../../style/mixin";

.media-create {

    .template-hd,
    .base-bd {
        background-color: #fff;
    }

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .template-hd {
        padding: 20px 0 18px 30px;
        font-size: 16px;
        border-bottom-width: 1px;
    }

    .base-bd {
        padding: 20px 0 0 30px;
    }

    // single row
    .create-row {
        margin-bottom: 13px;

        .el-input {
            width: 240px;
        }

        .el-checkbox__label {
            @include sc(12px, $firstc);
        }

        .sibling-elem {
            margin: 10px 0 0 119px;
        }

        .el-checkbox {
            width: 105px;
        }

        .el-checkbox+.el-checkbox {
            margin: 0 20px 0 0;
        }

        //ban industry style
        .banIndustry {
            margin: 0 0 18px 4px;

            .el-input {
                width: 318px;
            }

            // special tags
            .el-select__tags {
                left: 10px;

                .el-tag {
                    background-color: rgba(243, 245, 249, 1);
                    padding: 0 10px;
                    height: 28px;
                    line-height: 28px;
                    margin: 2px 6px 2px 0;
                }

                .el-select__tags-text {
                    color: #6cabff;
                }

                .el-icon-close {
                    top: -1px;
                    right: -5px;
                    color: #6cabff;

                    &::before {
                        display: block;
                    }

                    &:before {
                        content: "\E60F";
                    }
                }

                .el-tag__close.el-icon-close {
                    background-color: transparent;
                }
            }
        }

        // important tip
        .tips-important {
            display: inline-block;
            @include svgbg("../../style/image/common/tips-important.svg");
            height: 24px;
            width: 24px;
            vertical-align: -7px;
            margin-left: 11px;
            @include transX(180deg);
        }
    }

    // single row title
    .data-item {
        color: $firstc;
        width: 115px;
        display: inline-block;
    }

    // need user to fill tip
    .item-needed {
        color: $redc;
        width: 7px;
        margin-right: 7px;
        vertical-align: -2px;
    }

    // border radius
    .unit,
    .meta {
        @include topRightRadius(5px);
        @include bottomRightRadius(5px);
    }

    // set price
    .price-set {
        .inferior-title {
            color: $secondc;
            margin: 5px 6px 0 0;
            @extend .font12;
        }

        .space-under>td {
            padding-bottom: 15px;
        }

        .el-textarea {
            max-width: 320px;
        }

        textarea {
            margin-right: 10px;
        }

        .el-button--default {
            border-style: dashed;
            width: 80%;
        }

        .el-icon-plus {
            @include sc(20px, $bc);
        }
    }

    .el-input--suffix {
        margin-right: 5px;
    }

    // hide red need tip
    .tip-space {
        .item-needed {
            visibility: hidden;
        }
    }

    // audit specification
    .audit-speci {
        .data-item {
            margin-top: 8px;
        }

        .el-input {
            margin: 0 6px 0 0;
            width: 204px;
        }
    }

    // adjust space
    .resource-type {
        margin: 21px 0 30px;

        .data-item {
            float: left;
            margin-right: 11px;
        }
    }

    .status-item {
        margin-bottom: 23px;
    }

    // confirm and cancel
    .is-confirm {
        padding-left: 30px;
    }

    .tips-important {
        display: inline-block; // @include svgbg("../../style/image/creative/tips-important.svg");
        height: 24px;
        width: 24px;
        vertical-align: -7px;
        margin-left: 5px;
        @include transX(180deg);
    }
}
</style>
