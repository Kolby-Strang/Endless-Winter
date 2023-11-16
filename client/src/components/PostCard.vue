<template>
  
  <router-link title="Post Details" :to="{name:'Post', params: {postId: postData.id}}">
    <section class="row rounded img-bg linear-bg" :class="postData.imgUrl ?  '' : 'blur-bg' "
    :style="{backgroundImage: `url('${postData.imgUrl}')`, backgroundPosition: 'center', backgroundSize: 'cover'}">
      <div class="col-12">
        <section class="row rounded px-2 linear-bg">
          <div class="col-12 text-light mt-3">
            <p v-if="postData.imgUrl == undefined" class="mb-0 fs-4 ms-1 text-start">{{ postData.body }}</p>
          </div>
          <div class="col-1 col-md-2  align-self-end mb-2">
            <img :title="postData.account.name" class="pfp-img rounded-circle" :src="postData.account.picture" :alt="postData.account.name">
          </div>
          <div class="col-11 col-md-10 text-light align-self-end">
            <p class="fs-3 ms-2">{{ postData.title }}</p>
          </div>
        </section>
      </div>
    </section>
</router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from "../models/Post";
export default {
  props: {postData: {type: Post, required: true}},
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.pfp-img {
  height: 3rem;
}

.blur-bg {
  backdrop-filter: blur(4px);
}

.linear-bg {
  height: 25dvh;
  background-color: #fff;
  background: rgb(0,0,0);
  background: linear-gradient(to bottom,rgba(39,36,84,0.35) 55%, rgba(39,36,84,0.45) 69%, rgba(0,0,0,0.6) 81%, rgba(0,0,0,1) 96%);
  
}

</style>