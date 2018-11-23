import { resource } from "../../mutation-types/index";
import _ from "lodash";

export default {
  //登录
  [resource.SET_CURRENT_TAB](state, data) {
    state.currentTab = data;
  }
};
