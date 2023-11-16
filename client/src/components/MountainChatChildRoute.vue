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
          <section class="row justify-content-center mt-5">
            <div class="col-12 col-md-6 col-lg-4 mb-4 rounded px-4 " v-for="post in posts" :key="post.id" >
              <PostCard :postData="post" />

            </div>
          </section>
          
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { resortsService } from "../services/ResortsService";
import PostCard from "./PostCard.vue";
export default {
    setup() {
        const route = useRoute();
        onMounted(() => {
            getPostsByResortId();
        });
        async function getPostsByResortId() {
            try {
                const resortId = route.params.resortId;
                await resortsService.getPostsByResortId(resortId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            posts: computed(() => AppState.resortPosts)
        };
    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
  backdrop-filter: blur(4px);
}


</style>