<template>
    <div>
        <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="media_name" label="平台名称" width="230">
                <template slot-scope="scope">
                    <img class="platform-img left" :src="scope.row.logo" alt="" width="60" height="60" />
                    <span class="firm-name" :title="scope.row.name">
                                                        {{scope.row.name}}
                                                        <a href="javascript:void(0);" class=" el-icon-revise" @click="modify(scope.row.id)"></a>
                                                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">

                <template slot-scope="scope">
                    <el-switch v-model=' scope.row.flag == 1 ? true: false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                    </el-switch>
                </template>

            </el-table-column>
            <el-table-column prop="policy" label="审核政策">
                <template slot-scope="scope">

                    {{scope.row.cre_auditing=="1"?"先审后投":"先投后审"}}
                </template>
            </el-table-column>
            <el-table-column prop="source_type" label="资源类型">
                <template slot-scope="scope">
                    {{checksource(scope.row.source_style)}}
                </template>
            </el-table-column>
            <el-table-column prop="materiel_type" label="广告样式">
                <template slot-scope="scope">
                    {{getAdStyle(scope.row.plantInfoStyles)}}
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
            pageList: [],
            loading: true,
            pageSize: 10,
            currentPage: 1,
            multipleSelection: []
        }
    },
    computed: {},
    components: {},
    methods: {
        checksource(val) {
            // 1:移动APP,2:移动网页,3:PC网页
            let source = [];
            for (let i = 0; i < val.length; i++) {
                if (val[i] == 1) {
                    source.push('移动APP');
                } else if (val[i] == 2) {
                    source.push('移动网页');
                } else if (val[i] == 3) {
                    source.push('PC网页');
                }
            }
            let sourceStr = source.join(',');
            return sourceStr;
        },
        getAdStyle(val) {
            return _.uniq(_.map(val, item => {
                return item.ch_name

            })).toString();

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;

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
            resource.getPlatformList(this.header, data).then(res => {
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
        modifyStatus(val, flag) {

            resource.modifyStatusPlatform(this.header, {
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

            resource.modifyStatusPlatform(this.header, {
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

            resource.modifyStatusPlatform(this.header, {
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

            resource.delPlatform(this.header, {
                ids: this.getCheckedIds(this.multipleSelection)
            }).then(res => {
                callback(res.data, () => {
                    this.getList({
                        pagenum: this.currentPage,
                        pagesize: this.pageSize
                    });
                }, this);

            });
        },
        modify(val) {

            this.$router.push("/editplatform/" + val);

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

        this.getList({
            pagenum: 1,
            pagesize: 10
        });

    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {}
}
</script>

<style lang="scss">

</style>
