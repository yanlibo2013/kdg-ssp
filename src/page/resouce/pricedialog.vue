<template>
    <el-dialog class="ad_dialog" :title="curtitle" width="420px" :show-close="false" :visible="isvisible" @close="okBtn('form')">
        <el-form :model="form" :rules="rules2" ref="form">

            <el-form-item class='relative' label="媒体采购价格：" :label-width="formLabelWidth">

                <el-input v-model="form.settlement_price" :disabled="true"></el-input>
                <span class="unit">元</span>
                <span class="noticeIcon" style="top:5px"></span>
            </el-form-item>

            <el-form-item prop="float_xx" label="资源浮动系数：" :label-width="formLabelWidth">
                <el-input v-model="form.float_xx" placeholder="请输入..." @input="changeFloat" auto-complete="off"></el-input>
                <span class="unit unit2">%</span>
            </el-form-item>

            <el-form-item class="relative" label="浮动后售价：" :label-width="formLabelWidth">
                <el-input :value="isInput ? calprice : curPrice" :disabled="true"></el-input>
                <span class="unit">元</span>
                <span class="noticeIcon" style="top:5px"></span>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="okBtn('form')">
                <span style="color: #fff !important">确定</span>
            </el-button>

            <el-button @click="cancelBtn">
                取 消
            </el-button>

        </div>
    </el-dialog>
</template>

<script>
export default {
    //在字组件中接收的时候 props  this.emit(event,arg) 使用动态属性
    data() {
        var checkAge = (rule, value, callback) => {
            let reg = /^(\-|\+?)\d+(\.\d{1,2})?$/g;
            if (this.isInput) {
                if (!this.tempVal) {
                    return callback(new Error('浮动系数不能为空'));
                }
                if (!reg.test(this.tempVal)) {
                    callback(new Error('请输入数字值,最多两位小数'));
                } else {
                    callback();
                }
            } else {
                callback();
            }

        };

        return {
            form: {
                'float_xx': 0
            },
            formLabelWidth: '85px',
            isvisible: false,
            isvisible1: true,
            curtitle: '',
            calprice: '',
            tempVal: '',
            isInput: false, //是否是输入的状态
            rules2: {
                float_xx: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            }
        }
    },
    props: ["data", "title", "visible", "type", "curid", "tempItem", "styledetails"],
    methods: {
        modifyValueByParent(){
            console.log("modifyValueByParent");

        },
        okBtn(formName) {

            let that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.$emit('submitDialog', {
                        "selling_price": this.isInput ? this.calprice : this.curPrice, //"isInput ? calprice : curPrice"
                        "fluctua": that.tempVal || that.form.float_xx,
                        "type": that.type,
                        "curid": that.curid
                    })
                    that.isvisible = false;
                    that.isInput = false;
                }

            });

        },
        changeFloat(val) {
            this.isInput = true;
            this.form.float_xx = val;
            this.tempVal = val;
            let result = this.form.settlement_price * (1 + val / 100) || this.form.settlement_price;
            this.calprice = ~~(result * 100) / 100;

        },
        cancelBtn() {
            this.isInput = false;
            this.$emit('closeDialog')
        },
        // curPrice2(){
        // 	let float_xx = this.form.float_xx ? parseInt(this.form.float_xx) : 0 ; 
        // 	let result = this.form.settlement_price * (1+this.form.float_xx/100) || this.form.settlement_price;
        // 	return ~~(result * 100) / 100;
        // },
        getFloax() {

            let that = this;
            if (this.type == 1) {
                let tempAry5 = this.styledetails.imgStyle.filter((item, index) => {
                    return item.id == this.tempItem.id
                })
                if (tempAry5.length > 0) {
                    that.form.float_xx = tempAry5[0]['fluctua'];
                } else {
                    that.form.float_xx = 0;
                }
            }

            if (this.type == 2) {
                let tempAry4 = this.styledetails.imgText.filter((item, index) => {
                    return item.id == this.tempItem.id
                })
                if (tempAry4.length > 0) {
                    that.form.float_xx = tempAry4[0]['fluctua'];
                } else {
                    that.form.float_xx = 0;
                }

            }

            if (this.type == 3) {
                let tempAry3 = this.styledetails.imgGroup.filter((item, index) => {
                    return item.id == this.tempItem.id
                })
                if (tempAry3.length > 0) {
                    that.form.float_xx = tempAry3[0]['fluctua'];
                } else {
                    that.form.float_xx = 0;
                }
            }
            if (this.type == 4) {
                let tempAry2 = this.styledetails.shortvideo.filter((item, index) => {
                    return item.id == this.tempItem.id
                })
                if (tempAry2.length > 0) {
                    that.form.float_xx = tempAry2[0]['fluctua'];
                } else {
                    that.form.float_xx = 0;
                }
            }
            if (this.type == 5) {
                let tempAry = this.styledetails.video.filter((item, index) => {
                    return item.id == this.tempItem.id
                })
                if (tempAry.length > 0) {
                    that.form.float_xx = tempAry[0]['fluctua'];
                } else {
                    that.form.float_xx = 0;
                }
            }

        },
    },

    computed: {
        curPrice() {
            let float_xx = this.getFloax() || 0;
            let result = this.form.settlement_price * (1 + this.form.float_xx / 100) || this.form.settlement_price;

            this.calprice = ~~(result * 100) / 100;
            return ~~(result * 100) / 100;
        }
    },
    mounted() {
        this.form = this.data;
        //this.getFloax()
    },

    created() {
        this.form = this.data;
    },

    updated() {
        this.isvisible = this.visible;
        this.getFloax();
    },

    watch: {
        // floatx(newval,oldval){
        // 	this.form.float_xx = newval
        // },
        visible(newval, oldval) {
            this.isvisible = newval
        },
        title(newval, oldval) {
            switch (newval) {
                case 1: //图片
                    this.curtitle = '图片';
                    break;
                case 2: //图文
                    this.curtitle = '图文';
                    break;

                case 3: //组图
                    this.curtitle = '组图';
                    break;
                case 4: //短视频
                    this.curtitle = '短视频';
                    break;

                case 5: //视频
                    this.curtitle = '视频';
                    break;
            }

        }
    }

}
</script>

