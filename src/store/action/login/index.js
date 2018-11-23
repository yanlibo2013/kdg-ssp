import {
    login
} from "../../mutation-types/index"



//登录接口
export const doLogin = ({
    commit
}, data) => {

    commit(login.LOGIN, data)
}




export const getWindowHeight = ({
    commit
}, data) => {

    commit(login.SET_WINDOW_HEIGHT, data)
}


//登录接口
export const getSideBar = ({
    commit
}, data) => {

    commit(login.GET_SIDEBAR_DATA, data)
}


// get publick key 
export const getPublickKeyAciton = ({
    commit
}, data) => {

    commit(login.SET_PUBLICK_KEY, data)
}


// get publick key 
export const setHeader = ({
    commit
}, data) => {

    commit(login.SET_HEADER, data)
}