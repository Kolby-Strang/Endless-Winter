<template>
  <div class="component bg-blur">
    <section class=" row mt-5 rounded">
        <div :class="resort.isWeather ? 'col-8':'col-12'">
      <div class=" p-2 ">
      <h3 class="mb-0">{{ resort.resortName }}</h3>
      <p class="mb-0">{{ resort.operatingStatus }}</p>
      <PercentageBar :resort="resort" />
      
    </div>
    <p class="mb-0">{{ resort.snowComments }}</p>
    <p class="">{{ resort.primarySurfaceCondition }}</p>
  </div>
  <!-- TODO weather -->
  <div class="col-4">
  </div>
  </section>

  </div>
</template>


<script>
import { Resort } from "../models/Resort.js";
import PercentageBar from "./PercentageBar.vue";
export default {
    props: {
        resort: { type: Object, required: true }
    },
    setup() {
        return {};
    },
    components: { PercentageBar }
};
</script>


<style lang="scss" scoped>
.bar{
  height: 20px;
  width: 150px;
}
</style>