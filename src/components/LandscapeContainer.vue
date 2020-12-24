<template>
    <div class="bg-info box w-100">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["params"],
    mounted: function () {
    },
    computed: {
        styleObject: function () {
            return {
                'box-sizing':'border-box',
                width: screen.width+'px',
                height: (screen.width * 1) / 4+'px',
                color:'red'
            };
        },
    },
};
</script>

<style scoped>
.box {
    border-radius: 1rem !important;
    height: 400px;
}
</style>
