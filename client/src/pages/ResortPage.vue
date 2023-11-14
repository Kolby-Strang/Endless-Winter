<template>
  <section class="row justify-content-center margin ">
    <!-- SECTION resort details card -->
    <div class="col-10 background-blur rounded">
      <section class="row p-1 ">
        <div class="col-11 text-light">
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
        <div class="col-1 text-end ">
          <div class="">
            <i class="fs-2 mdi mdi-star"></i>
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
    </div>
    <!-- !SECTION -->
    <div class="col-11 mt-5">
      <router-view></router-view>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { resortsService } from "../services/ResortsService";
import { useRoute } from "vue-router";
import PercentageBar from "../components/PercentageBar.vue";
import { logger } from "../utils/Logger";
export default {
    setup() {
        
        const route = useRoute();
        onMounted(() => {
            getResort();
        });
        async function getResort() {
          try {
            const resortId = route.params.resortId;
            await resortsService.getResortById(resortId);
            
          } catch (error) {
            Pop.error(error)
          }
        }
        return {
            resort: computed(() => AppState.activeResort)
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

.background-blur {
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}



.margin {
  margin-top: 5rem;
}
</style>