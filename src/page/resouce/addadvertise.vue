<template>
    <!-- 基础数据报表 -->
    <div class="ad-create">
        <el-main>
            <el-form ref="form" :model="form" :rules="adformrules" class="adform">
                <el-col :span="24">
                    <h1 class="template-hd">基本资料</h1>
                    <div class="base-bd border-bottom-2 relative">
                        <!-- 广告位名称： start -->
                        <div class="create-row">
                            <el-form-item prop="ad_name" label="广告位名称：" class="data-item" :rules="[
                                  { required: true, message: '请输入广告位名称', trigger: 'blur' }]">
                                <el-input v-model="form.ad_name" placeholder="必填"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 广告位名称： end -->
                        <div class="create-row">
                            <label for="" class="data-item fl">
                                <!--<i class="item-needed">&nbsp;</i>-->
                                <span>&nbsp;</span>
                            广告位id：</label>
                            <div class="item2 relative" style="margin-bottom:13px">

                                <el-checkbox @change="changeAdError" class="" v-model="form.Andchecked">
                                    <span style="display:inline-block;width:50px">  Andriod</span>
                                </el-checkbox>

                                <el-form-item style="margin-left:-100px" prop="andid" class="data-item">
                                    <el-input v-model="form.andid" @input="changeAndid" placeholder="请输入..."></el-input>
                                </el-form-item>

                                <span class="noticeIcon"></span>

                            </div>
                            <div class="relative" style="margin-bottom:0px">
                                <label for="" class="data-item"></label>

                                <el-checkbox @change="changeAdError" style="margin-left:-5px" v-model="form.ioschecked">
                                    <span style="width:50px;display:inline-block">iOS</span>
                                </el-checkbox>

                                <el-form-item style="margin-left:-100px" prop="iosid" class="data-item">
                                    <el-input v-model="form.iosid" @input="changeIosid" placeholder="请输入..."></el-input>
                                </el-form-item>

                                <span class="noticeIcon" style="top:8px"></span>
                            </div>

                            <div v-if="isAdError" style="
                               color:#f56c6c;  
                               font-size: 12px;
                               margin-left: 101px;
                               margin-top: -12px;">
                                请至少选择一个广告位id
                            </div>

                        </div>
                        <!-- 日均pv： start -->
                        <div class="create-row" style="margin-top:-9px">
                            <el-form-item class="item-unneeded" label="日均PV：" style="display:inline-block;" prop="pv">
                                <el-input v-model="form.pv"></el-input>
                            </el-form-item>
                        </div>
                        <!-- 日均pv end -->

                        <!-- 结算类型：结算类型的形式 start -->
                        <div class="create-row" style="height: 38px;line-height: 38px">
                            <el-form-item class="data-item" label="结算类型：" prop="settlement_type">
                                <el-radio-group v-model="form.settlement_type">
                                    <el-radio label="1">按CPM</el-radio>
                                    <!-- <el-radio label="2">按CPC</el-radio> -->
                                </el-radio-group>
                            </el-form-item>

                        </div>
                        <!-- 结算类型： end -->

                        <!-- 结算价格： start -->
                        <div class="create-row">
                            <label for="" class="data-item left" style="position: relative;top:10px"><i class="item-needed">*</i>结算价格：</label>
                            <div class="unit-setting" style="margin-left:-7px">

                                <!--  <el-input 
                                    v-model="form.settlement_price"
                                      ></el-input> -->

                                <el-form-item style="margin-left:-98px" prop="settlement_price">
                                    <el-input v-model="form.settlement_price" @change="setPrice"></el-input>
                                </el-form-item>

                                <span class="unit meta" v-if="form.settlement_type == 1">元/CPM</span>
                                <span class="unit meta" v-if="form.settlement_type == 2">元/CPC</span>

                            </div>
                        </div>
                        <!-- 结算价格： end -->

                        <!-- 广告样式： start -->
                        <div class="create-row" style="margin-top:16px;">
                            <label for="" class="data-item left"><i class="item-needed">*</i>广告样式：</label>
                            <div class="unit-setting ad-style" style="margin-left:-13px">
                                <span class="item" :class="{'active' : index === selectIndex ,
                               'noMr': index === 4}" @click="tabAdStyle($event,index)" v-for='(item,index) in adStyle' :key="index">
                                <em>{{item}}</em>
                              </span>

                            </div>

                            <div class="tabcon" style="margin-left:102px">

                                <div :class="isEdit || activeEdit ? 'saveIcon' : 'addIcon' " @click="addStyleAction(selectIndex)">
                                    <span v-if="isEdit || activeEdit">
                         保存
                      </span>
                                </div>

                                <!-- 图片 黑框 start  isEdit -->
                                <div class="adstylelist" :class="adstylelen >= 2 ? 'mt-100' : ''">

                                    <div class="imgStyle" v-for="(item,index) in this.style_details.imgStyle" :key="index">
                                        <div style="float:left;width: 222px;height:155px">
                                            <img src="../../style/image/meadia/img1.jpg" alt="">
                                        </div>
                                            <div class="rightBtn">
                                                <div class="money iconGroup" @click="Tomoney(item)"></div>
                                                <div class="edit iconGroup" @click="Toedit(item)"></div>
                                                <div class="del iconGroup" @click="Todel(item)"></div>
                                            </div>
                                            <span class="tiptxt1">
                                 图片
                               </span>

                                        </div>
                                        <!-- 图片 黑框 end-->

                                        <!-- 图文 黑框 start-->
                                        <div class="imgStyle imgStyle2" v-for="(item,index) in this.style_details.imgText" :key="index">
                                            <div class="wrap">
                                                <div>
                                                    <span v-if="item.logo" class="con1">LOGO </span>
                                                    <span v-if="item.title" class="con2">标题</span>
                                                </div>

                                                <div>
                                                    <img  class="con3" src="../../style/image/meadia/img2.jpg">
                                                    <span v-if="item.desc" class="con4">描述</span>
                                                </div>
                                                <span class="tiptxt1"> 图文</span>
                                            </div>
                                            <div class="rightBtn">
                                                <div class="money iconGroup" @click="Tomoney(item)"></div>
                                                <div class="edit iconGroup" @click="Toedit(item)"></div>
                                                <div class="del iconGroup" @click="Todel(item)"></div>
                                            </div>
                                        </div>
                                        <!-- 图文 黑框 end-->

                                        <!-- 组图 黑框 start-->
                                        <div class="imgStyle imgStyle2" v-for="(item,index) in this.style_details.imgGroup" :key="index">
                                            <div class="wrap">
                                                <div>
                                                    <span class="con1" v-if="item.logo">LOGO</span>
                                                    <span class="con2" v-if="item.title">标题</span>
                                                </div>
                                                <div style="position: absolute;top: 61px;">
                                                    <img class="con9" style="margin-left:0px" src="../../style/image/meadia/img2.jpg"><img class="con9" src="../../style/image/meadia/img2.jpg"><img class="con9" src="../../style/image/meadia/img2.jpg">
                                            </div>
                                                    <div class="con5" v-if="item.desc">描述</div>

                                                </div>
                                                <div class="rightBtn">
                                                    <div class="money iconGroup" @click="Tomoney(item)"></div>
                                                    <div class="edit iconGroup" @click="Toedit(item)"></div>
                                                    <div class="del iconGroup" @click="Todel(item)"></div>
                                                </div>
                                                <span class="tiptxt1">组图</span>
                                            </div>
                                            <!-- 组图 黑框 end-->

                                            <!-- 短视频组件 start-->
                                            <div class="imgStyle imgStyle2" v-for="(item,index) in this.style_details.shortvideo" :key="index">
                                                <div class="wrap">
                                                    <div>
                                                        <span v-if="item.logo" class="con1">LOGO</span>
                                                        <span v-if="item.title" class="con2">标题</span>
                                                    </div>

                                                    <div style="margin-top:10px">
                                                        <img  class="con6" style="margin-left:0px" src="../../style/image/meadia/img2.jpg">
                                                        <span class="con8">
                                                    <img src="../../style/image/meadia/video.jpg">
                                                 </span>
                                                    </div>
                                                    <div class="con5" v-if="item.desc">
                                                        描述
                                                    </div>
                                                </div>
                                                <div class="rightBtn">
                                                    <div class="money iconGroup" @click="Tomoney(item)"></div>
                                                    <div class="edit iconGroup" @click="Toedit(item)"></div>
                                                    <div class="del iconGroup" @click="Todel(item)"></div>
                                                </div>
                                                <span class="tiptxt1">短视频</span>
                                            </div>
                                            <!-- 短视频组件 end-->

                                            <!-- 视频组件 start-->
                                            <div class="imgStyle imgStyle2" v-for="(item,index) in this.style_details.video" :key="index">
                                                <div class="wrap">
                                                    <div style="background:#fff;height: 135px;line-height: 162px;text-align: center">
                                                        <img class="con7" src="../../style/image/meadia/video.jpg">
                                            </div>

                                                    </div>
                                                    <div class="rightBtn">
                                                        <div class="money iconGroup" @click="Tomoney(item)"></div>
                                                        <div class="edit iconGroup" @click="Toedit(item)"></div>
                                                        <div class="del iconGroup" @click="Todel(item)"></div>
                                                    </div>
                                                    <span class="tiptxt1">视频</span>
                                                </div>
                                                <!-- 视频组件 end-->

                                            </div>

                                            <!--图片  start-->
                                            <div class="tabItem" :style="{'display':selectIndex == 0 ? 'block':'none'}">
                                                <div style="margin-top:10px ">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgStyle.img">图片：</el-checkbox>
                                                    <el-input v-model="form.imgStyle.W" style="width:80px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.imgStyle.H" style="width:80px" placeholder="高"></el-input>
                                                    <el-select style="min-width:66px" multiple v-model="form.imgStyle.imagetype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.imgStyle.imgoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div style="margin:20px 0 12px;display:none">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgStyle.logo">是否支持视频</el-checkbox>
                                                </div>
                                            </div>
                                            <!--图片  end-->

                                            <!--图文  start-->
                                            <div class="tabItem" :style="{'display':selectIndex == 1 ? 'block':'none'}">
                                                <div>
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgText.img">图片：</el-checkbox>
                                                    <el-input v-model="form.imgText.W" style="width:80px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.imgText.H" style="width:80px" placeholder="高"></el-input>
                                                    <el-select multiple v-model="form.imgText.imagetype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.imgText.imgoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>

                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgText.Title">标题字数：</el-checkbox>
                                                    <el-input v-model="form.imgText.title" style="width:180px" @input="changeState($event,'title','imgText')" placeholder="请输入字数限制"></el-input>
                                                </div>

                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgText.Desc">描述：</el-checkbox>
                                                    <el-input @input="changeState($event,'desc','imgText')" v-model="form.imgText.desc" style="width:180px" placeholder="请输入字数限制"></el-input>
                                                </div>

                                                <div class="mt15">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgText.logo">是否需要logo</el-checkbox>
                                                </div>
                                            </div>
                                            <!--图文  end-->

                                            <!--组图  start-->
                                            <div class="tabItem tabItem2" :style="{'display':selectIndex == 2 ? 'block':'none'}">
                                                <div>
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgGroup.img">图片：</el-checkbox>
                                                    <el-input v-model="form.imgGroup.W" style="width:140px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.imgGroup.H" style="width:140px" placeholder="高"></el-input>

                                                </div>
                                                <div class="mt10">
                                                    <el-select multiple style="width:140px;margin-left:68px" v-model="form.imgGroup.imagetype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.imgGroup.imgoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select disabled style="width:140px;margin-left:25px" v-model="form.imgGroup.imagenumber" placeholder="请选择个数">
                                                        <el-option v-for="item in form.imgGroup.imgoptionsnum" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgGroup.Title">标题字数：</el-checkbox>
                                                    <el-input v-model="form.imgGroup.title" @input="changeState($event,'title','imgGroup')" style="width:180px" placeholder="请输入字数限制"></el-input>
                                                </div>
                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgGroup.Desc">描述：</el-checkbox>
                                                    <el-input v-model="form.imgGroup.desc" @input="changeState($event,'desc','imgGroup')" style="width:180px" placeholder="请输入字数限制"></el-input>
                                                </div>
                                                <div class="mt15">
                                                    <el-checkbox :disabled="isEdit" v-model="form.imgGroup.logo">是否需要logo</el-checkbox>
                                                </div>
                                            </div>
                                            <!--组图  end-->

                                            <!--短视频  start-->
                                            <div class="tabItem tabItem3" :style="{'display':selectIndex == 3 ? 'block':'none'}">
                                                <div>
                                                    <el-checkbox :disabled="isEdit" v-model="form.shortvideo.img">封面：</el-checkbox>
                                                    <el-input v-model="form.shortvideo.W" style="width:80px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.shortvideo.H" style="width:80px" placeholder="高"></el-input>
                                                    <el-select multiple v-model="form.shortvideo.imagetype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.shortvideo.imgoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.shortvideo.Video">视频：</el-checkbox>
                                                    <el-input v-model="form.shortvideo.videowidth" style="width:140px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.shortvideo.videoheight" style="width:140px" placeholder="高"></el-input>

                                                </div>
                                                <div class="mt10 inner3">
                                                    <el-select multiple style="width:140px;margin-left:68px" v-model="form.shortvideo.videotype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.shortvideo.videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select style="width:140px;margin-left:25px" v-model="form.shortvideo.videotime" placeholder="请选择时长">
                                                        <el-option v-for="item in form.shortvideo.timeoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.shortvideo.Title">标题字数：</el-checkbox>
                                                    <el-input v-model="form.shortvideo.title" @input="changeState($event,'title','shortvideo')" style="width:180px" placeholder="请输入字数限制"></el-input>
                                                </div>
                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.shortvideo.Desc">描述：</el-checkbox>
                                                    <el-input v-model="form.shortvideo.desc" @input="changeState($event,'desc','shortvideo')" style="width:180px" placeholder="请输入字数限制"></el-input>
                                                </div>
                                                <div class="mt15">
                                                    <el-checkbox :disabled="isEdit" v-model="form.shortvideo.logo">是否需要logo</el-checkbox>
                                                </div>
                                            </div>
                                            <!--短视频  end-->

                                            <!--视频  start-->
                                            <div class="tabItem tabItem3" :style="{'display':selectIndex == 4 ? 'block':'none'}">

                                                <div class="mt10">
                                                    <el-checkbox :disabled="isEdit" v-model="form.video.Video">视频：</el-checkbox>
                                                    <el-input v-model="form.video.videowidth" style="width:140px" placeholder="宽"></el-input>
                                                    <span class="X-style">x</span>
                                                    <el-input v-model="form.video.videoheight" style="width:140px" placeholder="高"></el-input>

                                                </div>
                                                <div class="mt10 inner3">
                                                    <el-select multiple style="width:140px;margin-left:68px" v-model="form.video.videotype" placeholder="请选择格式">
                                                        <el-option v-for="item in form.video.videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>

                                                    <el-select style="width:140px;margin-left:25px" v-model="form.video.videotime" placeholder="请选择时长">
                                                        <el-option v-for="item in form.video.timeoptions" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <!--视频  end-->
                                        </div>
                                    </div>
                                    <!-- 广告样式 end -->

                                    <!-- 状态 start -->
                                    <div class="create-row" style="height:38px;line-height: 38px;">
                                        <label for="" class="data-item ">状态：</label>
                                        <el-switch style="margin-left:-6px" v-model="form.flag" active-text="关闭" inactive-text="开启">
                                        </el-switch>
                                    </div>
                                    <!-- 状态 end -->

                                    <!-- 备注 -->
                                    <div class="create-row">
                                        <label for="" class="data-item " style="float:left">备注：</label>
                                        <el-input style="float: left;margin-left:-6px;width:30%" type="textarea" :rows="2" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" v-model="form.remark">
                                        </el-input>
                                    </div>

                                </div>
                                <div class="is-confirm">
                                    <el-button type="confirm" @click="onSubmit('form')">确认</el-button>
                                    <el-button type="cancel" @click="goBack">取消</el-button>

                                </div>
                </el-col>
                <pricedialog :data="form" :tempItem="tempItem" :styledetails="style_details" :title="dialogtitle" :type="type" v-on:closeDialog="closeDialogFn" v-on:submitDialog="submitDialogFn" :visible="dialogFormVisible" v-if="dialogFormVisible1" :curid="curid"></pricedialog>

            </el-form>
        </el-main>

        <pricedialog :data="form" :tempItem="tempItem" :styledetails="style_details" :title="dialogtitle" :type="type" v-on:closeDialog="closeDialogFn" v-on:submitDialog="submitDialogFn" :visible="false" v-if="dialogFormVisible1" :curid="curid" v-show="false" ref="pricedialog"></pricedialog>
    </div>
