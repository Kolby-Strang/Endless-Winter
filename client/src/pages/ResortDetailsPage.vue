<template>
  <section class="row justify-content-center margin ">
    <!-- SECTION resort details card -->
    <div class="col-10 background-blur rounded">
      <section class="row p-1 ">
        <div class="col-6 text-light">
          <p class="fs-2 mb-0 d-inline">
            {{ resort.resortName }}
          </p> 
          <p class=" ms-2 d-inline">
            {{ resort.operatingStatus }}
          </p>
          <p class="mb-0">
          {{ `${resort.state}, ${resort.country}` }}
          </p>
        </div>
        <div class="col-6 text-end ">
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
        <div class="col-6">
    
        </div>
        <div class="col-3">
    
        </div>
      </section>
    </div>
    <!-- !SECTION -->
    <div class="col-11">

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
export default {
    setup() {
        const route = useRoute();
        onMounted(() => {
            getResort();
        });
        async function getResort() {
            const resortId = route.params.resortId;
            await resortsService.getResortbyId(resortId);
        }
        return {
            resort: computed(() => AppState.pinedResort)
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