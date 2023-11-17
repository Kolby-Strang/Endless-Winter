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
            <p class="fs-1 mb-0 text-dark">community chat</p>
          </router-link>
        </div>
      </section>
      <section v-for="review in reviews" :key="review.id" class="row justify-content-center mt-5">
        <div  class="col-10 bg-blur rounded  ">
          <section class="row text-light p-2 mt-1 ">
            <div class="col-1">
              <img :title="review.account.name" class="rounded-circle img-pfp" :src="review.account.picture" alt="">
            </div>
            <div class="col-8 fs-3">
              <p>{{ review.title }}</p>
            </div>
            <div class="col-3 text-center">
              <div v-for="starCount in review.starCount" :key="starCount.id" class="d-inline fs-2 star-color">
                <i  class="mdi mdi-star "></i>
                
              </div>
            </div>
            <div class="col-12 ">
              <section class="row justify-content-center">
                <div class="col-10">
                  <p class="mx-5 fs-5">{{ review.body }}</p>

                </div>

              </section>
            </div>
          </section>
        </div>

      </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { resortsService } from "../services/ResortsService";
import { logger } from "../utils/Logger";
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
  return { 
    reviews: computed(() => AppState.resortReviews),
    }
  }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
  backdrop-filter: blur(4px);
}

.img-pfp {
  height: 7vh;
}

.star-color {
  color: #BDCFF3;
}
</style>