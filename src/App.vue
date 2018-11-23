<template>
    <div>

        <!-- <transition name="router-fade" mode="out-in" >		<keep-alive>		<router-view v-if="$route.meta.keepAlive"></router-view>		</keep-alive>		</transition> -->
        <transition name="router-fade" mode="out-in" enter-active-class="animated zoomIn">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
// import {getBrowseHeight } from"./common/utils"

export default {
    components: {},
    mounted() {
    },
    methods: {
        ...mapActions(["getWindowHeight", "setHeader"]),
        dynamicSetHeight() {
            //   this.getWindowHeight(getBrowseHeight().y);
        },
        // --------
        // 进入中
        // --------
        beforeEnter: function (el) {
            // ...
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {
            // ...
            done()
        },
        afterEnter: function (el) {
            // ...
        },
        enterCancelled: function (el) {
            // ...
        },
        // --------
        // 离开时
        // --------
        beforeLeave: function (el) {
            // ...
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        leave: function (el, done) {
            // ...
            done()
        },
        afterLeave: function (el) {
            // ...
        },
        // leaveCancelled 只用于 v-show 中
        leaveCancelled: function (el) {
            // ...
        }
    },
    computed: {
        ...mapState(["height"])
    }
}
</script>

<style lang="scss">
@import "./style/common";
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
</style>
