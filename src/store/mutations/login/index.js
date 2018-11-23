import {
    login
} from "../../mutation-types/index"
import _ from "lodash";

export default {
        //登录
        [login.LOGIN](state, data) {
            state.login = data;
        },
        [login.SET_WINDOW_HEIGHT](state, data) {
            state.height = data;
        },
        [login.GET_SIDEBAR_DATA](state, data) {
            state.sidebar = data;
        },
        [login.SET_PUBLICK_KEY](state, data) {
            state.publickKey = data;
        },
        [login.SET_HEADER](state, data) {
            state.header = data;
        },
}
