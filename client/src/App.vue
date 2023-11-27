<template>
  <header class="container-fluid fixed-top">
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view />
  </main>
  <!-- <footer class="bg-dark text-light">
  </footer> -->
  <ReviewModal />
  <PostModal />
  <EditPostModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import EditPostModal from './components/EditPostModal.vue'
import EditCommentModal from './components/EditCommentModal.vue'
import ReviewModal from '../src/components/ReviewModal.vue'
import PostModal from "./components/PostModal.vue"
export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, EditPostModal, PostModal, ReviewModal, EditCommentModal,  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
