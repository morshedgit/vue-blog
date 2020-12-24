<template>
    <div class="home">
        <div class="d-flex flex-column align-items-center w-100 p-1">
            <landscape-container :params="landscapeParams">
                <div
                    class="d-flex p-5 text-white flex-row align-items-start"
                >
                    <router-link
                        v-if="postOftheDay"
                        :to="'/posts/' + postOftheDay._id"
                        class="display-1 text-left"
                        >Article of the day</router-link
                    >
                    <div
                        v-if="postOftheDay"
                        v-html="postOftheDay.content"
                        class="text-left mx-3"
                    ></div>
                </div>
            </landscape-container>
            <div
                class="d-flex w-100 flex-row flex-nowrap album p-3 bg-success m-1"
            >
                <card class="text-left p-5 text-white">
                    <p class="display-2">
                        Most Viewed Articles
                    </p>
                </card>
                <div v-if="posts.length > 0" class="d-flex w-100 flex-row flex-nowrap">
                    <card v-for="post in posts" :key="post._id" class="text-left p-5 text-white">
                        <router-link class="display-3" :to="'/posts/'+post._id">{{ post.title }}</router-link>
                        <div v-html="post.content"></div>
                    </card>
                </div>
            </div>
            <div
                class="d-flex w-100 flex-row flex-nowrap album p-3 bg-warning m-1"
            >
                <card class="text-left p-5 text-white">
                    <p class="display-2">
                        Recent Articles
                    </p>
                </card>
                <div v-if="posts.length > 0" class="d-flex w-100 flex-row flex-nowrap">
                    <card v-for="post in posts" :key="post._id" class="text-left p-5 text-white">
                        <router-link class="display-3" :to="'/posts/'+post._id">{{ post.title }}</router-link>
                        <div v-html="post.content"></div>
                    </card>
                </div>
            </div>
            <div
                class="d-flex w-100 flex-row flex-nowrap album p-3 bg-info m-1"
            >
                <card class="text-left p-5 text-white">
                    <p class="display-2">
                        Contact Us
                    </p>
                </card>
                <!-- <div v-if="posts.length > 0" class="d-flex w-100 flex-row flex-nowrap">
                    <card v-for="post in posts" :key="post._id" class="text-left p-5 text-white">
                        <router-link class="display-3" :to="'/posts/'+post._id">{{ post.title }}</router-link>
                        <div v-html="post.content"></div>
                    </card>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import LandscapeContainer from "../components/LandscapeContainer";
import Card from "../components/Card";

export default {
    name: "Home",
    components: {
        LandscapeContainer,
        Card,
    },
    data: function () {
        return {
            posts: [],
            postOftheDay: function () {
                return this.posts[
                    Math.floor(Math.random() * Math.floor(this.posts.length))
                ];
            },
        };
    },
    watch: {
        posts: function () {
            console.log("Posts updated");
            this.postOftheDay = this.posts[
                Math.floor(Math.random() * Math.floor(this.posts.length))
            ];
        },
        postOftheDay: function () {
            console.log("post updated");
        },
    },
    methods: {
        getPosts: async function () {
            try {
                this.posts = await this.$root.getPosts();
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
    mounted: function () {
        console.log("Home Mounted");
        this.getPosts();
    },
    computed: {
        landscapeParams: function () {
            return {
                width: screen.width,
            };
        },
    },
};
</script>

<style scoped>
.bg-img {
    background-image: url("../assets/img/1.jpg");
    width: 90vw;
    height: 300px;
    object-fit: cover;
    box-shadow: 0 0 20px 20px white inset;
}
.album {
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: scroll;
}
 /* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(126, 141, 118);
  border-radius: 10px;
} 
</style>
