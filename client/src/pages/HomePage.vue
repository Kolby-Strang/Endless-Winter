<template>
  <section class="row">
    <div class="col-12 p-5 title-font text-center d-none d-md-block">
      <p v-if="account.id">Welcome, {{ account.name }}</p>
      <p v-else>Welcome, user</p>
    </div>
    <div class="col-12 col-md-8 col-lg-6 col-xxl-4 text-light mt-5 p-3 p-md-5">
      <router-link v-if="resort.id" class="text-light" :to="{name: 'Resort', params: {resortId: resort.id} }">
        <FavoriteResortCard :resort="resort"/>
      </router-link>,
      </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { resortsService} from "../services/ResortsService.js"
import FavoriteResortCard from "../components/FavoriteResortCard.vue";

export default {
    setup() {
        function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        async function getResortBogus() {
            await resortsService.getResortbyId(208001);
        }
        onMounted(() => {
            backgroundImage('src/assets/img/hero.jpg');
            getResortBogus();
        });
        return {
            account: computed(() => AppState.account),
            resort: computed(() => AppState.pinedResort),
        };
    },
    components: { FavoriteResortCard }
}
</script>

<style scoped lang="scss">
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
.title-font{
  color: white;
  font-weight: bold;
  font-size: 55pt;
  text-shadow: -7px 7px 0 rgba(0, 0, 0, 0.31);
}
</style>
