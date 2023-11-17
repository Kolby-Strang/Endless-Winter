<template>
    <div v-if="resort.id" class="row page-padding px-1 px-sm-3 px-md-5">
        <div :class="[(resort.lat ? 'col-lg-7' : ''), 'col-12 pb-3 pb-lg-0']">
            <div class="row gy-3">
                <div class="col-12">
                    <div class="row bg-blur">
                        <div class="col-9">
                            <h1 class="fw-normal mb-0">{{resort.resortName}}</h1>

                            <p 
                                title="Click to Copy Full Address" 
                                role="button" 
                                class="fs-4 fw-light text-primary"
                                @click="copyText()"
                                >
                                {{`${resort.state}, ${resort.country}`}}<i class="mdi mdi-clipboard-outline"></i>
                            </p>

                            <p class="fs-3 fw-light m-0">{{resort.resortType?.split('_').join(' ')}}</p>
                        </div>
                        <div class="col-3 d-flex justify-content-end align-items-center">
                            <i v-if="resort.resortStatus == 1" class="mdi mdi-check-bold open-icon"></i>
                            <i v-else-if="resort.resortStatus == 2 || resort.resortStatus == 5 || resort.resortStatus == 6" :title="resort.operatingStatus" class="mdi mdi-clock-outline time-icon"></i>
                            <i v-else-if="resort.resortStatus == 7" class="mdi mdi-plus-thick closed-icon"></i>
                            <i v-else-if="resort.resortStatus == 8" class="mdi mdi-white-balance-sunny summer-icon"></i>
                            <i v-else class="mdi mdi-alert-outline warning-icon" :title="resort.operatingStatus"></i>
                        </div>
                    </div>
                </div>

                <div v-if="resort.trailImg" class="col-4 ps-0">
                    <div class="bg-blur h-100 p-2">
                        <div class="position-relative h-100 w-100">

                            <img class="trail-image" :src="resort.trailImg" alt="Trail Map">
                            
                            <button class="btn expand-button" type="button" data-bs-toggle="modal" data-bs-target="#trailImageModal">
                                <i class="mdi mdi-arrow-expand-all fs-1"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div :class="{'col-12': !resort.trailImg, 'col-8': resort.trailImg, 'pe-0': true}">
                    <div class="row gy-3">
                        <div :class="[resort.lat ? 'col-6' : 'col-3', 'ps-0']">
                            <div class="bg-blur h-100">
                                <PercentageBar :resort="resort" :trailsBar="true" />
                            </div>
                        </div>
                        <div :class="[resort.lat ? 'col-6' : 'col-3', 'ps-0']">
                            <div class="bg-blur h-100" :title="[resort.nightSkiing ? 'Night Skiing Available': 'Day Skiing Only']">
                                <p class="m-0 d-flex justify-content-around">
                                    <i class="mdi mdi-white-balance-sunny text-warning fs-1"></i>
                                    <i v-if="resort.nightSkiing" class="mdi mdi-moon-waning-crescent moon-color fs-1"></i>
                                </p>
                                <p class="m-0 text-center"><i class="mdi mdi-snowboard fs-1 text-primary"></i></p>
                            </div>
                        </div>
                        <div :class="[resort.lat ? 'col-12' : 'col-6', 'ps-0']">
                            <div class="bg-blur pe-0">

                                <div class="d-flex">
                                    <div class="snowflake">
                                        <i class="mdi mdi-snowflake"></i>
                                    </div>
                                    <div>
                                        <div v-if="resort.snowComments || resort.primarySurfaceCondition" class="fw-bold fs-3 d-flex flex-column justify-content-around h-100">
                                            <p class="mb-0">{{ resort.snowComments }}</p>
                                            <p class="mb-0">{{ resort.primarySurfaceCondition }}</p>
                                        </div>
                                        <div v-else class="fw-bold fs-4 text-secondary d-flex flex-column justify-content-around h-100">
                                            <p class="mb-0">No Snow Data</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentWeather.icon" class="col-12 col-lg-5 p-0 ps-lg-3">
            <div class="bg-blur h-100 container-fluid d-flex flex-column justify-content-between">
                <div class="row">
                    <div class="col-12 text-center">
                        <img class="weather-icon" :src="`src/assets/img/AerisIcons/${currentWeather.icon}`" :alt="currentWeather.weather" :title="currentWeather.weather">
                        <p class="fs-1 m-0">{{currentWeather.tempF.toFixed(0)}}°F</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 d-flex flex-column justify-content-center align-items-center">
                        <i class="mdi mdi-weather-dust wind-icon"></i>
                        <p class="fs-2">{{ currentWeather.windSpeedMPH.toFixed(0) }}<span class="fs-5 text-light">m/h</span></p>
                    </div>
                    <div v-if="weatherForecast[0]" class="col-6 d-flex flex-column justify-content-center align-items-center fs-2">
                        <p><i class="mdi mdi-arrow-up"></i> {{ weatherForecast[0].maxTempF }}°F</p>
                        <p class="m-0"><i class="mdi mdi-arrow-down"></i> {{ weatherForecast[0].minTempF }}°F</p>
                    </div>
                </div>
                <div class="row">
                    <div v-for="forecast in weatherForecast.filter(forecast => forecast.date.toLocaleDateString() != currentWeather.date.toLocaleDateString())" :key="forecast.date" class="col forecast-item">
                        <div class="text-center ">
                            <p class="fs-5 fs-md-4 m-0">{{ getDayAbbreviation(forecast.date.getDay()) }}</p>
                            <img class="img-fluid" :src="`src/assets/img/AerisIcons/${forecast.icon}`" :alt="forecast.weather">
                            <p class="m-0">{{ forecast.maxTempF }}°F</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="trailImageModal" tabindex="-1" aria-labelledby="trailImageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content bg-blur">
                <div class="modal-header">
                    <h5 class="modal-title" id="trailImageModalLabel">Trail Map For {{ resort.resortName }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- TODO MAKE SURE WHEN EXPANDED VIEW OPENS THE USER CAN SEE ALL THE TRAIL MAPS IF THERE ARE MULTIPLE -->
                    <img class="img-fluid" :src="resort.trailImg" alt="Trail Map Modal">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import {resortsService} from '../services/ResortsService'
import {weatherService} from '../services/WeatherService'
import { Resort } from '../models/Resort';
import Pop from '../utils/Pop';
export default {
    setup(){
        // VARIABLES
        const route = useRoute()
        const resort = ref({})
        const currentWeather = ref({})
        const weatherForecast = ref([])
        // FUNCTIONS
        function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
        async function getResortById(resortId){
            const retrievedResort = await resortsService.getResortById(resortId)
            resort.value = new Resort(retrievedResort)
            if(resort.value.lat && resort.value.lon){
                currentWeather.value = await weatherService.getCurrentWeatherByGeoLocation(resort.value.lat, resort.value.lon)
                weatherForecast.value = await weatherService.getForecastByGeoLocation(resort.value.lat, resort.value.lon)
            }
        }
        function copyText(){
            const text = resort.value.address
            navigator.clipboard.writeText(text)
            Pop.success('Address Copied!')
        }
        function getDayAbbreviation(dayNum){
            const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            return dayAbbreviations[dayNum]
        }

        // LIFECYCLE
        onMounted(()=>{
            backgroundImage('src/assets/img/hero.jpg')
            getResortById(route.params.resortId)
        })
    return { 
        resort,
        currentWeather,
        weatherForecast,
        copyText,
        getDayAbbreviation
     }
    }
};
</script>


<style lang="scss" scoped>
.page-padding{
    padding: 3em;
    padding-top: 6em;
}

.bg-blur{
    padding: 1em;
}

.open-icon{
    font-size: 65pt;
    color: rgb(0, 233, 0);
}
.closed-icon{
    font-size: 65pt;
    color: red;
    transform: rotate(45deg);
}
.summer-icon{
    font-size: 65pt;
    color: rgb(247, 214, 0);
}
.time-icon{
    font-size: 65pt;
    color: orange;
}
.warning-icon{
    font-size: 65pt;
    color: orangered;
}
.moon-color{
    color: #324279;
}
.trail-image{
    height: 100%;
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    object-position: center;
}
.expand-button{
    position: absolute;
    right: 0;
    bottom: 0;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 20px black;
}
.snowflake{
    font-size: 70pt;
    padding-right: .5rem;
    margin-right: 1rem;
    border-right: solid #ffffff 3px;
}
.weather-icon{
    width: 20%;
}
.wind-icon{
    font-size: 60pt;
    display: block;
    height: 95px;
}
.forecast-item{
    overflow-x: hidden;
    border-right: solid rgb(102, 102, 102) 2px;
}
.forecast-item:last-child{
    border-right: none;
}

</style>