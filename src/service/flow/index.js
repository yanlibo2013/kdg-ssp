import { getAxios as axios } from "../../common/axios";

// 验证消息
export const getVerificationMessage = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/toAdd",
    data: data
  });

// //到需求方编辑页面
export const getFlowItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/toMod",
    data: data
  });

//需求方列表
export const getFlowList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/queryAll",
    data: data
  });

//编辑
export const editFlow = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/mod",
    data: data
  });

//需求方-创建
export const addFlow = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/add",
    data: data
  });

//删除
export const delFlow = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/del",
    data: data
  });

//开启 关闭
export const modifyStatus = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandinfo/changeFlag",
    data: data
  });

//获取政策配置项
export const getPolicyItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandpolicy/toAddOrUpdate",
    data: data
  });

//政策编辑
export const editPolicy = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandpolicy/addOrUpdate",
    data: data
  });

//到流量配置页面
export const getSetFlowItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandflow/toAddOrUpdate",
    data: data
  });

//流量配置
export const editSetFlowTtem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/demandflow/addOrUpdate",
    data: data
  });
