<template>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <h1>about the dev team</h1>
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" src="src/assets/img/Kolby.png" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" src="src/assets/img/Liam.png" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" src="src/assets/img/Blaze.png" alt="dev Image">
    </div>
  </section>
  <section class="row about margin justify-content-center">
    <div class="col-4 bg-blur text-center">
      <img class="img-dev" src="src/assets/img/Marc.png" alt="dev Image">
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import{AppState} from '../AppState'

export default {
  setup() {
    function backgroundImage() {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${AppState.bgImages.hero}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        onMounted(()=>{
          backgroundImage()
        })
    return {

    }
  }
}
</script>

<style>
  .img-dev{
    width: 5rem;
    aspect-ratio: 1/1;
  }
  .margin{
    margin-top: 5rem;
  }
</style>
