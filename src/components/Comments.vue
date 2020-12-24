<template>
    <card :cssClasses="cardOptions">
        <div v-if="comment" class="d-flex flex-column">
            <div class="d-flex flex-row justify-content-between">
                <div class="d-flex flex-row justify-content-between">
                    <div class="m-1">
                        <img
                            src="../assets/img/person.jpg"
                            width="50"
                            class="img-thumbnail"
                            alt="person"
                        />
                        <P v-if="comment.author && comment.author.name">{{
                            comment.author.name
                        }}</P>
                    </div>
                    <p class="text-left mt-2">
                        {{ comment.text }}
                    </p>
                </div>
                <div>
                    <button
                        v-if="haveReplyButton"
                        @click="reply = !reply"
                        class="btn btn-secondary"
                    >
                        <i class="fas fa-reply"></i>
                    </button>
                </div>
            </div>
            <comment-form
                :parentComment="comment"
                :post="comment.post"
                v-if="reply"
                @closeForm="reply = false"
            ></comment-form>

            <div v-if="comment.replys">
                <comments
                    v-for="comment in comment.replys"
                    :key="comment._id"
                    :comment="comment"
                ></comments>
            </div>
        </div>
    </card>
</template>

<script>
import Card from "./Card";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

export default {
    name: "comments",
    components: {
        Card,
        CommentForm,
        Comments,
    },
    props: ["comment", "haveReplyButton"],
    data: function () {
        return {
            cardOptions: {
                params: {
                    "border-radius": "1rem!important",
                },
                classes: ["bg-light", "p-3", "mx-1", "my-1"],
            },
            replyComment: {
                text: "",
            },
            reply: false,
        };
    },
    methods: {},
    mounted: function () {},
};
</script>

<style scoped>
.box {
    overflow: hidden;
    box-sizing: border-box;
}
</style>
