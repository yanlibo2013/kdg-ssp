<template>
    <div class="creative-template" name="banner">
        <el-main>
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="audit-management">
                    <el-form ref="form" :model="form">
                        <el-tabs v-model="activeName">
                            <el-tab-pane class="border-bottom-2" name="first">
                                <span slot="label">帐户</span>
                                <template>

                                    <div class="medida-func">
                                        <div class="grid-content ">
                                            <div class="function-list">
                                                <a href="javascript:void(0);" class="single-link el-link-add" @click.stop="createUser">
                                                    <i class="add-iron">+</i>
                                                    <span class="add-msg">创建帐号</span>
                                                </a>
                                                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                                                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
                                                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                                            </div>
                                            <div class="seek-box">
                                                <el-select v-model="adUser" placeholder="全部" @change="changStatus(adUser)">
                                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <div class="el-input el-input--prefix">
                                                    <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable class="el-input__inner" v-model="keyWords" @keyup="searchDataByName(keyWords)" />
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
                                        <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                                            <el-table-column type="selection" width="55">
                                            </el-table-column>
                                            <el-table-column prop="name" label="账户名称">
                                                <template slot-scope="scope">
                                                    <div class="firm-name-adjust">
                                                        <span class="space-adjust">{{ scope.row.email }}</span>
                                                        <a href="javascript:void(0);" class="el-icon-revise" @click="modify(scope.row.id)"></a>

                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="status" label="状态">
                                                <template slot-scope="scope">
                                                    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
                                                    </el-switch>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="num" label="姓名">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.name}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="num" label="电话">
                                                <template slot-scope="scope">
                                                    <span>{{ scope.row.tel }}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="authority" label="角色">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.role_names}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="date" label="最后更新时间" width="115">
                                                <template slot-scope="scope">
                                                    <span class="link-jump">{{ scope.row.update_time }}</span>
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

                            </el-tab-pane>

                            <el-tab-pane name="second">

                                <span slot="label">角色 </span>
                                <template>
                                    <div class="role-func">
                                        <div class="grid-content ">
                                            <div class="role-name">
                                                <h2 class="role-sub-title">角色名称</h2>
                                                <el-collapse v-model="activeRole">
                                                    <el-collapse-item name="1" class="clear">
                                                        <template slot="title">

                                                            <span class="fold-iron"></span>
                                                            <!-- 创建角色-初始按钮 -->
                                                            <a href="javascript:void(0);" class="add-role-button left" v-show="isShowAdd" @click.stop="createRole">
                                                            <i class="add-iron">+</i>
                                                        </a>
                                                            <!-- 角色添加 -->
                                                            <div class="enter-role left el-input el-input--prefix el-input--suffix" v-show="!isShowAdd">
                                                                <input v-model="roleRaise" ref="roleInput" type="text" placeholder="请输入角色" class="el-input__inner" @click.stop="editRoleCurrent" />
                                                                <span class="icon-wrap">
                                                                <i class="right el-icon-close margin-right-10" @click.stop="noAddRole"></i>
                                                                <!-- <i class="right el-icon-check" @click.stop="addRole({name:roleRaise,isEdit:false,id:'',isActive:false,width:''},'')"></i> -->
                                                                  <i class="right el-icon-check" @click.stop="onSubmit({name:roleRaise})"></i>
                                                            </span>
                                                            </div>
                                                            <!-- <label  style="visibility: hidden" ref="hideText" @click="getTextLength">{{currentItem}}</label> -->

                                                            <el-button style="visibility: hidden" ref="hideText">{{currentItem}}
                                                                <span class="edit-icons" v-show="false" style="margin-right:10px">
                                                                <i class="right el-icon-tickets " @click.stop="editRole(item.name,index)"></i>
                                                            </span>
                                                                <span class="edit-icons" v-show="false" style="top:19px">
                                                                <i class="right el-icon-close" @click.stop="delRole(item,index)" style="margin-right:5px"></i>
                                                            </span>
                                                            </el-button>

                                                            <!-- 编辑显示 -->
                                                            <div v-for="(item,index) in roleList" :key="index" class="item-role-button left">

                                                                <div :style='item.isEdit?"display:block; min-width:50px;":"display:none"' ref="divEdit">

                                                                    <input v-model="currentItem" :style='item.isEdit?"padding-right:50px":""'  type="text" placeholder="编辑角色1" class="el-input__inner" @click.stop="editRoleCurrent" @keyup="setInput(currentItem,index)"/>
                                                                    <span class="icon-wrap">
                                                                <i class="right el-icon-close margin-right-10" @click.stop="cancelEdit(item.name)"></i>
                                                                <i class="right el-icon-check" @click.stop="onSubmit({id:item.id,isActive:item.isActive,isEdit:item.isEdit,width:editTextWidth,name:currentItem})"></i>
                                                            </span>
                                                                </div>
                                                                <!-- 显示 -->
                                                                <div :style='item.isEdit?"display:none":"display:block"' ref="divShow" v-on:mouseover='mouseoverCurrentItem(item)' v-on:mouseout="mouseoutCurrentItem(item)">
                                                                    <el-button @click.stop="openRoleAudit(item)" ref="rolelabel">{{item.name}}
                                                                        <span class="edit-icons" v-show="item.isActive" style="margin-right:10px">
                                                                <i class="right el-icon-tickets " @click.stop="editRole(item.name,index)"></i>
                                                            </span>
                                                                        <span class="edit-icons" v-show="item.isActive" style="top:19px">
                                                                <i class="right el-icon-close" @click.stop="delRole(item,index)" style="margin-right:5px"></i>
                                                            </span>
                                                                    </el-button>

                                                                </div>

                                                            </div>

                                                        </template>
                                                    </el-collapse-item>
                                                </el-collapse>
                                            </div>
                                        </div>

                                        <!-- 角色权限 -->
                                        <div class="role-permi">
                                            <h2 class="role-sub-title">角色权限</h2>
                                            <ul class="role-tree">

                                                <li v-for="(item,index) in permissionData" :key="index">

                                                    <!-- 一级菜单 -->
                                                    <el-button plain style="width:90px" :class="item.checked?'selected-style':''" @click="editCurrentItem(permissionData,item.id)">{{item.name}}</el-button>

                                                    <div v-for="(page,pageIndex) in item.sub" :key="pageIndex">
                                                        <el-button plain v-show='pageIndex==0' style="margin-left: 11px;" :class="page.checked?'selected-style':''" @click="editCurrentItem(permissionData,page.id)">{{page.name}}</el-button>
                                                        <ul class="role-tree" style="margin: 0 0 0 210px;" v-show="pageIndex==0">
                                                            <li class="clear" v-show="pageIndex==0">
                                                                <el-button :class="element.checked?'selected-style':''" plain v-for="(element,elementIndex) in page.sub" :key="elementIndex" v-show="pageIndex==0" style="margin-left: 5px;" @click="editCurrentItem(permissionData,element.id)">{{element.name}} </el-button>
                                                            </li>

                                                        </ul>
                                                        <div v-show="pageIndex>0"></div>
                                                        <el-button plain style="visibility: hidden" v-show="pageIndex>0">科大技术</el-button>
                                                        <el-button :class="page.checked?'selected-style':''" plain style="    margin-left: 9px" v-show="pageIndex>0" @click="editCurrentItem(permissionData,page.id)">{{page.name}}</el-button>
                                                        <ul class="role-tree" style="margin: 0 0 0 210px;" v-show="pageIndex>0">
                                                            <li class="clear">
                                                                <el-button :class="element.checked?'selected-style':''" plain v-for="(element,elementIndex) in page.sub" :key="elementIndex" v-show="pageIndex>0" @click="editCurrentItem(permissionData,element.id)">{{element.name}}</el-button>
                                                            </li>

                                                        </ul>
                                                    </div>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </template>
                                <!-- Input内宽度随内容自适应pre -->
                                <pre class="not-see-width" ref="notseewidth"></pre>
                                <!-- 确认，取消 -->
                                <!-- <div class="is-confirm">
                                    <el-button type="confirm" @click="onSubmit">确认</el-button>
                                    <el-button type="cancel" @click="goBack">取消</el-button>
                                </div> -->

                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </el-col>
        </el-main>
    </div>
