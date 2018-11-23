import { getAxios as axios } from "../../common/axios";
//PD订单 List
export const getOrderList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/orderinfo/queryAll",
    data: data
  });

//PD订单dashboard List
export const getReportList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/report/queryAll",
    data: data
  });

//订单报表导出
export const exportFile = (header, data) =>
  axios(header)({
    method: "post",
    url: "/report/getExcel",
    data: data
  });

//订单 添加
export const addOrder = (header, data) =>
  axios(header)({
    method: "post",
    url: "/orderinfo/add",
    data: data
  });

//订单 修改
export const modifyOrder = (header, data) =>
  axios(header)({
    method: "post",
    url: "/orderinfo/mod",
    data: data
  });

//获取订单项
export const getOrderItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/orderinfo/toMod",
    data: data
  });

//开启 关闭
export const modifyStatus = (header, data) =>
  axios(header)({
    method: "post",
    url: "/orderinfo/changeFlag",
    data: data
  });
