<template>
  <section class="row">
    <div class="col-12 p-5 text-light fw-bold fs-super-big text-center">
      <p v-if="account.id">Welcome, {{ account.name }}</p>
      <p v-else>Welcome, user</p>
    </div>
    <div class="col-4 text-light mt-5 p-5">
      <div class="mt-5 p-2 resort-card rounded">
      <h3>{{ resort.resortName }}</h3>
      <span class="d-flex align-items-center" :title="resort.openDownHillLifts+'/'+resort.maxOpenDownHillLifts"><i class="mdi mdi-gondola fs-2 p-1"></i> <div class="bg-light bar rounded-pill"><p class="mb-0" :style="{width: resort.openDownHillLiftsPercentage+'%'}"></p></div></span>
    </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { resortsService} from "../services/ResortsService.js"

export default {
  setup() {
    function backgroundImage(imgUrl){
      const body = document.getElementById('body')
      body.style.backgroundImage = `url('${imgUrl}')`
      body.style.backgroundSize = 'cover'
      body.style.backgroundPosition = 'center'
    }
    async function getResortBogus(){
      await resortsService.getResortbyId(208001)
    }
    onMounted(()=>{
      backgroundImage('src/assets/img/hero.jpg')
      getResortBogus()
    })
    return {
      account: computed(()=> AppState.account),
      resort: computed(()=> AppState.pinedResort),
    }
  }
}
</script>

<style scoped lang="scss">
.bar{
  height: 20px;
  width: 150px;
}
.resort-card{
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}
.fs-super-big{
  font-size: 5rem;
  text-shadow: -8px -6px rgba(0, 0, 0, 0.15);
  color: #ffffff !important;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
