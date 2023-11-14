<template>
    <section class="row">
        <div class="col-8">
        </div>
        <div class="col-4">
            <div v-for="comment in comments" :key="comment" class="bg-blur">
                <p>
                    {{ comment.body }}
                </p>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'

export default {
    setup() {
        function backgroundImage(imgUrl) {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${imgUrl}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }

        const route = useRoute();
        onMounted(() => {
            getCommentsByPostsId()
            backgroundImage('src/assets/img/hero.jpg')

        })
        async function getCommentsByPostsId() {
            try {
                const postId = route.params.postId
                await postsService.getCommentsByPostsId(postId)

            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            comments: computed(() => AppState.comments)
        }
    }
};
</script>


<style lang="scss" scoped></style>