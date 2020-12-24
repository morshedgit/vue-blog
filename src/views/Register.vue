<template>
    <main-layout>
        <card v-bind:cssClasses="loginCard">
            <div class="d-flex flex-column w-100 align-items-center text-white p-3">
                <i class="fab fa-angellist display-1"></i>
                <div class="">
                    <h1>Registration Form</h1>
                    <p class="text-left">
                        Please Register to be able to use app services.
                    </p>
                    <form class="">
                        <div class="d-flex flex-column align-items-start">
                            <label for="name">Username</label>

                            <input
                                v-model="user.name"
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Username"
                            />
                        </div>
                        <div class="d-flex flex-column align-items-start">
                            <label for="email">Email</label>

                            <input
                                v-model="user.email"
                                type="text"
                                class="form-control"
                                id="email"
                                placeholder="Email"
                            />
                        </div>
                        <div class="d-flex flex-column align-items-start">
                            <label for="pass">Password</label>
                            <input
                                v-model="user.password"
                                type="password"
                                class="form-control"
                                id="pass"
                                placeholder="Password"
                            />
                        </div>
                        <div class="m-3">
                            <button
                                type="button"
                                @click="register()"
                                class="btn btn-primary"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </card>
    </main-layout>
</template>

<script>
import MainLayout from "../components/layouts/Main";
import Card from "../components/Card";

export default {
    components: {
        MainLayout,
        Card,
    },
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
            },
            loginCard: {
                params: {
                    width: "300px",
                    height: "500px",
                    "border-radius": "1rem!important",
                },
                classes: [this.$root.bgColors[1], "mx-1"],
            },
        };
    },
    methods: {
        register: async function () {
            let data = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
            };
            try {
                await this.$root.register(data);
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
};
</script>
