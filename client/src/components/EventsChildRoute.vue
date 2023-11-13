<template>
<section class="row filter-background rounded text-center ">
  <div class="col-4 py-1">
    <router-link :to="{name:'Reviews'}">
      <p class="fs-1 mb-0 text-dark">reviews</p>
    </router-link>
        </div>
        <div class="col-4 py-1 border-bottom border-primary border-2">
          <p class="fs-1 mb-0 ">events</p>
        </div>
        <div class="col-4 py-1">
          <router-link :to="{name:'Chat'}">
            <p class="fs-1 mb-0 text-dark">mountain chat</p>
          </router-link>
        </div>
      </section>
        <div class="col-12">
          <h1>EVENTS</h1>
        </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
}
</style>