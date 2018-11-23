import {
    home
} from "../../mutation-types/index"


///获取登录者下的所有的客户
export const publicAdvertiserInfo = ({
    commit
}, data) => {

    commit(home.PULIC_ADVERTSERINFO, data)
}


//获取客户的计划
export const publicCampaignAll = ({
    commit
}, data) => {

    commit(home.PULIC_CAMPAIGNALL, data)
}


//获取客户的总点击次数
export const homeGetclickviewajax = ({
    commit
}, data) => {

    commit(home.HOME_GETCLICKVIEWAJAX, data)
}


//客户的所有的曝光次数
export const publicAccountClickView = ({
    commit
}, data) => {

    commit(home.PUBLIC_ACCOUNTCLICKVIEW, data)
}

//当前用户
export const getCurrentUser = ({
    commit
}, data) => {

    commit(home.GET_CURRNET_USER, data)
}


//侧边栏
export const getSideBar = ({
    commit
}, data) => {

    commit(home.GET_SIDE_BAR, data)
}


//breadcrumb
export const setBreadCrumb = ({
    commit
}, data) => {

    commit(home.SET_BREAD_CRUMB, data)
}


//breadcrumb
export const getCurrnetAd = ({
    commit
}, data) => {

    commit(home.GET_CURRNET_AD, data)
}


//获取投放计划
export const getCurrnetPlan = ({
    commit
}, data) => {

    commit(home.GET_CURRNET_PLAN, data)
}


//获取当前选中客户ID
export const getCurrnetCheckedAd = ({
    commit
}, data) => {

    commit(home.GET_CURRNET_CHECKED_AD, data)
}


//获取当前选中客户NAME
export const getCurrnetCheckedName = ({
    commit
}, data) => {
    commit(home.GET_CURRNET_CHECKED_NAME, data)
}

//获取首页基本信息
export const getHomeBaseInfo = ({
    commit
}, data) => {

    commit(home.SET_HOME_BASE_INFO, data)
}


//设置激活菜单项
export const setDefaultOpends = ({
    commit
}, data) => {

    commit(home.SET_DEFAULT_OPENEDS, data)
}

//点击
export const getAdClick = ({
    commit
}, data) => {

    commit(home.GET_AD_CLICK, data)
}

//曝光
export const getAdView = ({
    commit
}, data) => {

    commit(home.GET_AD_VIEW, data)
}