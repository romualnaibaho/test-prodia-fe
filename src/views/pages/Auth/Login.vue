<template>
    <div class="login-app d-flex">
        <div class="container my-auto">
            <div class="h-max">
                <div class="row col-12 m-0">
                    <div class="h-max col-12 col-md-6 d-flex">
                        <img
                        src="@/assets/images/prodia.jpg"
                        alt="prodia-ilustration"
                        class="img-fluid m-auto"
                        >
                    </div>
        
                    <div class="col-12 col-md-6 d-flex">
                        <div class="m-auto form-login p-5 text-center">
                            <div class="title mb-4">
                                {{ generateTitleState() }}
                            </div>

                            <alert-message-component :errorMsg="errorMsg" :type="alertType"/>

                            <div v-if="state === STATE.LOGIN">
                                <div class="align-items-center">
                                    <div class="col-auto">
                                        <label class="sr-only" for="input-email">Email</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <i class="fa fa-user" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <input v-model="payloadLogin.email" type="email" class="form-control" id="input-email" placeholder="Username">
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <label class="sr-only" for="input-password">Password</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <i class="fa fa-key" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <input 
                                                v-model="payloadLogin.password" 
                                                :type="showPassword ? 'text' : 'password'" 
                                                class="form-control" 
                                                id="input-password" 
                                                placeholder="Password"
                                            >
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                                                    <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-auto text-right cursor-pointer mb-3" @click="changeStateTo(STATE.REG)">
                                        Buat akun
                                    </div>
                                    <div class="col-auto">
                                        <button @click="doLogin()" type="submit" class="btn btn-primary mb-2 w-100">Submit</button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="state === STATE.REG">
                                <div class="align-items-center">
                                    <div class="col-auto">
                                        <label class="sr-only" for="inlineFormInput">Nama Lengkap</label>
                                        <input v-model="payloadRegist.name" type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Nama Lengkap">
                                    </div>
                                    <div class="col-auto">
                                        <label class="sr-only" for="inlineFormInput">Email</label>
                                        <input v-model="payloadRegist.email" type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Email">
                                    </div>
                                    <div class="col-auto">
                                        <label class="sr-only" for="input-password">Password</label>
                                        <div class="input-group mb-2">
                                            <input 
                                                v-model="payloadRegist.password" 
                                                :type="showPasswordRegist ? 'text' : 'password'" 
                                                class="form-control" 
                                                id="input-password" 
                                                placeholder="Password"
                                            >
                                            <div class="input-group-append">
                                                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordRegist">
                                                    <i :class="showPasswordRegist ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <label class="sr-only" for="input-password">Password Konfirmasi</label>
                                        <div class="input-group mb-2">
                                            <input 
                                                v-model="payloadRegist.passwordConfirmation" 
                                                :type="showPasswordRegist ? 'text' : 'password'" 
                                                class="form-control" 
                                                id="input-password" 
                                                placeholder="Password"
                                            >
                                        </div>
                                    </div>

                                    <div class="col-auto text-right cursor-pointer mb-3" @click="changeStateTo(STATE.LOGIN)">
                                        Login
                                    </div>
                                    <div class="col-auto">
                                        <button @click="doRegist()" type="submit" class="btn btn-primary mb-2 w-100">Submit</button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="state === STATE.VERIFY">
                                <div class="align-items-center">
                                    <div class="col-auto">
                                        <label class="sr-only" for="inlineFormInput">OTP</label>
                                        <input v-model="payloadOtp.otpCode" type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Masukkan Kode OTP">
                                    </div>
                                    
                                    <div class="col-auto text-right cursor-pointer mb-3" @click="resendOtp()">
                                        Kirim ulang OTP
                                    </div>
                                    <div class="col-auto">
                                        <button @click="verifyOtp()" type="submit" class="btn btn-primary mb-2 w-100">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import auth from '@/helpers/api_call/Auth';

import AlertMessageComponent from '../../../components/general/AlertMessageComponent.vue';

