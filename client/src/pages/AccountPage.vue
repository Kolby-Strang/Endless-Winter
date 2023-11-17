<template>
  <section class="row">
    <div class="col-9 p-5 margin">
      <section class="row">
        <div class="about col-12 bg-blur rounded">
          <section class="row">
            <div class="col-5 p-3">
              <img class="rounded img-fluid" :src="account.picture" alt="" />
            </div>
            <div class="col-6 p-3 d-flex flex-column justify-content-between">
              <div>
                <input v-model="editable.name" :disabled="!isEditActive" type="text" class="form-control text-center fs-1 input" id="exampleFormControlInput1" placeholder="you need a name" required minlength="2" maxlength="50">
                <textarea v-model="editable.bio" :disabled="!isEditActive" class="form-control text-center input" id="exampleFormControlInput1" placeholder="enter bio here" maxlength="500"></textarea>
              </div>
              <div>
                <div v-if="!isEditActive">
                  <i v-if="ski" class="mdi mdi-ski fs-icon color-0"></i>
                  <i v-if="snow" class="mdi mdi-snowboard fs-icon color-1"></i>
                </div>
                <div v-else>
                  <i role="button" @click="toggleSport('ski')" v-if="ski" class="mdi mdi-ski fs-icon color-0"></i>
                  <i role="button" @click="toggleSport('ski')" v-else class="mdi mdi-ski fs-icon color-0" style="color: #BDCFF393;"></i>
                  <i role="button" @click="toggleSport('sno')" v-if="snow" class="mdi mdi-snowboard fs-icon color-1"></i>
                  <i role="button" @click="toggleSport('sno')" v-else class="mdi mdi-snowboard fs-icon color-1" style="color: #7099eb93;"></i>
                </div>
              </div>
            </div>
            <div v-if="AppState.user.id == AppState.activeProfile.id" class="col-1 text-end">
              <i @click="editAccount()" role="button" class="mdi mdi-pen fs-1"></i>
            </div>
          </section>
        </div>
        <!-- <div v-for class="col-6 text-light">
          <PostCards />
        </div> -->
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
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from "vue-router";
import { accountService } from "../services/AccountService.js";
import FavoriteResortCard from "../components/FavoriteResortCard.vue";
// import { logger } from "../utils/Logger.js";
export default {
    setup() {
        const editable = ref({})
        const route = useRoute();
        function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        async function getProfile() {
            await accountService.getProfile(route.params.accountId);
            editable.value = AppState.activeProfile
        }
        async function editAccount(){
          AppState.isEditActive = !AppState.isEditActive
          if(!AppState.isEditActive){
            editable.value.skier = AppState.activeProfileSki
            editable.value.snowboarder = AppState.activeProfileSno
            await accountService.updateAccount(editable.value)
          }
          // logger.log(AppState.isEditActive)
        }
        function toggleSport(sport){
          if(sport == 'ski'){
            AppState.activeProfileSki = !AppState.activeProfileSki
            // logger.log('ski:'+AppState.activeProfileSki)
          }
          if(sport == 'sno'){
            AppState.activeProfileSno = !AppState.activeProfileSno
            // logger.log('sno:'+AppState.activeProfileSno)
          }
          
        }
        onMounted(() => {
          AppState.activeFavoritesResorts = []
          AppState.activeProfile = {}
          backgroundImage('src/assets/img/AccountBg.jpg');
          getProfile();
        });
        return {
            account: computed(() => AppState.activeProfile),
            ski: computed(() => AppState.activeProfileSki),
            snow: computed(() => AppState.activeProfileSno),
            resorts: computed(() => AppState.activeFavoritesResorts),
            isEditActive: computed(() => AppState.isEditActive),
            editable,
            editAccount,
            toggleSport
        };
    },
    components: { FavoriteResortCard }
}
</script>

<style scoped>
.input{
  color: white !important;
  background: none !important; 
  border: none !important;
  box-shadow: none !important;
}
.input:last-child{
  height: 30vh;
}

.input::placeholder{
  color: white;
}
.red::placeholder{
  text-shadow: 0 0 5px red;
}

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
