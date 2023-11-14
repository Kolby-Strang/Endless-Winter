<template>
    <div class="row page-padding">
        <div class="col-7">
            <div class="row">
                <div class="col-12 pb-3">
                    <div class="row bg-blur">
                        <div class="col-7">
                            <h1 class="fw-normal mb-0">{{resort.resortName}}</h1>
                            <p class="fs-4 fw-light text-primary">{{`${resort.state}, ${resort.country}`}}</p>
                            <p class="fs-3 fw-light m-0">{{resort.resortType?.split('_').join(' ')}}</p>
                        </div>
                        <div class="col-5 d-flex justify-content-end align-items-center">
                            <i class="mdi mdi-check-bold open_close-icon text-success"></i>
                        </div>
                    </div>
                </div>

                <div class="col-4">
                    <div class="bg-blur h-100">Trail Img</div>
                </div>

                <div class="col-8">
                    <div class="row">
                        <div class="col-6">
                            <div class="bg-blur h-100">Trail Percent Bars</div>
                        </div>
                        <div class="col-6">
                            <div class="bg-blur h-100">
                                <p class="m-0 d-flex justify-content-around">
                                    <i class="mdi mdi-white-balance-sunny text-warning fs-1"></i>
                                    <i v-if="resort.nightSkiing" class="mdi mdi-moon-waning-crescent moon-color fs-1"></i>
                                </p>
                                <p class="m-0 text-center"><i class="mdi mdi-snowboard fs-1 text-primary"></i></p>
                            </div>
                        </div>
                        <div class="col-12 pt-3">
                            <div class="bg-blur">Snow Conditions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5">
            <div class="bg-blur h-100">
                {{ resort }}
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import {resortsService} from '../services/ResortsService'
import { Resort } from '../models/Resort';
export default {
    setup(){
        // VARIABLES
        const route = useRoute()
        let resort = ref({})
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
        }

        // LIFECYCLE
        onMounted(()=>{
            backgroundImage('src/assets/img/hero.jpg')
            getResortById(route.params.resortId)
        })
    return { resort }
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

.open_close-icon{
    font-size: 65pt;
}
.moon-color{
    color: #324279;
}

</style>