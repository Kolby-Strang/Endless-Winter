<template>
  <div class="component">
    <section class=" row mt-5 resort-card rounded">
        <div class="col-8">
      <div class=" p-2 ">
      <h3 class="mb-0">{{ resort.resortName }}</h3>
      <p class="mb-0">{{ resort.operatingStatus }}</p>
      <span class="d-flex align-items-center" :title="resort.openDownHillLifts+'/'+resort.maxOpenDownHillLifts"><i class="mdi mdi-gondola fs-2 p-1"></i> <div class="bar rounded-pill" :style="{background:'linear-gradient(90deg, rgba(39,36,84,1) '+resort.openDownHillLiftsPercentage+'%, rgba(255,255,255,1) '+resort.openDownHillLiftsPercentage+'%)'}"></div></span>
    </div>
    <p class="mb-0">{{ resort.snowComments }}</p>
    <p class="">{{ resort.primarySurfaceCondition }}</p>
  </div>
  <div class="col-4">
  </div>
  </section>

  </div>
</template>


<script>
import { Resort } from "../models/Resort.js";
export default {
  props:{
    resort: {type: Resort, required: true}
  },
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.bar{
  height: 20px;
  width: 150px;
}
.resort-card{
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}
</style>