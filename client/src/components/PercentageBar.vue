<template>
    <span class="d-flex align-items-center" :title="resort.openDownHillLifts+'/'+resort.maxOpenDownHillLifts"><i class="mdi mdi-gondola fs-1 p-1 lift-color"></i> <div class="bar rounded-pill" :style="{background:'linear-gradient(90deg, rgba(39,36,84,1) '+resort.openDownHillLiftsPercentage+'%, rgba(255,255,255,1) '+resort.openDownHillLiftsPercentage+'%)'}"></div></span>
    <span v-if="trailsBar" class="d-flex align-items-center" :title="resort.openDownHillTrails+'/'+resort.maxOpenDownHillTrails">
      <i class="mdi mdi-image-filter-hdr fs-1 p-1 trail-color"></i>
      <div class="bar rounded-pill" :style="{background:'linear-gradient(90deg, rgba(39,36,84,1) '+resort.openDownHillTrailsPercentage+'%, rgba(255,255,255,1) '+resort.openDownHillTrailsPercentage+'%)'}">
      </div>
    </span>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Resort } from "../models/Resort";
export default {
  props: {
    resort: {type: Resort, required: true},
    trailsBar: {type: Boolean }

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


.lift-color{
  color: #BDCFF3;
}

.trail-color{
  color: #F3F4FB
}
</style>