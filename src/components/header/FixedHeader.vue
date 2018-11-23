<template>
    <div class="fixedheader">
        <div class="logo_box">
            <div class="logo">
            </div>
            <span class="navindent right"></span>
        </div>
        <vHeader></vHeader>
    </div>

</template>

<script>
import vHeader from './head';
export default {
    data: function () {
        return {

        }
    },
    components: {
        vHeader
    },

}
</script>

<style lang="scss">
@import "../../style/mixin";
@import "../../style/common"; // content background color

.fixedheader {
    position: fixed;
    width: 100%;
    height: 72px;
    top: 0;
    z-index: 99;

    .logo_box {
        /* background-color: #2f323a; */
        background-color: #2f323a;
        padding: 14px 0 14px 20px;
        border-bottom: 2px solid #181a1e;
        height: 72px;
        z-index: 999999999;
        width: 220px
    }

    .logo {
        @include svgbg("../../style/image/role/logo.svg");
        width: 100px;
        height: 42px;
        z-index: 999999999;
    }

    .navindent {
        @include svgbg("../../style/image/common/navindent.svg");
        width: 20px;
        height: 18px;
        margin: -29px 25px 0 0;
        cursor: pointer;
        z-index: 999999999;
    }
}
</style>
