import { resource } from "../../mutation-types/index";

//登录接口
export const setCurentTab = ({ commit }, data) => {
  commit(resource.SET_CURRENT_TAB, data);
};
