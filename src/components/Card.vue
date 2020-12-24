<template>
    <div class="box" v-bind:class="cssClasses.classes" v-bind:style="cssClasses.params">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        cssClasses: {
            type: Object,
            default: function () {
                return {
                    params: {
                        width: "300px",
                        "min-width":"300px",
                        "max-height":"400px",
                        height: "400px",
                        "border-radius": "1rem!important",
                    },
                    classes: ["bg-info","mx-1"],
                };
            },
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
