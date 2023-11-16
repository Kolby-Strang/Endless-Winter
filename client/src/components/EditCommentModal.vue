<template>
    <div class="modal fade" id="editCommentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content main-bg ">
                <div class="container-fluid">
                    <section class="row justify-content-center mt-3">
                        <div class="col-7">
                            <h5 class="modal-title text-start text-light" id="exampleModalLabel">Edit Comment</h5>
                        </div>
                        <div class="col-5 text-end">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </section>
                </div>
                <div class="modal-body container-fluid">
                    <form @submit.prevent="editComment()" class="row">

                        <div class=" col-12 form-floating">
                            <textarea v-model="editable.body" class="form-control text-box-radius input-bg" maxlength="500"
                                placeholder="Leave a comment here" id="floatingTextarea2" style="height: 14dvh"></textarea>
                            <label class="ms-4 text-card" for="floatingTextarea2">Comment Body</label>
                        </div>
                        <div class="col-12 text-end mt-2">
                            <button type="submit" class="btn rounded-pill text-light">Edit Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<script>
import { AppState } from '../AppState';
import { ref } from 'vue';
import Pop from "../utils/Pop";
import { } from "../services/PostsService";
import { commentsService } from '../services/CommentsService.js';
export default {
    props: { comment: { type: Object, required: true } },

    setup() {
        const editable = ref({})

        return {
            editable,


            async editComment() {
                try {
                    await commentsService.editComment(editable.value)
                    Pop.success('Comment has been edited.')


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