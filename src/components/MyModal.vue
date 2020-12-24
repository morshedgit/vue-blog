<template>
    <div class="myModal d-flex justify-content-center align-items-center">
        <card :cssClasses="modalCardParams" class="text-left p-5">
            <div class="d-flex w-100 h-100 flex-column justify-content-between">
                <div>
                    <h1>{{ message.title }}</h1>
                    <p>{{ message.text }}</p>
                </div>

                <div class="d-flex flex-row justify-content-end">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        v-on:click="$emit('close', $event.target.value)"
                    >
                        Close
                    </button>
                </div>
            </div>
        </card>
    </div>
</template>

<style scoped>
.myModal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    outline: 0;
    background-color: #02142777;
}
</style>

<script>
import Card from "./Card";

export default {
    props: ["message"],
    components: {
        Card,
    },
    data: function () {
        return {
            modalCardParams: {
                params: {
                    width: "400px",
                    height: "300px",
                    "min-width": "400px",
                    "max-height": "300px",
                    "border-radius": "1rem!important",
                    "z-index": "10000",
                },
                classes: ["bg-white"],
            },
            modalMessage: {
                title: "",
                Message: "",
            },
        };
    },
};
</script>
