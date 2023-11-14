<template>
  <section class="row margin">
    <div class="col-9 p-5">
      <section class="row">
        <div class="about text-center col-12 bg-card rounded">
          <section class="row">
            <div class="col-6 p-3">
              <img class="rounded img-fluid" :src="account.picture" alt="" />
            </div>
            <div class="col-6 p-3 text-light">
              <h1>{{ account.name }}</h1>
            </div>
          </section>
        </div>
        <div class="col-6 text-light">
          flksjd;l
        </div>
      </section>
    </div>
    <div class="col-3 pt-5">
      <section class="row">
        <div v-for="favorite in account.favorites" :key="favorite.id" class="col-12">
          hi
        </div>
      </section>
    </div>
  </section>
  
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
    onMounted(()=>{
      backgroundImage('src/assets/img/hero.jpg');
    })
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.margin{
  margin-top: 3rem;
}

.bg-card{
  background-color: rgba(41, 38, 87, 0.493);
  backdrop-filter: blur(4px);
}
</style>
