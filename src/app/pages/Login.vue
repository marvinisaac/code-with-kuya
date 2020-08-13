<template>
    <div class="container-login">
        <div class="container">
            <div class="box">
                <form @submit.prevent>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text"
                                v-model="user.email">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password"
                                v-model="user.password">
                        </div>
                    </div>

                    <button class="button"
                        :class="{
                            'is-loading': is.loggingIn
                        }"
                        @click="login()">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        is: {
            loggingIn: false
        },
        user: {
            email: process.env.VUE_APP_CMS_USER || undefined,
            password: process.env.VUE_APP_CMS_PASSWORD || undefined
        }
    }),
    created () {
        if (process.env.VUE_APP_ENVIRONMENT !== 'LOCAL') {
            this.$router.push({ path: '/' })
        }
    },
    methods: {
        async login () {
            this.is.loggingIn = true
            await this.$cms.login({
                email: this.user.email,
                password: this.user.password
            })
            window.location = '/'
        }
    }
}
</script>

<style lang="scss" scoped>
.container-login {
    padding: 1.5rem;
    width: 100%;

    .box {
        margin: 0 auto;
        max-width: 360px;
    }
}
</style>
