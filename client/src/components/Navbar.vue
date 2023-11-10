<template>
  <nav class="row navbar navbar-expand-lg navbar-dark bg-none px-3 justify-content-end">
    <div class="col-2 d-flex align-items-center ">
      <div class="fs-1 ">
        <i @click="submitSearch()" class="mdi mdi-magnify " title="Submit Search" role="button"></i>
      </div>

      <div>
        <input v-model="editable" type="text" class="form-control rounded-pill searchBar text-light"
          id="formGroupExampleInput" placeholder="Search">

        <div class="position-relative" v-if="editable">
          <div class="position-absolute">
            <div>Results {{ resorts.length }}</div>
            <div v-for="r in resorts" :key="r.id">
              {{ r.resortName }}
            </div>
          </div>
        </div>

      </div>
      <!-- <form class="form-floating searchBar">
        <input type="email" class=" rounded-pill  p-0" id="floatingInputInvalid" placeholder="" >
        <label for="floatingInputInvalid ">search</label>
      </form> -->

    </div>
    <div class="col-8 d-flex justify-content-center">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <h1 class="endless-winter-font">Endless Winter</h1>
        </div>
      </router-link>
    </div>
    <!-- LOGIN COMPONENT HERE -->
    <div class="col-2 d-flex justify-content-end">
      <div>
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { AppState } from '../AppState.js';
export default {
  setup() {
    const router = useRouter()
    const editable = ref('')
    return {
      editable,
      resorts: computed(() => {
        if (!editable.value.length) { return AppState.resorts }

        const reg = new RegExp(editable.value, 'ig')

        return AppState.resorts.filter(r => {
          return reg.test(r.resortName + ' ' + r.state + ' ' + r.region)
        })

      }),
      submitSearch() {
        router.push('Search')
      }

    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.mdi-magnify {
  color: #bdcff3;
  text-shadow: -2px 2px rgba(0, 0, 0, 0.463);
}

.endless-winter-font {
  font-family: 'Kaushan Script', cursive;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.searchBar {
  background-color: rgba(39, 36, 84, 0.15);
  backdrop-filter: blur(20px);
  box-shadow: 0px 2px 0 rgba(0, 0, 0, 0.463);
  border: none !important;

}

.searchBar:focus {
  background-color: rgba(39, 36, 84, 0.15);
  box-shadow: 0px 2px 0 rgba(0, 0, 0, 0.463);
}

.searchBar::placeholder {
  color: white;
}



.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
