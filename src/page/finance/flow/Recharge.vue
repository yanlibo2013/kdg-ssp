<template>
    <div class="dialog">
        <el-form ref="formCharge" status-icon :model="formCharge" label-width="100px">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" class="dialog-form-item" @change="tabPositionChanged">

                <!--<el-radio-button label="1">充值</el-radio-button>-->
                <!--<el-radio-button label="2">退款</el-radio-button>-->

            </el-radio-group>
            <el-form-item label="需求方:">
                {{JSON.parse(demand).name}}
                <!-- <el-select class="filter-input" v-model="formCharge.name" placeholder="全部">
                    <el-option v-for="(item,index) in demandList" :key="index" :label="item.value" :value="item.key">
                    </el-option>
                </el-select> -->
            </el-form-item>
            <!-- <el-form-item label="当前余额">
                <el-input v-model="formCharge.name"></el-input>
            </el-form-item> -->
            <el-form-item :label="labelName+':'" prop="amount" :rules="[
                { required: true, message: '金额不能为空'},
                //{ type: 'number', message: '金额必须为大于0的数字'},
                { pattern: /(^\d+(\.\d+)?$)/, message: '金额必须为大于0的数字' },
                ]">
                <el-input v-model="formCharge.amount" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item>

                <el-button style="    margin-bottom: 10px" type="confirm" @click="onSubmit('formCharge')">充值</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import {
    finance,
    common
} from "../../../service/index"
import {
    callback
} from "../../../common/utils.js";
import store from "store";
export default {
    props: {
        demand: String //定义传值的类型<br>    }
    },
    data: function () {
        return {
            formCharge: {
                name: "",
                // resource: "",
                // desc: "",
                amount: "",
                password: ""
            },
            tabPosition: "1",
            header: "",
            labelName: "充值金额",
            demandList: [],

        };
    },
    computed: {},
    components: {},
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //console.log(this.formCharge);
                    finance.finaceCharge(this.header, {
                        demandinfo_id: JSON.parse(this.demand).id,
                        type: this.tabPosition,
                        recharge_amount: this.formCharge.amount.toString()
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

                            this.formCharge = {
                                name: "",
                                // resource: "",
                                // desc: "",
                                amount: "",
                                password: ""
                            }
                            this.$emit('charge', false);
                            this.$emit('getList', {
                                pagenum: 1,
                                pagesize: 10
                            });
                            this.resetForm("formCharge")

                        }, this);

                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.tabPosition = "1";
            this.$refs[formName].resetFields();
        },
        tabPositionChanged(value) {
            this.labelName = value == "1" ? "充值金额" : "退款金额";
        },
        checkNum: function () {
            callback(new Error('111'));
            //return this.formCharge.amount > 0;
        },
        cancel() {

            this.$emit('closeDialog', false)

        }
    },
    mounted() {

        // console.log("充值");

        // common.getDemandList(this.header).then(res => {

        //     let data = _.map(res.data.data, val => {
        //         return {
        //             value: val.short_name,
        //             key: val.id
        //         }
        //     });

        //     this.demandList = _.concat(this.demandList, data);

        // });
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
.dialog {
    .dialog-form-item {
        display: flex;
        justify-content: center; //align-items: center
    }

    .el-button+.el-button {
        margin-left: 0;
    }
}
</style>
