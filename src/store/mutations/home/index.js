import {
    home
} from "../../mutation-types/index";
import _ from "lodash";

export default {
        //登录
        [home.GET_CURRNET_PLAN](state, data) {
            state.planOptions = data;
        },
        [home.GET_CURRNET_CHECKED_AD](state, data) {
            state.currentCheckedAd = data;
        },
        [home.GET_CURRNET_CHECKED_NAME](state, data) {
            state.currentCheckedName = data;
        },
        [home.SET_HOME_BASE_INFO](state, data) {
            
            state.homeBaseInfo = data;
        },
        [home.SET_DEFAULT_OPENEDS](state, data) {
            
            state.defaultOpeneds = data;
        },
}