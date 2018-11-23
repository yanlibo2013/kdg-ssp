<template>
    <!-- 基础数据报表 -->
    <div class="back-list">
        <el-main>
            <el-form ref="form" :model="form" label-width="">
                <!-- 基本设置 start -->
                <el-col :span="24" class="margin-bottom-20">
                    <h1 class="template-hd">基本设置</h1>
                    <div class="template-bd border-bottom-2">
                        <div class="basic-set-row">
                            <i class="neccessary left">*</i>
                            <label for="" class="data-item left">平台名称：</label>
                            <el-input v-model="form.name" placeholder="20字以内，汉字数字或英文字母"></el-input>
                        </div>
                        <div class="basic-set-row">
                            <i class="neccessary left">*</i>
                            <label for="" class="data-item left">LOGO：</label>
                            <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="请上传企业LOGO" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload('uploadedlogo')"></i>
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="image/gif, image/jpeg" id="fileLogo" @change="uploadLogo" style="display:none" />
                        </div>
                            <div class="basic-set-row">
                                <i class="neccessary left"> </i>
                                <label for="" class="data-item left">状态：</label>
                                <el-switch v-model="form.flag" active-text="关闭" inactive-text="开启">
                                </el-switch>
                            </div>
                        </div>
                </el-col>
                <!-- 规则配置 start -->
                <el-col :span="24" class="back-rule-config">
                    <h1 class="template-hd">规则配置</h1>
                    <div class="template-bd border-bottom-2">
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="config-title left">审核政策：</label>
                            <el-radio v-model="form.cre_auditing" label="1">先审后投</el-radio>
                            <el-radio v-model="form.cre_auditing" label="2">先投后审</el-radio>
                        </div>
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="config-title left">资源类型：</label>
                            <el-checkbox-group v-model="checkedResourceType">
                                <el-checkbox v-for="item in resTypeList" :label="item.value" :key="item.key"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="basic-set-row clear">
                            <i class="config-neccessary left">*</i>
                            <label for="" class="data-item left">广告样式：</label>
                            <el-tabs type="card" v-model="activeNamebudget" @tab-click="handleClick">
                                <!-- 图片 start-->
                                <el-tab-pane name="1-1">
                                    <span slot="label">
                            		<span class="select-item ">图片</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="image-wrapper" ref="imageWrapper">
                                        <div class="margin-bottom-12 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">图片尺寸：</label>
                                            <panel :childData="imageSizeData" @pushItem="addImageItem" @setCheckedItem="getCheckedImage" :isShow="true" ref="panelsize"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">文件格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formImage.type" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <!-- 图文 start-->
                                <el-tab-pane name="1-2">
                                    <span slot="label">
                            		<span class="select-item">图文</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="img-txt-wrapper" ref="imgTxtWrapper" id="imgTxtWrapper">
                                        <div class="margin-bottom-12 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">图片尺寸：</label>
                                            <panel :childData="nativeSizeData" @pushItem="addNativeImage" @setCheckedItem="getCheckedNativeImage" :isShow="true" ref="panelnative"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">图片格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNative.type" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="neccessary left">*</i>
                                            <el-checkbox class="checkbox-space-adjust left" label="标题" key="标题" v-model="isCheckedTile">标题字数：</el-checkbox>
                                            <el-input v-model="formNative.title" @blur="checkedTitle"></el-input>
                                        </div>
                                        <div class="margin-bottom-22 clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="描述" key="描述" v-model="checkedDes">描述：</el-checkbox>
                                            <el-input v-model="formNative.des" @blur="setDesChecked(formNative.des)"></el-input>
                                        </div>
                                        <div class="basic-set-row">
                                            <el-checkbox label="是否需要LOGO" key="是否需要LOGO" v-model="formNative.isLogo">是否需要LOGO</el-checkbox>
                                        </div>

                                    </div>
                                </el-tab-pane>
                                <!-- 组图 start-->
                                <el-tab-pane name="1-3">
                                    <span slot="label">
                            		<span class="select-item">组图</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="img-txt-wrapper" ref="imgTxtWrapper" id="imgTxtWrapper">
                                        <div class="margin-bottom-12 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">图片尺寸：</label>
                                            <panel :childData="groupSizeData" @pushItem="addGroupImage" @setCheckedItem="getCheckedGroupImage" :isShow="true" ref="panelgroup"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">图片格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formGroup.type" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <el-checkbox class="checkbox-space-adjust left" label="标题" key="标题" v-model="isCheckedTileGroup">标题字数：</el-checkbox>
                                            <el-input v-model="formGroup.title" @blur="checkedTitleGroup"></el-input>
                                        </div>
                                        <div class="margin-bottom-22 clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="描述" key="描述" v-model="checkedDes">描述：</el-checkbox>
                                            <el-input v-model="formGroup.des" @blur="setDesChecked(formGroup.des)"></el-input>
                                        </div>
                                        <div class="basic-set-row">
                                            <el-checkbox label="是否需要LOGO" key="是否需要LOGO" v-model="formGroup.isLogo">是否需要LOGO</el-checkbox>
                                        </div>

                                    </div>
                                </el-tab-pane>
                                <!-- 短视频 start-->
                                <el-tab-pane name="1-4">
                                    <span slot="label">
                                                                                                <span class="select-item">短视频</span>
                                    <i class="el-vertical-line">|</i>
                                    </span>
                                    <div class="origin-video-wrapper" ref="originVideowrapper" id="originVideowrapper">
                                        <div class="margin-bottom-12 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">视频尺寸：</label>
                                            <panel :childData="naviteVideoSizeData" @pushItem="addNativeVideoData" @setCheckedItem="getCheckedvideoPatch" :isShow="true" ref="panelshort"></panel>
                                        </div>
                                        <!-- <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">图片数：</label>
                                            <el-select v-model="formNativeVideo.quantity" placeholder="请选择...">
                                                <el-option v-for="item in imagequantity" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div> -->
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">视频格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formNativeVideo.videoType" multiple placeholder="请选择">
                                                <el-option v-for="item in videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="图片尺寸：" key="图片尺寸">图片尺寸：</el-checkbox>
                                            <panel :childData="imageSizeData" @pushItem="addImageItem" @setCheckedItem="getcheckedCoverData" :isShow="true" ref="panelimage"></panel>
                                        </div>
                                        <div class="basic-set-row special-select clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="图片格式" key="图片格式" v-model="isCheckedVideoTileImage">图片格式：</el-checkbox>
                                            <el-select class="tags-container" @change="changeImageType(formNativeVideo.coverType)" @remove-tag="showinfo" v-model="formNativeVideo.coverType" multiple placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="neccessary left">*</i>
                                            <el-checkbox class="checkbox-space-adjust left" label="标题" key="标题" v-model="isCheckedVideoTile">标题字数：</el-checkbox>
                                            <el-input v-model="formNativeVideo.title" @blur="checkedVideoTitle"></el-input>
                                        </div>
                                        <div class="margin-bottom-22 clear">
                                            <el-checkbox class="checkbox-space-adjust left" label="描述" key="描述" v-model="checkedDesVideo">描述：</el-checkbox>
                                            <el-input v-model="formNativeVideo.des" @blur="setDesCheckedVideo(formNativeVideo.des)"></el-input>
                                        </div>
                                        <div class="basic-set-row">
                                            <el-checkbox label="是否需要LOGO" key="是否需要LOGO" v-model="formNativeVideo.isLogo">是否需要LOGO</el-checkbox>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <!-- 视频贴片 start-->
                                <el-tab-pane name="1-5">
                                    <span slot="label">
                                                                                                <span class="select-item">视频贴片</span>
                                    <i class="el-vertical-line"></i>
                                    </span>
                                    <div class="paster-fvideo-wrapper" ref="pasterVideoWrapper">
                                        <div class="margin-bottom-12 clear">
                                            <i class="neccessary left">*</i>
                                            <label for="" class="data-item left">视频尺寸：</label>
                                            <panel :childData="patchVideoSizeData" @pushItem="addVideoPatch" @setCheckedItem="getCheckednativeVideoData" :isShow="true" ref="panelpatch"></panel>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">格式：</label>
                                            <el-select class="tags-container" @change="addchange" @remove-tag="showinfo" v-model="formPatchVideo.type" multiple placeholder="请选择">
                                                <el-option v-for="item in videooptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="basic-set-row clear">
                                            <i class="config-neccessary left">*</i>
                                            <label for="" class="data-item left">时长：</label>
                                            <el-select class="tags-container" v-model="formPatchVideo.duration" multiple placeholder="请选择">
                                                <el-option v-for="item in timeoptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                            <!-- right column matter rule -->
                            <div class="el-material-rule" ref="materialRule">
                                <a href="javascript:void(0);" class="addItem" @click="adAdItem">+</a>
                                <!-- <div class="el-rules" :style="{'max-height': heightData+'px'}"> -->
                                <div class="el-rules" style="{'max-height: 700px'}">
                                    <p class="matter-rule-label">素材规则</p>
                                    <div class="image-rules" v-show="imageItemData.length>0">
                                        <h2 class="img-rule-title">图片规则</h2>
                                        <ul class="rules-bd img-rule-bd area-item-row">
                                            <!-- <li class="search-item">image：300*250，jpg/jpeg；<i class="el-icon-close"></i></li>
                                                                                <li class="search-item">image：300*250，jpg/jpeg；</li> -->
                                            <li class="search-item" @click="editImage(index)" v-for="(item, index) in imageItemData" :key="index">image：{{item.image_wh}}，{{item.image_style}} <i v-if="currentEditImage==index.toString()" class="el-icon-close" v-on:click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <!-- nativeItemData -->
                                    <div class="original-rules" v-show="nativeItemData.length>0">
                                        <h2 class="orig-rule-title">图文规则</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editNative(index)" v-for="(item, index) in nativeItemData" :key="index">image：{{item.image_wh}}，{{item.image_style}} <i v-if="currentEditNative==index.toString()" class="el-icon-close" @click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <div class="original-rules" v-show="groupData.length>0">
                                        <h2 class="orig-rule-title">组图规则</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editGroup(index)" v-for="(item, index) in groupData" :key="index">image：{{item.image_wh}}，{{item.image_style}} <i v-if="currentEditGroup==index.toString()" class="el-icon-close" @click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <!-- nativevideoItemData -->
                                    <div class="original-rules" v-show="nativevideoItemData.length>0">
                                        <h2 class="orig-rule-title">短视频规则</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editVideo(index)" v-for="(item, index) in nativevideoItemData" :key="index">video：{{item.video_wh}}，{{item.video_style}} <br/> image:{{item.image_wh?item.image_wh:''}} {{item.image_style?item.image_style:''}} <i v-if="currentEditVideo==index.toString()" class="el-icon-close" @click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                    <div class="original-rules" v-show="patchVideoItmeData.length>0">
                                        <h2 class="orig-rule-title">视频贴片规则</h2>
                                        <ul class="rules-bd orig-rule-bd area-item-row">
                                            <li class="search-item" @click="editPatch(index)" v-for="(item, index) in patchVideoItmeData" :key="index">video：{{item.video_wh}}，{{item.video_style}} <i v-if="currentEditPatch==index.toString()" class="el-icon-close" @click.stop="delItem(index)"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="basic-set-row clear">
                                                        <i class="config-neccessary left">*</i>
                                                        <label for="" class="config-title left">物料类型：</label>
                                                        <el-checkbox-group v-model="materialTypelistCheck">
                                                            <el-checkbox  v-for="item in materialTypelist" :label="item.value" :key="item.key"></el-checkbox>
                                                        </el-checkbox-group>
                                                    </div> -->
                        <!-- <div class="basic-set-row clear">
                                                        <i class="config-neccessary left">*</i>
                                                        <label for="" class="config-title left">文件类型：</label>
                                                        <el-select v-model="filetags" multiple placeholder="请选择">
                                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                            </el-option>
                                                        </el-select>
                                                    </div> -->
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
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    resource,
    common
} from "../../service/index"
import _ from "lodash";
import store from "store";
import {
    callback,
    validateForm
} from "../../common/utils.js";
import panel from "./panel"
export default {
    computed: {
        getLeftList() {
            return this.leftSizeList;
        },
        getSizeData() {
            return this.imageSizeData;
        },

    },
    data: function () {
        return {
            header: "",
            currentEditImage: "", // 当前编辑项
            currentEditNative: "",
            currentEditGroup: "",
            currentEditVideo: "",
            currentEditPatch: "",
            isCheckedVideoTile: false,
            isCheckedVideoTileImage: false,
            checkedDes: false,
            checkedDesVideo: false,
            flag: false,
            checked: true,
            isCheckedTile: false,
            isCheckedTileGroup: false,

            //资源类型
            // resTypeList: [], // ["mobile app", "mobile web"]
            resTypeList: [{
                key: 1,
                value: "移动APP"
            }, {
                key: 2,
                value: "移动网页"
            }, {
                key: 3,
                value: "PC网页"
            }], // ["mobile app", "mobile web"]
            resCheckTypeList: [],
            materialTypelist: [{
                key: "banner",
                value: "图片"
            }, {
                key: "video",
                value: "贴片视频"
            }, {
                key: "native",
                value: "原生图文"
            }, {
                key: "native_video",
                value: "原生视频"
            }], //"banner", "video", "native", "native_video"
            materialTypelistCheck: [],
            keyword: "",
            dynamicTags: [],
            state3: "",
            leftSizeList: [],
            rightSizeList: [],
            checkList: [],
            sourceLeftSizeList: [],
            restaurants: [],
            options: [{
                value: 'jpeg',
                label: 'jpeg'
            }, {
                value: 'jpg',
                label: 'jpg'
            }, {
                value: 'png',
                label: 'png'
            }, {
                value: 'gif',
                label: 'gif'
            }],
            videooptions: [{
                value: 'mp4',
                label: 'mp4'
            }, {
                value: 'flv',
                label: 'flv'
            }, {
                value: 'swf',
                label: 'swf'
            }],
            imagequantity: [{
                value: 1,
                label: "1"
            }, {
                value: 3,
                label: "3"
            }],
            timeoptions: [{
                value: 15,
                label: '15s'
            }, {
                value: 30,
                label: '30s'
            }, {
                value: 60,
                label: '60s'
            }],
            filtertime: "",
            filetags: [],
            isUpload: "",
            logofile: "",
            addTop: false,
            activeNamebudget: '1-1',
            checkAll: false,
            isIndeterminate: true,
            imagenum: '',
            filterVideo: '',
            imageData: [], //图片
            nativeimageData: [], //图文
            groupData: [], //组图
            nativeVideoData: [], //短视频
            videoPatch: [], //贴片视频

            coverData: [], //图片尺寸
            checkedImageItem: [],
            checkedNativeItem: [],
            checkedGroupItem: [],
            checkedVideoItem: [],
            checkedNativeVideoItem: [],
            checkedCoverData: [],
            // 
            imageItemData: [],
            nativeItemData: [],
            groupData: [],
            nativevideoItemData: [],
            patchVideoItmeData: [],
            isGroup: "",
            heightData: 57,

            //尺寸列表
            imageSizeData: [],
            nativeSizeData: [],
            groupSizeData: [],
            naviteVideoSizeData: [],
            patchVideoSizeData: [],
            //   //广告样式
            // banner: [], //{imagewh:[],imagetype:[]}
            // native: [], //{imagewh:[],imagetype:[],imagenum:"",title:"",desc:"",logo:""}
            // videonative: [], //{videowh:[],videotype:[],imagewh:[],imagetype:[],duration:[],title:[],desc:[],logo:[]}
            // video: [], //{videowh:[],videotype:[],duration:[]}

            form: {
                name: "", //渠道名称
                file: "", //logo
                flag: true, //状态
                cre_auditing: "", //审核政策
                source_style: [], //资源类型 1:移动APP,2:移动网页,3:PC网页
                adstyle: "", // 广告样式待确认
                plantInfoStyleMap: {
                    native_video: [], //短视频
                    native_text: [], //图文
                    banner: [], //图片
                    video: [],
                    native_num: [] //组图
                },

            },

            //图片
            formImage: {
                size: [], //尺寸
                type: [] //文件格式

            },
            //图文
            formNative: {
                size: "", //图片尺寸
                //quantity: "", //数量
                type: [], //图片格式
                title: "", //标题
                des: "", //描述
                isLogo: false //是否需要logo
            },
            // //组图
            formGroup: {
                size: [], //尺寸
                type: [], //文件格式
                title: "", //标题
                des: "", //描述
                isLogo: false //是否需要logo

            },
            //短视频视频
            formNativeVideo: {
                size: [], //视频尺寸
                imageCount: "", //图片数
                videoType: [], //视频格式
                imageSize: [], //图片尺寸
                imageType: [], //图片格式
                title: "", //标题
                des: "", //描述
                isLogo: false, //是否需要logo
                quantity: ""
            },
            //贴片视频
            formPatchVideo: {
                size: "", //视频尺寸
                type: [], //视频格式
                duration: [] //时长
            },

            checkedResourceType: [],
            // //图文
            // formGraphic: {
            //     size: [], //尺寸
            //     type: [], //文件格式
            //     title: "", //标题
            //     des: "", //描述
            //     isLogo: false //是否需要logo

            // },
            // //组图
            // formGroup: {
            //     size: [], //尺寸
            //     type: [], //文件格式
            //     title: "", //标题
            //     des: "", //描述
            //     isLogo: false //是否需要logo

            // },
            // //短视频
            // formShort: {
            //     videoSize: [], //视频尺寸
            //     imageCount: "", //图片数
            //     videoType: [], //视频格式
            //     imageSize: [], //图片尺寸
            //     imgageType: [], //图片格式
            //     title: "", //标题
            //     des: "", //描述
            //     isLogo: false //是否需要logo

            // },
            // //视频贴片
            // formLong: {
            //     videoSize: [], //视频尺寸
            //     videoType: [], //视频格式
            //     duration: ""

            // }
        }
    },
    methods: {
        ...mapActions(["setBreadCrumb", "setCurentTab"]),
        editPatch(val) {
            //激活 tab
            this.activeNamebudget = "1-5";

            //show del btn
            this.currentEditImage = "";
            this.currentEditNative = "";
            this.currentEditVideo = "";
            this.currentEditGroup = "";
            this.currentEditPatch = val.toString();

            //初始化
            let currentItme = this.patchVideoItmeData[val];
            this.formPatchVideo = {
                size: currentItme.video_wh.split(","), //视频尺寸
                type: currentItme.video_style.split(","), //视频格式
                duration: currentItme.duration //时长
            };
            this.checkedNativeVideoItem = currentItme.video_wh.split(",");
            this.$refs.panelpatch.checkList = this.checkedNativeVideoItem;

        },
        editVideo(val) {
            this.activeNamebudget = "1-4";
            this.currentEditImage = "";
            this.currentEditNative = "";
            this.currentEditPatch = "";
            this.currentEditGroup = "";

            this.currentEditVideo = val.toString();

            //初始化
            let currentItme = this.nativevideoItemData[val];

            this.formNativeVideo = {
                size: currentItme.video_wh.split(","), //视频尺寸
                //imageType: "", //图片格式
                coverSdize: currentItme.image_wh.split(","), //封面尺寸
                videoType: currentItme.video_style.split(","), //视频格式
                title: currentItme.title, //标题
                des: currentItme.desc, //描述
                // isLogo: currentItme.logo, //是否需要logo,
                isLogo: currentItme.islogo == 1 ? true : false,
                coverType: currentItme.image_style.split(","),
                duration: currentItme.duration,
                quantity: currentItme.quantity
            };
            this.checkedVideoItem = currentItme.video_wh.split(",");
            this.checkedCoverData = currentItme.image_wh.split(",");

            this.$refs.panelshort.checkList = this.checkedVideoItem;
            this.$refs.panelimage.checkList = this.checkedCoverData;

            if (currentItme.title) {
                this.isCheckedVideoTile = true;
            }

            if (currentItme.desc) {
                this.checkedDesVideo = true;
            } else {
                this.checkedDesVideo = false;
            }

        },
        editNative(val) {

            this.activeNamebudget = "1-2";
            this.currentEditNative = val.toString();

            this.currentEditImage = "";
            this.currentEditVideo = "";
            this.currentEditPatch = "";
            this.currentEditGroup = "";

            this.isGroup = val;
            //初始化
            let currentItme = this.nativeItemData[val];
            this.formNative = {
                imagewh: currentItme.image_wh.split(","),
                type: currentItme.image_style.split(","),
                title: currentItme.title,
                desc: currentItme.desc,
                isLogo: currentItme.islogo == 1 ? true : false,
                quantity: currentItme.imagenum
            };

            // this.isGroup=this.formNative.quantity;
            this.checkedNativeItem = currentItme.image_wh.split(",");
            this.$refs.panelnative.checkList = this.checkedNativeItem;

            if (this.formNative.title) {
                this.isCheckedTile = true;

            }

            if (this.formNative.des) {

                this.checkedDes = true;

            }

        },
        editGroup(val) {
            this.activeNamebudget = "1-3";
            this.currentEditGroup = val.toString();

            this.currentEditImage = "";
            this.currentEditVideo = "";
            this.currentEditPatch = "";
            this.currentEditNative = '';

            this.isGroup = val;
            //初始化
            let currentItme = this.groupData[val];
            this.formGroup = {
                imagewh: currentItme.image_wh.split(","),
                type: currentItme.image_style.split(","),
                title: currentItme.title,
                des: currentItme.des,
                // logo: currentItme.logo,
                isLogo: currentItme.islogo == 1 ? true : false,
                quantity: currentItme.imagenum
            };

            // this.isGroup=this.formNative.quantity;
            this.checkedGroupItem = currentItme.image_wh.split(",");
            this.$refs.panelgroup.checkList = this.checkedGroupItem;

            if (this.formGroup.title) {
                this.isCheckedTile = true;

            }

            if (this.formGroup.des) {

                this.checkedDes = true;

            }

        },
        editImage(val) {
            this.activeNamebudget = "1-1";
            this.currentEditImage = val.toString();

            this.currentEditNative = "";
            this.currentEditVideo = "";
            this.currentEditPatch = "";
            this.currentEditGroup = "";

            //初始化
            let currentItme = this.imageItemData[val];
            this.formImage.type = currentItme.image_style.split(",");
            this.formImage.size = currentItme.image_wh.split(",");
            this.checkedImageItem = currentItme.image_wh.split(",");
            this.$refs.panelsize.checkList = this.checkedImageItem;

        },
        delItem(val) {

            if (this.activeNamebudget == "1-1") {

                this.imageItemData.splice(val, 1);

                this.clearFormImage();

            }

            if (this.activeNamebudget == "1-2") {
                this.nativeItemData.splice(val, 1);
                this.clearFormNative();

            }

            if (this.activeNamebudget == "1-3") {
                this.groupData.splice(val, 1);
                this.clearGroup();

            }

            if (this.activeNamebudget == "1-4") {
                this.nativevideoItemData.splice(val, 1);
                this.clearFormVideo();

            }

            if (this.activeNamebudget == "1-5") {
                this.patchVideoItmeData.splice(val, 1);
                this.clearFormPatch();

            }

        },
        clearFormImage() {

            this.formImage = {
                size: "",
                type: []
            };
            this.$refs.panelsize.clearAll();

        },
        clearFormNative() {
            this.formNative = {
                //size: "", //图片尺寸
                quantity: "", //数量
                type: [], //图片格式
                title: "", //标题
                des: "", //描述
                isLogo: false //是否需要logo
            };

            this.isCheckedTile = false;
            this.checkedDes = false;
            this.currentEditNative = "";
            this.$refs.panelnative.clearAll();

        },
        clearGroup() {

            this.formGroup = {
                size: [], //尺寸
                type: [], //文件格式
                title: "", //标题
                des: "", //描述
                isLogo: false //是否需要logo
            };

            this.isCheckedTile = false;
            this.checkedDes = false;
            this.currentEditGroup = "";
            this.$refs.panelgroup.clearAll();

        },
        clearFormVideo() {

            this.isCheckedVideoTile = false;
            this.formNativeVideo = {
                size: "", //视频尺寸
                imageType: "", //图片格式
                coverSdize: "", //封面尺寸
                videoType: [], //视频格式
                title: "", //标题
                des: "", //描述
                isLogo: false, //是否需要logo,
                coverType: [],
                quantity: ""
            };
            this.$refs.panelshort.clearAll();
            //panelcover
            this.$refs.panelimage.clearAll();
            this.currentEditVideo = "";

        },
        clearFormPatch() {

            this.formPatchVideo = {
                size: "", //视频尺寸
                type: [], //视频格式
                duration: [] //时长
            };
            this.$refs.panelpatch.clearAll();
            this.currentEditPatch = "";

        },
        setDesChecked(val) {
            if (val) {
                this.checkedDes = true;
            } else {
                this.checkedDes = false;
            }
        },
        setDesCheckedVideo(val) {
            if (val) {
                this.checkedDesVideo = true;
            } else {
                this.checkedDesVideo = false;
            }
        },
        checkedTitle() {
            if (_.isInteger(parseFloat(this.formNative.title)) && parseFloat(this.formNative.title) > 0) {
                this.isCheckedTile = true;
            } else {
                this.isCheckedTile = false;
            }
        },
        checkedTitleGroup() {
            if (_.isInteger(parseFloat(this.formGroup.title)) && parseFloat(this.formGroup.title) > 0) {
                this.isCheckedTileGroup = true;
            } else {
                this.isCheckedTileGroup = false;
            }
        },
        checkedVideoTitle() {
            if (_.isInteger(parseFloat(this.formNativeVideo.title)) && parseFloat(this.formNativeVideo.title) > 0) {
                this.isCheckedVideoTile = true;
            } else {
                this.isCheckedVideoTile = false;
            }
        },
        changeImageType(val) {

            if (val.length > 0) {

                this.isCheckedVideoTileImage = true

            } else {
                this.isCheckedVideoTileImage = false;
            }

        },
        validateformGroup() {
            //  formGroup: {
            //     size: [], //尺寸
            //     type: [], //文件格式
            //     title: "", //标题
            //     des: "", //描述
            //     isLogo: false //是否需要logo

            // },
            if (this.checkedGroupItem.length == 0) {
                this.$message({
                    message: '请选择图片尺寸',
                    type: 'warning'
                });
                return;
            }
            if (this.formGroup.type.length == 0) {
                this.$message({
                    message: '请选择图片格式',
                    type: 'warning'
                });
                return;
            }
            if (!_.isInteger(parseFloat(this.formGroup.title))) {
                this.$message({
                    message: '标题字数必须是整数',
                    type: 'warning'
                });
                this.formGroup.title = "";
                return;
            } else {
                if (_.isInteger(parseFloat(this.formGroup.title)) && parseFloat(this.formGroup.title) < 0) {
                    this.$message({
                        message: '标题字数必须大于0',
                        type: 'warning'
                    });
                    this.formGroup.title = "";
                    return;
                }
            }
            return true;
        },
        validateformNative() {
            if (this.checkedNativeItem.length == 0) {
                this.$message({
                    message: '请选择图片尺寸',
                    type: 'warning'
                });
                return;
            }
            if (this.formNative.type.length == 0) {
                this.$message({
                    message: '请选择图片格式',
                    type: 'warning'
                });
                return;
            }
            if (!_.isInteger(parseFloat(this.formNative.title))) {
                this.$message({
                    message: '标题字数必须是整数',
                    type: 'warning'
                });
                this.formNative.title = "";
                return;
            } else {
                if (_.isInteger(parseFloat(this.formNative.title)) && parseFloat(this.formNative.title) < 0) {
                    this.$message({
                        message: '标题字数必须大于0',
                        type: 'warning'
                    });
                    this.formNative.title = "";
                    return;
                }
            }
            return true;
        },
        validateformVideo() {
            if (this.checkedVideoItem.length == 0) {
                this.$message({
                    message: '请选择视频尺寸',
                    type: 'warning'
                });
                return;
            }
            if (this.formNativeVideo.videoType.length == 0) {
                this.$message({
                    message: '请选择视频格式',
                    type: 'warning'
                });
                return;
            }
            if (!_.isInteger(parseFloat(this.formNativeVideo.title))) {
                this.$message({
                    message: '标题字数必须是整数',
                    type: 'warning'
                });
                this.formNativeVideo.title = "";
                return;
            } else {
                if (_.isInteger(parseFloat(this.formNativeVideo.title)) && parseFloat(this.formNativeVideo.title) < 0) {
                    this.$message({
                        message: '标题字数必须大于0',
                        type: 'warning'
                    });
                    this.formNativeVideo.title = "";
                    return;
                } else {
                    //this.isCheckedTile = true;
                }
            }
            return true;
        },
        validateformPatch() {
            if (this.checkedNativeVideoItem.length == 0) {
                this.$message({
                    message: '请选择视频尺寸',
                    type: 'warning'
                });
                return;
            }
            if (this.formPatchVideo.type.length == 0) {
                this.$message({
                    message: '请选择视频格式',
                    type: 'warning'
                });
                return;
            }
            if (!this.formPatchVideo.duration) {
                this.$message({
                    message: '请选择时长',
                    type: 'warning'
                });
                return;
            }
            return true;
        },
        // resCheckTypeList() {},
        // resTypeList() {},
        // handleClick() {},
        // activeNamebudget() {},
        //   imageData: [], //图片
        //     nativeimageData: [], //图文
        //     groupData:[],//组图
        //     nativeVideoData: [], //短视频
        //     videoPatch: [], //贴片视频
        adAdItem() {
            //图片操作
            if (this.activeNamebudget == "1-1") {
                let isValidateForm = validateForm([{
                        key: this.formImage.size.length == 0 ? false : true,
                        value: "请选择图片尺寸!"
                    }, {
                        key: this.formImage.type.length == 0 ? false : true,
                        value: "请选择文件格式!"
                    }

                ], this);

                if (!isValidateForm) {
                    return;
                }

                let item = {
                    image_wh: this.checkedImageItem.toString(),
                    image_style: this.formImage.type.toString(),
                    cast_id: 1
                };

                if (!this.currentEditImage) {
                    this.imageItemData.push(item);
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });

                } else {
                    //编辑操作
                    this.imageItemData.splice(parseInt(this.currentEditImage), 1, item);
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                }
                // {imagewh:[],imagetype:[]}

                this.$refs.panelsize.clearAll();
                this.formImage = {
                    size: [],
                    type: []
                };
            }
            //图文操作
            if (this.activeNamebudget == "1-2") {
                if (this.validateformNative()) {
                    let item = {
                        image_wh: this.checkedNativeItem.toString(),
                        image_style: this.formNative.type.toString(),
                        title: parseInt(this.formNative.title),
                        desc: this.formNative.des != "" ? this.formNative.des : undefined,
                        islogo: this.formNative.isLogo ? 1 : 0,
                        imagenum: this.formNative.quantity,
                        cast_id: 2
                    }

                    if (!this.currentEditNative) {
                        this.nativeItemData.push(item);
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                    } else {
                        //编辑操作
                        this.nativeItemData.splice(parseInt(this.currentEditNative), 1, item);
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }

                    this.isGroup = this.formNative.quantity;

                    //{imagewh:[],imagetype:[],imagenum:"",title:"",desc:"",logo:""}
                    this.clearFormNative();
                }
            }
            //组图
            if (this.activeNamebudget == "1-3") {

                if (this.validateformGroup()) {

                    let item = {
                        image_wh: this.checkedGroupItem.toString(),
                        image_style: this.formGroup.type.toString(),
                        title: parseInt(this.formGroup.title),
                        des: this.formGroup.des != "" ? this.formGroup.des : undefined,
                        // logo: this.formGroup.isLogo,
                        islogo: this.formGroup.isLogo ? 1 : 0,
                        imagenum: this.formGroup.quantity,
                        cast_id: 3
                    }

                    if (!this.currentEditGroup) {
                        this.groupData.push(item);
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                    } else {
                        //编辑操作
                        this.groupData.splice(parseInt(this.currentEditGroup), 1, item);
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }

                    this.isGroup = this.formGroup.quantity;

                    //{imagewh:[],imagetype:[],imagenum:"",title:"",desc:"",logo:""}
                    this.clearGroup();
                }

            }
            //短视频
            if (this.activeNamebudget == "1-4") {
                if (this.validateformVideo()) {
                    let item = {
                        video_wh: _.cloneDeep(this.checkedVideoItem).toString(),
                        video_style: this.formNativeVideo.videoType.toString(),
                        image_wh: this.checkedCoverData.toString(),
                        image_style: this.formNativeVideo.coverType.toString(),
                        // duration: [],
                        title: parseInt(this.formNativeVideo.title),
                        desc: this.formNativeVideo.des ? this.formNativeVideo.des : undefined,
                        // logo: this.formNativeVideo.isLogo,
                        islogo: this.formNativeVideo.isLogo ? 1 : 0,
                        duration: this.formNativeVideo.duration,
                        quantity: this.formNativeVideo.quantity,
                        cast_id: 4
                    };

                    if (!this.currentEditVideo) {
                        this.nativevideoItemData.push(item);
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                    } else {
                        //编辑操作
                        this.nativevideoItemData.splice(parseInt(this.currentEditVideo), 1, item);
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }

                    this.clearFormVideo();
                }
            }
            //视频贴片
            if (this.activeNamebudget == "1-5") {
                if (this.validateformPatch()) {
                    let item = {
                        video_wh: this.checkedNativeVideoItem.toString(), //checkedNativeVideoItem
                        video_style: this.formPatchVideo.type.toString(),
                        duration: this.formPatchVideo.duration,
                        cast_id: 5
                    };
                    if (!this.currentEditPatch) {
                        this.patchVideoItmeData.push(item);

                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });

                    } else {
                        //编辑操作
                        this.patchVideoItmeData.splice(parseInt(this.currentEditPatch), 1, item);

                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    }
                    this.clearFormPatch();
                }
            }
        },
        addchange(val) {
            //this.filetags.length < 1 ? this.addTop = false : this.addTop = true;
        },
        showinfo() {
            this.filetags.length < 1 ? this.addTop = false : this.addTop = true;
        },

        goBack() {
            this.$router.go(-1);
        },
        selectLogo() {
            this.$el.querySelector("#fileLogo").click();
        },
        handleClick(tab, event) {
            // console.log(tab, event);
            // console.log(event.target.getAttribute('id'));
            if (this.activeNamebudget == "1-1") {
                this.heightData = '379'
            }
            if (this.activeNamebudget == "1-2") {
                this.heightData = '565'
            }
            if (this.activeNamebudget == "1-3") {
                this.heightData = '663'
            }
            if (this.activeNamebudget == "1-4") {
                this.heightData = '427'
            }
        },
        verfiy() {},
        handleCheckAllChange() {},
        // coverSelect(val) {
        //     if(val == 'cover') {
        //         this.isShowCoverSize = true;
        //         this.isShowVideoSize = false;
        //     } else {// video
        //         this.isShowVideoSize = true;
        //         this.isShowCoverSize = false;
        //     }
        // },
        getKeyByValue(checkedData, res) {
            let result = [];
            _.forEach(checkedData, p => {
                _.forEach(res, s => {
                    if (p == s.value) {
                        result.push(s.key);
                    }

                });
            });
            return result;
        },
        getValueByKey(checkedData, res) {
            let result = [];
            _.forEach(checkedData, p => {
                _.forEach(res, s => {
                    if (p == s.key.toString()) {
                        result.push(s.value);
                    }

                });
            });
            return result;
        },
        onSubmit() {

            console.log({
                native_video: this.nativevideoItemData, //短视频
                native_text: this.nativeItemData, //图文
                native_num: this.groupData, //组图
                banner: this.imageItemData, //图片,
                video: this.patchVideoItmeData // 视频贴片

            });
            // return;
            let isValidateForm = validateForm([{
                    key: this.form.name,
                    value: "请填写平台名称!"
                }, {
                    key: this.logofile,
                    value: "请上传企业Logo!"
                }

                , {
                    key: this.form.cre_auditing,
                    value: "请选择审核政策!"
                }, {
                    key: this.checkedResourceType.length == 0 ? false : true,
                    value: "请填选择资源类型!"
                }, {
                    key: this.nativevideoItemData.length == 0 && this.nativeItemData.length == 0 && this.groupData.length == 0 && this.imageItemData.length == 0 && this.patchVideoItmeData.length == 0 ? false : true,
                    value: "请添加广告样式"
                }
            ], this);

            if (isValidateForm) {

                let fileData = new FormData();
                fileData.append("name", this.form.name);
                if (this.form.file) {
                    fileData.append("file", this.form.file);

                }

                fileData.append("flag", this.form.flag ? 1 : 2);

                fileData.append("cre_auditing", parseInt(this.form.cre_auditing));

                fileData.append("source_style", this.getKeyByValue(this.checkedResourceType, this.resTypeList, ));

                //  imageItemData: [],
                // nativeItemData: [],
                // groupData: [],
                // nativevideoItemData: [],
                // patchVideoItmeData: [],

                fileData.append("plantInfoStyleMap", JSON.stringify({
                    native_video: this.nativevideoItemData, //短视频
                    native_text: this.nativeItemData, //图文
                    native_num: this.groupData, //组图
                    banner: this.imageItemData, //图片,
                    video: this.patchVideoItmeData // 视频贴片

                }));

                if (this.$route.params.id) {
                    fileData.append("id", this.$route.params.id);
                    resource.editPlatform(this.header, fileData).then(res => {
                        callback(res.data, () => {
                            this.setCurentTab("second");
                            this.$router.go(-1);

                        }, this);
                    });

                } else {

                    resource.addPlantform(this.header, fileData).then(res => {
                        callback(res.data, () => {
                            this.setCurentTab("second");
                            this.$router.go(-1);

                        }, this);
                    });

                }

            }
        },
        searchDataBykeyword(val) {
            let data = _.filter(this.sourceLeftSizeList, function (item) {
                return item.indexOf(val) > -1;
            });
            this.leftSizeList = data;
        },
        uploadLogo(event) {
            // console.log(this.$el.querySelector("#fileLogo").files[0]);
            this.form.file = this.$el.querySelector("#fileLogo").files[0];
            this.logofile = this.form.file.name;
            this.isUpload = true;
        },
        clearUpload(key) {
            if (key == 'uploadedlogo') {
                this.isUpload = false;
                this.logofile = "";
                this.form.logo = "";
            } else if (key == 'uploaedCompany') {
                this.isCompanyUpload = false;
            } else if (key == 'uploadedOther') {
                this.isOtherUpload = false;
            } else if (key == 'uploadedBusiness') {
                console.log(111)
                this.isBusinessUpload = false;
            }
        },
        validateForm() {
            if (!this.form.name) {
                this.$message({
                    message: "请输入计划名称",
                    type: "warning"
                });
                return;
            }
            if (!this.logofile) {
                this.$message({
                    message: "请上传企业logo",
                    type: "warning"
                });
                return;
            }
            // if (this.filetags.length == 0) {
            //     this.$message({
            //         message: "请选择文件格式",
            //         type: "warning"
            //     });
            //     return;
            // }
            if (this.resTypeList.length == 0) {
                this.$message({
                    message: "请选择资源类型",
                    type: "warning"
                });
                return;
            }

            if (this.imageItemData.length == 0 && this.nativeItemData.length == 0 && this.nativevideoItemData.length == 0 && this.patchVideoItmeData.length == 0) {

                this.$message({
                    message: "请添加广告样式",
                    type: "warning"
                });
                return;

            }

            return true;
        },
        clearAll() {
            this.checkList = [];
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
        handleSelect(item) {
            this.dynamicTags.push(item)
        },
        clearItem() {},
        removeItem(val) {
            this.checkList = _.pull(_.cloneDeep(this.checkList), val);
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        handleCheckedCitiesChange(val) {},
        loadAll(val) {
            return val;
        },

        addStyle(type, value, fn) {
            resource.addStyle(this.header, {
                cast_id: type,
                wh: value
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
                    fn();

                }, this)

            });

        },

        addImageItem(val) {
            //this.imageSizeData.push(val);
            this.addStyle(1, val, () => {
                this.imageSizeData.push(val);
            });

        },
        addNativeImage(val) {
            //this.nativeSizeData.push(val);
            this.addStyle(2, val, () => {
                this.nativeSizeData.push(val);
            });
        },
        addGroupImage(val) {
            //this.groupSizeData.push(val);
            this.addStyle(3, val, () => {
                this.groupSizeData.push(val);
            });
        },
        addVideoPatch(val) {
            //this.patchVideoSizeData.push(val);
            this.addStyle(5, val, () => {
                this.patchVideoSizeData.push(val);
            });
        },
        addNativeVideoData(val) {
            //this.naviteVideoSizeData.push(val);
            this.addStyle(4, val, () => {
                this.naviteVideoSizeData.push(val);
            });
        },
        addcoverData(val) {
            // this.coverData.push(val);
            this.addStyle(4, val, () => {
                this.coverData.push(val);
            });
        },
        getCheckedImage(val) {
            this.checkedImageItem = val;
            this.formImage.size = val;
        },
        getCheckedNativeImage(val) {
            this.checkedNativeItem = val;
        },
        getCheckedGroupImage(val) {
            this.checkedGroupItem = val;
        },
        getCheckedvideoPatch(val) {
            this.checkedVideoItem = val;
        },
        getCheckednativeVideoData(val) {
            this.checkedNativeVideoItem = val;
        },
        getcheckedCoverData(val) {
            this.checkedCoverData = val;
        },
        initData() {

            const industryPromise = common.getSizeList(this.header).then(res => {
                return res.data.data

            });

            const stylePromise = resource.getStyleList(this.header).then(res => {
                return res.data.data;

            });

            let platformPromis = null;
            if (this.$route.params.id) {

                platformPromis = resource.getPlatformItem(this.header, {
                    id: this.$route.params.id
                }).then(res => {
                    return res.data.data

                });
            }

            Promise.all([industryPromise, platformPromis, stylePromise])
                .then(res => {

                    let sizeList = res[2];

                    _.forEach(sizeList.banner, val => {
                        this.imageSizeData.push(val.wh);
                    });
                    _.forEach(sizeList.native_text, val => {
                        this.nativeSizeData.push(val.wh);
                    });
                    _.forEach(sizeList.native_num, val => {
                        this.groupSizeData.push(val.wh);
                    });
                    _.forEach(sizeList.native_video, val => {
                        this.naviteVideoSizeData.push(val.wh);
                    });
                    _.forEach(sizeList.video, val => {
                        this.patchVideoSizeData.push(val.wh);
                    });

                    if (this.$route.params.id) {
                        let platformItem = res[1];
                        this.form.name = platformItem.name;
                        this.logofile = platformItem.logo_file_name;
                        this.form.flag = platformItem.flag == 1 ? true : false;
                        this.form.cre_auditing = platformItem.cre_auditing.toString();
                        this.form.source_style = platformItem.source_style.split(",");
                        this.checkedResourceType = this.getValueByKey(this.form.source_style, this.resTypeList);

                        this.imageItemData = platformItem.plsMap.banner;
                        this.nativeItemData = platformItem.plsMap.native_text;
                        this.groupData = platformItem.plsMap.native_num;
                        this.nativevideoItemData = platformItem.plsMap.native_video;
                        this.patchVideoItmeData = platformItem.plsMap.video;

                    }

                }).catch(function (err) {
                    console.error('Promise.all error', err);
                });

        },

    },
    mounted() {

        this.setBreadCrumb(this.$route.path.replace("/", ""));

        this.initData();

    },
    components: {
        panel
    },
    created() {
        this.header = {
            token: store.get("token"),
            userId: store.get("userId")
        };

    },
    //   beforeCreate() {
    //       this.imageSizeData=["789^454"];

    //   }
    // this.imageSizeData=["789^454"];

}
</script>

