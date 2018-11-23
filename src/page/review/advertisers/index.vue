<template>
    <div class="advertise-list">
        <el-main>
            <!-- 审核筛选 start -->
            <el-col :span="24" class="margin-bottom-20">
                <h1 class="template-hd">审核筛选</h1>
                <div class="template-bd border-bottom-2">
                    <label for="" class="data-item">需求方：</label>
                    <el-select class="filter-input" v-model="form.demand" placeholder="请选择" @change="filterData('1')">
                        <el-option v-for="(item,index) in demandData" :key="index" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select>
                    <label for="" class="data-item">广告主：</label>
                    <!-- <el-select class="filter-input" v-model="form.ad" placeholder="请选择" @change="filterData('2')">
                        <el-option v-for="item in adData" :key="item.key" :label="item.value" :value="item.key">
                        </el-option>
                    </el-select> -->

                    <el-select class="ajust-full-width" v-model="form.ad" placeholder="请选择广告主" collapse-tags @change="filterData('')" clearable>
                        <el-option v-for="item in adList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="last-item">
                        <label for="" class="data-item">审核状态：</label>
                        <el-select class="filter-input" v-model="form.reviewStatus" placeholder="请选择审核状态" @change="filterData('')">
                            <el-option v-for="item in reViewData" :key="item.key" :label="item.value" :value="item.key">
                            </el-option>
                        </el-select>
                    </div>

                </div>
            </el-col>
            <!-- 批量审核 start -->
            <el-col :span="24" class="advertise-list-content border-bottom-2">
                <div class="creative-btn-control">
                    <div class="creative-btn-row">
                        <el-button type="click" :class="{'open-clicked1':isLighten}" @click='batchSwithResource'>批量审核</el-button>
                        <!-- 弹层start -->
                        <el-dialog class="batch-audit-pop" title="批量审核" :visible.sync="batchAuditVisible" width="427px">
                            <el-form :model="dialogForm" ref="dialogForm">
                                <el-form-item>
                                    <template slot-scope="scope">
                                        <div class="select-bd t">
                                            <el-tabs type="card" v-model="activeTabAudit" @tab-click="tabChange(activeTabAudit)">
                                                <el-tab-pane name="1">
                                                    <span slot="label">
    		<span class="select-item ">审核通过</span>
                                                    </span>
                                                    <div class="note-msg">
                                                        <label for="" class="data-item left">备注信息：</label>

                                                        <el-input type="textarea" resize="none" placeholder="请填写备注" v-model="dialogForm.remarks">
                                                        </el-input>
                                                    </div>
                                                </el-tab-pane>
                                                <el-tab-pane name="2">
                                                    <span slot="label">
                                            <span class="select-item">审核拒绝</span>
                                                    </span>
                                                    <div class="">
                                                        <label for="" class="data-item left">拒绝原因：</label>
                                                        <el-checkbox-group v-model="dialogForm.reason" @change="handleCheckedChangeCause">
                                                            <el-checkbox v-for="item in causeOptions" :label="item" :key="item">{{item}}
                                                            </el-checkbox>
                                                        </el-checkbox-group>

                                                        <div class="note-msg">
                                                            <label for="" class="data-item left">备注信息：</label>

                                                            <el-input type="textarea" :rows="2" resize="none" placeholder="请填写备注" v-model="dialogForm.remarks">
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                </el-tab-pane>
                                            </el-tabs>
                                        </div>
                                    </template>
                                </el-form-item>
                            </el-form>

                            <div slot="footer" class="dialog-footer">

                                <div class="is-confirm">
                                    <el-button type="confirm" @click="onSubmitBatch">确定</el-button>
                                    <el-button type="cancel" @click="closeDialog(false)">取消</el-button>
                                </div>
                            </div>
                        </el-dialog>
                        <!-- 弹层end -->

                        <div class="search-input">
                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="请输入关键词" type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="searchkey" @keyup="filterData('')" />
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
                <el-table :data="listData.data" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="需求方名称">
                        <template slot-scope="scope">
                            <div class="firm-name-adjust">
                                {{scope.row.demand_name}}
                                <a href="javascript:void(0);" class="el-icon-revise" @click="modify()"></a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="广告主名称">
                        <template slot-scope="scope">
                            {{scope.row.advertiser_name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="广告主ID">
                        <template slot-scope="scope">
                            {{scope.row.advertiser_id}}
                        </template>
                    </el-table-column>
                    <el-table-column label="行业分类">
                        <template slot-scope="scope">
                            {{scope.row.category_name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="创建时间" width="195">
                        <template slot-scope="scope">
                            {{scope.row.create_time}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="authority" label="资质文件">
                        <template slot-scope="scope">
                            <a href="javascript:void(0);" class="link-jump" @click="findDetail(scope.row.qualifications)">查看资质</a>
                            <!-- 弹层start -->
                            <el-dialog class="batch-audit-pop audit-file" title="资质文件" :visible.sync="findDetailVisibleImage" width="680px">
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-form-item label="资质编号">
                                        <label>{{imageList[0]&&imageList[0].number}}</label>
                                    </el-form-item>
                                    <el-form-item label="资质名称">
                                        <label>{{imageList[0]&&imageList[0].name}}</label>
                                    </el-form-item>
                                    <el-form-item label="资质文件">
                                        <img class="el-carousel-img" :src="imageList[0]&&imageList[0].file_url" width="250px" />
                                    </el-form-item>
                                        <el-form-item label="资质类型">
                                            <label>{{imageList[0]&&imageList[0].type=="1"?"审核通过":"审核拒绝"}}</label>
                                        </el-form-item>
                                </el-form>
                            </el-dialog>
                            <!-- 弹层end -->

                        </template>
                    </el-table-column>
                    <el-table-column prop="authority" label="审核状态">
                        <template slot-scope="scope">
                            {{scope.row.status=="1"?"审核通过":"审核拒绝"}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="authority" label="审核信息">
                        <template slot-scope="scope">
                            {{scope.row.auth_remark}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="authority" label="媒体复审详情">
                        <template slot-scope="scope">
                            <a href="javascript:void(0);" class="link-jump" @click="outAuditCheck(scope.row.qualifications)">查看详情</a>
                            <el-dialog class="auditStatus" title="媒体复审详情" width="952" :show-close="true" :visible.sync="outAuditVisible">
                                <el-table :data="subData.data" style="width: 100%;">
                                    <el-table-column label="媒体">
                                        <template prop="name" slot-scope="scope">
                                            {{scope.row.plat_id}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="审核ID">
                                        <template prop="name" slot-scope="scope">
                                            {{scope.row.return_id}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template prop="name" slot-scope="scope">
                                            {{scope.row.auth_srauts}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="原因">
                                        <template prop="name" slot-scope="scope">
                                            {{scope.row.remark}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="最后更新时间" width="95">
                                        <template prop="name" slot-scope="scope">
                                            {{scope.row.update_time}}
                                        </template>
                                    </el-table-column>

                                </el-table>
                                <!-- pagenation -->
                                <div class="block">
                                    <el-pagination @size-change="handleSizeChangeSub" @current-change="handleCurrentChangeSub" :current-page="subData&&subData.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="subData&&subData.per_page" layout="total, sizes, prev, pager, next, jumper" :total="subData&&subData.total">
                                    </el-pagination>
                                </div>
                            </el-dialog>
                        </template>
                    </el-table-column>

                    <el-table-column prop="date" label="最后更新时间" width="197">
                        <template slot-scope="scope">
                            {{scope.row.update_time}}
                        </template>
                    </el-table-column>
                </el-table>
                <!-- pagenation -->
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listData&&listData.current_page" :page-sizes="[10, 20, 30, 40]" :page-size="listData&&listData.per_page" layout="total, sizes, prev, pager, next, jumper" :total="listData&&listData.total">
                    </el-pagination>
                </div>
            </el-col>

        </el-main>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    review,
    common
} from "../../../service/index"
import _ from "lodash";
import store from "store";
import {
    callback
} from '../../../common/utils';
export default {
    computed: {
        getLeftList() {
            return this.leftSizeList;
        },
    },
    data: function () {
        return {
            searchkey: "",
            checked: true,

            isLighten: false,
            clearIt: false, //关闭图标设置
            list: "",
            currentPage2: 2,
            // currentPage: 1,
            advertiseList: [{
                status: '',
                num: '',
                authority: ''
            }],
            advertiseVisible: false,
            outAuditVisible: false,
            auditList: [{ //请选择客户
                name: '',
                simplename: ''
            }],
            platforms: [],
            checkedPlatforms: [],
            isIndeterminate: false,
            checkAll: false,
            pageSize: 10,
            currentPage: 1,
            listData: [],
            platformInfo: null,
            enterprise: [],
            industry: [],
            other: [],
            subData: [],
            pageSizeSub: 10,
            currentPageSub: 1,
            findDetailVisible: false,
            causeOptions: ['资质', '信息', '客保'],
            checkedcause: [],
            batchAuditVisible: false, //批量审核是否可见
            multipleSelection: [],
            activeTabAudit: "1",
            passed: "",
            failed: "",
            findDetailVisibleImage: false,
            imageList: [],
            failedRemark: "",
            checkAllDisabled: false,

            //审核
            header: "",
            form: {
                innerStatus: "",
                outerStatus: "",
                companyId: "",
                outerId: "",
                keyWords: "",

                demand: "",
                ad: "",

                reviewStatus: "",

            },
            demandData: [{
                key: 0,
                value: "全部"
            }],
            adData: [],
            reViewData: [{
                key: "0",
                value: "待审核"
            }, {
                key: "1",
                value: "审核通过"
            }, {
                key: "2",
                value: "审核拒绝"
            }],

            dialogForm: {
                remarks: "",
                reason: []

            },
            searchData: [],
            adList: []
        }
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    methods: {
        ...mapActions(["setBreadCrumb"]),
        filterData(val) {

            this.getList({
                pagenum: this.currentPage,
                pagesize: this.pageSize,
                // start_time: this.startDate != "" ? this.startDate : undefined,
                // end_time: this.endDate != "" ? this.endDate : undefined,
                demand_sideid: this.form.demand != "" ? this.form.demand : undefined, //需求方
                advertiser_id: this.form.ad != "" ? this.form.ad : undefined, //广告主
                status: this.form.reviewStatus != "" ? this.form.reviewStatus : undefined, //状态
                advertiser_name: this.searchkey != "" ? this.searchkey : undefined, //广告主名称
                //demand_sideid: this.searchkey != "" ? this.searchkey : undefined
            });

        },
        handleSizeChange(val) {
            this.pageSize = val;

            this.filterData();

        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);

            this.currentPage = val;
            this.filterData();

            // this.currentPage = val;
        },
        handleSizeChangeSub(val) {
            this.pageSizeSub = val;
            this.getList({
                page: 1,
                pagesize: this.pageSizeSub,
            });
        },
        handleCurrentChangeSub(val) {
            this.getList({
                page: val,
                pagesize: this.pageSizeSub,
            });
            this.currentPageSub = val;
        },
        tabChange(val) {
            //console.log(val);
        },
        getList(data) {

            review.getAdList(this.header, data).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                this.listData = res.data;
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        clearForm() {
            this.failed = "";
            this.passed = "";
            this.remark = "";
            this.checkedcause = [];
            this.activeTabAudit = "1";
        },
        clearInput() {},
        onSubmit(val) {
            console.log(val);

        },
        getIdsByItems() {
            let result = [];
            _.forEach(this.multipleSelection, val => {
                result.push(val.id);
            });
            return result;
        },
        closeDialog(val) {
            this.batchAuditVisible = val;
            this.clearForm();
        },
        onSubmitBatch() {
            let ids = _.map(this.multipleSelection, val => {
                return val.id;

            });
            review.reviewAd(this.header, {
                ids: ids.toString(),
                auth_result_code: this.dialogForm.reason.toString(),
                auth_remark: this.dialogForm.remarks
            }).then(res => {
                callback(res.data, () => {
                    this.batchAuditVisible = false;
                }, this);

            });
        },
        handleCheckAllChange(val) {
            this.checkedPlatforms = val ? this.getPlatformName() : this.getPlatformName('examineHasChecked');
            let checkedCount = this.checkedPlatforms.length;
            // 当checkedplatforms的长度大于0，且
            if (checkedCount > 0 && checkedCount < this.platforms.length) {
                this.isIndeterminate = true;
            }
            if (checkedCount == this.platforms.length) {
                this.isIndeterminate = false;
            }
            this.checkAllDisabled = false;
        },
        getPlatformName(flag) {
            let results = [];
            let checkedResults = [];
            _.forEach(this.platforms, val => {
                results.push(val.name);
                if (val.isChecked == true) {
                    //当有选项为disabled=true时，就让它一直都勾上
                    checkedResults.push(val.name);
                }
            });
            if (flag == "examineHasChecked") {
                return checkedResults;
            } else {
                return results;
            }
        },
        getPlantformNameById(val, flag) {
            let result = [];
            _.forEach(this.platforms, p => {
                _.forEach(val, s => {
                    if (p.id == s) {
                        result.push(p.name);
                        p.isChecked = true;
                    }
                });
            });
            if (flag) {
                return this.platforms;
            } else {
                return result;
            }
        },
        getIdsByName(val) {
            let result = [];
            _.forEach(this.platforms, p => {
                _.forEach(val, s => {
                    if (p.name == s) {
                        result.push(p.id);
                    }
                });
            });
            return result;
        },
        handleCheckedPlatformsChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.platforms.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.platforms.length;
            this.checkAllDisabled = false;
        },
        cancel() {
            this.advertiseVisible = false;
        },
        outAuditCheck(val) {
            this.outAuditVisible = true;
            this.subData = val;
        },
        handleCheckedChangeCause(val) { //拒绝原因的改变
            this.checkedcause = val ? val : [];

        },
        goBack() {
            this.$router.go(-1);
        },
        searchDataBykeyword(val) {
            let data = _.filter(this.sourceLeftSizeList, function (item) {
                return item.indexOf(val) > -1;
            });
            this.leftSizeList = data;
        },
        querySearch(queryString, cb) {
            // debugger
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll(val) {
            return val;
        },
        findDetail(val) {
            this.findDetailVisibleImage = true;
            this.imageList = val;
        },
        batchSwithResource() {

            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请至少选择一条记录!',
                    type: 'warning'
                });
                return;
            }
            this.isLighten = true;
            this.batchAuditVisible = true;
        },
        setData(data) {
            return _.map(data, val => {
                return {
                    key: val.id,
                    value: val.name,
                    //sub: this.setData(val.advertiserInfoVOS || val.creativeInfoVOS)
                }

            });
        },
        getSubData(value) {
            let result = [];
            _.forEach(value, val => {
                if (val.id == this.form.demand) {
                    result = val.moreLevelVOS;

                } else {
                    this.getSubData(val.moreLevelVOS);
                }

            });

            return result;

        }
    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            page: 1,
            pagesize: 10,
        });

        common.getCreativeData(this.header).then(res => {
            this.searchData = res.data.data;
            this.demandData = _.concat(this.demandData, this.setData(res.data.data));

        });

        common.filterReport(this.header).then(res => {
            if (res.data.data && res.data.data.code == "401") {
                this.$switchLogin("", this);
                return;
            }
            if (res.data.data && res.data.data.code == "402") {
                this.$message(res.data.data.error);
                return;
            }
            let data = res.data.data;

            //广告主
            this.adList = _.map(data.advertiserInfoVOS, val => {
                return {
                    value: val.advertiser_name,
                    key: val.advertiser_id
                }
            });

        });
    },
}
</script>

<style lang="scss">
@import "../../../style/mixin";

.advertise-list {

    // head style
    .bg-white {
        background-color: #fff;
    }

    .template-hd {
        padding: 20px 0 20px 30px;
        border-bottom: 1px solid $bc;
        @include bg-white($fc);
    }

    // body style
    .template-bd {
        padding: 20px 0 18px 33px;
        @include bg-white($fc);

        .select-info-tip {
            color: #ff7a81;
            padding: 10px 0 0 16px;
        }
    }

    .filter-input {
        width: 240px;
        margin: 0 15px 0 5px;
    }

    .last-item {
        display: inline-block;
        margin-top: 20px;
    }

    .advertise-list-content {

        // button and search
        .creative-btn-control {
            @include bg-white($fc);
            margin-top: 20px;

            .creative-btn-row {
                padding: 20px 30px;
                position: relative;
            }

            .search-input {
                position: absolute;
                width: 180px;
                right: 30px;
                top: 20px;

                .el-input-group__append,
                .el-input-group__prepend {
                    padding: 0 !important;
                    @include bg-white($fc);
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

            th:nth-child(6),
            td:nth-child(6),
            th:nth-child(8),
            td:nth-child(8),
            th:nth-child(9),
            td:nth-child(9),
            th:nth-child(10),
            td:nth-child(10) {
                text-align: center;
            }

            .update-time {
                color: #6cabff;
            }
        }

        // batch audit pop layer
        .batch-audit-pop {
            .el-dialog__title {
                font-size: 16px;
                font-weight: bold;
            }

            .el-dialog__header {
                padding: 25px 30px 15px 30px;
                border-bottom: 2px solid #e1e7f0;
            }

            .el-dialog__body {
                padding: 30px 30px 0 30px;
            }

            .el-tabs__item {
                padding: 0;

                &:nth-child(2),
                &:last-child {
                    padding-left: 19px !important;
                }
            }

            .el-tabs--card>.el-tabs__header {
                border: 0 none;
                margin-bottom: 14px;
            }

            .el-tabs--card>.el-tabs__header .el-tabs__nav {
                border: 0 none;
            }

            .el-tabs--card>.el-tabs__header .el-tabs__item {
                border: 0 none;
            }

            .el-vertical-line {
                margin-left: 9px;
                color: #e1e7f0;
                height: 24px;
            }

            .select-item {
                @include sc(12px, #515974);
                display: inline-block;
                height: 38px;
                line-height: 38px;
                padding: 0 18px;
                border: 1px solid #e1e7f0;
                border-radius: 5px;
                float: left;
            }

            .is-active .select-item {
                background-color: #ecf3fb;
                border: 1px solid #6cabff;
                color: #6cabff;
            }

            // label style
            .data-item {
                @include sc(12px, #686f87);
                width: 71px;
            }

            .note-msg .data-item {
                margin-top: -13px;
            }

            .el-checkbox__label {
                @include sc(12px, #515974);
            }

            .el-checkbox-group {
                margin-bottom: 3px;
            }

            .el-checkbox:first-child {
                margin-right: 20px;
            }

            .el-checkbox+.el-checkbox {
                margin: 0 20px 0 0;
            }

            .el-textarea {
                width: 296px;
            }

            .el-textarea__inner {
                height: 123px;
            }

            .is-confirm {
                padding: 0 0 10px 10px;
                text-align: left;
                background-color: transparent;
            }
        }
    }

    .audit-file {
        .el-dialog__header {
            text-align: left;
        }

        p {
            @include sc(16px, #515974);
            text-align: center;
            padding-bottom: 27px;
        }

        .el-carousel__item {
            background-color: #ffe5f5;
            text-align: center;
            width: 460px;
            height: 360px;
            line-height: 360px;
        }

        .el-carousel-img {
            vertical-align: middle;
            display: inline-block;
        }

        .el-carousel {
            width: 460px;
            margin: 0 auto;
            padding-bottom: 50px;
        }

        // bottom indicators
        .el-carousel__indicators {
            display: none;
        }

        .el-carousel__arrow {
            width: 50px;
            height: 50px;

            i {
                @include sc(23px, #fff);
            }
        }
    }

    // outer audit status
    .auditStatus,
    .advertiseList {

        .el-dialog__header,
        .el-table .cell {
            text-align: left;
        }

        .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
        }

        .el-dialog__title {
            font-size: 16px;
            font-weight: bold;
        }

        .el-dialog__body {
            padding: 0;
        }

        .block .el-pagination {
            text-align: left;
        }
    }

    // advertise list pop layer
    .advertiseList {
        h2 {
            @include sc(16px, #515974);
            font-weight: bold;
            height: 56px;
            line-height: 56px;
            padding-left: 10px;
            border-bottom: 1px solid #e1e7f0;
        }

        .update-item-row {
            padding-left: 10px;

            .update-hd,
            .certificate-name {
                width: 105px;
                line-height: 49px;
                display: inline-block;
                font-weight: bold;
                @include sc(14px, #515974);
            }

            .personal-detail {
                @include sc(14px, #515974);
            }

            .certificate-name {
                width: 90px;
                font-weight: normal;
            }

            .certificate-detail {
                color: #6cabff;
            }
        }

        .el-col-24,
        .is-confirm {
            text-align: left;
            background-color: #fff;
        }

        .advertiser-info {
            margin: 0 30px 0 20px;
        }

        .choose-platform {
            .platform-list {
                padding: 30px 25px 0 10px;
            }

            .el-checkbox__label {
                @include sc(12px, #7f8599);
            }

            .el-checkbox-group .el-checkbox:first-child {
                margin-right: 30px;
            }

            .el-total,
            .el-checkbox+.el-checkbox {
                margin: 0 30px 7px 0;
            }
        }

        .el-col-24 {
            margin-bottom: 22px;
        }

        .is-confirm {
            padding: 0 0 24px 11px;
        }
    }

    .block .el-pagination {
        padding: 34px 30px 25px 30px;
        @include bg-white($fc);
    }
}
</style>