<style>
.relative {
    position: relative;
}

.ad_dialog .el-dialog__header {
    border-bottom: 1px solid #e1e7f0;
    display: flex;
    height: 54px;
    line-height: 54px;
    align-items: center;
    padding-left: 30px
}

.ad_dialog .el-dialog__title {
    font-size: 14px;
}

.ad_dialog .el-dialog__body {
    padding-left: 30px;
    padding-top: 30px !important;
}

.ad_dialog .el-dialog__body,
.ad_dialog .el-dialog__footer {
    font-size: 12px;
    padding-left: 30px;
    text-align: left;
    padding-top: 0px;
    padding-bottom: 30px
}

.ad_dialog .el-form-item__label {
    text-align: left;

    font-size: 12px;
    padding: 0px !important;
}

.ad_dialog .el-input {
    width: 180px;
}

.ad_dialog .unit {
    background-color: #fea763;
    position: absolute;
    padding: 10px 10px 9px;
    top: 0;
    right: 41px;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    width: 65px;
    text-align: center;
}

.ad_dialog .unit2 {
    background-color: #6cabff;
}

.ad_dialog .noticeIcon {
    cursor: pointer;
    width: 25px;
    height: 25px;
    vertical-align: -7px;
    display: inline-block;
    background: url(../../style/image/meadia/notice_01.svg) no-repeat center;
    position: absolute;
    top: -5px;
    right: 8px;
}

.ad_dialog .noticeIcon:hover {
    background: url(../../style/image/meadia/notice_01.svg) no-repeat center
}

.ad-create .el-form-item__error {
    padding-top: 0
}
</style>
