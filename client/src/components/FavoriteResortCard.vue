<template>
  <div class="component bg-blur">
    <section class=" row mt-5 rounded">
        <div :class="weather.icon ? 'col-8':'col-12'">
          <div class=" p-2 ">
            <h3 class="mb-0">{{ resort.resortName }}</h3>
            <p class="mb-0">{{ resort.operatingStatus }}</p>
            <PercentageBar :resort="resort" />
          </div>
          <p class="mb-0">{{ resort.snowComments }}</p>
          <p class="">{{ resort.primarySurfaceCondition }}</p>
        </div>
      <!-- TODO weather -->
      <div v-if="weather.icon" class="col-4 d-flex flex-column align-items-center justify-content-center py-2">
        <img class="weather-icon" :src="`src/assets/img/AerisIcons/${weather.icon}`" :alt="weather.weather">
        <p class="mb-0 fs-3">{{ weather.tempF.toFixed(0) }}°F</p>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "vue";
import PercentageBar from "./PercentageBar.vue";
import { weatherService } from "../services/WeatherService";
export default {
    props: {
        resort: { type: Object, required: true }
    },
    setup(props) {
      // VARIABLES
      let weather = ref({})
      // FUNCTIONS
      async function getWeatherData(){
        weather.value = await weatherService.getCurrentWeatherByGeoLocation(props.resort.lat, props.resort.lon)
      }
      // LIFECYCLE
      onMounted(()=>{
        if(props.resort.lat){
          getWeatherData()
        }
      })
        return {
          weather,
        };
    },
    components: { PercentageBar }
};
</script>


<style lang="scss" scoped>
.bar{
  height: 20px;
  width: 150px;
}
.weather-icon{
  max-width: 100%;
  max-height: 100%;
  height: 100%;
}
</style>