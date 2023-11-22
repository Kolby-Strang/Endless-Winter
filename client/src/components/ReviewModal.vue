<template>
<div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content main-bg">
      <div class="container-fluid">
        <section class="row justify-content-center mt-3">
          <div class="col-7">
            <h5 class="modal-title text-start text-light" id="exampleModalLabel">Create Review</h5>
          </div>
            <div class="col-5 text-end">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
        </section>
      </div>
      <div class="modal-body container-fluid">
        <form @submit.prevent="createReview()" class="row">
          <div class=" col-6  mb-3 form-floating ">
            <input v-model="editable.title" maxlength="100" required type="text" class="form-control rounded-pill input-bg " id="floatingInput" placeholder="Post Title">
            <label class="ms-3  text-card" for="floatingInput">Review Title</label>
          </div>
          <div class="col-6 form-floating ">
            <select v-model="editable.starCount" class="form-select rounded-pill input-bg " id="floatingSelectGrid" aria-label="Floating label select example">
                <option value= 1>One Star</option>
                <option value= 2>Two Stars</option>
                <option value= 3>Three Stars</option>
                <option value= 4>Four Stars</option>
                <option value= 5>Five Stars</option>
            </select>
            <label class="ms-3" for="floatingSelectGrid">Star Rating</label>
          </div>
          <div class=" col-12 form-floating">
            <textarea v-model="editable.body" class="form-control text-box-radius input-bg" maxlength="5000" required placeholder="Leave a comment here" id="floatingTextarea2" style="height: 14dvh"></textarea>
            <label class="ms-4 text-card" for="floatingTextarea2">Review Body</label>
          </div>
          <div class="col-6 text-star">
            <p class="text-warning mt-1 mb-0 ">
              You only get one review for each resort.
            </p>
          </div>
          <div class="col-6 text-end mt-2">
            <button type="submit" class="btn rounded-pill text-light">Create Post</button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import {reviewsService} from "../services/ReviewsService"
import { Modal } from "bootstrap";
import { useRoute } from "vue-router";
export default {
  setup(){
    const route = useRoute()
    const editable = ref({})
  return {
    editable,
    
    async createReview() {
      try {
        const resortId = route.params.resortId
        editable.value.snoId = resortId
        await reviewsService.createReview(editable.value)
        Modal.getOrCreateInstance('#reviewModal').hide()
      } catch (error) {
        Pop.error(error)
      }
    }
    }
  }
};
</script>


<style lang="scss" scoped>

.btn{
  border-color: black;
  background-color: #27245485;
}
.btn:hover {
  background-color: #27245460;
}

.text-box-radius {
  border-radius: 8% / 30%;
}

.main-bg {
  background-color: #AC72A245;
  backdrop-filter: blur(7px);
}
.text-card{
  color: rgb(255, 255, 255);

}


.input-bg:focus {
  background-color: #27245480;
  color: white;
}
.input-bg{
  background-color: #27245480 ;
  color: white ;
}


.input-bg {
  border-color: black !important;
  background-color: #27245480;
  color: white;
}
</style>