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
        <div v-for="resort in resorts" :key="resort.id" class="col-12">
          <FavoriteResortCard :resort="resort" />
        </div>
      </section>
    </div>
  </section>
  
</template>

<script>
import { computed, onMounted, watch, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from "vue-router";
import { accountService } from "../services/AccountService.js";
import FavoriteResortCard from "../components/FavoriteResortCard.vue";
import { resortsService } from "../services/ResortsService.js";
export default {
    setup() {
        const route = useRoute();
        function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        async function getProfile() {
            await accountService.getProfile(route.params.accountId);
        }
        async function getFavoriteResorts(){
          await resortsService.getFavoriteResorts(AppState.activeProfile.favorites)
        }
        watchEffect(()=>{
          if(AppState.account.id){
            getFavoriteResorts()
          }
        })
        onMounted(() => {
            backgroundImage('src/assets/img/hero.jpg');
            getProfile();
        });
        return {
            account: computed(() => AppState.activeProfile),
            resorts: computed(() => AppState.activeFavoritesResorts)
        };
    },
    components: { FavoriteResortCard }
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
