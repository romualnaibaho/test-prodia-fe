class General {
    /*
    * used to deep clone normal arrays and array of objects
    */
    cloneArray = (data) => {
        return JSON.parse(JSON.stringify(data))
    }

    /*
    * this function will return a cookie value based on the name
    */
    getCookie = (val, defaultVal = null) => {
        const match = document.cookie.match(new RegExp(`(^| )${val}=([^;]+)`))

        if (match) {
            return match[2]
        }

        return defaultVal
    }

    deleteCookies() {
        const allCookies = document.cookie.split(';')

        allCookies.forEach((value) => {
            const position = value.indexOf('=')
            const name = position > -1 ? value.substr(0, position).replace(/\s/g, '') : value
            document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`
        })
    }
}

export default new General()