<template>
    <div class="container">
        <div class="center">
            <slot></slot>
        </div>
        <modal
            :content="modal"
            v-if="showModal"
            @close="showModal = false"
        ></modal>
    </div>
</template>

<script>
import Modal from "../Modal";
// import errorHandler from "../errorHandler";
import VueCookies from "vue-cookies";

export default {
    name:'MainLayout',
    components: {
        Modal,
    },
    data() {
        return {
            user: {
                name: null,
            },
            showModal: false,
            modal: {
                title: "",
                content: "",
            },
        };
    },
    methods: {
        log: function (e) {
            console.log(e);
        },
        handleError: function (e) {
            this.modal = {
                title: "Error",
                content: e.message,
                // content: errorHandler(e),
            };
            this.showModal = true;
            console.log("Error handled");
        },
        getUser: async function () {
            if (this.userId) {
                try {
                    let response = await fetch(
                        "http://localhost:3000/api/user/" + this.userId,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                auth_token: this.userToken,
                            },
                        }
                    );
                    const user = await response.json();
                    // console.log(user);
                    this.user = user;
                } catch (e) {
                    console.log("emiting error");
                    this.$emit("error", e);
                }
            }
        },
        logout:function(){ 
            console.log('logging out...')         
            VueCookies.remove("Token");
            VueCookies.remove("user_id");
            window.location.href = "/"
        }
    },
    mounted() {
        this.$on("error", this.handleError);
        this.getUser();
    },
    computed: {
        userToken: function () {
            return VueCookies.get("Token");
        },
        userId: function () {
            return VueCookies.get("user_id");
        },
    },
};
</script>

<style scoped>
.large-font {
    font-size: 120px;
}

.center {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-top: 10%;
}

.center-vertically {
    display: flex;
    width: 20rem;
    align-items: center;
}
.padding {
    padding: 20px;
}
</style>
