import {
    end
} from "../../mutation-types/index"



//二级分类
export const setSecIndustry = ({
    commit
}, data) => {

    commit(end.SET_SECOND_INDUSTRY, data)
}


//其他行业资源
export const getOtherData = ({
    commit
}, data) => {
    commit(end.SET_OTHER_DATA, data)
}
//企业
export const getCompanyData = ({
    commit
}, data) => {

    commit(end.SET_COMPANY_DATA, data)
}

//行业
export const getBusinessData = ({
    commit
}, data) => {

    commit(end.SET_BUSINESS_DATA, data)
}

