<template>
  <section class="row filter-background rounded text-center ">
  <div class="col-4 py-1 rounded-start border-bottom border-primary border-5">
    <p class="fs-1 mb-0 ">reviews</p>
        </div>
        <div class="col-4 py-1 ">
          <router-link :to="{name: 'Events'}">
          <p class="fs-1 mb-0 text-dark">events</p>
          </router-link>
        </div>
        <div class="col-4 py-1">
          <router-link :to="{name:'Chat'}">
            <p class="fs-1 mb-0 text-dark">mountain chat</p>
          </router-link>
        </div>
      </section>
        <div class="col-12">
          <h1>REVIEWS</h1>
        </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { resortsService } from "../services/ResortsService";
export default {
  setup(){
    const route = useRoute()
    onMounted(() => {
      getReviewsByResortId()
    })
    async function getReviewsByResortId() {
      try {
        const resortId = route.params.resortId
        await resortsService.getReviewsByResortId(resortId)
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