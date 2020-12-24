<template>
    <div class="d-flex flex-column buttom-border">
        <div class="d-flex flex-row justify-content-between">
            <h1>{{ post.title | capitalize }}</h1>
        </div>
        <p class="text-left">
            {{ post.content | truncate(200) }}
            <router-link
                :to="'posts/' + post._id"
                >more</router-link
            >
        </p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            user: null,
        };
    },
    name: "PostItem",
    props: ["post"],
    filters: {
        truncate: function (text, length, clamp) {
            clamp = clamp || "...";
            var node = document.createElement("div");
            node.innerHTML = text;
            var content = node.textContent;
            return content.length > length
                ? content.slice(0, length) + clamp
                : content;
        },
        capitalize: function (value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
    mounted: function () {},
};
</script>

<style scoped>
.buttom-border {
    border-bottom: 1px solid black;
}
.text-left{
    text-align: left!important;
}
</style>