export default {
    name: 'login',
    components: {
        AlertMessageComponent
    },
    data() {
        return {
            STATE: {
                LOGIN: 1,
                REG: 2,
                VERIFY: 3
            },
            state: 1,
            payloadLogin: {
                email: "",
                password: ""
            },
            payloadRegist: {
                name: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            },
            payloadOtp: {
                userId: null,
                otpCode: ""
            },
            isLoading: false,
            showPassword: false,
            showPasswordRegist: false,
            errorMsg: "",
            alertType: "error"
        }
    },
    methods: {
        changeStateTo(newState) {
            this.state = newState
        },
        generateTitleState() {
            let result = "User Login"

            if (this.state === this.STATE.REG) {
                result = "Daftar Akun"
            }
            else if (this.state === this.STATE.VERIFY) {
                result = "Masukkan OTP"
            }
            return result;
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        togglePasswordRegist() {
            this.showPasswordRegist = !this.showPasswordRegist;
        },
        errorHandling(responseMsg) {
            this.errorMsg = responseMsg
            this.alertType = 'error'
            window.scrollTo(0, 0)

            setTimeout(() => {
                this.errorMsg = ''
            }, 5000)
        },
        doLogin() {
            this.isLoading = true

            auth.postLogin(this.payloadLogin)
                .then((res) => {
                    const loginData = res.data.data

                    if (loginData.status == 1) {
                        this.$store.commit('auth/initLoginData', { loginData })

                        this.errorMsg = "Berhasil Login"
                        this.alertType = "success"

                        setTimeout(() => this.$router.push({ name: 'dashboard' }), 250)
                    }
                    else if (loginData.status == 0) {
                        this.payloadOtp.userId = loginData.userId

                        this.errorMsg = res.data.message
                        this.alertType = "success"

                        this.state = this.STATE.VERIFY
                    }
                })
                .catch((err) => {
                    this.isLoading = false

                    if (
                        err.response
                        && err.response.data
                        && err.response.data.message
                    ) {
                        this.errorHandling(err.response.data.message)
                    }
                    else {
                        this.errorHandling('Something went wrong at our side...')
                    }
                })
        },
        doRegist() {
            this.isLoading = true

            auth.postRegister(this.payloadRegist)
                .then((res) => {
                    const data = res.data.data
                    this.payloadOtp.userId = data.userId

                    this.errorMsg = data.message
                    this.alertType = "success"

                    this.state = this.STATE.VERIFY
                })
                .catch((err) => {
                    this.isLoading = false

                    if (
                        err.response
                        && err.response.data
                        && err.response.data.message
                    ) {
                        this.errorHandling(err.response.data.message)
                    }
                    else {
                        this.errorHandling('Something went wrong at our side...')
                    }
                })
        },
        resendOtp() {
            this.isLoading = true

            auth.postResendOTP(this.payloadOtp)
                .then((res) => {
                    this.errorMsg = res.data.message
                    this.alertType = "success"
                })
                .catch((err) => {
                    this.isLoading = false

                    if (
                        err.response
                        && err.response.data
                        && err.response.data.message
                    ) {
                        this.errorHandling(err.response.data.message)
                    }
                    else {
                        this.errorHandling('Something went wrong at our side...')
                    }
                })
        },
        verifyOtp() {
            this.isLoading = true

            auth.postVerifyOTP(this.payloadOtp)
                .then((res) => {
                    const loginData = res.data.data

                    this.$store.commit('auth/initLoginData', { loginData })

                    this.errorMsg = "Berhasil Login"
                    this.alertType = "success"

                    setTimeout(() => this.$router.push({ name: 'dashboard' }), 250)
                })
                .catch((err) => {
                    this.isLoading = false

                    if (
                        err.response
                        && err.response.data
                        && err.response.data.message
                    ) {
                        this.errorHandling(err.response.data.message)
                    }
                    else {
                        this.errorHandling('Something went wrong at our side...')
                    }
                })
        }
    }
}
</script>
  
<style scoped lang="scss">

.login-app {
    background-color: #fef200;
    height: 100vh;
}

.h-max {
    min-height: calc(100vh - 110px);
}

.form-login {
    width: 100%;
    border-radius: 15px;
    background-color: #FFFAD7;

    .title {
        font-size: 22px;
        font-weight: bold;
    }
}

.landing-page-btn {
    background-color: #CF6B76;
    padding: 20px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    transition: background-color 1s ease;

    &:hover {
        background-color: #408861;
    }
}
</style>