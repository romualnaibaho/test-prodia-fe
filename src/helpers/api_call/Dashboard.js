import httpCall from '@/helpers/Http'

const Env = require('@/helpers/Env')

const env = new Env()

class Auth {
    constructor() {
        this.baseAgUrl = `${env.getEnv('API_GATEWAY_URL')}`
        this.baseBeUrl = `${this.baseAgUrl}/api`

        this.baseBeWeatherUrl = `${this.baseBeUrl}/weather`

        this.insertWeatherUrl = `${this.baseBeWeatherUrl}/insert`
        this.getLocationUrl = `${this.baseBeWeatherUrl}/locations`
        this.getLocationDetailUrl = `${this.baseBeWeatherUrl}/location`
    }

    postInsertWeather(data) {
        return httpCall.post(this.insertWeatherUrl, data)
    }

    getLocations() {
        return httpCall.get(this.getLocationUrl, {})
    }

    getDetailLocation(id) {
        return httpCall.get(`${this.getLocationDetailUrl}/${id}`, {})
    }
}

export default new Auth()