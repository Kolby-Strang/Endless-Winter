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
        <div class="col-4 py-1  rounded-end border-bottom border-primary border-5">
          <p class="fs-1 mb-0">community chat</p>
        </div>
      </section>
        <div class="col-12">
          <h1>community chat</h1>
        </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { resortsService } from "../services/ResortsService";
import { logger } from "../utils/Logger";
export default {
  setup(){
    const route = useRoute()
    onMounted(() => {
      getPostsByResortId()
    })
    async function getPostsByResortId() {
      try {
        const resortId = route.params.resortId
        await resortsService.getPostsByResortId(resortId)
      } catch (error) {
        Pop.error(error)
      }
    }
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
  backdrop-filter: blur(4px);
}


</style>