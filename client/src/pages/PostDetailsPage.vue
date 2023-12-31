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
                <div v-if="account.id" class="bg-blur mb-3 p-3 text-center align-items-center">
                    <div class="d-flex">
                        <img class="comment-picture rounded-circle" :src="account.picture" alt="profile picture">
                        <form class="d-flex align-items-center w-100" @submit.prevent="createComment()">
                            <textarea v-model="editable.body" type="text" name="body"
                                class="h-100 ms-2 w-100 bg-blur rounded-3 text-white"
                                placeholder="Input Comment"></textarea>
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
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { router } from '../router.js';
import { commentsService } from '../services/CommentsService.js'
import EditCommentModal from '../components/EditCommentModal.vue';


export default {
    setup() {
        const editable = ref({})

        function backgroundImage() {
            const body = document.getElementById('body');
            body.style.backgroundImage = `url('${AppState.bgImages.hero}')`;
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
            backgroundImage();
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
            editable,
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
                    const commentData = editable.value
                    commentData.thingId = route.params.postId
                    await commentsService.createComment(commentData)
                    editable.value = {}
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

.comment-picture {
    height: 6.5vh;
    object-fit: cover;
    object-position: center;
}
</style>