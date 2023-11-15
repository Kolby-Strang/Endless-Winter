<template>
  <section class="row">
    <div class="col-9 p-5 margin">
      <section class="row">
        <div class="about col-12 bg-blur rounded">
          <section class="row">
            <div class="col-6 p-3">
              <img class="rounded img-fluid" :src="account.picture" alt="" />
            </div>
            <div class="col-6 p-3 d-flex flex-column justify-content-between">
              <div>
                <h1 class="text-center">{{ account.name }}</h1>
                <p>{{ account.bio }}</p>
              </div>
              <div>
                <i v-if="account.skier" class="mdi mdi-ski fs-icon color-0"></i>
                <i v-if="account.snowBoarder" class="mdi mdi-snowboard fs-icon color-1"></i>
              </div>
            </div>
          </section>
        </div>
        <div class="col-6 text-light">
          flksjd;l
        </div>
      </section>
    </div>
    <div class="col-3 pt-5 scrollable">
      <section class="row">
        <div v-for="resort in resorts" :key="resort.id" class="col-12">
          <router-link v-if="resort.id" class="text-light" :to="{name: 'Reviews', params: {resortId: resort.id} }">
            <FavoriteResortCard :resort="resort"/>
          </router-link>
        </div>
      </section>
    </div>
  </section>
  
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from "vue-router";
import { accountService } from "../services/AccountService.js";
import FavoriteResortCard from "../components/FavoriteResortCard.vue";
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
        onMounted(() => {
          AppState.activeFavoritesResorts = []
          AppState.activeProfile = {}
          backgroundImage('src/assets/img/Kolby.png');
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

.fs-icon{
  font-size: 4rem;
}

.scrollable{
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.scrollable::-webkit-scrollbar{
  display: none;
}

.color-0{
  color: #BDCFF3;
}
.color-1{
  color: #7099EB;
}
</style>
