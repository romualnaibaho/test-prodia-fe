import httpCall from '@/helpers/Http'

const Env = require('@/helpers/Env')

const env = new Env()

const corsProxy = "https://cors-anywhere.herokuapp.com/";

class Weather {
    constructor() {
        this.baseBeUrl = `${corsProxy}${env.getEnv('API_URL')}`

        this.weatherUrl = `${this.baseBeUrl}/weather`
    }

    getLocationWeather(param) {
        return httpCall.get(this.weatherUrl, param)
    }
}

export default new Weather()