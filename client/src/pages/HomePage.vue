<template>
  <div></div>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    function backgroundImage(imgUrl){
      const body = document.getElementById('body')
      body.style.backgroundImage = `url('${imgUrl}')`
      body.style.backgroundSize = 'cover'
      body.style.backgroundPosition = 'center'
    }
    onMounted(()=>{
      backgroundImage('src/assets/img/hero.jpg')
    })
    return {}
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
