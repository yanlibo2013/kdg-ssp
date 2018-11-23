<template>
    <div id="container-wrap" class="container-wrap" ref="containerWrap">
        <!-- 侧边栏-->
        <vSidebar></vSidebar>
        <fixedHeader v-show="isFixedHeader"></fixedHeader>
        <div class="main-container">
            <vHeader v-show="!isFixedHeader"></vHeader>
            <transition name="router-anim" enter-active-class="animated fadeInRight" leave-active-class="">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import vSidebar from '../components/common/Sidebar';
import vHeader from '../components/header/head';
import fixedHeader from '../components/header/FixedHeader';
import {
    getScrollTop
} from "../common/utils";
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data() {
        return {
            value6: "",
            example0: "",
            leftHeightStyles: {},
            winHeight: "",
            isFixedHeader: false
        };
    },
    updated: function () {},
    mounted() {
        window.onscroll = () => {
            if (getScrollTop(document) >= 72) {
                this.isFixedHeader = true;
            } else {
                this.isFixedHeader = false;
            }

            this.bodywidth = window.innerWidth + "px";
        }
    },
    watch: {
        // '$route':'setHeight'
        // '$route' (to, from) {
        //     let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     let containerHeight = this.$refs['container-wrap'].offsetHeight;
        //     alert(3)
        //     console.log(windowHeight, containerHeight);
        //     this.setHeight();
        // }
    },
    components: {
        vSidebar,
        vHeader,
        fixedHeader
    },
    computed: {},
    methods: {
        //  setHeight() {
        //     let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //     let containerHeight = this.$refs['container-wrap'].offsetHeight;
        //     alert(2)
        //     if(containerHeight < windowHeight){
        //         alert(1)
        //         this.winHeight = windowHeight;
        //     }
        // }
    }
};
</script>

        

<style lang="scss">
@import "../style/mixin"; // single-link

.single-link {
    display: inline-block;
    color: #7f8599;
    background-color: #fff;
    width: 165px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #e3e8f1;
    transition: 0.1s;
    border-radius: 4px;
    text-align: center;
}

// .content{
//     overflow-y:scroll;
//     max-height: 90vh
// }

body {
    font-size: 16px
}
</style>
