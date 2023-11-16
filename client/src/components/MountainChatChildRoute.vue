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
          <section class="row justify-content-center mt-3">
            <div class="col-12 col-md-6 col-lg-4 mb-4 rounded px-4 " v-for="post in posts" :key="post.id" >
              <router-link :to="{name:'Post', params: {postId: post.id}}">
                <section class="row rounded img-bg linear-bg"
                :style="{backgroundImage: `url('${post.imgUrl}')`, backgroundPosition: 'center', backgroundSize: 'cover'}">
                <div class="col-12">
                  <section class="row rounded px-2 linear-bg">
                    <div class="col-12 text-light mt-3">
                      <p v-if="post.imgUrl == undefined" class="mb-0 fs-4 ms-1 text-start">{{ post.body }}</p>
                    </div>
                    <div class="col-1 col-md-2  align-self-end mb-2">
                      <img class="pfp-img rounded-circle" :src="post.account.picture" :alt="post.account.name">
                    </div>
                    <div class="col-11 col-md-10 text-light align-self-end">
                      <p class="fs-3 ms-2">{{ post.title }}</p>
                    </div>
                  </section>
                </div>
              </section>
            </router-link>
            </div>
          </section>
          
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
  height: 25dvh;
  background-color: #fff;
  background: rgb(0,0,0);
  background: linear-gradient(to bottom,rgba(39,36,84,0.35) 55%, rgba(39,36,84,0.45) 69%, rgba(0,0,0,0.6) 81%, rgba(0,0,0,1) 96%);
  
}

</style>