</template>

<script>
import {
    permission,
    common
} from "../../../service/index";
import {
    mapState,
    mapActions
} from "vuex";
import _ from "lodash";
import store from "store";
import {
    callback,
    warning,
    validateForm,
    getStringLength
} from "../../../common/utils.js";
export default {
    data: function () {
        return {
            header: "",
            multipleSelection: [],
            keyWords: "",
            form: {},
            create: "",
            options: [{
                    //请选择客户
                    value: "选项1",
                    label: "客户1"
                },
                {
                    value: "选项2",
                    label: "客户2"
                },
                {
                    value: "选项3",
                    label: "客户3"
                }
            ],
            //列表
            list: [],
            isLighten: false,
            clearIt: false, //清空图标是否显示
            currentpage: "",
            searchkey: "", //表格的搜索关键词
            statusOptions: [{
                    value: 0,
                    label: "全部"
                },
                {
                    value: 1,
                    label: "开启"
                },
                {
                    value: 2,
                    label: "关闭"
                }
            ],
            adUser: "",
            pageList: [],
            dialogMaterialTypeVisible: false,
            isShowImage: false,
            isShowNative: false,
            isShowVideo: false,
            isShowPatch: false,

            // dialog

            bannerData: [],
            nativeData: [],
            videoData: [],
            patchData: [],

            isShowAdd: true,
            isShowEnter: false,
            roleRaise: "",
            addrole: "",
            widthData: "126px",
            isEdit: false,
            isShowRole: true,
            loading: false,
            activeRole: [],

            permissionData: [],
            activeName: "first",
            roleList: [
                //     {
                //     name: "系统管理员",
                //     isLighten: false,
                //     isEdit: false
                // }, {
                //     name: "科大技术",
                //     isLighten: false, //编辑，删除状态控制
                //     isEdit: false
                // }
            ],
            currentItem: "",
            checkedIds: [],
            editTextWidth: "",
            pageSize: 10,
            currentPage: 1,
            currentNode: "",
            currentParentNode: "",
            curretnParentId: "",
            subNodeTotal: 0,
            subNodeChecked: 0,

            editCurrentNode: "",

            parentNodeTotal: 0,
            parentNodeChecked: 0,
        };
    },
    computed: {
        renderPermission() {
            return this.permissionData;
        }
    },
    components: {},
    methods: {
        ...mapActions(["setBreadCrumb", "getCurrentUser"]),
        mouseoverCurrentItem(val) {
            // _.forEach(this.roleList, item => {
            //     if (val.name == item.name) {
            //         item.isActive = true;
            //     }
            // });
        },

        mouseoutCurrentItem(val) {
            // _.forEach(this.roleList, item => {
            //     if (val.name == item.name) {
            //         item.isActive = false;
            //     }
            // });
        },

        editRoleCurrent() {},

        modify(val) {
            this.$router.push("/editaccount/" + val);
        },

        getCheckedIds(data) {
            //this.checkedIds=[];

            //console.log("");
            _.forEach(data, item => {
                if (item.checked) {
                    this.checkedIds.push(item.id);
                }
                if (item.sub && item.sub.length != 0) {
                    this.getCheckedIds(item.sub);
                }
            });
        },

        unCheckedAll(data) {
            _.forEach(data, item => {
                item.checked = false;

                if (item.sub && item.sub.length != 0) {
                    this.unCheckedAll(item.sub);
                }
            });
        },

        editCurrentItem(data, val) {
            this.editLastItem(data, val);

            // this.editParentAndSubItem(data, val);

            //更新父节点状态

            this.modifyParentStatus(val);

            // console.log(data);
            // console.log(val);

            // this.getCurrentEditNodeById(this.permissionData, val);
            // console.log(this.editCurrentNode);

            // console.log(this.getCurrentEditNodeById(this.permissionData, val));

        },

        getParentIdByPid(data, val) {

            _.forEach(data, item => {
                if (item.id == val) {
                    this.curretnParentId = item.pid;
                }

                if (item.sub && item.sub.length != 0) {
                    this.getParentIdByPid(item.sub, val);
                }

            });
        },

        getCurrentParentItemById(data, val) {
            // console.log("getCurrentParentItemById");
            // console.log(val);
            _.forEach(data, item => {
                if (val == item.id) {
                    this.currentParentNode = item;
                }
                if (item.sub && item.sub.length != 0) {
                    this.getCurrentParentItemById(item.sub, val);
                }

            });

            return this.currentParentNode;

        },

        getCurrentItemById(data, val) {
            _.forEach(data, item => {
                if (val == item.id) {
                    this.currentNode = item;
                }
                if (item.sub && item.sub.length != 0) {
                    this.getCurrentItemById(item.sub, val);
                }

            });

        },

        getCurrentEditNodeById(data, val) {
            _.forEach(data, item => {
                if (val == item.id) {
                    this.editCurrentNode = item;
                }
                if (item.sub && item.sub.length != 0) {
                    this.getCurrentEditNodeById(item.sub, val);
                }

            });

            return this.editCurrentNode;

        },

        checkedSubItemAll(data, val) {

            _.forEach(data, item => {
                if (item.pid == val) {
                    item.checked = true;
                }
                if (item.sub && item.sub.length != 0) {
                    this.checkedSubItemAll(item.sub, val);
                }
            });

        },

        uncheckedSubItemAll(data, val) {
            _.forEach(data, item => {
                if (item.pid == val) {
                    item.checked = false;
                }

                if (item.sub && item.sub.length != 0) {
                    this.uncheckedSubItemAll(item.sub, val);
                }
            });

        },

        editParentAndSubItem(data, val) {
            this.getCurrentItemById(data, val);

            let currentNode = _.cloneDeep(this.currentNode);

            if (currentNode.checked) {
                this.checkedSubItemAll(this.permissionData, currentNode.id);

            } else {
                this.uncheckedSubItemAll(this.permissionData, currentNode.id);
            }

            if (currentNode.sub && currentNode.sub.length != 0) {
                _.forEach(currentNode.sub, item => {
                    this.editParentAndSubItem(this.permissionData, item.id);
                });
            }

        },

        //子节点及被选中个数

        getTotalAndChecked(data, val) {
            //     subNodeTotal: 0,
            // subNodeChecked: 0
            _.forEach(data, item => {
                if (item.pid == val) {
                    this.subNodeTotal += 1;
                }

                if (item.pid == val && item.checked) {
                    this.subNodeChecked += 1;
                }

                if (item.sub && item.sub.length != 0) {
                    this.getTotalAndChecked(item.sub, val);
                }

            });

        },

        getParentTotalAndChecked(data, val) {

            _.forEach(data, item => {
                if (item.pid == val) {
                    this.parentNodeTotal += 1;
                }

                if (item.pid == val && item.checked) {
                    this.parentNodeChecked += 1;
                }

                if (item.sub && item.sub.length != 0) {
                    this.getParentTotalAndChecked(item.sub, val);
                }

            });

            return {
                parentTotal: this.parentNodeTotal,
                parentChecked: this.parentNodeChecked
            }

        },

        modifyParentStatus(val) {
            this.subNodeTotal = 0;
            this.subNodeChecked = 0;

            this.editParentAndSubItem(this.permissionData, val);
            // console.log("更新父节点状态");
            //console.log("modifyParentStatus");
            // console.log(val); //子节点ID
            this.getParentIdByPid(this.permissionData, val);
            // console.log(this.curretnParentId); //父节点ID
            this.getTotalAndChecked(this.permissionData, this.curretnParentId)

            if (this.subNodeChecked > 0) {
                // console.log("if");
                //this.editLastItem(this);
                this.setParentStatus(this.permissionData, this.curretnParentId, true);

            } else {
                // console.log("else");
                this.setParentStatus(this.permissionData, this.curretnParentId, false);

            }

            let curretnNode = this.getCurrentEditNodeById(this.permissionData, val);
            if (curretnNode.type == 3) {
                this.parentNodeTotal = 0;
                this.parentNodeChecked = 0;

                let parentNode = this.getCurrentParentItemById(this.permissionData, curretnNode.pid);
                this.getParentTotalAndChecked(this.permissionData, parentNode.pid);

                let parentParentNode = this.getCurrentParentItemById(this.permissionData, parentNode.pid);
                if (this.parentNodeChecked > 0) {
                    this.setParentStatus(this.permissionData, parentParentNode.id, true);
                } else {
                    // console.log("else");
                    this.setParentStatus(this.permissionData, parentParentNode.id, false);

                }

            }

        },

        //更新父节点状态
        setParentStatus(data, val, status) {
            _.forEach(data, item => {
                if (item.id == val) {
                    item.checked = status;
                }

                if (item.sub && item.sub.length != 0) {
                    this.setParentStatus(item.sub, val, status);
                }
            });
        },

        //三级操作
        editLastItem(data, val) {
            _.forEach(data, item => {
                if (item.id == val) {
                    if (item.checked) {
                        item.checked = false;
                    } else {
                        item.checked = true;
                    }
                }

                if (item.sub && item.sub.length != 0) {
                    this.editLastItem(item.sub, val);
                }
            });
        },

        // 二级
        editActiveItem(data, val) {
            // _.forEach(data, item => {
            //     if (item.id == val) {
            //         item.isActive = true;
            //         this.activeAllSubItem(item.sub);
            //     }
            //     if (item.sub && item.sub.length != 0) {
            //         this.editActiveItem(item.sub, val);
            //     }
            // });
            //   _.forEach(data, item => {
            //     if (item.id == val) {
            //         item.checked = true;
            //         this.activeAllSubItem(item.sub);
            //     }
            //     if (item.sub && item.sub.length != 0) {
            //         this.editActiveItem(item.sub, val);
            //     }
            // });
        },
        activeAllSubItem(data) {
            _.forEach(data, item => {
                item.isActive = true;
            });
        },
        editRole(val, index) {
            this.currentItem = val;
            _.forEach(this.roleList, item => {
                if (val == item.name) {
                    item.isEdit = true;
                    //item.width = this.$refs.divShow[index].clientWidth + "px";
                    this.editTextWidth = this.$refs.divShow[index].clientWidth;
                }
            });
        },

        resetData(data) {
            _.forEach(data, item => {
                item.checked = false;

                if (item.sub && item.sub.length != 0) {
                    this.resetData(item.sub);
                }
            });
        },
        cancelEdit(val) {
            _.forEach(this.roleList, item => {
                if (val == item.name) {
                    item.isEdit = false;
                }
            });
        },
        openRoleAudit(val) {

            _.forEach(this.roleList, item => {
                if (val.name == item.name) {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }
            });

            this.unCheckedAll(this.permissionData);

            if (val.id) {
                permission
                    .getRoleItem(this.header, {
                        id: val.id
                    })
                    .then(res => {
                        //console.log(res.data.data.privilege_id.split(","));
                        let id = _.map(res.data.data.privilege_id.split(","), id => {
                            return parseInt(id);
                        });

                        _.forEach(_.uniq(id), item => {
                            this.editLastItem(this.permissionData, item);
                        });
                    });
            }

            this.noAddRole();
        },
        createUser() {
            this.$router.push({
                path: "/adaccount"
            });
        },
        createPlatform() {
            this.$router.push({
                path: "/createPlatform"
            });
        },
        createRole() {
            this.isShowAdd = false;
            this.isShowEnter = true;

            this.initData();
        },
        handleChange() {},
        clearInput() {},
        modifyStatus(val, flag) {
            permission
                .accountOpen(this.header, {
                    ids: [val],
                    flag: flag == 1 ? 2 : 1
                })
                .then(res => {
                    callback(
                        res.data,
                        () => {
                            this.getList({
                                pagenum: this.currentPage,
                                pagesize: this.pageSize
                            });
                        },
                        this
                    );
                });
        },
        getIdsByRow(val) {
            let result = [];
            _.forEach(val, item => {
                result.push(item.id);
            });

            return result;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length > 0) {
                this.isLighten = true;

            } else {
                this.isLighten = false;

            }
        },
        showMessage() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "该操作至少选择一条记录!",
                    type: "warning"
                });
                return;
            }
        },
        open() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请至少选择一条记录",
                    type: "warning"
                });
                return;
            }

            this.showMessage();
            permission
                .accountOpen(this.header, {
                    ids: this.getIdsByRow(this.multipleSelection),
                    flag: 1
                })
                .then(res => {
                    callback(
                        res.data,
                        () => {
                            if (res.data.data && res.data.data.code == "401") {
                                this.$switchLogin("", this);
                                return;
                            }
                            if (res.data.data && res.data.data.code == "402") {
                                this.$message(res.data.data.error);
                                return;
                            }
                            this.getList({
                                pagenum: this.currentPage,
                                pagesize: this.pageSize
                            });
                        },
                        this
                    );
                });
        },
        close() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请至少选择一条记录",
                    type: "warning"
                });
                return;
            }

            this.showMessage();
            permission
                .accountOpen(this.header, {
                    ids: this.getIdsByRow(this.multipleSelection),
                    flag: 2
                })
                .then(res => {
                    if (res.data.data && res.data.data.code == "401") {
                        this.$switchLogin("", this);
                        return;
                    }
                    if (res.data.data && res.data.data.code == "402") {
                        this.$message(res.data.data.error);
                        return;
                    }
                    callback(
                        res.data,
                        () => {
                            this.getList({
                                pagenum: this.currentPage,
                                pagesize: this.pageSize
                            });
                        },
                        this
                    );
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
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: "请至少选择一条记录",
                    type: "warning"
                });
                return;
            }

            if (this.isDelItem(this.multipleSelection)) {
                warning("选中记录已经删除!", this);
                this.getList({
                    pagenum: this.currentPage,
                    pagesize: this.pageSize
                });
                return;
            }
            permission
                .delAccount(this.header, {
                    ids: this.getIdsByRow(this.multipleSelection)
                })
                .then(res => {
                    if (res.data.data && res.data.data.code == "401") {
                        this.$switchLogin("", this);
                        return;
                    }
                    if (res.data.data && res.data.data.code == "402") {
                        this.$message(res.data.data.error);
                        return;
                    }
                    callback(
                        res.data,
                        () => {
                            this.getList({
                                pagenum: this.currentPage,
                                pagesize: this.pageSize
                            });
                        },
                        this
                    );
                });
        },
        searchDataByName(val) {
            this.getList({
                pagenum: 1,
                pagesize: 10,
                name: val
            });
        },
        handleSizeChange(val) {
            this.loading = true;
            this.pageSize = val;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize
            });
        },
        handleCurrentChange(val) {
            this.loading = true;
            this.getList({
                pagenum: val,
                pagesize: this.pageSize
            });
            this.currentPage = val;
        },
        getList(data) {
            permission.getAccountList(this.header, data).then(res => {
                this.pageList = res.data;
                // callback(res.data, () => {
                //     this.pageList = res.data;
                // }, this);

                this.loading = false;
            });
        },
        filterData(val) {},
        onSubmit(value) {
            this.checkedIds = [];

            if (!value.name) {
                this.$message({
                    message: "角色名称不可以为空",
                    type: "warning"
                });
                return;
            }
            this.getCheckedIds(this.permissionData);

            if (value.id) {
                permission
                    .modifyRole(this.header, {
                        id: value.id,
                        name: value.name,
                        privilege_id: this.checkedIds.toString()
                    })
                    .then(res => {
                        callback(
                            res.data,
                            () => {
                                this.initData();
                                this.noAddRole();
                            },
                            this
                        );
                    });
            } else {
                permission
                    .addRole(this.header, {
                        name: value.name,
                        privilege_id: this.checkedIds.toString()
                    })
                    .then(res => {
                        callback(
                            res.data,
                            () => {
                                this.initData();
                                this.noAddRole();
                            },
                            this
                        );
                    });
            }
        },
        getPageList() {
            let result = [];
            _.forEach(this.permissionData, val => {
                result.push(val);
            });

            return result;
        },
        goBack() {
            //this.$router.go(-1);
            this.activeName = "first";
        },
        changStatus(val) {
            this.getList({
                pagenum: 1,
                pagesize: 10,
                flag: val
            });
        },
        showWidth() {},

        isReapt(val) {
            // _.forEach(this.roleList, item => {

            //     if (val.name == item.name) {
            //         return true;
            //     }

            // });

            // return false;

            let result = false;

            for (var j = 0; j < this.roleList.length; j++) {
                if (val.name == this.roleList[j].name) {
                    result = true;
                }
            }

            return result;
        },
        addRole(val, index) {
            // if (!val.name) {
            //     this.$message({
            //         message: '角色名称不可以为空',
            //         type: 'warning'
            //     });
            //     return;
            // }

            // if (this.isReapt(val)) {
            //     this.$message({
            //         message: '角色名称不可重复',
            //         type: 'warning'
            //     });
            //     return;

            // }

            if (this.currentItem) {
                this.roleList.splice(index, 1, val);
            } else {
                this.roleList.push(val);
            }

            this.checkedIds = [];
            this.getCheckedIds(this.permissionData);

            permission
                .addRole(this.header, {
                    name: val.name,
                    privilege_id: this.checkedIds.toString()
                })
                .then(res => {
                    callback(
                        res.data,
                        () => {
                            this.unCheckedAll(this.permissionData);

                            this.noAddRole();

                            _.forEach(this.roleList, item => {
                                if (val == item.name) {
                                    item.isEdit = true;
                                    //item.width = this.$refs.divEdit[index].clientWidth + "px";
                                }
                            });
                        },
                        this
                    );
                });
        },

        noAddRole() {
            this.isShowAdd = true;
            this.currentItem = "";
            this.roleRaise = "";

            console.log("add");
        },
        cancelEdit(val) {
            this.currentItem = val;
            _.forEach(this.roleList, item => {
                if (val == item.name) {
                    item.isEdit = false;
                }
            });
        },
        delRole(val, index) {
            this.$confirm("您确定要将" + val.name + "删除么？", "", {
                    customClass: "customDeleteFontMore",
                    confirmButtonText: "确定",
                    confirmButtonClass: "delete-clicked1",
                    cancelButtonText: "取消",
                    cancelButtonClass: "el-button--cancel",
                    type: "warning"
                })
                .then(() => {
                    this.roleList.splice(index, 1);

                    if (val.id) {
                        permission
                            .delRole(this.header, {
                                id: val.id
                            })
                            .then(res => {
                                this.resetStatus();
                            });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                    this.isLighten = false;
                });
        },

        getPermission(data) {
            return _.map(this.getSubItem(data, 0), item => {
                item.isActive = false;
                item.type = 1;
                item.checked = false;
                item.sub = _.map(this.getSubItem(data, item.id), val => {
                    val.isActive = false;
                    val.type = 2;
                    val.checked = false;
                    val.sub = _.map(this.getSubItem(data, val.id), last => {
                        last.isActive = false;
                        last.type = 3;
                        last.checked = false;
                        return last;
                    });
                    return val;
                });
                return item;
            });

            //return result
        },

        getSubItem(data, val) {
            let result = [];

            _.forEach(data, item => {
                if (item.pid == val) {
                    result.push(item);
                }
            });

            return result;
        },
        getTextLength() {
            console.log(this.$refs.hideText.getBoundingClientRect().width);

        },
        setInput(val, index) {
            this.editTextWidth += 10;
        },
        initData() {
            common.getRoleList(this.header).then(res => {
                //this.roleList = res.data.data;
                this.roleList = _.map(res.data.data, val => {
                    return {
                        id: val.id,
                        isActive: false,
                        isEdit: false,
                        name: val.name,
                        width: val.width
                    };
                });
            });

            common.getPermissionData(this.header).then(res => {
                this.permissionData = this.getPermission(res.data.data);
            });
        },
        resetStatus() {
            this.roleList = _.map(_.cloneDeep(this.roleList), val => {
                return {
                    id: val.id,
                    isActive: false,
                    isEdit: false,
                    name: val.name,
                    width: val.width
                };
            });

            console.log(_.cloneDeep(this.permissionData));

            this.permissionData = this.resetRoleStatus(
                _.cloneDeep(this.permissionData)
            );
        },
        resetRoleStatus(data) {
            return _.map(data, val => {
                if (data.sub && data.sub.length != 0) {
                    this.resetRoleStatus(data.sub);
                }

                return {
                    checked: false,
                    id: val.id,
                    name: val.name,
                    path: val.path,
                    pid: val.pid,
                    sub: val.sub
                };
            });
        }
    },
    mounted() {
        this.setBreadCrumb(this.$route.path.replace("/", ""));
        this.getList({
            pagenum: 1,
            pagesize: 10
        });

        this.initData();
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
    updated() {
        //this.showWidth();
    },
    beforeDestroy() {},
    destroyed: function () {}
};
</script>

