<template>
    <div class="dialog">
        <el-form ref="formCharge" status-icon :model="formCharge" label-width="100px">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" class="dialog-form-item">
                <el-radio-button label="1">充值</el-radio-button>
                <!--<el-radio-button label="2">退款</el-radio-button>-->
            </el-radio-group>
            <el-form-item label="需求方">
                {{JSON.parse(demand).name}}
                <!-- <el-select class="filter-input" v-model="formCharge.name" placeholder="全部">
                    <el-option v-for="(item,index) in demandList" :key="index" :label="item.value" :value="item.key">
                    </el-option>
                </el-select> -->
            </el-form-item>
            <!-- <el-form-item label="当前余额">
                <el-input v-model="formCharge.name"></el-input>
            </el-form-item> -->
            <el-form-item label="充值余额" prop="amount" :rules="[
      { required: true, message: '充值金额不能为空'},
      { type: 'number', message: '充值金额必须为数字值'}
    ]">
                <el-input v-model.number="formCharge.amount"></el-input>
            </el-form-item>
            <!-- <el-form-item label="支付密码" prop="password" :rules="{
      required: true, message: '支付密码不可以为空', trigger: 'blur'
    }">
                <el-input v-model="formCharge.password"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="formCharge.desc"></el-input>
            </el-form-item>
            -->
            <el-form-item>

                <el-button type="confirm" @click="onSubmit('formCharge')">充值</el-button>
                <!-- <el-button>取消</el-button> -->
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
            demandList: []
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
                            this.$emit("getList", {
                                pagenum: 1,
                                pagesize: 10,
                            });
                            this.resetForm("formCharge")

                        }, this)

                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
