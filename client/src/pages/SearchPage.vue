<template>
  <section class="row justify-content-center scrollable">
    <div class="col-12 text-center">
      <p class="fs-super-big mt-5 fw-bold">Search Results</p>
    </div>
    <div v-for="r in resorts" :key="r.id" class="col-10 resort-card rounded mb-2">
      <router-link :to="{name: 'ResortDetails', params: {resortId: r.id} }">
      <section class="row text-light ">
        <div class="col-6 text-start">
          <p class="fs-2">
            {{ r.resortName }}
          </p>
          <p class="fs-4">
            {{ r.state }}, {{ r.country }}
          </p>
        </div>
        <div class="col-6 text-end pt-5">
          <i class="mdi mdi-heart-plus-outline fs-1"></i>
        </div>
      </section>
    </router-link>
    </div>
  </section>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
export default {
  setup() {
    const route = useRoute()
    const editable = ref(`${route.query.search}`)
    function background(imgUrl) {
      const body = document.getElementById('body')
      body.style.background = `url('${imgUrl}')`
      body.style.backgroundSize = 'cover'
      body.style.backgroundPosition = 'top'
    }
    onMounted(() => background('../src/assets/img/searchBg.jpg'))
    return {
      editable,
      resorts: computed(() => {
        if (!route.query.search) { return AppState.resorts }

        const reg = new RegExp(route.query.search, 'ig')

        return AppState.resorts.filter(r => {
          return reg.test(r.resortName + ' ' + r.state + ' ' + r.region + ' ' + r.country + ' ' + r.stateName)
        })
      }),
    }
  }
};
</script>


<style lang="scss" scoped>
.fs-super-big {
  font-size: 5rem;
  text-shadow: -8px -6px rgba(0, 0, 0, 0.15);
  color: #ffffff !important;
}

.resort-card {
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}

.scrollable{
  height: max-content;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.scrollable::-webkit-scrollbar {
  display: none;
}
</style>