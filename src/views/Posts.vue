<template>
    <main-layout
        ><div class="d-flex flex-column w-100">
            <div class="d-flex flex-row mb-5">
                <router-link to="/posts/create" class="btn btn-primary"
                    >Create New Post</router-link
                >
            </div>
            <post-item
                class="mb-2"
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
            ></post-item>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from "../components/layouts/Main";
import PostItem from "../components/PostItem";

export default {
    components: {
        MainLayout,
        PostItem,
    },
    data: function () {
        return {
            posts: [
                {
                    id: 1,
                    title: "Post one",
                    content: "Today is Dec 19, 2020",
                    date: Date.now,
                },
            ],
        };
    },
    methods: {
        getPosts: async function () {
            try {
                this.posts = await this.$root.getPosts();
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        }
    },
    mounted: function () {
        console.log("Posts Mounted");
        this.getPosts();
    },
};
</script>
