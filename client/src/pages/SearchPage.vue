<template>
  <section class="row justify-content-center">
    <div class="col-12 text-center">
<p class="fs-super-big mt-5 fw-bold">Search Results</p>
    </div>
    <div class="col-10 resort-card rounded">
<section class="row text-light  ">
  <div class="col-6 text-start">
<p class="fs-2">
Resort Name
</p>
<p class="fs-4">
State, Country
</p>
  </div>
  <div class="col-6 text-end pt-5">
<i class="mdi mdi-heart-plus-outline fs-1"></i>
  </div>
</section>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
function background(imgUrl) {
const body = document.getElementById('body')
body.style.background = `url('${imgUrl}')`
body.style.backgroundSize = 'cover'
body.style.backgroundPosition = 'top'
}
onMounted(() => background('../src/assets/img/searchBg.jpg'))
  return {  }
  }
};
</script>


<style lang="scss" scoped>

.fs-super-big{
  font-size: 5rem;
  text-shadow: -8px -6px rgba(0, 0, 0, 0.15);
  color: #ffffff !important;
}

.resort-card{
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}

</style>