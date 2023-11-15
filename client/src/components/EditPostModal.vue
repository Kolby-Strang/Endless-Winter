<template>
    <div class="modal fade" id="editPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content main-bg ">
                <div class="container-fluid">
                    <section class="row justify-content-center mt-3">
                        <div class="col-7">
                            <h5 class="modal-title text-start text-light" id="exampleModalLabel">Edit Post</h5>
                        </div>
                        <div class="col-5 text-end">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </section>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="editPost()" class="row">
                        <div class=" col-6  mb-3 form-floating ">
                            <input v-model="editable.title" maxlength="100" type="text"
                                class="form-control rounded-pill input-bg " id="floatingInput" placeholder="Post Title">
                            <label class="ms-3  text-card" for="floatingInput">Post Title</label>
                        </div>
                        <div class=" col-6 form-floating">
                            <input v-model="editable.imgUrl" maxlength="500" type="url"
                                class="form-control rounded-pill input-bg" id="floatingPassword" placeholder="">
                            <label class="ms-3 text-card" for="floatingPassword">Image Url</label>
                        </div>
                        <div class=" col-12 form-floating">
                            <textarea v-model="editable.body" class="form-control text-box-radius input-bg" maxlength="500"
                                placeholder="Leave a comment here" id="floatingTextarea2" style="height: 14dvh"></textarea>
                            <label class="ms-4 text-card" for="floatingTextarea2">Post Body</label>
                        </div>
                        <div class="col-12 text-end mt-2">
                            <button type="submit" class="btn rounded-pill text-light">Edit Post</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
    
    
<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref, watchEffect } from 'vue';
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
    setup() {
        const editable = ref({})

        watchEffect(() => editable.value = { ...AppState.activePost })
        return {
            editable,

            async editPost() {
                try {
                    await postsService.editPost(editable.value)

                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
};
</script>
    
    
<style lang="scss" scoped>
.btn {
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

.text-card {
    color: rgb(255, 255, 255);

}


.input-bg:focus {
    background-color: #27245480;
    color: white;
}

.input-bg {
    background-color: #27245480;
    color: white;
}


.input-bg {
    border-color: black;
    background-color: #27245480;
    color: white;
}
</style>