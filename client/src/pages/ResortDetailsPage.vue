<template>
  <section class="row justify-content-center margin">
    <!-- SECTION resort details card -->
    <div class="col-10">
      <section class="row p-1 background-blur rounded">
        <div class="col-6 text-light">
          <p class="fs-2 mb-0 d-inline">
            {{ resort.resortName }}
          </p> 
          <p class=" ms-2 d-inline">
            Closed/Open
          </p>
          <p class="mb-0">
          {{ resort.state }}
          </p>
        </div>
        <div class="col-6 text-end ">
          <div class="">
            <i class="fs-2 mdi mdi-star"></i>
          </div>
        </div>
        <div class="col-12">
         <img class="resort-img img-fluid rounded" :src="resort.resortImg" alt="">
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
export default {
  setup(){
  return { 
    resort: computed(() => AppState.pinedResort)
   }
  }
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