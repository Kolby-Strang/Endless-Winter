<template>
  <section class="row justify-content-center margin ">
    <!-- SECTION resort details card -->
    <div class="col-10 bg-blur rounded">
      <router-link title="Resort Details" class="text-light" :to="{name: 'ResortDetails', params: {resortId: route.params.resortId}}">
      <section class="row p-1 ">
        <div class="col-10 text-light">
            <p class="fs-1 mb-0 d-inline">
              {{ resort.resortName }}
            </p> 
          <p class=" ms-2 d-inline">
            {{ resort.operatingStatus }}
          </p>
          <p class="mb-0 fs-3">
            {{ `${resort.state}, ${resort.country}` }}
          </p>
        </div>
        <div class="col-2 text-end ">
          <div  class="">
            <span v-for="i in Math.round(averageStarRating)" :key="i">
              <i class="fs-2 mdi mdi-star star-color"></i>
          </span>
        </div>
      </div>
        <div v-if="resort.resortImg" class="col-12">
          <img class="resort-img img-fluid rounded" :src="resort.resortImg" alt="">
        </div>
        <div class="col-3">
          <PercentageBar :resort="resort" :trailsBar="true" />
        </div>
        <div class="col-6 text-start">
          <div>
            <p class="text-light fs-4 mt-3">{{ resort.snowComments }}</p>
          </div>
        </div>
        <div class="col-3">
          
        </div>
      </section>
    </router-link>
    </div>
    <!-- !SECTION -->
    <div class="col-11 mt-5">
      <router-view></router-view>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, watch } from 'vue';
import Pop from "../utils/Pop";
import { resortsService } from "../services/ResortsService";
import { useRoute } from "vue-router";
import PercentageBar from "../components/PercentageBar.vue";
import { logger } from "../utils/Logger";

export default {
    setup() {
        
        const route = useRoute();
        onMounted(() => {
          backgroundImage()
          getResort();
        });
        watch(() => AppState.resortReviews, () => {
          logger.log('Watching resort reviews')
          
        })
        async function getResort() {
          try {
            const resortId = route.params.resortId;
            await resortsService.getResortById(resortId);
            
          } catch (error) {
            Pop.error(error)
          }
        }
        function backgroundImage() {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${AppState.bgImages.hero}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        return {
          route,
            resort: computed(() => AppState.activeResort),
            reviews: computed(() => AppState.resortReviews),
            averageStarRating: computed(() => {
              const reviews = AppState.resortReviews;
              let totalStars = 0;

              for (const review of reviews) {
                totalStars += review.starCount
              }

              const average = reviews.length > 0 ? totalStars / reviews.length : 0;

              return average;
            }),
        };
    },
    components: { PercentageBar }
};
</script>


<style lang="scss" scoped>

.resort-img {
  height: 65vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}


.star-color {
  color: #BDCFF3;
}

.margin {
  margin-top: 5rem;
}
  
</style>
