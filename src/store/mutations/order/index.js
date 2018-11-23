import {
    order
} from "../../mutation-types/index"

export default {
        [order.GET_EDIT_ORDER_ITEM](state, data) {
            state.editOrderItem = data;
        }
}
