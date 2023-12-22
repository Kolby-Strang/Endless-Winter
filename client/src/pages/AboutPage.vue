<template>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <h1>about the dev team</h1>
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" :src="kolbyImage" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" :src="liamImage" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" :src="blazeImage" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" :src="marcImage" alt="dev Image">
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import { AppState } from '../AppState'
import kolbyImage from '/src/assets/img/Kolby.png'
import liamImage from '/src/assets/img/Liam.png'
import blazeImage from '/src/assets/img/Blaze.png'
import marcImage from '/src/assets/img/Marc.png'

export default {
  setup() {
    function backgroundImage() {
      const body = document.getElementById('body');
      body.style.backgroundImage = `url('${AppState.bgImages.hero}')`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundPosition = 'center';
    }
    onMounted(() => {
      backgroundImage()
    })
    return {
      kolbyImage,
      liamImage,
      blazeImage,
      marcImage
    }
  }
}
</script>

<style>
.img-dev {
  width: 5rem;
  aspect-ratio: 1/1;
}

.margin {
  margin-top: 5rem;
}
</style>
