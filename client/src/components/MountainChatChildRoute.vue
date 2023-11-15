<template>
  <section class="row filter-background rounded text-center ">
  <div class="col-4 py-1 ">
    <router-link :to="{name:'Reviews'}">
      <p class="fs-1 mb-0 text-dark">reviews</p>
    </router-link>
        </div>
        <div class="col-4 py-1 ">
          <router-link :to="{name:'Events'}">
            <p class="fs-1 mb-0 text-dark">events</p>
          </router-link>
        </div>
        <div class="col-4 py-1  rounded-end border-bottom border-primary border-5">
          <p class="fs-1 mb-0">community chat</p>
        </div>
      </section>
        <div class="col-12">
          <section  class="row justify-content-around mt-3">
            <div class="col-5 mb-4 rounded " v-for="post in posts" :key="post.id"  :style="{backgroundImage: `url('${post.imgUrl}')`, backgroundPosition: 'center', backgroundSize: 'cover'}" >
             <section class="row  linear-bg px-2">
              <div class="col-12 text-light mt-3">
                <p v-if="post.imgUrl == undefined" class="mb-0 fs-5">{{ post.body }}</p>
              </div>
              <div class="col-1 align-self-end mb-2">
                <img class="pfp-img rounded-circle" :src="post.account.picture" :alt="post.account.name">
              </div>
              <div class="col-11 text-light align-self-end">
                <p class="fs-4">{{ post.title }}</p>
              </div>
             </section>
            </div>
          </section>
        </div>
          
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { resortsService } from "../services/ResortsService";
export default {
  setup(){
    const route = useRoute()
    onMounted(() => {
      
      getPostsByResortId()
    })
    async function getPostsByResortId() {
      try {
        const resortId = route.params.resortId
        await resortsService.getPostsByResortId(resortId)
      } catch (error) {
        Pop.error(error)
      }
    }
  return { 
    posts: computed(() => AppState.resortPosts)
    }
  }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
  backdrop-filter: blur(4px);
}

.pfp-img {
  height: 3rem;
}

.linear-bg {
  height: 10dvh;
  background-color: #fff;
  background: rgb(0,0,0);
  background: linear-gradient(to bottom,rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 89%, rgba(0,0,0,1) 99%);
}

</style>