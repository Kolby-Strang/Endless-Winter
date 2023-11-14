<template>
<div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body container-fluid">
        <form class="row">
          <div class=" col-6 form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label class="ms-2" for="floatingInput">Post Title</label>
          </div>
          <div class=" col-6 form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label class="ms-2" for="floatingPassword">Password</label>
          </div>
          <div class=" col-12 form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
            <label class="ms-2" for="floatingTextarea2">Comments</label>
          </div>
          <div class="col-12 text-end mt-2">
            <button type="submit" class="btn btn-outline-dark rounded">Create Post</button>
          </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
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

</style>