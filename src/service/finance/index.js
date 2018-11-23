import { getAxios as axios } from "../../common/axios";

//财务列表
export const finaceList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/financial/queryAll",
    data: data
  });

//财务列表
export const finaceDetail = (header, data) =>
  axios(header)({
    method: "post",
    url: "/financial/findAll",
    data: data
  });

//充值
export const finaceCharge = (header, data) =>
  axios(header)({
    method: "post",
    url: "/financial/add",
    data: data
  });
