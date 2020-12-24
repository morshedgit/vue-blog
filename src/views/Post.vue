<template>
    <main-layout
        ><div class="d-flex flex-column w-100">
            <div class="d-flex flex-column w-100 align-items-start">
                <div class="d-flex w-100 justify-content-end mb-5">
                    <router-link
                        v-if="authorized"
                        :to="'/posts/create/' + post._id"
                        class="btn btn-secondary mx-1"
                        >Edit</router-link
                    >
                    <button
                        v-if="authorized"
                        @click="deletePost(post._id)"
                        class="btn btn-danger mx-1"
                    >
                        Delete
                    </button>
                </div>
                <div class="d-flex w-100 justify-content-between mb-5">
                    <h2>{{ post.title }}</h2>
                    <small>{{ post.date | moment("from", "now") }}</small>
                </div>
                <div class="text-left" v-html="post.content"></div>
                <small v-if="post && post.author">{{
                    post.author.name | checkIfExist
                }}</small>
            </div>
            <comment-form :post="post"></comment-form>
            <div v-if="post && post.comments && post.comments.length > 0">
                <comments
                    v-for="comment in post.comments"
                    :key="comment._id"
                    :comment="comment"
                    :haveReplyButton="true"
                ></comments>
            </div>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from "../components/layouts/Main";
import CommentForm from "../components/CommentForm.vue";
import Comments from "../components/Comments.vue";

export default {
    components: {
        MainLayout,
        CommentForm,
        Comments,
    },
    data: function () {
        return {
            post: {
                title: "Title",
                content: "Content",
                data: Date.now,
            },
            authorized: false,
        };
    },
    methods: {
        getPost: async function (id) {
            try {
                this.post = await this.$root.getPost(id);
                this.$root.user
                    .then((u) => {
                        if(u && u._id){
                        this.authorized =
                            u.posts.findIndex((p) => p._id == this.post._id) >
                            -1;
                        }
                    });
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
        deletePost: async function (id) {
            try {
                await this.$root.deletePost(id);
                window.location.href = "/posts";
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
    mounted: function () {
        console.log("Post Mounted");
        const id = this.$route.params.id;
        this.getPost(id);
        this.$on('updatePost',()=>{
            this.getPost(id)
            console.log('Updating post')
        })
    },
    filters: {
        checkIfExist: function (param) {
            return param ? param : "";
        },
    },
};
</script>

<style>
.text-left {
    text-align: left !important;
}
</style>
