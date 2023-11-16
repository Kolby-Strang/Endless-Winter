<template>
    <section class="row p-5 mt-5">
        <div v-if="post.account" class="col-8 bg-blur p-3 post">
            <div v-if="account.id == post.account.id" class="d-flex justify-content-between">
                <div>
                    <img class="profile-picture rounded-circle" :src="post.account.picture" alt="">
                    {{ post.account.name }}
                </div>
                <div class="text-end dropstart">
                    <i class="mdi mdi-dots-horizontal fs-3" id="dropdownMenuButton1" type="button" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <div class="dropdown">
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editPostModal">Edit
                                    Post</a></li>
                            <li @click="destroyPost()"><a class="dropdown-item">Delete Post</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="post.imgUrl">
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
                <div class="d-flex  justify-content-between">
                    <div>
                        <img class="rounded-circle p-3 profile-picture" :src="comment.account.picture"
                            alt="Profile Picture">
                        {{ comment.account.name }}
                    </div>
                    <div v-if="account.id == comment.account.id" class="text-end">
                        <i class="mdi mdi-dots-horizontal fs-3 " id="dropdownMenuButton1" type="button" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <div class="dropdown">

                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li @click="editComment()"><a class="dropdown-item">Edit Comment</a></li>
                                <li @click="destroyComment()"><a class="dropdown-item">Delete Comment</a>
                                </li>
                            </ul>
                        </div>
                    </div>
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
import { router } from '../router.js';

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
            AppState.activePost = {
                title: 'Loading',
                account: {
                    id: 'lol'
                }
            }
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
            post: computed(() => AppState.activePost),
            account: computed(() => AppState.account),
            async destroyPost() {
                try {
                    const confirm = await Pop.confirm('Are you sure you want to delete this post?')
                    if (!confirm) {
                        return
                    }
                    const postId = route.params.postId
                    await postsService.destroyPost(postId)
                    router.go(-1)
                    Pop.success('Post Deleted')

                } catch (error) {
                    Pop.error(error)

                }
            }
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