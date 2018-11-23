import { getAxios as axios } from "../../common/axios";

//广告主审核查询
export const getAdList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/advertiserinfo/queryAll",
    data: data
  });
//广告主审核
export const reviewAd = (header, data) =>
  axios(header)({
    method: "post",
    url: "/advertiserinfo/adu",
    data: data
  });

//创意查询
export const getCreativeList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/createinfo/queryAll",
    data: data
  });

//创意审核
export const reviewCreative = (header, data) =>
  axios(header)({
    method: "post",
    url: "/createinfo/adu",
    data: data
  });
