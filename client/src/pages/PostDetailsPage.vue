<template>
    <section class="row">
        <div class="col-8 p-3">
            <div v-if="post.account" class=" bg-blur p-3 post mt-5">
                <div class="d-flex justify-content-between">
                    <div>
                        <img class="profile-picture rounded-circle" :src="post.account.picture" alt="">
                        {{ post.account.name }}
                    </div>
                    <div v-if="account.id == post.account.id" class="text-end dropstart">
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
        </div>
        <div class="col-4 comments">
            <div class="mt-5 pt-3">
                <div class="bg-blur mb-3 p-2 text-center align-items-center">
                    <div class="d-flex">
                        <img class="profile-picture rounded-circle" :src="account.picture" alt="profile picture">
                        <form class="d-flex align-items-center w-100" @submit.prevent="createComment()">
                            <textarea type="text" class="h-100 ms-2 w-100 bg-blur rounded-3 text-white"
                                placeholder="     Input Comment"></textarea>
                            <button type="submit" class="btn rounded-pill text-light ms-2">Make Comment</button>
                        </form>
                    </div>
                </div>
                <div v-for="comment in comments" :key="comment" class="bg-blur rounded">
                    <div class="d-flex  justify-content-between">
                        <div>
                            <img class="rounded-circle p-3 profile-picture" :src="comment.account.picture"
                                alt="Profile Picture">
                            {{ comment.account.name }}
                        </div>
                        <div v-if="account.id == comment.account.id || account.id == post.account.id" class="text-end p-2">
                            <i class="mdi mdi-dots-horizontal fs-3 " id="dropdownMenuButton1" type="button" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <div class="dropdown">

                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li v-if="account.id == comment.account.id" data-bs-toggle="modal"
                                        data-bs-target="#editCommentModal" @click="setComment(comment.id)"><a
                                            class="dropdown-item">Edit
                                            Comment</a></li>
                                    <li @click="destroyComment(comment.id)"><a class="dropdown-item">Delete Comment</a>
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
        </div>
    </section>
    <EditCommentModal :comment="{ ...comments }" />
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { router } from '../router.js';
import { commentsService } from '../services/CommentsService.js'
import EditCommentModal from '../components/EditCommentModal.vue';

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
            };
            backgroundImage('src/assets/img/hero.jpg');
            getCommentsByPostsId();
            getPostByPostId();
        });
        async function getCommentsByPostsId() {
            try {
                const postId = route.params.postId;
                await postsService.getCommentsByPostsId(postId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getPostByPostId() {
            const postId = route.params.postId;
            await postsService.getPostByPostId(postId);
        }
        return {
            comments: computed(() => AppState.comments),
            post: computed(() => AppState.activePost),
            account: computed(() => AppState.account),

            async destroyPost() {
                try {
                    const confirm = await Pop.confirm('Are you sure you want to delete this post?');
                    if (!confirm) {
                        return;
                    }
                    const postId = route.params.postId;
                    await postsService.destroyPost(postId);
                    router.go(-1);
                    Pop.success('Post deleted');
                }
                catch (error) {
                    Pop.error(error);
                }
            },
            async destroyComment(commentId) {
                try {
                    const confirm = await Pop.confirm('Are you sure you want to delete this comment?');
                    if (!confirm) {
                        return;
                    }
                    await commentsService.destroyComment(commentId);
                    Pop.success('Comment deleted');
                }
                catch (error) {
                    Pop.error(error);
                }
            },

            async createComment() {
                try {
                    const commentData =
                        await commentsService.createComment()
                } catch (error) {
                    Pop.error(error)
                }

            },

            setComment(commentId) {
                commentsService.setComment(commentId)

            }
        };
    },
    components: { EditCommentModal }
};
</script>


<style lang="scss" scoped>
.text-box-radius {
    border-radius: 8% / 30%;
}

.btn {
    border-color: black;
    background-color: #27245485;
}

.btn:hover {
    background-color: #27245460;
}

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
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;

}

.comments::-webkit-scrollbar {
    display: none;
}
</style>