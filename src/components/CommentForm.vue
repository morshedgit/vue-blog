<template>
    <card :cssClasses="cardOptions">
        <form class="">
            <div class="d-flex flex-column align-items-start">
                <label for="comment">Comment</label>

                <textarea
                    v-model="comment.text"
                    type="text"
                    class="form-control"
                    id="comment"
                    placeholder="type here..."
                ></textarea>

                <button
                    type="button"
                    @click="submitComment()"
                    class="btn btn-primary mt-2"
                >
                    Submit
                </button>
            </div>
        </form>
    </card>
</template>

<script>
import Card from "./Card";

export default {
    components: {
        Card,
    },
    props: ["post", "parentComment"],
    data: function () {
        return {
            cardOptions: {
                params: {
                    "border-radius": "1rem!important",
                },
                classes: ["bg-light", "p-3", "mx-1", "my-1"],
            },
            comment: {
                text: "",
            },
        };
    },
    methods: {
        submitComment: async function () {
            try {
                const comment = {
                    post: this.post,
                    text: this.comment.text,
                    parentComment: this.parentComment,
                };
                await this.$root.submitComment(comment);
                this.comment.text = "";
                this.$emit("closeForm");
                window.location.reload();
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
};
</script>

<style scoped>
.box {
    overflow: hidden;
    box-sizing: border-box;
}
</style>
