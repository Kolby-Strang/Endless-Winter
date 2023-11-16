<template>
<section class="row filter-background rounded text-center background-blur">
  <div class="col-4 py-1">
    <router-link :to="{name:'Reviews'}">
      <p class="fs-1 mb-0 text-dark">reviews</p>
    </router-link>
        </div>
        <div class="col-4 py-1 border-bottom border-primary border-5">
          <p class="fs-1 mb-0 ">events</p>
        </div>
        <div class="col-4 py-1">
          <router-link :to="{name:'Chat'}">
            <p class="fs-1 mb-0 text-dark">community chat</p>
          </router-link>
        </div>
      </section>
      <section class="row justify-content-center mt-5">
        <div class="col-11 mb-3">
          <section class="row img-bg rounded align-content-end" style="background-image: 
          url(https://media.bogusbasin.org/uploads/2023/05/06114223/FirstChairBannerWithRiders2023-ByLukeTokunaga.jpg);">
            <div class="col-12">
              <section class="row justify-content-center">
                <div class="col-11 blur-bg rounded mb-2 text-light " >
                  <div class="p-2">
                    <p class="fs-2">
                      Lorem ipsum dolor sit amet.
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora iure aliquam nisi dicta at magnam dolore ipsum, quia, sit exercitationem voluptates culpa cum dolorum id, odit repellat animi excepturi incidunt obcaecati molestiae necessitatibus consequuntur iste. Ab doloribus excepturi assumenda aliquam totam vitae. Omnis, deserunt aut velit dolorum ad unde earum sunt esse corporis aperiam culpa blanditiis, illo facilis! Repudiandae molestiae commodi, saepe doloremque facilis nesciunt. Placeat ipsum dicta maxime modi aut! Earum sunt aliquid omnis eos soluta rem laborum qui esse pariatur. Rem quos nostrum molestias. Quis, consequuntur illum! Iure.
                    </p>
                  </div>
                  </div>
                </section>
            </div>
          </section>
        </div>
      </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>
.filter-background {
  background-color: #ffffff75;
  backdrop-filter: blur(4px);
}

.img-bg {
  height: 65dvh;
}

.blur-bg  {
  align-content: flex-end;
  background: #27245465;
  backdrop-filter: blur(4px);
}

</style>