<style lang="scss">
@import "../../style/mixin";

.back-list {

    // head style
    .template-hd {
        padding: 16px 0 18px 30px;
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

    // each row style, contain label and input
    .basic-set-row {
        margin-bottom: 12px;

        &:last-child {
            .config-neccessary {
                margin-top: 12px;
            }
        }

        // define label and input style
        .neccessary,
        .data-item {
            line-height: 38px;
            height: 38px;
        }

        .data-item,
        .config-title {
            color: $firstc;
            padding-right: 3px;
            width: 77px;
        }

        .error-tip {
            padding-left: 23px;
            color: #ff6870;
        }

        .neccessary,
        .config-neccessary {
            color: #ff7a81;
            width: 16px;
            margin-top: 3px;
            text-align: left;
        }

        .el-input {
            width: 240px;
        }

        .el-switch {
            margin: 7px 0 0;
        }

        .upload-control {
            margin-right: 6px;
        }

        // tabs
        .el-tabs--card>.el-tabs__header {
            border: 0 none;
            margin-bottom: 11px;
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
            padding: 0 19px;
            border: 1px solid transparent;
            border-radius: 5px;
            float: left
        }

        .is-active .select-item {
            background-color: #ecf3fb;
            border: 1px solid #6cabff;
            color: #6cabff;
        }

        //tabs end
        // image wrapper
        .image-wrapper,
        .img-txt-wrapper,
        .origin-video-wrapper,
        .paster-fvideo-wrapper {
            padding-left: 90px;
        }

        // checkbox basic set row style
        .checkbox-space-adjust {
            font-size: 14px;
            height: 38px;
            line-height: 38px;
            width: 96px;
        }

        .margin-bottom-22 {
            margin-bottom: 20px;
        }

        // material rules
        .el-material-rule {
            float: left;
            position: relative;

            .addItem {
                display: inline-block;
                width: 38px;
                height: 38px;
                border: 1px solid #6cabff;
                text-align: center;
                line-height: 33px;
                border-radius: 4px;
                color: #6cabff;
                font-size: 30px;
                margin: 0 20px;
                position: absolute;
                top: 122px;

                &:hover {
                    background-color: #f0f6ff;
                }
            }

            .el-rules {
                overflow-x: scroll;
                width: auto;
                max-height: 379px;
                margin-left: 78px;
                border: 1px solid #e1e7f0;
                border-radius: 4px;

                .matter-rule-label {
                    height: 38px;
                    line-height: 38px;
                    padding-left: 20px;
                    border-bottom: 1px solid #e1e7f0;
                    @include sc(12px, #515974);
                }

                .search-item {
                    height: auto;
                }

                h2 {
                    @include sc(12px, #91c0fe);
                    background-color: #f6f8fa;
                    padding: 9px 20px 13px;
                }

                li {
                    @include sc(12px, #7f8599);
                    line-height: 28px;
                    position: relative;
                }

                .el-icon-close {
                    color: #515974;
                    position: absolute;
                    top: 12px;
                    right: 13px;
                    cursor: pointer;
                }
            }
        }
    }

    .special-select {
        .el-input__suffix {
            display: none;
        }
    }

    // special tags
    .tags-container {
        .el-select__tags {
            left: 10px;
        }

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
            font-weight: bold;

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

    // back-rule-config style
    .back-rule-config {
        .basic-set-row:first-child {
            margin-bottom: 22px;
        }

        .el-radio__label,
        .el-checkbox__label {
            @include sc(14px, #515974);
        }

        .el-radio+.el-radio {
            margin-left: 15px;
        }

        .el-checkbox+.el-checkbox {
            margin-left: 20px;
        }

        .template-bd {
            padding-bottom: 6px;
        }

        .el-tabs__content {
            float: left;
        }
    }

    // left image size
    .account-search-wrap {
        width: 240px;

        .el-input {
            width: 100%;
        }

        .account-search-bd {
            height: 290px;
            border: 1px solid #e1e7f0;
            @include bottomLeftRadius(5px);
            @include bottomRightRadius(5px);
            border-top: 0 none;
        }

        // input search remove bottom radius
        .el-input__inner {
            padding-left: 20px;
            @include bottomLeftRadius(0);
            @include bottomRightRadius(0);
        }

        .adjust-border-radius {
            border-radius: 5px;
        }

        .el-checkbox__label {
            @include sc(12px, #bdbecd);
        }

        .is-checked+.el-checkbox__label {
            @include sc(12px, #515974);
        }

        // add size
        .add-size {
            @include sc(12px, #6cabff);
            cursor: pointer;
            padding: 13px 0 10px 20px;
        }

        // check all item
        .check-all-style {
            display: block;
            padding: 1px 0 11px 20px;
        }

        // ajust button height to 28px
        .special-btn-height {
            height: 28px !important;
            line-height: 28px !important;
        }

        // set button background color none
        .bg-color-transparent {
            background-color: transparent;
        }

        // add checkbox style
        .add-checkbox {
            margin-left: 20px !important;

            .el-input,
            .el-input__inner {
                width: 60px;
                @extend .special-btn-height;
            }

            .el-input__inner {
                border-radius: 5px;
                padding: 0 10px;
            }

            .el-button {
                width: 18px;
                padding: 0 !important;
                margin-left: 2px;
                @extend .special-btn-height;
            }

            .multiply {
                color: #c3c4d1;
            }

            .create-new-size,
            .el-icon-check:before {
                border-color: #6cabff;
                color: #6cabff;

                &:hover {
                    @extend .bg-color-transparent;
                }
            }

            .cancel-new-size,
            .el-icon-close:before {
                border-color: #ff6870;
                color: #ff6870;

                &:hover {
                    @extend .bg-color-transparent;
                }
            }
        }
    }

    // search each item
    .search-item {
        height: 36px;
        line-height: 36px;
        padding: 0 20px;

        &:hover,
        &.active {
            background-color: #f6f8fa;

            .el-checkbox__label {
                color: #515974;
            }
        }

        .el-checkbox {
            margin: 0;
        }
    }

    // all remove
    .account-list {
        margin-left: 370px;
        position: relative;
        border: 1px solid #e1e7f0;
        width: 240px;
        @include borderRadius(5px);

        .turn-iron {
            @include svgbg("../../style/image/put/turn.svg");
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
            cursor: pointer;
        }

        .account-clear-bd {
            height: 290px;
        }

        .search-item {
            padding: 0 15px 0 19px;
        }

        .account-name {
            @include sc(12px, #515974);
        }

        .account-delete {
            color: #515974;
            float: right;
            cursor: pointer;
        }
    }

    // account dispatch module end
    .is-confirm {
        padding-left: 30px;
    }
}

@media screen and (max-width:1920px) {
    .back-list .basic-set-row .el-material-rule .el-rules {
        width: 650px;
    }
}

@media screen and (max-width:1680px) {
    .back-list .basic-set-row .el-material-rule .el-rules {
        width: 550px;
    }
}

@media screen and (max-width:1366px) {

    .back-list .basic-set-row .image-wrapper,
    .back-list .basic-set-row .img-txt-wrapper,
    .back-list .basic-set-row .origin-video-wrapper,
    .back-list .basic-set-row .paster-fvideo-wrapper {
        padding-left: 0;
    }

    .back-list .basic-set-row .el-material-rule .el-rules {
        width: 300px;
    }
}
</style>
