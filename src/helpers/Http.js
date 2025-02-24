/**
 * This class is intended for making http calls (get, post, put, delete)
 * with separate functions to generate headers needed when
 * we hit our APIs
 */

import axios from 'axios'
import General from './General'


class Http {
    generateHeaders(contentType) {
        return {
            'Content-Type': contentType,
            'X-Prodia-Token': General.getCookie('accessToken')
        }
    }

    get(url, params) {
        let uri = url
        const esc = encodeURIComponent

        if (params) {
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(params[k])}`)
            .join('&')

        uri = `${url}?${query}`
        }

        // generate headers for this request
        const headers = this.generateHeaders(
            'application/json'
        )
        const response = axios({
        method: 'get',
        url: uri,
        headers
        })

        response
        .catch((err) => {
            if (
            err.response
            && err.response.data
            && err.response.data.meta
            && err.response.data.meta.code
            && err.response.data.meta.code === 401
            ) {
            this.logout()
            }
        })

        return response
    }

    delete(url, params) {
        let uri = url
        const esc = encodeURIComponent
        if (params) {
        const query = Object.keys(params)
            .map(k => `${esc(k)}=${esc(params[k])}`)
            .join('&')

        uri = `${url}?${query}`
        }

        // generate headers for this request
        const headers = this.generateHeaders(
            'application/json'
        )
        const response = axios({
        method: 'delete',
        url: uri,
        headers
        })

        response
        .catch((err) => {
            if (
            err.response
            && err.response.data
            && err.response.data.meta
            && err.response.data.meta.code
            && err.response.data.meta.code === 401
            ) {
            this.logout()
            }
        })

        return response
    }

    post(url, data) {
        let payload
        let contentType
        let responseType = 'json'

        if (data.responseType === 'blob') {
        payload = JSON.stringify(data.value)
        contentType = 'application/json'
        responseType = data.responseType
        }
        else if (!data.file) {
        payload = JSON.stringify(data)
        contentType = 'application/json'
        }
        else {
        contentType = 'multipart/form-data'
        payload = new FormData()
        payload.append('isPrivate', data.isPrivate)

        // payload for oss
        payload.append('file', data.file)
        payload.append('data', JSON.stringify(data.parameter))
        payload.append('docType', data.parameter.documentType)

        // payload for ocr
        payload.append('image', data.file)
        }

        // generate headers for this request
        const headers = this.generateHeaders(
            contentType
        )

        const response = axios({
        method: 'post',
        url,
        responseType,
        data: payload,
        headers
        })

        response
        .catch((err) => {
            if (
            err.response
            && err.response.data
            && err.response.data.meta
            && err.response.data.meta.code
            && err.response.data.meta.code === 401
            ) {
            this.logout()
            }
        })

        return response
    }

    put(url, data) {
        const payload = JSON.stringify(data)

        // generate headers for this request
        const headers = this.generateHeaders(
            'application/json'
        )
        const response = axios({
        method: 'put',
        url,
        data: payload,
        headers
        })

        response
        .catch((err) => {
            if (
            err.response
            && err.response.data
            && err.response.data.meta
            && err.response.data.meta.code
            && err.response.data.meta.code === 401
            ) {
            this.logout()
            }
        })

        return response
    }
}

export default new Http()