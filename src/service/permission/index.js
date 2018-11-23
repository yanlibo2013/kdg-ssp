import { getAxios as axios } from "../../common/axios";

//账户分页查询
export const getAccountList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/queryAll",
    data: data
  });

//账号开启关闭
export const accountOpen = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/changeFlag",
    data: data
  });

//账号添加
export const addAccount = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/add",
    data: data
  });

//账号修改
export const modifyAccount = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/mod",
    data: data
  });

//获取账号编辑项
export const getAccounItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/toMod",
    data: data
  });

//角色分页查询
export const getRoleList = (header, data) =>
  axios(header)({
    method: "post",
    url: "/sysrole/queryAll",
    data: data
  });

//角色添加
export const addRole = (header, data) =>
  axios(header)({
    method: "post",
    url: "/sysrole/add",
    data: data
  });

//角色修改
export const modifyRole = (header, data) =>
  axios(header)({
    method: "post",
    url: "/sysrole/mod",
    data: data
  });

//获取角色编辑项
export const getRoleItem = (header, data) =>
  axios(header)({
    method: "post",
    url: "/sysrole/toMod",
    data: data
  });

//账户删除
export const delAccount = (header, data) =>
  axios(header)({
    method: "post",
    url: "/account/del",
    data: data
  });

//角色删除
export const delRole = (header, data) =>
  axios(header)({
    method: "post",
    url: "/sysrole/del",
    data: data
  });
