<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!account.id">
      Login
    </button>
    <div v-else>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" @click="checkRoute()" class="bg-none border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded-circle" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account', params: {accountId: account.id} }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div v-if="postModal" class="list-group-item dropdown-item list-group-item-action" role="button" data-bs-toggle="modal" data-bs-target="#postModal">
              Create Post
            </div>
            <router-link :to="{ name: 'About' }">
            <div class="list-group-item dropdown-item list-group-item-action">
              About us
              </div>
          </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRoute } from "vue-router"
import { ref } from "vue"
import { logger } from "../utils/Logger"
export default {
  setup() {
    const route = useRoute()
    const postModal = ref(false)
    return {
      postModal,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      checkRoute() {
        const routeName = route.name
        if(routeName == 'Reviews' ) {
          postModal.value = true
        } else 
        if(routeName == 'Events' ) {
          postModal.value = true
        } else
        if(routeName == 'Chat' ) {
          postModal.value = true
        } else {
          postModal.value = false
        }
        logger.log(postModal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
