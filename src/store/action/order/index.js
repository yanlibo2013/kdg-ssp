import {
    order
} from "../../mutation-types/index"


//订单编辑项
export const getCurrentOrderItem = ({
    commit
}, data) => {

    commit(order.GET_EDIT_ORDER_ITEM, data)
}
