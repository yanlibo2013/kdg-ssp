<template>
    <div>
        <div class="account-search-wrap left">
            <div class="el-input el-input--prefix">
                <input autocomplete="off" placeholder="输入尺寸..." type="text" prefixicon="el-icon-search" clearable :class="setShowPanel?'el-input__inner':'el-input__inner adjust-border-radius'" @keyup="searchDataBykeyword(keyword)" v-model="keyword" @focus="showPanel"
                />
                <span class="el-input__prefix">
                                                            <i class="el-input__icon el-icon-search"></i>
                                                        </span>
            </div>
            <div class="account-search-bd innerbox" v-show="setShowPanel">
                <p class="add-size" @click="show">添加尺寸</p>
                <el-checkbox class="check-all-style" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox class="add-checkbox" v-model="checked" v-show="isAddItem">
                    <template>
                        <el-input placeholder="宽" v-model="form.width"></el-input>
                        <i class="multiply">x</i>
                        <el-input placeholder="高" v-model="form.height"></el-input>
                        <el-button class="create-new-size" @click="addItem">
                            <i class="el-icon-check"></i>
                        </el-button>
                        <el-button class="cancel-new-size" @click="del">
                            <i class="el-icon-close"></i>
                        </el-button>
                    </template>
                </el-checkbox>

                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                    <ul v-for="(item,index) in leftSizeList" :key="index">
                        <li class="search-item">
                            <el-checkbox :label="item"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
        </div>
        <div class="account-list" v-show="setShowPanel">
            <span class="turn-iron"></span>
            <div class="inferior-hd" @click="clearAll">全部清除</div>
            <div class="account-clear-bd innerbox">
                <ul v-for="(item,index) in checkList" :key="index">
                    <li class="search-item">
                        <span class="account-name">{{item}}</span>
                        <span class="account-delete" @click="removeItem(item)">x</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import {
    end
} from "../../service/index"
import _ from "lodash";
export default {
    props: ["childData", "isShow"],
    data: function () {
        return {
            keyword: "",
            checkAll: false,
            isIndeterminate: false,
            checked: true,
            form: {
                width: "",
                height: ""
            },
            checkList: [],
            leftSizeList: this.childData,
            isAddItem: false,
            isFold: false,
            isShowPanel: this.isShow
        }
    },
    computed: {
        getLeftList() {
            return this.checkList;
        },
        setShowPanel() {
            return this.isShowPanel;
        }
    },
    methods: {
        searchDataBykeyword(val) {
            let data = _.filter(_.cloneDeep(this.childData), function (item) {
                return item.indexOf(val) > -1;
            });
            this.leftSizeList = data;
        },
        handleCheckAllChange(val) {
            this.checkList = val ? this.childData : [];
            this.isIndeterminate = false;
            this.$emit('setCheckedItem', this.checkList);
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.childData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.childData.length;
            this.$emit('setCheckedItem', this.checkList);
        },
        clearAll() {
            this.checkList = [];
            this.checkAll = false;
            this.isIndeterminate = false;
            this.$emit('setCheckedItem', this.checkList);
        },
        show() {
            this.isAddItem = true;
            this.form = {
                width: "",
                height: ""
            }
        },
        del() {
            this.isAddItem = false;
        },
        addItem() {
            if (this.verification()) {
                this.$emit('pushItem', this.form.width + "*" + this.form.height);
                this.isAddItem = false;
                // end.addSizeItem({
                //     width: this.form.width,
                //     height: this.form.height
                // }).then(res => {
                //     if (res.data.code == 0) {
                //         this.$message({
                //             message: '操作成功',
                //             type: 'success'
                //         });
                //     } else {
                //         this.$message.error('操作失败');
                //     }
                //     if (res.data.code == -1) {
                //         this.$router.push({
                //             path: "/login"
                //         });
                //     }
                // });
            }
        },
        verification() {
            //console.log(this.form.width);
            if (!this.form.width) {
                this.$message({
                    message: '请输入宽度!',
                    type: 'warning'
                });
                return false;
            }
            if (this.form.width && !_.isInteger(parseFloat(this.form.width))) {
                this.$message({
                    message: '宽度必须是正整数!',
                    type: 'warning'
                });
                return false;
            }
            if (!this.form.height) {
                this.$message({
                    message: '请输入高度度!',
                    type: 'warning'
                });
                return false;
            }
            if (this.form.height && !_.isInteger(parseFloat(this.form.height))) {
                this.$message({
                    message: '高度必须是正整数!',
                    type: 'warning'
                });
                return false;
            }
            return true;
        },
        removeItem(val) {
            this.checkList = _.pull(_.cloneDeep(this.checkList), val);
            this.isIndeterminate = true;
            if (this.checkList.length == 0) {
                this.checkAll = false;
                this.isIndeterminate = false
            }
            this.$emit('setCheckedItem', this.checkList);
        },
        showPanel(val) {
            this.isShowPanel = true;
        }
    }
}
</script>

<style lang="scss">

</style>
