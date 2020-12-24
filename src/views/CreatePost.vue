<template>
    <main-layout
        ><div class="d-flex flex-column w-100 align-items-center">
            <div class="card d-flex flex-column w-100">
                <div
                    class="card-body d-flex flex-column align-items-start w-100"
                >
                    <form class="d-flex flex-column align-items-start w-100">
                        <div
                            class="d-flex flex-column align-items-start w-100 mb-2"
                        >
                            <label for="title">Title</label>

                            <input
                                v-model="post.title"
                                type="text"
                                class="form-control"
                                id="title"
                                placeholder="title"
                            />
                        </div>
                        <ckeditor
                            class="w-100"
                            :editor="editor"
                            v-model="post.content"
                            :config="editorConfig"
                        ></ckeditor>
                        <button
                            v-if="!edit"
                            type="button"
                            @click="createPost()"
                            class="btn btn-primary block mt-3"
                        >
                            Create Post
                        </button>
                        <button
                            v-if="edit"
                            type="button"
                            @click="savePost()"
                            class="btn btn-primary block mt-3"
                        >
                            Update Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from "../components/layouts/Main";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    name: "Login",
    components: {
        MainLayout,
    },
    data() {
        return {
            post: {
                title: "",
                content: "",
            },
            edit: false,
            editor: ClassicEditor,
            editorData: "<p>Content of the editor.</p>",
            editorConfig: {
                // The configuration of the editor.
            },
        };
    },
    methods: {
        createPost: async function () {
            const data = {
                title: this.post.title,
                content: this.post.content,
                author:this.$root.userId()
            };
            try {
                await this.$root.createPost(data);
                window.location.href = "/posts";
            } catch (e) {
                console.log("emiting error ");
                this.$root.$emit("error", e);
            }
        },
        savePost: async function () {
            const data = {
                title: this.post.title,
                content: this.post.content,
            };
            try {
                await this.$root.updatePost(
                    this.post._id,
                    data
                );
                window.location.href = "/posts";
            } catch (e) {
                console.log("emiting error ");
                this.$root.$emit("error", e);
            }
        },
        getPost: async function (id) {
            try {
                this.post = await this.$root.getPost(id);
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
    mounted: function () {
        this.edit = this.$route.params.id ? this.$route.params.id : false;
        if (this.edit) {
            this.getPost(this.edit);
        }
    },
};
</script>


