import { getAxios as axios } from "../../common/axios";

//需求方列表
export const getHomeData = (header, data) =>
  axios(header)({
    method: "post",
    url: "/consumequery/queryAll",
    data: data
  });
