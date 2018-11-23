<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    <br>
    
   
<br>

 <ul><li v-for="fruit in cityOptions"  :key="fruit" >{{fruit}}</li></ul>
  </div>

 <!-- <div>
    <div v-for="(item, index) in cityOptions" :key="index">
    <span>{{ doMath(index) }}</span>
</div>
 </div> -->

</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: false,
        cityOptions:[]
      };
    },
    methods: {
      doMath: function (index) {

        console.log( index+1);
      return index+1
    },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
        console.log("================================");
        console.log(this.isIndeterminate);
        console.log(this.checkAll);
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        //console.log(this.checkAll);
        console.log("================================");
        console.log(this.isIndeterminate);
        console.log(this.checkAll);
      }
    }
  };
</script>