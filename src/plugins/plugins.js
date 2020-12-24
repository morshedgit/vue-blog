import VueCookies from "vue-cookies";

export const RESTAPI = {
    install: function(Vue, options) {
        Vue.prototype.bgColor = "bg-primary";
        Vue.prototype._token = function() {
            return VueCookies.get("Token");
        };
        Vue.prototype.userId = function() {
            return VueCookies.get("user_id");
        };
        Object.defineProperty(Vue.prototype, "user", {
            get: async function() {
                try {
                    const id = VueCookies.get("user_id");
                    const response = await fetch(
                        options.url + "/api/user/" + id,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.status != 200) {
                        const e = JSON.stringify(await response.json());
                        throw new Error(e);
                    }

                    const user = await response.json();
                    if (user._id) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (e) {
                    // this.$root.$emit("error", e);
                    return null;
                }
            },
        });
        Vue.prototype.getPosts = async function() {
            try {
                const response = await fetch(options.url + "/api/post/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.getPost = async function(id) {
            try {
                const response = await fetch(options.url + "/api/post/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.createPost = async function(data) {
            try {
                const response = await fetch(options.url + "/api/post/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": this._token(),
                    },
                    body: JSON.stringify(data),
                });
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.updatePost = async function(id, data) {
            try {
                const response = await fetch(options.url + "/api/post/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": this._token(),
                    },
                    body: JSON.stringify(data),
                });
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.deletePost = async function(id) {
            try {
                const response = await fetch(options.url + "/api/post/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": this._token(),
                    },
                });
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };

        Vue.prototype.submitComment = async function(comment) {
            try {
                const user = await this.user;
                comment.user = user;

                const response = await fetch(
                    options.url + "/api/post/comment",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(comment),
                    }
                );
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.login = async function(data) {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/user/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                console.log(response.status);
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                VueCookies.set("Token", result.token, "1h");
                VueCookies.set("user_id", result.user_id, "1h");
                window.location.href = "/";
                return;
            } catch (e) {
                this.$root.$emit("error", e);
            }
        };
        Vue.prototype.register = async function(data) {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/user/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );
                if (response.status != 200) {
                    const r = await response.json();
                    if (r.error) {
                        throw new Error(r.message);
                    }
                    throw new Error(response);
                }
                const result = await response.json();
                window.location.href = "/login";
                return result;
            } catch (e) {
                this.$root.$emit("error", e);
                
            }
        };
    },
};
export const CONSTATNTS = {
    install: function(Vue, options) {
        Vue.prototype.bgColors = options.bgColors;
    },
};
