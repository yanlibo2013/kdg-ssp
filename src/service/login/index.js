import { getAxios as axios } from "../../common/axios";

// export const login = (data) => axios({
//     method: 'post',
//     // url: 'http://140.143.139.39:8088/login',//
//     url: '/login',
//     data: data
// });

export const login = (header, data) =>
  axios(header)({
    method: "post",
    url: "/login",
    // url:"/loginByParam?email=admin@kdg.com&",
    data: data
  });
