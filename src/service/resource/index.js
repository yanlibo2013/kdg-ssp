import { getAxios as axios } from "../../common/axios";


///资源明细列表
export const detailListRes = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/queryAll",
    // url: "/orderinfo/findAll",
    data: data
  });

///资源明细列表 订单
export const detailList = (header, data) =>
  axios(header)({
    method: "post",
    // url: "/mediaadlist/queryAll",
    url: "/orderinfo/findAll",
    data: data
  });

//媒体列表
export const getMeadiaList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/queryAll",
    data: data
  });

//平台列表
export const getPlatformList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/queryAll",
    data: data
  });

//媒体创建
export const addMeadia = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/add",
    data: data
  });

//媒体编辑
export const modifyMeadia = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/mod",
    data: data
  });

//获取媒体单个记录
export const getMeadiaItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/toMod",
    data: data
  });

//媒体开启 关闭
export const modifyStatusMeadia = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/changeFlag",
    data: data
  });

//媒体删除
export const delMeadia = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediainfo/del",
    data: data
  });

//广告位 关闭
export const modifyStatusAD = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/changeFlag",
    data: data
  });

//广告位 删除
export const delAD = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/del",
    data: data
  });

//广告位 删除
export const addPlantform = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/add",
    data: data
  });

//获取平台列表编辑项
export const getPlatformItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/toMod",
    data: data
  });

//获取平台列表编辑项
export const modifyStatusPlatform = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/changeFlag",
    data: data
  });

//平台-修改
export const editPlatform = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/mod",
    data: data
  });

//平台-删除
export const delPlatform = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantinfo/del",
    data: data
  });

//广告位列表
export const getAdList = (header, data) =>
  axios(header)({
    method: "post",
    // url: "/mediaadlist/queryAll",
    url: "/mediaadlist/findAll",
    data: data
  });

//广告位开启/关闭
export const openAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/changeFlag",
    data: data
  });

//广告位删除
export const delAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/del",
    data: data
  });

//广告位创建
export const addAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/add",
    data: data
  });

//到广告位编辑页面
export const editAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/toMod",
    data: data
  });

//广告位编辑保存
export const editSaveAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/mediaadlist/mod",
    data: data
  });

//平台样式-添加
export const addStyle = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantStyle/add",
    data: data
  });

//平台样式-添加
export const getStyleList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/plantStyle/queryAll",
    data: data
  });

//到PMP编辑页面
export const getItemPmp = (header, data) =>
  axios(header)({
    method: "post",
    url: "/pmpconfig/toMod",
    data: data
  });

//PMP创建
export const addPmp = (header, data) =>
  axios(header)({
    method: "post",
    url: "/pmpconfig/add",
    data: data
  });

//PMP修改
export const editPmp = (header, data) =>
  axios(header)({
    method: "post",
    url: "/pmpconfig/mod",
    data: data
  });

//PMP删除
export const delPmp = (header, data) =>
  axios(header)({
    method: "post",
    url: "/pmpconfig/del",
    data: data
  });

//PMP配置
export const configPmp = (header, data) =>
  axios(header)({
    method: "post",
    url: "/pmpconfig/queryAll",
    data: data
  });
