<template>
    <div class="row page-padding">
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
        <div v-if="resort.lat" class="col-12 col-lg-5 p-0 ps-lg-3">
            <div class="bg-blur h-100 container-fluid">
                <div class="row">
                    <div class="col-12">
                        <p>⛅</p>
                        <p>70</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>💨</p>
                        <p>23 m/h</p>
                    </div>
                    <div class="col-6">
                        <p>high</p>
                        <p>low</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">S</div>
                    <div class="col">M</div>
                    <div class="col">T</div>
                    <div class="col">W</div>
                    <div class="col">Th</div>
                    <div class="col">F</div>
                    <div class="col">S</div>
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
        const weatherForecast = ref({})
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

        // LIFECYCLE
        onMounted(()=>{
            backgroundImage('src/assets/img/hero.jpg')
            getResortById(route.params.resortId)
        })
    return { 
        resort,
        currentWeather,
        weatherForecast,
        copyText 
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
    padding-right: 1rem;
}
// .snowflake::after{
//     font-size: 0;
//     position: absolute;
//     content: '.';
//     background-color: rgb(76, 76, 76);
//     height: 82%;
//     width: 3px;
// }

</style>