<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{content.title}}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        v-on:click="$emit('close', $event.target.value)"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>{{content.content}}.</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        v-on:click="$emit('close', $event.target.value)"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: block!important;
}
</style>

<script>
export default {
    props:["content"]
};
</script>
