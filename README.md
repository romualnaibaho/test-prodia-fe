# prodia-app

## Project requirement
```
Node v14.17.2
```

## Project setup
```
npm install
```

```
Buat file .env dan tambahkan konfigurasi berikut
VUE_APP_API_URL= https://api.openweathermap.org/data/2.5
VUE_APP_API_KEY=5f86c522db4956257702344c5184ad84
VUE_APP_BASE_URL=http://localhost:8080
VUE_APP_API_GATEWAY_URL=http://127.0.0.1:8001
```

VUE_APP_BASE_URL -> base url aplikasi fe
<br/>
VUE_APP_API_GATEWAY_URL -> base url aplikasi be

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Note
Jika terjadi kesalahan CORS ketika hit api ke weather, silahkan kunjungi url berikut <a href="https://cors-anywhere.herokuapp.com/corsdemo">https://cors-anywhere.herokuapp.com/corsdemo</a> lalu klik tombol "Request temporary access to the demo server".

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
