<template>
    <el-select v-model="admodel" placeholder="默认客户" @change="adchange(admodel)" filterable>
        <el-option v-for="item in advertiser" :key="item.id" :label="item.com_name" :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from "vuex";
import {
    home
} from "../../service/index";
import store from 'store';
import {
    GetUrlRelativePath
} from "../../common/utils"
import _ from "lodash";
export default {
    computed: {
        ...mapState({
            advertiser: "advertiser"
        })
    },
    data: function () {
        return {
            admodel: "",
            admodelAdName: ""
            // advertiser: []
        }
    },
    methods: {
        ...mapActions(["getCurrnetPlan", "getCurrnetCheckedAd", "getHomeBaseInfo", "publicAdvertiserInfo", "getCurrnetCheckedName"]),
        getHomeBase(val) {
            // debugger
            home.getindexinfo({
                id: val
            }).then(res => {
                if (res.data.code == 0) {
                    this.getHomeBaseInfo(res.data.data);
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        adchange(val) {
            this.getPlanByAdvertiser(val); //获取计划列
            this.getCurrnetCheckedAd(val); // 档期客户ID
            this.$store.state.planid = true;
            this.getHomeBase(val);
            store.remove("currentAdId");
            store.set("currentAdId", val);
            store.remove("currentAdName");
            store.set("currentAdName", this.getAdNameById(val));
            console.log(val);
            console.log(this.getAdNameById(val));
            this.getCurrnetCheckedName(this.getAdNameById(val));

            // home.getindexinfo({
            //     id: val
            // }).then(res => {
            //     if (res.data.code == 0) {
            //         this.getHomeBaseInfo(res.data.data);
            //     }
            //     if (res.data.code == -1) {
            //         this.$router.push({
            //             path: "/login"
            //         });
            //     }
            // });
            let url = GetUrlRelativePath();
            if (url.indexOf("plantable") > 0) {
                this.$router.push({
                    path: "/plantable/" + val
                });
            }
        },
        //获得投放计划
        getPlanByAdvertiser(id) {
            // debugger
            let that = this;
            home.publicCampaignAll({
                id: id
            }).then(res => {
                if (res.data.code == 0) {
                    //that.planOptions = res.data.data;
                    let Data = res.data.data;
                    let result = [];
                    Data.forEach(function (item, index) {
                        result.push({
                            value: item.id,
                            label: item.name
                        })
                    })
                    //that.$store.state.planOptions = result;
                    that.getCurrnetPlan(result);
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        getAdNameById(val) {
            let result = "";
            // console.log(this.advertiser);
            // console.log(this.admodel);
            _.forEach(_.cloneDeep(this.advertiser), p => {
                if (p.id == val) {
                    //console.log(p.id);
                    // result = p.brand;
                    // console.log(result)
                    result = p.com_name;
                }
            });
            return result;
        }
    },
    mounted() {
        home.publicAdvertiserInfo().then(res => {
            if (res.data.code == 0) {
                //this.advertiser = res.data.data;
                // console.log("客户列表");
                // console.log(res.data.data);
                this.publicAdvertiserInfo(res.data.data);
                // this.admodel = this.advertiser[0] && this.advertiser[0].id;
                this.admodel = store.get("currentAdId") ? store.get("currentAdId") : this.advertiser[0] && this.advertiser[0].id;

                this.admodelAdName = store.get("currentAdName") ? store.get("currentAdName") : this.advertiser[0] && this.advertiser[0].com_name;
                // console.log(this.admodel);
                // store.remove("currentAdName");
                // store.set("currentAdName", this.getAdNameById(this.admodel));
                // this.admodelAdName = store.get("currentAdName") ? store.get("currentAdName") : (this.advertiser[0] && this.advertiser[0].brand ? this.advertiser[0].brand : this.advertiser[0].com_name);
                // console.log(store.get("currentAdId"));
                // console.log(store.get("currentAdId")?store.get("currentAdId"):this.admodel);
                this.getCurrnetCheckedAd(this.admodel);
                this.getCurrnetCheckedName(this.admodelAdName);
                //his.value = this.advertiser[0] && this.advertiser[0].id;
                //this.valueAdvertiser = this.advertiser[0] && this.advertiser[0].id;
                // this.getPlanByAdvertiser(this.valueAdvertiser);
                // this.filterData();
                // this.getClickView(this.admodel);
                this.currentAd = {
                    id: this.advertiser[0].id,
                    name: this.advertiser[0].com_name
                    // name: this.advertiser[0] && this.advertiser[0].brand ? this.advertiser[0].brand : this.advertiser[0].com_name
                };
                //this.getCurrnetAd(this.currentAd);
                store.set("currentAd", this.currentAd);

                store.set("currentAdName", this.admodelAdName);
                //  this.getCurrentUser(this.currentAd);
                //  this.getCurrentUser(this.currentAd);
                this.getPlanByAdvertiser(this.admodel);
                this.getHomeBase(this.admodel);
            }
            if (res.data.code == -1) {
                this.$router.push({
                    path: "/login"
                });
            }
        });
    }
}
</script>

<style lang="scss">

</style>
