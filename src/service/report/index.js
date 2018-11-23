import { getAxios as axios } from "../../common/axios";

//竞价消耗报表
export const reportList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/consumption/queryAll",
    data: data
  });

//竞价消耗报表-导出
export const exportReport = (header, data) =>
  axios(header)({
    method: "post",
    url: "/consumption/getExcel",
    data: data
  });
