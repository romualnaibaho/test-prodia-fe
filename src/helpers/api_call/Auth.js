import httpCall from '@/helpers/Http'

const Env = require('@/helpers/Env')

const env = new Env()

class Auth {
    constructor() {
        this.baseAgUrl = `${env.getEnv('API_GATEWAY_URL')}`
        this.baseBeUrl = `${this.baseAgUrl}/api`

        this.registerUrl = `${this.baseBeUrl}/register`
        this.verifyOTPUrl = `${this.baseBeUrl}/verify-otp`
        this.resendOTPUrl = `${this.baseBeUrl}/resend-otp`
        this.loginUrl = `${this.baseBeUrl}/login`
    }

    postRegister(data) {
        return httpCall.post(this.registerUrl, data)
    }

    postVerifyOTP(data) {
        return httpCall.post(this.verifyOTPUrl, data)
    }

    postResendOTP(data) {
        return httpCall.post(this.resendOTPUrl, data)
    }

    postLogin(data) {
        return httpCall.post(this.loginUrl, data)
    }
}

export default new Auth()