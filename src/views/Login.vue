<template>
    <main-layout
        ><div class="d-flex flex-column w-100 align-items-center">
            <card v-bind:cssClasses="loginCard">
                <div
                    class="d-flex flex-column w-100 align-items-center text-white"
                >
                    <i class="fab fa-angellist display-1 m-3"></i>
                    <h1>Login</h1>
                    <div class="d-flex flex-column align-items-start">
                        <form class="">
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
                                    @click="login()"
                                    class="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </card>
        </div>
    </main-layout>
</template>

<script>
import MainLayout from "../components/layouts/Main";
import Card from "../components/Card";

export default {
    name: "Login",
    components: {
        MainLayout,
        Card,
    },
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            loginCard: {
                params: {
                    width: "300px",
                    height: "400px",
                    "border-radius": "1rem!important",
                },
                classes: [this.$root.bgColors[1], "mx-1"],
            },
        };
    },
    methods: {
        login: async function () {
            let data = {
                email: this.user.email,
                password: this.user.password,
            };
            try {
                await this.$root.login(data);
            } catch (e) {
                console.log("emiting error");
                this.$root.$emit("error", e);
            }
        },
    },
};
</script>


