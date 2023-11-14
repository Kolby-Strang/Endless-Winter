<template>
    <section class="row p-5 mt-5">
        <div v-if="post.account" class="col-8 bg-blur p-3 post">
            <div>
                <img class="profile-picture rounded-circle" :src="post.account.picture" alt="">
                {{ post.account.name }}
            </div>
            <div>
                <img class="post-picture mt-3" :src="post.imgUrl" alt="Post Picture">
            </div>
            <div>
                <h3>
                    {{ post.title }}
                </h3>
                <p>
                    {{ post.body }}

                </p>
            </div>
        </div>
        <div class="col-4 comments">
            <div v-for="comment in comments" :key="comment" class="bg-blur rounded">
                <div class="d-flex align-items-center">
                    <img class="rounded-circle p-3 profile-picture" :src="comment.account.picture" alt="Profile Picture">
                    <p class="ms-2">
                        {{ comment.account.name }}
                    </p>
                </div>
                <p class="ms-2 p-3 text-center">
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
            backgroundImage('src/assets/img/hero.jpg')
            getCommentsByPostsId()
            getPostByPostId()

        })
        async function getCommentsByPostsId() {
            try {
                const postId = route.params.postId
                await postsService.getCommentsByPostsId(postId)

            } catch (error) {
                Pop.error(error)
            }
        }
        async function getPostByPostId() {

            const postId = route.params.postId
            await postsService.getPostByPostId(postId)
        }

        return {
            comments: computed(() => AppState.comments),
            post: computed(() => AppState.activePost)
        }
    }
};
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 10vh;
    object-fit: cover;
    object-position: center;
}

.post-picture {
    height: 50vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
}

.post {

    height: min-content;
}

.comments {
    height: 80vh;
    overflow-y: scroll;
}
</style>