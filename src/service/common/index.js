import { getAxios as axios } from "../../common/axios";

///获取行业信息
export const getIndustry = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getIndustry",
    data: data
  });

///获取需求方信息
export const getDemandList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getDemand",
    data: data
  });

///获取媒体广告位
export const getMeadiaAd = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getAdlist",
    data: data
  });

///获取角色列表
export const getRoleList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getRole",
    data: data
  });

//资源媒体
export const meadiaListRes = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getMedia",
    // url: "/common/getAllMedia",
    data: data
  });

//媒体
export const meadiaList = (header, data) =>
  axios(header)({
    method: "post",
    // url: "/common/getMedia",
    url: "/common/getAllMedia",
    data: data
  });

//获取权限信息
export const getPermissionData = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getPrivilege",
    data: data
  });

//获取平台样式
export const getSizeList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getPlantStyle",
    data: data
  });

//获取地域信息
export const getArea = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getCity",
    data: data
  });

//获取平台信息
export const getPlatFormList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getPlant",
    data: data
  });

//审核
export const getCreativeData = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getCreative",
    data: data
  });

//获取竞价消耗报表条件
export const filterReport = (header, data) =>
  axios(header)({
    method: "post",
    url: "/common/getConsumCommon",
    data: data
  });
