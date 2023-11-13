<template>
  <section class="row filter-background rounded text-center ">
  <div class="col-4 py-1 ">
    <router-link :to="{name:'Reviews'}">
      <p class="fs-1 mb-0 text-dark">reviews</p>
    </router-link>
        </div>
        <div class="col-4 py-1 ">
          <router-link :to="{name:'Events'}">
            <p class="fs-1 mb-0 text-dark">events</p>
          </router-link>
        </div>
        <div class="col-4 py-1  rounded-end border-bottom border-primary border-2">
          <p class="fs-1 mb-0">mountain chat</p>
        </div>
      </section>
        <div class="col-12">
          <h1>MOUNTAIN CHAT</h1>
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