</template>

<script>
//广告位的创建和修改  mediaAdlistNew_mediaAdlitEdit
import store from "store";
import {
    meadia,
    resource
} from "../../service/index"

import {
    mapState,
    mapActions
} from "vuex";
import pricedialog from "./pricedialog.vue"
export default {
    components: {
        pricedialog,
    },
    data: function () {
        var checkpv = (rule, value, callback) => {
            let reg = /^[1-9]\d*$/g;
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('只能是数字'));
            }

        };
        var checkprice = (rule, value, callback) => {
            let reg = /^\d+(\.\d{1,2})?$/g;
            if (!value) {
                return callback(new Error('结算价格不能为空'));
            }
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('请输入合法的数字,整数或者两位小数'));
            }
        };
        return {
            adformrules: {
                pv: [{
                        required: true,
                        message: 'pv不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: checkpv,
                        trigger: 'blur'
                    }
                ],
                settlement_type: [{
                    required: true,
                    message: '请选择结算类型',
                    trigger: 'blur'
                }],
                settlement_price: [{
                        required: true,
                        message: '结算价格不能为空',
                        trigger: 'blur'
                    },
                    {
                        validator: checkprice,
                        trigger: 'blur'
                    }
                ],
            },
            adStyle: [ //
                "图片", "图文", "组图", "短视频", "视频"
            ],
            selectIndex: 0,
            selectID: -1, //编辑的时候，操作元素的ID
            dialogFormVisible: false, //是否显示弹框
            dialogFormVisible1: false, //是否显示弹框
            dialogtitle: "", //弹框的标题
            isEdit: false, //是否是编辑的状态
            activeEdit: false, //是否是点击了右侧的编辑按钮
            curPrice: 0, //弹框中临时的浮动后的售价
            fluctua: 0, //弹框中临时的浮动系数
            type: "", //判读是广告样式的那一个类型
            curid: -1, //判读是广告样式的那一个id
            adstylelen: 0, //广告样式的个数
            isAdError: false, //是否显示广告位错误提示
            addStyle: true,

            tempItem: null, //广告右侧弹框内容
            form: {
                Andchecked: false, //广告位id andriod
                ioschecked: false, //广告位id ios
                andid: "", //广告位andriod contect
                iosid: "", //广告位ios contect
                media_id: '', //媒体id
                ad_name: "", //广告位名称
                ad_type: [1, 2], //广告位id
                ad_pid: ["andriod", "ios"], //传递的参数
                pv: "", //日均pv
                settlement_type: "1", // 1 2 结算类型 共有 CPM CPC 2种选择每次只能提交一种）
                settlement_price: "", //计算价格
                flag: false, //广告位状态：（1，开启，2关闭）
                remark: '', //备注
                imgStyle: { //图片规格

                    "W": "",
                    "H": "",
                    "imagetype": [],
                    "imagenumber": 1,
                    "fluctua": 0, //浮动系数
                    "selling_price": 0, //浮动后售价
                    "imgoptions": [{
                        value: 'jpeg',
                        label: 'jpeg'
                    }, {
                        value: 'png',
                        label: 'png'
                    }, {
                        value: 'gif',
                        label: 'gif'
                    }, {
                        value: 'jpg',
                        label: 'jpg'
                    }],
                    "img": true,
                    "video": false,
                    "logo": false,
                },

                imgText: { //图文规格

                    "fluctua": 0,
                    "selling_price": 0, //浮动后售价
                    "W": "",
                    "H": "",
                    "imagetype": [],
                    "imagenumber": 1,
                    "title": null, // 标题   int
                    "desc": null, //描述   int
                    "Title": true,
                    "Desc": false,
                    "img": true,
                    "logo": false,
                    "imgoptions": [{
                        value: 'jpeg',
                        label: 'jpeg'
                    }, {
                        value: 'png',
                        label: 'png'
                    }, {
                        value: 'gif',
                        label: 'gif'
                    }, {
                        value: 'jpg',
                        label: 'jpg'
                    }],
                },
                imgGroup: { //组图规格

                    "W": "",
                    "H": "",
                    "imagetype": [],
                    "fluctua": 0,
                    "selling_price": 0, //浮动后售价
                    "imagenumber": 3,
                    "title": null, // 标题   int
                    "desc": null, //描述   int
                    "Title": true,
                    "Desc": false,
                    "img": true,
                    "logo": false,
                    "imgoptions": [{
                        value: 'jpeg',
                        label: 'jpeg'
                    }, {
                        value: 'png',
                        label: 'png'
                    }, {
                        value: 'gif',
                        label: 'gif'
                    }, {
                        value: 'jpg',
                        label: 'jpg'
                    }],
                    "imgoptionsnum": [{
                        value: '3',
                        label: '3'
                    }],
                },
                shortvideo: { //短视频规格

                    "W": "", //封面图片的宽高
                    "H": "",
                    "imagetype": [],
                    "fluctua": 0,
                    "selling_price": 0, //浮动后售价
                    "videowidth": "", // 视屏的宽  int 
                    "videoheight": "", //视屏的高  int
                    "videotype": [], //视屏的类型   MP4,flv
                    "videotime": '', //视屏的时长 int

                    "imagenumber": 1,
                    "title": null, // 标题   int
                    "desc": null, //描述   int
                    "Title": true,
                    "Desc": false,
                    "img": true,
                    "logo": false,
                    "Video": true,
                    "imgoptions": [{ //图片格式
                        value: 'jpeg',
                        label: 'jpeg'
                    }, {
                        value: 'png',
                        label: 'png'
                    }, {
                        value: 'gif',
                        label: 'gif'
                    }, {
                        value: 'jpg',
                        label: 'jpg'
                    }],
                    "videooptions": [{ //视频格式
                        value: 'MP4',
                        label: 'MP4'
                    }, {
                        value: 'flv',
                        label: 'flv'
                    }],
                    "timeoptions": [{ //视频时长
                            value: '5',
                            label: '5s'
                        }, {
                            value: '15',
                            label: '15s'
                        },
                        {
                            value: '30',
                            label: '30s'
                        },
                        {
                            value: '45',
                            label: '45s'
                        },
                        {
                            value: '60',
                            label: '60s'
                        }
                    ],
                },
                video: { //视频规格

                    "videowidth": "", // 视屏的宽  int 
                    "videoheight": "", //视屏的高  int
                    "videotype": [], //视屏的类型   MP4,flv
                    "videotime": '', //视屏的时长 int
                    "Video": true,
                    "fluctua": 0,
                    "selling_price": 0, //浮动后售价
                    "videooptions": [{ //视频格式
                        value: 'MP4',
                        label: 'MP4'
                    }, {
                        value: 'flv',
                        label: 'flv'
                    }],
                    "timeoptions": [{ //视频时长
                            value: '5',
                            label: '5s'
                        }, {
                            value: '15',
                            label: '15s'
                        },
                        {
                            value: '30',
                            label: '30s'
                        },
                        {
                            value: '45',
                            label: '45s'
                        },
                        {
                            value: '60',
                            label: '60s'
                        }
                    ],
                },
            },

            editStyleDetails: [], //编辑的时候广告样式

            "style_details": { //添加的样式列表
                imgStyle: [], //图片
                imgText: [], //图文
                imgGroup: [], //组图
                shortvideo: [], //短视频
                video: [], //视频
            }
        };
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };
    },
    mounted() {
        this.addStyle = true;
        this.isEdit = false;

        this.setBreadCrumb(this.$route.path.replace("/", ""));
        let adId = this.$route.params.adId;
        let mediaId = this.$route.params.mediaId;
        let that = this;
        if (adId) {
            that.addStyle = true;
            resource.editAdList(this.header, {
                id: adId
            }).then(res => {
                if (res.data.data && res.data.data.code == "401") {
                    this.$switchLogin("", this);
                    return;
                }
                if (res.data.data && res.data.data.code == "402") {
                    this.$message(res.data.data.error);
                    return;
                }
                if (res.data.success == true) {
                    let data = res.data.data;
                    that.form.media_id = data.media_id || "";
                    that.form.ad_pid = data.ad_id; //广告位id数据
                    that.form.ad_name = data.ad_name || "";
                    that.form.andid = data.admedia_a;
                    that.form.iosid = data.admedia_i;
                    that.form.pv = data.pv || "";
                    that.form.settlement_type = data.settlement_type.toString() || "";
                    that.form.settlement_price = data.settlement_price || "";

                    //that.form.ad_type = data.ad_type || "";

                    that.form.Andchecked = data.admedia_a ? true : false;
                    that.form.ioschecked = data.admedia_i ? true : false;

                    // if (data.ad_type == 1) {
                    //     that.form.andid = JSON.parse(data.ad_pid)[0] || "";
                    // } else if (data.ad_type == 2) {
                    //     that.form.iosid = JSON.parse(data.ad_pid)[0] || "";
                    // } else if (data.ad_type == 3) {
                    //     that.form.Andchecked = true;
                    //     that.form.ioschecked = true;
                    //     that.form.andid = JSON.parse(data.ad_pid)[0];
                    //     that.form.iosid = JSON.parse(data.ad_pid)[1];
                    // }

                    that.form.flag = data.flag || "";
                    if (data.flag == 1) {
                        that.form.flag = true;
                    } else if (data.flag == 2) {
                        that.form.flag = false;
                    }
                    that.form.remark = data.remark || "";

                    let style_details_ary = (data.mediaAdListStyles);
                    that.editStyleDetails = (data.mediaAdListStyles);
                    //根据数据进行编辑数据显示问题
                    for (let i = 0; i < style_details_ary.length; i++) {
                        let cast_id = style_details_ary[i].cast_id;
                        if (cast_id == '1') {
                            getList1(style_details_ary[i]);
                        }
                        if (cast_id == '2') {
                            getList2(style_details_ary[i]);
                        }
                        if (cast_id == '3') {
                            getList3(style_details_ary[i]);
                        }
                        if (cast_id == '4') {
                            getList4(style_details_ary[i]);
                        }
                        if (cast_id == '5') {
                            getList5(style_details_ary[i]);
                        }
                    }

                    //getList的键名不需要更换
                    // settlement_price
                    function getList1(obj) {
                        that.form.imgStyle.fluctua = obj.fluctua;
                        that.style_details.imgStyle.push({
                            'H': obj.image_h, //高度
                            'W': obj.image_w, //宽度
                            "imagenumber": obj.image_num || 1,
                            'fluctua': obj.fluctua || 0, //浮动系数
                            'imagetype': obj.image_style,
                            'selling_price': obj.selling_price, //售价
                            'img': obj.islogo, //是否是logo
                            'media_cost': obj.media_cost,
                            'cast_id': obj.cast_id,
                            'id': obj.id

                        })
                    }

                    function getList2(obj) {

                        that.form.imgText.fluctua = obj.fluctua;
                        that.style_details.imgText.push({
                            'H': obj.image_h, //高度
                            'W': obj.image_w, //宽度
                            'imagetype': obj.image_style,
                            // 'type': 'imagetext', //类型
                            // 'img': obj.islogo,
                            "title": obj.title,
                            "desc": obj.des,
                            // "Title": obj.Title,
                            // "Desc": obj.Desc,
                            'logo': obj.islogo,
                            'fluctua': obj.fluctua || 0,
                            'id': obj.id,
                            'cast_id': obj.cast_id,
                            "imagenumber": obj.image_num || 1,
                            'selling_price': obj.selling_price, //售价
                        })
                    }

                    function getList3(obj) {
                        console.log("组图信息")
                        console.log(obj)
                        that.form.imgGroup.fluctua = obj.fluctua;
                        that.style_details.imgGroup.push({

                            'H': obj.image_h, //高度
                            'W': obj.image_w, //宽度

                            'imagetype': obj.image_style,

                            'fluctua': obj.fluctua || 0,
                            'selling_price': obj.selling_price, //售价
                            // 'type': 'imagegroup', //类型
                            "imagenumber": obj.image_num || 3,

                            // 'img': obj.image,
                            "title": obj.title,
                            "desc": obj.des,
                            // "Title": obj.Title,
                            // "Desc": obj.Desc,

                            'cast_id': obj.cast_id,
                            'logo': obj.islogo,
                            'id': obj.id

                        })
                    }

                    function getList4(obj) { //段视频
                        console.log("段视频")
                        console.log(obj)
                        that.form.shortvideo.fluctua = obj.fluctua;
                        that.style_details.shortvideo.push({
                            'H': obj.image_h, //高度
                            'W': obj.image_w, //宽度
                            'imagetype': obj.image_style,
                            // 'type': 'shortvideo', //类型
                            'videowidth': obj.video_w,
                            'videoheight': obj.video_h,

                            'videotype': obj.video_style,
                            'videotime': obj.video_time,

                            "imagenumber": obj.image_num || 1,
                            'fluctua': obj.fluctua || 0,
                            'selling_price': obj.selling_price, //售价

                            // 'img': obj.image,
                            "title": obj.title,
                            "desc": obj.des,
                            // "Title": obj.Title,
                            // "Desc": obj.Desc,
                            'logo': obj.islogo,
                            'cast_id': obj.cast_id,
                            // 'Video': obj.video,
                            'fluctua': obj.fluctua || 0,
                            'id': obj.id
                        })

                    }

                    function getList5(obj) { //视频
                        console.log("视频信息")
                        console.log(obj)
                        that.form.video.fluctua = obj.fluctua;
                        that.style_details.video.push({
                            'videowidth': obj.video_w,
                            'Video': obj.video_w, //复选框
                            'videoheight': obj.video_h,
                            'videotype': obj.video_style,
                            'videotime': obj.video_time,
                            'fluctua': obj.fluctua || 0,
                            'imagenumber': obj.image_num || 1,
                            'cast_id': obj.cast_id,
                            'id': obj.id

                        })
                    }

                }
            });
        } else {
            //that.dialogFormVisible = true

        }

    },

    methods: {
        // isEditStyle(){
        //     this.addStyle = true;
        //     this.isEdit = false;
        // },
        changeAdError(val) {
            if (val) {
                this.isAdError = false;
            }
        },

        setPrice() {

            // console.log("setPrice");
            // console.log(this.$refs.pricedialog.modifyValueByParent());

            // this.$refs.selectfood.formLabelWidth;

            // this.$refs.mychild.modifyValueByParent();

            //this.$refs.pricedialog.okBtn("form");

        },

        //标题和描述的文字输入选择框选中
        changeState(val, t, l) {
            if (t == "title" && l == 'imgText') {
                if (val) {
                    this.form.imgText.Title = true;
                } else {
                    this.form.imgText.Title = false;
                }
            }
            if (t == "desc" && l == 'imgText') {
                if (val) {
                    this.form.imgText.Desc = true;
                } else {
                    this.form.imgText.Desc = false;
                }
            }

            if (t == "title" && l == 'imgGroup') {
                if (val) {
                    this.form.imgGroup.Title = true;
                } else {
                    this.form.imgGroup.Title = false;
                }
            }
            if (t == "desc" && l == 'imgGroup') {
                if (val) {
                    this.form.imgGroup.Desc = true;
                } else {
                    this.form.imgGroup.Desc = false;
                }
            }

            if (t == "title" && l == 'shortvideo') {
                if (val) {
                    this.form.shortvideo.Title = true;
                } else {
                    this.form.shortvideo.Title = false;
                }
            }
            if (t == "desc" && l == 'shortvideo') {
                if (val) {
                    this.form.shortvideo.Desc = true;
                } else {
                    this.form.shortvideo.Desc = false;
                }
            }

        },
        changeAndid(val) {
            if (val) {
                this.form.Andchecked = true;
                this.isAdError = false;
            } else {
                this.form.Andchecked = false;
                this.isAdError = true;
            }
        },
        changeIosid(val) {
            if (val) {
                this.form.ioschecked = true;
                this.isAdError = false;
            } else {
                this.form.ioschecked = false;
                this.isAdError = false;
            }
        },
        closeDialogFn() { //弹框关闭
            let that = this;
            that.dialogtitle = "";
            that.dialogFormVisible = false;
            that.dialogFormVisible1 = false;

        },
        submitDialogFn(obj) { //关闭弹框，并且是传递数据

            let that = this;
            //向对应的数据中添加对应的浮动系数
            this.curPrice = obj.curPrice;
            if (obj.type == 1) { //图片
                for (var i = 0; i < that.style_details.imgStyle.length; i++) {
                    let item1 = that.style_details.imgStyle[i];
                    if (item1.id == obj.curid) {
                        item1.fluctua = obj.fluctua;
                        item1.selling_price = obj.selling_price;
                        break;
                    }
                }

            }

            if (obj.type == 2) { //图文
                for (var i = 0; i < that.style_details.imgText.length; i++) {
                    let item1 = that.style_details.imgText[i];
                    if (item1.id == obj.curid) {
                        item1.fluctua = obj.fluctua;
                        item1.selling_price = obj.selling_price;
                        break;
                    }
                }

            }

            if (obj.type == 3) { //组图
                for (var i = 0; i < that.style_details.imgGroup.length; i++) {
                    let item1 = that.style_details.imgGroup[i];
                    if (item1.id == obj.curid) {
                        item1.fluctua = obj.fluctua;
                        item1.selling_price = obj.selling_price;
                        break;
                    }
                }

            }

            if (obj.type == 4) { //短视频
                for (var i = 0; i < that.style_details.shortvideo.length; i++) {
                    let item1 = that.style_details.shortvideo[i];
                    if (item1.id == obj.curid) {
                        item1.fluctua = obj.fluctua;
                        item1.selling_price = obj.selling_price;
                        break;
                    }
                }

            }

            if (obj.type == 5) { //视频
                for (var i = 0; i < that.style_details.video.length; i++) {
                    let item1 = that.style_details.video[i];
                    if (item1.id == obj.curid) {
                        item1.fluctua = obj.fluctua;
                        item1.selling_price = obj.selling_price;
                        break;
                    }
                }

            }

            that.style_details = Object.assign({}, that.style_details);
            that.dialogtitle = "";
            that.dialogFormVisible = false;
            that.dialogFormVisible1 = false;

        },
        Tomoney(item) { //调取弹框

            let that = this;
            that.selectID = item.id; //将改变全局中选中的id
            that.type = item.cast_id;
            that.tempItem = item;
            that.curid = item.id;
            that.style_details = Object.assign({}, that.style_details);
            that.dialogFormVisible1 = true;

            setTimeout(function () {
                that.dialogtitle = item.cast_id;
                that.dialogFormVisible = true;
            }, 200)
        },
        Toedit(item) { //样式的编辑
            console.log(item);
            this.activeEdit = true;
            let that = this;
            that.selectID = item.id; //将改变全局中选中的id  切换的时候，将数据显示到页面上
            that.type = item.type;
            //id = id == 0 ? 0 : 1;//更正传递的id的值 数字仅仅是两项
            that.curid = item.id;
            if (item.cast_id == 1) {
                that.selectIndex = 0;
                let _ary = that.style_details.imgStyle.slice(0);
                let _index = _ary.indexOf(item);
                that.form.imgStyle.W = _ary[_index].W;
                that.form.imgStyle.logo = _ary[_index].img;
                that.form.imgStyle.H = _ary[_index].H;
                if (typeof _ary[_index].imagetype == "string") {
                    that.form.imgStyle.imagetype = _ary[_index].imagetype.split(",");
                } else {
                    that.form.imgStyle.imagetype = _ary[_index].imagetype
                }

                that.form.imgStyle.fluctua = _ary[_index].fluctua || 0;
                that.form.imgStyle.selling_price = _ary[_index].selling_price || 0;

            }

            if (item.cast_id == 2) {
                that.selectIndex = 1;
                let _ary = that.style_details.imgText.slice(0);
                console.log(_ary)
                let _index = _ary.indexOf(item);

                that.form.imgText.W = _ary[_index].W;
                that.form.imgText.H = _ary[_index].H;
                if (typeof _ary[_index].imagetype == "string") {
                    that.form.imgText.imagetype = _ary[_index].imagetype.split(",");
                } else {
                    that.form.imgText.imagetype = _ary[_index].imagetype
                }

                that.form.imgText.Title = _ary[_index].title ? true : false;
                that.form.imgText.Desc = _ary[_index].desc ? true : false;
                that.form.imgText.img = _ary[_index].W ? true : false;
                that.form.imgText.logo = _ary[_index].logo == 1 ? true : false;

                that.form.imgText.desc = _ary[_index].desc;
                that.form.imgText.title = _ary[_index].title;

                that.form.imgText.fluctua = _ary[_index].fluctua || 0;
                that.form.imgText.selling_price = _ary[_index].selling_price || 0;
            }

            if (item.cast_id == 3) {
                that.selectIndex = 2;
                let _ary = that.style_details.imgGroup.slice(0);
                let _index = _ary.indexOf(item);

                that.form.imgGroup.W = _ary[_index].W;
                that.form.imgGroup.H = _ary[_index].H;
                that.form.imgGroup.type = _ary[_index].type;
                that.form.imgGroup.imagenumber = _ary[_index].imagenumber || 3;

                that.form.imgGroup.img = _ary[_index].W ? true : false;
                that.form.imgGroup.Title = _ary[_index].title ? true : false;
                that.form.imgGroup.Desc = _ary[_index].desc ? true : false;
                that.form.imgGroup.logo = _ary[_index].logo == 1 ? true : false;

                that.form.imgGroup.desc = _ary[_index].desc;
                that.form.imgGroup.title = _ary[_index].title;

                if (typeof _ary[_index].imagetype == "string") {
                    that.form.imgGroup.imagetype = _ary[_index].imagetype.split(",");
                } else {
                    that.form.imgGroup.imagetype = _ary[_index].imagetype
                }
                that.form.imgGroup.fluctua = _ary[_index].fluctua || 0;
                that.form.imgGroup.selling_price = _ary[_index].selling_price || 0;

            }

            if (item.cast_id == 4) {
                that.selectIndex = 3;
                let _ary = that.style_details.shortvideo.slice(0);
                console.log(_ary)
                let _index = _ary.indexOf(item);
                that.form.shortvideo.W = _ary[_index].W;
                that.form.shortvideo.H = _ary[_index].H;
                that.form.shortvideo.type = _ary[_index].type;
                that.form.shortvideo.videowidth = _ary[_index].videowidth;
                that.form.shortvideo.videoheight = _ary[_index].videoheight;
                that.form.shortvideo.videotime = _ary[_index].videotime;

                that.form.shortvideo.Title = _ary[_index].title ? true : false;
                that.form.shortvideo.Desc = _ary[_index].desc ? true : false;
                that.form.shortvideo.Video = _ary[_index].videowidth ? true : false;
                that.form.shortvideo.logo = _ary[_index].logo == 1 ? true : false;
                that.form.shortvideo.img = _ary[_index].W ? true : false;

                that.form.shortvideo.desc = _ary[_index].desc;
                that.form.shortvideo.title = _ary[_index].title;

                if (typeof _ary[_index].imagetype == "string") {
                    that.form.shortvideo.imagetype = _ary[_index].imagetype.split(",");
                } else {
                    that.form.shortvideo.imagetype = _ary[_index].imagetype
                }

                if (typeof _ary[_index].videotype == "string") {
                    that.form.shortvideo.videotype = _ary[_index].videotype.split(",");
                } else {
                    that.form.shortvideo.videotype = _ary[_index].videotype
                }
                that.form.shortvideo.fluctua = _ary[_index].fluctua || 0;
                that.form.shortvideo.selling_price = _ary[_index].selling_price || 0;

            }
            if (item.cast_id == 5) {
                that.selectIndex = 4;
                let _ary = that.style_details.video.slice(0);
                let _index = _ary.indexOf(item);

                that.form.video.videowidth = _ary[_index].videowidth;
                that.form.video.videoheight = _ary[_index].videoheight;
                that.form.video.videotime = _ary[_index].videotime;
                that.form.video.Video = _ary[_index].videowidth ? true : false;

                if (typeof _ary[_index].videotype == "string") {
                    that.form.video.videotype = _ary[_index].videotype.split(",");
                } else {
                    that.form.video.videotype = _ary[_index].videotype
                }

                that.form.video.fluctua = _ary[_index].fluctua || 0;
                that.form.video.selling_price = _ary[_index].selling_price || 0;

            }

        },
        Todel(item) { //删除某个样式
            let that = this;
            if (that.isEdit) { //广告位编辑的时候不能删除
                that.$message({
                    message: '此广告样式,只能修改不能删除',
                    type: 'warning'
                });
                return false;
            }

            that.adstylelen--;
            if (that.adstylelen < 0) {
                that.adstylelen = 0
            }
            if (item.cast_id == 1) {
                that.style_details.imgStyle.splice(that.style_details.imgStyle.indexOf(item), 1)

            }
            if (item.cast_id == 2) {
                that.style_details.imgText.splice(that.style_details.imgText.indexOf(item), 1)
            }
            if (item.cast_id == 3) {
                that.style_details.imgGroup.splice(that.style_details.imgGroup.indexOf(item), 1)
            }
            if (item.cast_id == 4) {
                that.style_details.shortvideo.splice(that.style_details.shortvideo.indexOf(item), 1)
            }
            if (item.cast_id == 5) {
                that.style_details.video.splice(that.style_details.video.indexOf(item), 1)
            }

        },

        advalidationform1() {
            let reg = /[^\d]+/g;
            if (!this.form.imgStyle.img) {
                this.$message({
                    message: "请勾选图片复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgStyle.W) {
                this.$message({
                    message: "请填写图片宽度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgStyle.W)) {
                this.$message({
                    message: "图片宽度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.imgStyle.H) {
                this.$message({
                    message: "请填写图片高度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgStyle.H)) {
                this.$message({
                    message: "图片高度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (this.form.imgStyle.imagetype.length == 0) {
                this.$message({
                    message: "请选择图片规格",
                    type: "warning"
                });
                return false;
            }
            return true;
        },

        advalidationform2() {
            let reg = /[^\d]+/g;
            if (!this.form.imgText.img) {
                this.$message({
                    message: "请勾选图片复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgText.W) {
                this.$message({
                    message: "请填写图片宽度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgText.W)) {
                this.$message({
                    message: "图片宽度只能是数字",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgText.H) {
                this.$message({
                    message: "请填写图片高度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgText.H)) {
                this.$message({
                    message: "图片高度只能是数字",
                    type: "warning"
                });
                return false;
            }
            if (this.form.imgText.imagetype.length == 0) {
                this.$message({
                    message: "请选择图片规格",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.imgText.Title) {
                this.$message({
                    message: "请勾选标题复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgText.title) {
                this.$message({
                    message: "请填写标题",
                    type: "warning"
                });
                return false;
            }

            if (this.form.imgText.title && reg.test(this.form.imgText.title)) {
                this.$message({
                    message: "标题只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            if (this.form.imgText.desc && reg.test(this.form.imgText.desc)) {
                this.$message({
                    message: "描述只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            return true;
        },

        advalidationform3() { //组图的校验
            let reg = /[^\d]+/g;
            if (!this.form.imgGroup.img) {
                this.$message({
                    message: "请勾选图片复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgGroup.W) {
                this.$message({
                    message: "请填写图片宽度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgGroup.W)) {
                this.$message({
                    message: "图片宽度只能是数字",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgGroup.H) {
                this.$message({
                    message: "请填写图片高度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.imgGroup.H)) {
                this.$message({
                    message: "图片高度只能是数字",
                    type: "warning"
                });
                return false;
            }
            if (this.form.imgGroup.imagetype.length == 0) {
                this.$message({
                    message: "请选择图片规格",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.imgGroup.imagenumber) {
                this.$message({
                    message: "请选择图片个数",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.imgGroup.Title) {
                this.$message({
                    message: "请勾选标题复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.imgGroup.title) {
                this.$message({
                    message: "请填写标题",
                    type: "warning"
                });
                return false;
            }

            if (this.form.imgGroup.title && reg.test(this.form.imgGroup.title)) {
                this.$message({
                    message: "标题只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            if (this.form.imgGroup.desc && reg.test(this.form.imgGroup.desc)) {
                this.$message({
                    message: "描述只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            return true;
        },

        advalidationform4() { //短视频的校验
            let reg = /[^\d]+/g;

            if (reg.test(this.form.shortvideo.W)) {
                this.$message({
                    message: "图片宽度只能是数字",
                    type: "warning"
                });
                return false;
            }
            if (reg.test(this.form.shortvideo.H)) {
                this.$message({
                    message: "图片高度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (this.form.shortvideo.imagetype.length == 0) {
                this.$message({
                    message: "请选择封面格式",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.shortvideo.Video) {
                this.$message({
                    message: "请勾选视频复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.shortvideo.videowidth) {
                this.$message({
                    message: "请填写视频宽度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.shortvideo.videowidth)) {
                this.$message({
                    message: "视频宽度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.shortvideo.videoheight) {
                this.$message({
                    message: "请填写视频高度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.shortvideo.videoheight)) {
                this.$message({
                    message: "视频高度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (this.form.shortvideo.videotype.length == 0) {
                this.$message({
                    message: "请选择视频规格",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.shortvideo.videotime) {
                this.$message({
                    message: "请选择视频时长",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.shortvideo.Title) {
                this.$message({
                    message: "请勾选标题复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.shortvideo.title) {
                this.$message({
                    message: "请填写标题",
                    type: "warning"
                });
                return false;
            }

            if (this.form.shortvideo.title && reg.test(this.form.shortvideo.title)) {
                this.$message({
                    message: "标题只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            if (this.form.shortvideo.desc && reg.test(this.form.shortvideo.desc)) {
                this.$message({
                    message: "描述只能输入是数字",
                    type: "warning"
                });
                return false;
            }
            return true;
        },

        advalidationform5() { //视频的校验
            let reg = /[^\d]+/g;

            if (!this.form.video.Video) {
                this.$message({
                    message: "请勾选视频复选框",
                    type: "warning"
                });
                return false;
            }
            if (!this.form.video.videowidth) {
                this.$message({
                    message: "请填写视频宽度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.video.videowidth)) {
                this.$message({
                    message: "视频宽度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.video.videoheight) {
                this.$message({
                    message: "请填写视频高度",
                    type: "warning"
                });
                return false;
            } else if (reg.test(this.form.video.videoheight)) {
                this.$message({
                    message: "视频高度只能是数字",
                    type: "warning"
                });
                return false;
            }

            if (this.form.video.videotype.length == 0) {
                this.$message({
                    message: "请选择视频规格",
                    type: "warning"
                });
                return false;
            }

            if (!this.form.video.videotime) {
                this.$message({
                    message: "请选择视频时长",
                    type: "warning"
                });
                return false;
            }
            return true;
        },

        //判断是否是重复的值
        isObjectValueEqual(a, b) {
            if (a.id) {
                delete a.id;
                delete a.__ob__;
                delete b.id;
            }
            if (Object.keys(a).length != Object.keys(b).length) {
                return false;
            }
            for (var attr in a) {
                if (typeof a[attr] == "object") {
                    let aa = a[attr].sort();
                    let bb = b[attr].sort();
                    if (aa.toString() == bb.toString()) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (a[attr] != b[attr]) {
                    return false
                }
            }
            return true
        },

        isAddAction(ary, newItem) { //添加广告的函数
            let that = this;
            if (ary.length > 0) {
                for (let i = 0; i < ary.length; i++) {
                    let temp = {};
                    let len = ary.length;
                    for (var attr in ary[i]) {
                        if (attr !== "id") { //当前的值
                            temp[attr] = ary[i][attr]
                        }
                    }
                    const imgStyleobj = { ...newItem
                    };
                    let temp2 = {}; //文本框的值
                    for (var attr in imgStyleobj) {
                        if (attr !== "id") {
                            temp2[attr] = imgStyleobj[attr]
                        }
                    }

                    if (that.isObjectValueEqual(temp, temp2)) {
                        that.$message({
                            message: "不能重复添加广告选项格式,请修改",
                            type: "warning"
                        });
                        break;
                    } else {
                        if (i < len - 1) {
                            continue;
                        }
                        if (i == len - 1) {
                            ary.push(newItem);
                            that.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.resetStyleOptions();
                            break;
                        }
                    }
                }

            } else {
                ary.push(newItem);
                that.$message({
                    message: "添加成功",
                    type: "success"
                });
                this.resetStyleOptions();

            }
        },

        addStyleAction(index, obj) { //添加广告样式
            let that = this;
            let tempLen = 0;
            for (var attr in this.style_details) {
                if (this.style_details[attr].length > 0) {
                    tempLen++;
                    that.adstylelen = tempLen;
                }
            }

            switch (index) {
                case 0:
                    if (that.selectID > -1) { //处理单个编辑
                        if (!that.advalidationform1()) {
                            return;
                        }
                        for (var i = that.style_details.imgStyle.length - 1; i >= 0; i--) {
                            let item = that.style_details.imgStyle[i];
                            //item.id = item.id == 0 ? 0 : 1;
                            if (item.id == that.selectID) {
                                item.H = that.form.imgStyle.H;
                                item.W = that.form.imgStyle.W;
                                item.imagetype = that.form.imgStyle.imagetype.length > 1 ? that.form.imgStyle.imagetype.join(",") : that.form.imgStyle.imagetype.toString();
                                item.img = that.form.imgStyle.img;
                                item.video = that.form.imgStyle.video;
                                item.logo = that.form.imgStyle.logo;
                                item.imagenumber = that.form.imgStyle.imagenumber;
                                item.fluctua = item.fluctua ? item.fluctua : (that.form.imgStyle.fluctua || 0);

                            }
                        }

                        if (that.style_details.imgStyle.length > 0) {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.resetStyleOptions()
                        }

                        that.activeEdit = false

                    } else if (that.advalidationform1()) {

                        this.isAddAction(
                            this.style_details.imgStyle, {
                                // 'id':this.style_details.imgStyle.length + 1,//标示
                                'id': Math.random(), //标示
                                'H': this.form.imgStyle.H, //高度
                                'W': this.form.imgStyle.W, //宽度
                                'imagetype': this.form.imgStyle.imagetype.length > 1 ? this.form.imgStyle.imagetype.join(",") : this.form.imgStyle.imagetype.toString(),
                                'imagenumber': 1,
                                'type': 'image', //类型
                                'img': this.form.imgStyle.img,
                                'video': this.form.imgStyle.video,
                                'logo': this.form.imgStyle.logo,
                                'fluctua': 0,
                                "cast_id": 1,
                                //'fluctua':this.form.imgStyle.fluctua || 0,

                            }
                        );
                    }

                    that.selectID = -1;
                    break;
                case 1:

                    if (that.selectID > -1) {

                        if (!that.advalidationform2()) {
                            return;
                        }
                        this.style_details.imgText.forEach((item, index) => {
                            //item.id = item.id == 0 ? 0 : 1;
                            if (item.id == that.selectID) {
                                item.H = that.form.imgText.H;
                                item.W = that.form.imgText.W;
                                item.imagetype = that.form.imgText.imagetype.length > 1 ? that.form.imgText.imagetype.join(",") : that.form.imgText.imagetype.toString();
                                item.img = that.form.imgText.img;
                                item.title = that.form.imgText.title;
                                item.desc = that.form.imgText.desc;
                                item.Title = that.form.imgText.Title;
                                item.Desc = that.form.imgText.Desc;
                                item.logo = that.form.imgText.logo;
                                item.imagenumber = that.form.imgText.imagenumber || 1;
                                item.fluctua = item.fluctua ? item.fluctua : (that.form.imgText.fluctua || 0);

                            }
                        })

                        if (that.style_details.imgText.length > 0) {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.resetStyleOptions()
                        }

                        that.activeEdit = false

                    } else if (that.advalidationform2()) {

                        this.isAddAction(
                            this.style_details.imgText, {
                                'id': Math.random(), //标示
                                'H': that.form.imgText.H, //高度
                                'W': that.form.imgText.W, //宽度
                                'imagetype': that.form.imgText.imagetype.length > 1 ? that.form.imgText.imagetype.join(",") : that.form.imgText.imagetype.toString(),
                                'type': 'imagetext', //类型
                                "img": that.form.imgText.img,
                                "title": that.form.imgText.title,
                                "desc": that.form.imgText.desc,
                                "Title": that.form.imgText.Title,
                                "Desc": that.form.imgText.Desc,
                                'logo': that.form.imgText.logo,
                                'imagenumber': that.form.imgText.imagenumber || 1,
                                'fluctua': 0,
                                // 'fluctua':that.form.imgText.fluctua || 0,
                                "cast_id": 2,

                            })

                    }

                    that.selectID = -1;
                    break;

                case 2: //组图形式

                    if (that.selectID > -1) {
                        if (!that.advalidationform3()) {
                            return;
                        }
                        this.style_details.imgGroup.forEach((item, index) => {
                            //item.id = item.id == 0 ? 0 : 1;
                            if (item.id == that.selectID) {
                                item.H = that.form.imgGroup.H;
                                item.W = that.form.imgGroup.W;
                                item.imagetype = that.form.imgGroup.imagetype.length > 1 ? that.form.imgGroup.imagetype.join(",") : that.form.imgGroup.imagetype.toString();
                                item.imagenumber = that.form.imgGroup.imagenumber || 1; //个数
                                item.img = that.form.imgGroup.img;
                                item.title = that.form.imgGroup.title;
                                item.desc = that.form.imgGroup.desc;
                                item.Title = that.form.imgGroup.Title;
                                item.Desc = that.form.imgGroup.Desc;
                                item.logo = that.form.imgGroup.logo;
                                item.fluctua = item.fluctua ? item.fluctua : (that.form.imgGroup.fluctua || 0);
                            }
                        })

                        if (that.style_details.imgGroup.length > 0) {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.resetStyleOptions()
                        }
                        that.activeEdit = false

                    } else if (that.advalidationform3()) {

                        this.isAddAction(
                            this.style_details.imgGroup, {
                                'id': Math.random(), //标示
                                'H': this.form.imgGroup.H, //高度
                                'W': this.form.imgGroup.W, //宽度
                                'imagetype': that.form.imgGroup.imagetype.length > 1 ? that.form.imgGroup.imagetype.join(",") : that.form.imgGroup.imagetype.toString(),
                                'type': 'imagegroup', //类型
                                'imagenumber': this.form.imgGroup.imagenumber || 3, //个数
                                "title": this.form.imgGroup.title,
                                "desc": this.form.imgGroup.desc,
                                "Title": this.form.imgGroup.Title,
                                "Desc": this.form.imgGroup.Desc,
                                'logo': this.form.imgGroup.logo,
                                "img": this.form.imgGroup.img,
                                // "fluctua":this.form.imgGroup.fluctua ||0,
                                "fluctua": 0,
                                "cast_id": 3,

                            });

                    }
                    that.selectID = -1;
                    break;

                case 3: //短视频

                    if (that.selectID > -1) {
                        if (!that.advalidationform4()) {
                            return;
                        }

                        this.style_details.shortvideo.forEach((item, index) => {
                            if (item.id == that.selectID) {
                                item.H = that.form.shortvideo.H;
                                item.W = that.form.shortvideo.W;
                                item.imagetype = that.form.shortvideo.imagetype.length > 1 ? that.form.shortvideo.imagetype.join(",") : that.form.shortvideo.imagetype.toString();

                                item.videowidth = that.form.shortvideo.videowidth;
                                item.videoheight = that.form.shortvideo.videoheight;

                                item.videotype = that.form.shortvideo.videotype.length > 1 ? that.form.shortvideo.videotype.join(",") : that.form.shortvideo.videotype.toString();

                                item.videotime = that.form.shortvideo.videotime;

                                item.img = that.form.shortvideo.img;
                                item.title = that.form.shortvideo.title;
                                item.desc = that.form.shortvideo.desc;
                                item.Title = that.form.shortvideo.Title;
                                item.Desc = that.form.shortvideo.Desc;
                                item.logo = that.form.shortvideo.logo;
                                item.imagenumber = that.form.shortvideo.imagenumber || 1;
                                item.fluctua = item.fluctua ? item.fluctua : (that.form.shortvideo.fluctua || 0);
                            }
                        })

                        if (that.style_details.shortvideo.length > 0) {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.resetStyleOptions()
                        }
                        that.activeEdit = false

                    } else if (that.advalidationform4()) {

                        this.isAddAction(
                            this.style_details.shortvideo, {
                                'id': Math.random(), //标示
                                'H': this.form.shortvideo.H, //高度
                                'W': this.form.shortvideo.W, //宽度

                                'imagetype': that.form.shortvideo.imagetype.length > 1 ? that.form.shortvideo.imagetype.join(",") : that.form.shortvideo.imagetype.toString(),

                                'type': 'shortvideo', //类型

                                'videowidth': this.form.shortvideo.videowidth,
                                'videoheight': this.form.shortvideo.videoheight,

                                'videotype': this.form.shortvideo.videotype.length > 1 ? this.form.shortvideo.videotype.join(",") : this.form.shortvideo.videotype.toString(),

                                'videotime': this.form.shortvideo.videotime,
                                'imagenumber': this.form.shortvideo.imagenumber || 1, //个数
                                "title": this.form.shortvideo.title,
                                "desc": this.form.shortvideo.desc,

                                "Title": this.form.shortvideo.Title,
                                "Desc": this.form.shortvideo.Desc,
                                'logo': this.form.shortvideo.logo,
                                "img": this.form.shortvideo.img,
                                "Video": this.form.shortvideo.Video,
                                // "fluctua":this.form.shortvideo.fluctua ||0,
                                "fluctua": 0,
                                "cast_id": 4,

                            })
                    }
                    that.selectID = -1;
                    return;
                    break;
                case 4: //视频
                    if (that.selectID > -1) {
                        if (!that.advalidationform5()) {
                            return;
                        }
                        this.style_details.video.forEach((item, index) => {
                            //item.id = item.id == 0 ? 0 : 1;
                            if (item.id == that.selectID) {
                                item.videowidth = this.form.video.videowidth;
                                item.videoheight = this.form.video.videoheight;
                                item.videotype = this.form.video.videotype.length > 1 ? this.form.video.videotype.join(",") : this.form.video.videotype.toString();
                                item.videotime = this.form.video.videotime;
                                item.imagenumber = this.form.video.imagenumber || 1;
                                item.fluctua = item.fluctua ? item.fluctua : (that.form.video.fluctua || 0);

                            }
                        })

                        if (that.style_details.video.length > 0) {
                            that.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.resetStyleOptions()

                        }

                        that.activeEdit = false

                    } else if (that.advalidationform5()) {

                        this.isAddAction(
                            this.style_details.video, {
                                'id': Math.random(), //标示
                                'type': 'longvideo', //类型
                                'videowidth': this.form.video.videowidth,
                                'videoheight': this.form.video.videoheight,
                                'videotype': this.form.video.videotype.length > 1 ? this.form.video.videotype.join(",") : this.form.video.videotype.toString(),
                                'videotime': this.form.video.videotime,
                                'imagenumber': this.form.shortvideo.imagenumber || 1, //
                                "Video": this.form.shortvideo.Video,
                                // "fluctua":this.form.shortvideo.fluctua || 0,
                                "fluctua": 0,
                                "cast_id": 5,

                            }
                        );

                    }
                    that.selectID = -1;
                    return;
                    break;

            }
        },

        checkNum(val) {
            let reg = /\d+/g;
            if (reg.test(val)) {
                return true;
            } else {
                this.$message({
                    message: "只能输入数字",
                    type: "warning"
                });
                return false;
            }
        },
        toNum(val) { //判断是否是数组的输入 表单的校验的方式
            let reg = /^[\d]+\.?\d*$/g;
            if (reg.test(val)) {
                this.form.pv = val
            } else {
                this.form.pv = this.form.pv + ''
            }
        },

        tabAdStyle(event, index) { //广告样式切换
            let that = this;
            let ary = [];
            that.editStyleDetails.forEach((item) => {
                ary.push(item.type)
            });
            ary = Array.from(new Set(ary));
            //判断哪些选项是可以点击的
            const allAry = ["image", "imagetext", "imagegroup", "shortvideo", "longvideo"]

            this.selectIndex = index;
            this.activeEdit = false;
            this.resetStyleOptions();
        },
        resetStyleOptions() {
            //表单的重置
            this.form.imgStyle.W = "";
            this.form.imgStyle.H = "";
            this.form.imgStyle.imagetype = [];
            this.form.imgStyle.imagenumber = 1;
            this.form.imgStyle.logo = false;

            this.form.imgText.W = "";
            this.form.imgText.H = "";
            this.form.imgText.imagetype = [];
            this.form.imgText.imagenumber = 1;
            this.form.imgText.logo = false;
            this.form.imgText.title = "";
            this.form.imgText.desc = "";
            this.form.imgText.Desc = false;

            this.form.imgGroup.W = "";
            this.form.imgGroup.H = "";
            this.form.imgGroup.imagetype = [];
            this.form.imgGroup.imagenumber = 3;
            this.form.imgGroup.logo = false;
            this.form.imgGroup.title = "";
            this.form.imgGroup.desc = "";
            this.form.imgGroup.Desc = false;

            this.form.shortvideo.W = "";
            this.form.shortvideo.H = "";
            this.form.shortvideo.imagetype = [];
            this.form.shortvideo.videowidth = "";
            this.form.shortvideo.videoheight = "";
            this.form.shortvideo.videotype = [];
            this.form.shortvideo.videotime = "";
            this.form.shortvideo.logo = false;
            this.form.shortvideo.title = "";
            this.form.shortvideo.desc = "";
            this.form.shortvideo.Desc = false;

            this.form.video.videowidth = "";
            this.form.video.videoheight = "";
            this.form.video.videotype = [];
            this.form.video.videotime = "";

        },

        ...mapActions(["setBreadCrumb"]),

        validationform() { //表单的循环的校验 js执行的顺序是从上到下执行的
            if (!this.form.ad_name) {
                this.$message({
                    message: "请输入广告位名称",
                    type: "warning"
                });
                return;
            }
            if (!this.form.settlement_type) {
                this.$message({
                    message: "请选择结算类型",
                    type: "warning"
                });
                return;
            }
            if (!this.form.settlement_price) {
                this.$message({
                    message: "请输入结算价格",
                    type: "warning"
                });
                return;
            }
            if (!this.form.adids) {
                this.$message({
                    message: "请选择广告样式",
                    type: "warning"
                });
                return;
            }

            return true;
        },
        getIdsByName(val) {
            let result = [];
            for (var j = 0; j < val.length; j++) {
                for (var k = 0; k < this.sourceData.length; k++) {
                    if (val[j] == this.sourceData[k].value) {
                        result.push(this.sourceData[k].key);
                    }
                }
            }
            //return result.toString();
        },
        getNameById(val) {
            let result = [];
            for (var j = 0; j < val.length; j++) {
                for (var k = 0; k < this.sourceData.length; k++) {
                    if (val[j] == this.sourceData[k].key) {
                        result.push(this.sourceData[k].value);
                    }
                }
            }
            return result;
        },

        getMediaNameById(id, ary) {
            let str = "";
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].id == id) {
                    str = ary[i].name;
                }
            }
            return str;

        },

        onSubmit(formName) {
            let that = this;
            if (that.form.Andchecked || that.form.ioschecked) {
                that.isAdError = false;
            } else {
                that.isAdError = true;
            }

            this.$refs[formName].validate((valid) => {
                if (valid && !that.isAdError) {
                    let ad_type = []; //[1,2]
                    let ad_pid = []; //["a","b"]
                    let flag = null;

                    if (that.form.Andchecked) {
                        ad_type.push(1);
                        if (that.form.andid) {
                            ad_pid.push(that.form.andid);
                        } else {
                            that.$message({
                                message: '请填写Andriod广告位id',
                                type: 'warning'
                            });
                            return false;
                        }

                    }
                    if (that.form.ioschecked) {
                        ad_type.push(2);
                        if (that.form.iosid) {
                            ad_pid.push(that.form.iosid)
                        } else {
                            that.$message({
                                message: '请填写Ios广告位id',
                                type: 'warning'
                            });
                            return false;
                        }

                    }

                    if (that.form.flag) {
                        flag = 1
                    } else {
                        flag = 2
                    }
                    const deepClone = (obj) => { //对象的深度拷贝
                        var proto = Object.getPrototypeOf(obj);
                        return Object.assign({}, Object.create(proto), obj);
                    }

                    let postDetail = deepClone(that.style_details);

                    for (let attr in postDetail) {
                        postDetail[attr] = JSON.stringify(postDetail[attr])
                    }
                    let resultAry = [];
                    //存放的是数据的选项信息和个数 先处理新增的功能
                    //图片
                    if (that.style_details.imgStyle.length > 0) {
                        for (let i = 0; i < that.style_details.imgStyle.length; i++) {
                            let item = that.style_details.imgStyle[i];

                            console.log(item);
                            if (!item.fluctua || item.fluctua == 0) {
                                item.selling_price = that.form.settlement_price
                            }
                            resultAry.push({
                                // "image": item.img,//下面的复选框是否是选中
                                "cast_id": 1, //广告位格式
                                "image_w": item.W,
                                "image_h": item.H,
                                "image_style": item.imagetype, //图片类型
                                "image_num": item.imagenumber || "1",
                                // "fluctua": item.fluctua || 0, //浮动系数
                                "islogo": item.logo ? 1 : 0, // 0 否  1是
                                // "type": "image",
                                "media_cost": item.media_cost || 0, //媒介成本
                                "fluctua": item.fluctua || 0, //浮动系数
                                "selling_price": item.selling_price || 0, //平台售价
                                "media_cost": this.form.settlement_price, //媒介成本
                                "id": item.id
                            })

                        }

                    }

                    //图文的形式
                    if (that.style_details.imgText.length > 0) {
                        for (let n = 0; n < that.style_details.imgText.length; n++) {
                            let item1 = that.style_details.imgText[n];
                            if (!item1.fluctua || item1.fluctua == 0) {
                                item1.selling_price = that.form.settlement_price
                            }
                            resultAry.push({
                                "cast_id": 2,
                                "image_w": item1.W,
                                "image_h": item1.H,
                                "image_style": item1.imagetype, //图片类型
                                "image_num": item1.imagenumber || "1",
                                "title": item1.title,
                                "des": item1.desc,
                                // "Title": item1.Title,
                                // "Desc": item1.Desc,
                                "islogo": item1.logo ? 1 : 0,

                                "fluctua": item1.fluctua || 0, //浮动系数
                                "selling_price": item1.selling_price || 0, //平台售价
                                "media_cost": this.form.settlement_price, //媒介成本
                                // "type": "imagetext",
                                "id": item1.id

                            })
                        }

                    }

                    //组图的形式
                    if (that.style_details.imgGroup.length > 0) {
                        for (let m = 0; m < that.style_details.imgGroup.length; m++) {
                            let item2 = that.style_details.imgGroup[m];
                            console.log(item2)
                            if (!item2.fluctua || item2.fluctua == 0) {
                                item2.selling_price = that.form.settlement_price
                            }
                            let str2 = item2.imagetype;
                            resultAry.push({
                                "cast_id": 3,
                                "image_w": item2.W,
                                "image_h": item2.H,
                                "image_style": str2, //图片类型
                                "image_num": item2.imagenumber || 3,
                                "title": item2.title,
                                "des": item2.desc,
                                "islogo": item2.logo ? 1 : 0,
                                "fluctua": item2.fluctua || 0, //浮动系数
                                "media_cost": this.form.settlement_price, //媒介成本
                                "selling_price": item2.selling_price || 0, //平台售价
                                // "type": "imagegroup",
                                // "Title": item2.Title,
                                // "Desc": item2.Desc,
                                "id": item2.id

                            })
                        }

                    }

                    //短视频
                    if (that.style_details.shortvideo.length > 0) {
                        for (let j = 0; j < that.style_details.shortvideo.length; j++) {
                            let item3 = that.style_details.shortvideo[j];
                            let str3 = item3.imagetype;
                            let videoStr3 = item3.videotype;
                            if (!item3.fluctua || item3.fluctua == 0) {
                                item3.selling_price = that.form.settlement_price
                            }
                            resultAry.push({
                                // "image": item3.img,
                                "cast_id": 4,
                                "image_w": item3.W,
                                "image_h": item3.H,
                                "image_style": str3, //图片类型
                                "image_num": "1",

                                // "video": item3.Video,

                                "video_w": item3.videowidth,
                                "video_h": item3.videoheight,
                                "video_style": videoStr3,
                                "video_time": item3.videotime,

                                "title": item3.title,
                                "des": item3.desc,
                                "islogo": item3.logo ? 1 : 0,

                                "fluctua": item3.fluctua || 0, //浮动系数
                                "media_cost": this.form.settlement_price, //媒介成本
                                "selling_price": item3.selling_price || 0, //平台售价

                                // "type": "shortvideo",
                                // "Title": item3.Title,
                                // "Desc": item3.Desc,
                                "id": item3.id
                            })

                        }

                    }

                    //视频
                    if (that.style_details.video.length > 0) {
                        for (let k = 0; k < that.style_details.video.length; k++) {
                            let item4 = that.style_details.video[k];
                            let videoStr4 = item4.videotype;
                            if (!item4.fluctua || item4.fluctua == 0) {
                                item4.selling_price = that.form.settlement_price
                            }
                            resultAry.push({
                                // "video": item4.Video,
                                "cast_id": 5,
                                "image_num": "1",
                                "video_w": item4.videowidth,
                                "video_h": item4.videoheight,
                                "video_time": item4.videotime,
                                "video_style": videoStr4,
                                "fluctua": item4.fluctua || 0, //浮动系数
                                "media_cost": this.form.settlement_price, //媒介成本
                                "selling_price": item4.selling_price || 0, //平台售价
                                // "type": "longvideo",
                                "id": item4.id
                            })
                        }

                    }

                    let fileData = {
                        "media_id": that.$route.params.mediaId,
                        //少一个广告位id的值
                        'id': that.$route.params.adId || '',
                        "ad_name": that.form.ad_name,
                        "admedia_a": that.form.andid,
                        "admedia_i": that.form.iosid,
                        // "ad_type": ad_type,
                        // "ad_pid": ad_pid,
                        "pv": that.form.pv,
                        "settlement_type": that.form.settlement_type,
                        "settlement_price": that.form.settlement_price,
                        "flag": flag,
                        "remark": that.form.remark,

                        //JSON.stringify
                        // "mediaAdListStyles": JSON.stringify(resultAry)
                        "mediaAdListStyles": resultAry
                    };

                    if (resultAry.length == 0) {
                        that.$message({
                            // message: res.data.msg,
                            message: "请添加广告样式，并点击+号保存",
                            type: "warning"
                        });
                        return false;
                    } else {
                        if (this.$route.params.adId) { //编辑
                            resource.editSaveAdList(this.header, fileData).then(res => {
                                if (res.data.success == true) {
                                    this.$message({
                                        // message: res.data.msg,
                                        message: "操作成功",
                                        type: "success"
                                    });
                                    this.goBack(); //返回上一级
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: "error"
                                    });
                                }
                                if (res.data.code == -1) {
                                    this.$router.push({
                                        path: "/login"
                                    });
                                }
                            });
                        } else { //新增
                            resource.addAdList(this.header, fileData).then(res => {
                                if (res.data.success == true) {
                                    this.$message({
                                        // message: res.data.msg,
                                        message: "操作成功",
                                        type: "success"
                                    });
                                    this.goBack(); //返回上一级
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: "error"
                                    });
                                }
                                if (res.data.code == -1) {
                                    this.$router.push({
                                        path: "/login"
                                    });
                                }
                            });

                        }

                    }
                } else {
                    return false;
                }
            });

        },
        goBack() {
            this.$router.go(-1);
        },

    }
};
</script>

<style lang="scss">
.mt-100 {
    margin-top: -100px !important;
}

.relative {
    position: relative
}

.pl15 {
    padding-left: 15px !important;
}

.mt10 {
    margin-top: 10px;
}

.mt15 {
    margin-top: 15px;
}

.ml5 {
    margin-left: 5px !important;
}

.fl {
    float: left !important
}

.fr {
    float: right !important
}

.X-style {
    display: inline-block;
    margin: auto 7px;
}

@import "../../style/mixin";
@import "../../style/common";

.ad-create {

    .template-hd,
    .base-bd {
        background-color: #fff;
        overflow: hidden;
        padding: 20px 0 0 30px;
        padding-bottom: 30px
    }

    // 用于继承字号12
    .font12 {
        font-size: 12px;
    }

    .template-hd {
        padding: 20px 0 20px 30px;
        border-bottom-width: 1px;
    }

    // single row
    .create-row {
        .noticeIcon {
            cursor: pointer;
            margin-left: 8px;
            width: 25px;
            height: 25px;
            vertical-align: -7px;
            display: inline-block;
            background: url(../../style/image/meadia/notice_01.svg) no-repeat center;
            position: absolute;
            top: -1px;
            left: 427px;
        }

        .tabcon {
            margin-left: 102px;
            margin-top: 20px;
            position: relative;

            .tabItem {
                width: 418px;
                background: #fafbfe;
                padding: 15px 15px 15px 20px;
            }

            .adstylelist {
                position: absolute;
                max-height: 495px;
                overflow: auto;
                top: 46%;
                margin-left: 500px;
                transform: translateY(-55%);
                -webkit-transform: translateY(-55%);

                .imgStyle {
                    position: relative;

                    .tiptxt1 {
                        color: #fff;
                        font-size: 12px;
                        background-color: #6cabff;
                        padding: 1px 5px;
                        border-radius: 3px;
                        position: absolute;
                        bottom: 10px;
                        left: 10px
                    }

                    margin-top:10px;
                    width: 276px;
                    height: 161px;

                    .iconGroup {
                        cursor: pointer;
                        height: 51px;
                        background-color: #fafbfd;
                        background-repeat: no-repeat;
                        background-position: center
                    }

                    .money {
                        background-image: url(../../style/image/meadia/money.jpg);
                    }

                    .edit {
                        background-image: url(../../style/image/meadia/edit.jpg);
                    }

                    .del {
                        background-image: url(../../style/image/meadia/del.jpg);
                    }

                    .rightBtn {
                        float: right;
                        width: 51px;
                        height: 155px
                    }
                }

                .imgStyle2 {
                    .wrap {
                        float: left;
                        width: 225px;
                        height: 155px;
                        background: #e6ebf3;
                        padding: 10px;
                        position: relative;
                    }

                    .con1 {
                        background: #fff;
                        color: #515974;
                        width: 45px;
                        height: 42px;
                        text-align: center;
                        line-height: 42px;
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        font-size: 12px;
                    }

                    .con2 {
                        background: #fff;
                        color: #515974;
                        width: 149px;
                        height: 42px;
                        line-height: 42px;
                        text-align: center;
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }

                    .con3 {
                        width: 116px;
                        height: 83px;
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                    }

                    .con4 {
                        background: #fff;
                        color: #515974;
                        width: 78px;
                        height: 83px;
                        line-height: 85px;
                        text-align: center;
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                    }

                    .con5 {
                        height: 36px;
                        line-height: 36px;
                        background-color: #fff;
                        text-align: center;
                        margin-top: 3px;
                        position: absolute;
                        bottom: 10px;
                        margin-right: 10px;
                        width: 204px;
                    }

                    .con6 {
                        width: 65px;
                        height: 41px;
                        position: absolute;
                        top: 60px;
                        left: 10px;
                    }

                    .con9 {
                        position: relative;
                        width: 65px;
                        height: 41px;
                        margin-left: 5px
                    }

                    .con8 {
                        display: inline-block;
                        background-color: #fff;
                        width: 135px;
                        height: 40px;
                        overflow: hidden;
                        line-height: 40px;
                        text-align: center;
                        vertical-align: 1px;
                        position: absolute;
                        top: 60px;
                        right: 10px;

                        img {
                            width: 20px;
                            vertical-align: middle;
                        }
                    }
                }
            }

            .saveIcon {
                position: absolute;
                top: 50%;
                left: 440px;
                margin-top: -19px;
                width: 38px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                cursor: pointer;
                border: 1px solid red;
                background-color: #6cabff !important;
                border-color: #6cabff !important;
                border-radius: 5px;

                span {
                    color: #fff !important;
                }
            }

            .addIcon {
                position: absolute;
                top: 50%;
                left: 440px;
                margin-top: -19px;
                width: 38px;
                height: 38px;
                cursor: pointer;
                background-image: url(../../style/image/meadia/addStyleBtn.png);
                background-repeat: no-repeat;
                background-position: center center
            }

            .addIcon:hover {
                background-color: #f0f6ff
            }
        }

        .noticeIcon:hover {
            background: url(../../style/image/meadia/notice_01.svg) no-repeat center
        }

        margin-bottom: 13px;

        .el-input {
            width: 240px;
        }

        .el-input.el-input--suffix {
            width: 112px;
            font-size: 12px;
        }

        .tabItem2 .el-input.el-input--suffix {
            width: 140px;
            font-size: 12px;
        }

        .tabItem3 .el-input.el-input--suffix {
            width: 114px;
            font-size: 12px;
        }

        .tabItem3 .inner3 .el-input.el-input--suffix {
            width: 140px;
        }

        .el-checkbox__label {
            @include sc(12px, $firstc);
        }

        .ad-style {
            .item {
                padding: 6px 30px;
                border-right: 1px solid #e1e7f0;
                font-size: 12px;
                cursor: pointer;
            }

            .item.noMr {
                padding: 6px 30px;
                border-right: 1px solid transparent;
                font-size: 12px;
                cursor: pointer;
            }

            .item em {
                font-style: normal
            }

            .item.active {
                padding: 6px 10px;

                em {
                    padding: 10px 20px; //border: 1px solid #6cabff;
                    font-size: 12px;
                    cursor: pointer;
                    border-radius: 3px;
                    background: #f0f6ff;
                    color: #6cabff;
                }
            }
        }
    }

    // single row title
    .data-item {
        color: $firstc;
        display: inline-block;
        width: 104px;
        margin-right: 0px;
        box-sizing: border-box;
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
            margin: 0 10px 0 5px;
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
        display: inline-block;
        @include svgbg("../../style/image/creative/tips-important.svg");
        height: 24px;
        width: 24px;
        vertical-align: -7px;
        margin-left: 5px;
        @include transX(180deg);
    }
}

.adform {
    .el-form-item__label {
        padding: 0 5px 0 0;
    }

    .item-unneeded .el-form-item__label::before {
        content: ' ';
    }
}

.adform .item2 .el-form-item__content {
    margin-top: -10px;
}

.adform .el-form-item__content {
    margin-left: 101px;
    width: 240px;
}

.adform .item2 .el-form-item {
    margin-bottom: 3px;
}

.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus {
    border-color: #f56c6c !important;
}

.el-form-item {
    margin-bottom: 13px
}
</style>