<style lang="scss">
@import "../../../style/mixin";

.audit-management {

    // tabs style
    .el-tabs {
        background-color: #fff;
    }

    .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        margin-right: 20px;
    }

    .el-tabs__item {
        padding: 0 14px !important;
        height: 54px;
        line-height: 54px;
    }

    .el-tabs__active-bar {
        width: 56px !important;
        height: 3px;
    }

    .el-tabs__nav-wrap:after {
        height: 1px !important;
    }

    .el-tabs__nav-scroll {
        padding-left: 30px;
    }

    .el-tabs__item {
        padding: 0 15px;
    }

    .el-tabs__header {
        margin-bottom: 0;
    }

    // buttons and search
    .grid-content {
        position: relative;

        .function-list {
            margin: 19px 30px 15px;
        }

        .single-link {
            vertical-align: -3px;
            margin-right: 16px;
        }

        .el-button,
        .el-button+.el-button {
            margin: 0 6px 0 0;
        }

        .seek-box {
            position: absolute;
            right: 30px;
            top: 0;

            .el-input {
                width: 180px;
            }

            .el-input--suffix {
                width: 110px;
                margin-right: 8px;
            }
        }
    }

    // table img and text style
    .platform-img {
        border-radius: 5px;
        margin-right: 20px;
    }

    .firm-name {
        display: table-cell;
        vertical-align: middle;
        height: 60px;
    }

    // table
    .el-table {

        th:first-child .cell,
        td:first-child .cell {
            padding: 0 0 0 30px;
        }

        // th:nth-child(2),
        // td:nth-child(2) {
        //     text-align: center;
        // }
        .link-jump {
            color: #6cabff;
            padding-right: 21px;

            &:hover {
                text-decoration: underline;
            }
        }

        // edit icon
        .el-icon-revise {
            cursor: pointer;
            margin-left: 20px;
            background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            vertical-align: -4px;

            &:hover {
                background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
    }

    //role module
    .role-func {
        margin: 20px 30px 0 20px;

        .role-name {
            padding: 0 0 20px 10px;
            border-bottom: 1px solid #e1e7f0;

            .el-input {
                margin-left: 10px;
            }

            .el-button,
            .el-input__inner {
                height: 48px !important;
                line-height: 48px !important;
                padding-left: 20px;
            }
        }

        .role-sub-title {
            margin-bottom: 16px;
            @include sc(14px, #515974);
        }

        .add-role-button {
            width: 126px;
            height: 48px;
            margin-right: 10px;
            text-align: center;
            border: 1px dashed #e1e7f0;
            border-radius: 3px;

            .add-iron {
                @include sc(20px, #a5a6bb);
                line-height: 45px;
            }
        }

        .enter-role {
            position: relative;

            &.el-input {
                width: auto;
            }

            .el-input__inner {
                // width: 126px; // padding-right: 46px !important;
                padding-right: 46px !important;
                background-color: #fbfbfd;
            }
        }

        // right and wrong icon
        .icon-wrap {
            position: absolute;
            top: 19px;
            right: 0;

            i {
                cursor: pointer;
            }
        }

        .el-icon-check {
            color: #6cabff;
            font-weight: bold;
            margin-right: 8px;
        }

        .el-icon-close {
            color: #ff6870;
            font-weight: bold;
        }

        .el-icon-tickets {
            &:before {
                content: " ";
            }

            width: 16px;
            height: 17px;
            background: url("../../../style/image/system/edit.svg") 0 0 no-repeat;
        }

        .el-icon-delete {
            @include sc(17px, #a5a6bb);
            vertical-align: top;
            display: none;
        }

        .item-role-button {
            margin: 0 10px 10px 0;
            height: 48px;
            position: relative;

            .el-icon-tickets {
                margin-right: 10px;
                z-index: 20;
                cursor: pointer;
            }

            .el-button {
                margin-right: 0;
                padding: 0 46px 0 20px !important;
            }

            span {
                color: #515974;
            }
        }

        .edit-icons {
            position: absolute;
            top: 16px;
            right: 0;

            .edit-icons-item {
                padding-right: 10px;
            }

            .el-icon-close {
                color: #333;
            }
        }

        .edit-role {
            width: 126px;

            .el-icon-tickets {
                margin: 16px 8px 0 0;
            }

            .el-input__inner {
                padding-right: 46px;
            }
        }

        .focus-btn {
            .el-button {
                border-color: #6cabff;
                padding-right: 73px !important;

                span {
                    color: #6cabff;
                }
            }

            .el-icon-delete {
                display: inline-block;
            }
        }

        // fold iron
        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 34px;
            right: 30px;
            height: 48px;
            width: 48px;
            @include borderRadius(5px);
        }

        .el-collapse-item__arrow {
            float: none;
            position: absolute;
            top: 36px;
            right: 40px;
            z-index: 20;
            color: #ffffff;
        }

        .el-collapse-item__arrow.is-active {
            transform: rotate(90deg);
        }

        .el-checkbox__input {
            margin-top: 2px;
        }

        .el-checkbox__label,
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
        }

        // collapse style
        .el-collapse {
            border: 0 none;
            padding-right: 60px;
        }

        .el-collapse-item__wrap {
            border-bottom: none;
        }

        .el-collapse-item__header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            border-bottom: 0 none;

            .hd {
                line-height: 50px;
            }
        }

        .el-collapse-item__header.is-active {
            height: 100%;
            -webkit-transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
                0.3s padding-bottom ease-in-out;
            transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out,
                0.3s padding-bottom ease-in-out;
        }

        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }

    // role permission
    .role-permi {
        padding: 17px 0 10px 10px;

        .el-button {
            float: left;
            margin-bottom: 10px;
        }

        .el-button--info {
            background-color: #f5f6f9;
            border-color: #f5f6f9;
            width: 88px;
            padding: 0 !important;

            span {
                color: #515974;
            }
        }

        .is-plain {
            padding: 0 20px !important;
            border-color: #e1e7f0;

            span {
                color: #515974;
            }
        }

        .selected-style {
            border-color: #6cabff;

            span {
                color: #6cabff;
            }
        }

        .unselected-style {
            // background-color: #f5f6f9;
            border-color: #e1e7f0;
        }
    }

    .is-confirm {
        border-top: 2px solid #e1e7f0;
        padding-left: 30px;
    }

    .not-see-width {
        padding: 0 56px 0 20px;
        font-size: 12px;
        font-family: "Microsoft Yahei";
        display: inline-block;
    }

    // second confirm pop layer
    .el-message-box__wrapper {

        .customOpenFontMore,
        .customCloseFontMore,
        .customDeleteFontMore {
            .el-icon-close {
                background: url("../../../style/image/common/close-icon.svg") 0 0 no-repeat;
            }

            .el-icon-warning {
                background: url("../../../style/image/common/question_blue.svg") 0 0 no-repeat;
            }
        }

        .customCloseFontMore {
            .el-icon-warning {
                background: url("../../../style/image/common/question_grey.svg") 0 0 no-repeat;
            }
        }

        .customDeleteFontMore {
            .el-icon-warning {
                background: url("../../../style/image/common/question_red.svg") 0 0 no-repeat;
            }
        }
    }
}
</style>
