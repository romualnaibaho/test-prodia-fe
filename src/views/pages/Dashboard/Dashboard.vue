<template>
    <div class="container h-max py-4">
        <div class="input-group search-box mx-auto mb-2">
            <div class="input-group-prepend">
                <span class="input-group-text">
                <i class="fas fa-search"></i>
                </span>
            </div>
            <input 
                type="text" 
                class="form-control" 
                placeholder="Cari nama daerah anda..." 
                v-model="locationName"
            />
            <div class="input-group-append">
                <button class="btn btn-primary" @click="submitLocation">Kirim</button>
            </div>
        </div>
        <small class="text-muted">Cari nama daerah untuk melihat kondisi cuaca terkini. Hasil pencarian akan tersimpan di history.</small>

        <div class="dashboard-content mt-4">
            <alert-message-component :errorMsg="alertMsg" :type="alertType"/>

            <div class="table-location mt-5">
                <table class="table table-bordered table-hover text-center">
                    <thead class="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Nama Daerah</th>
                            <th>Negara</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="locations.length === 0">
                            <td colspan="5" class="text-center">Data tidak tersedia</td>
                        </tr>
                        <tr 
                            v-for="(location, index) in locations" 
                            :key="location.id"
                            @click="selectLocation(location.id)"
                            class="table-row"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ location.name }}</td>
                            <td>{{ location.country }}</td>
                            <td>{{ location.longitude }}</td>
                            <td>{{ location.latitude }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
/* import components */
import AlertMessageComponent from '@/components/general/AlertMessageComponent.vue';

/* import api */
import weather from '@/helpers/api_call/third-party/Weather';
import dashboard from '@/helpers/api_call/Dashboard';

export default {
    name: 'dashboard',
    components: {
        AlertMessageComponent
    },
    data() {
        return {
            locations: [],
            locationName: "",
            alertMsg: "",
            alertType: "error"
        }
    },
    methods: {
        selectLocation(locId){
            this.$router.push({ name: 'detail-weather', params: { id: locId } })
        },
        errorHandling(responseMsg) {
            this.alertMsg = responseMsg
            this.alertType = 'error'
            window.scrollTo(0, 0)

            setTimeout(() => {
                this.alertMsg = ''
            }, 5000)
        },
        submitLocation() {
            this.isLoading = true

            const params = {
                q: this.locationName,
                appId: this.$general.getEnv('API_KEY')
            };

            weather.getLocationWeather(params)
                .then((res) => {
                    const data = res.data

                    this.insertWeather(data)
                })
                .catch((err) => {
                    console.log(err.response)
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
        insertWeather(payload) {
            this.isLoading = true

            dashboard.postInsertWeather(payload)
                .then((res) => {
                    const data = res.data.data

                    if (data) {
                        this.alertMsg = res.data.message
                        this.alertType = "success"
                        this.locationName = ""

                        this.getLocations()

                        setTimeout(() => {
                            this.alertMsg = ''
                        }, 5000)
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
        getLocations() {
            this.isLoading = true

            dashboard.getLocations()
                .then((res) => {
                    const data = res.data.data

                    this.locations = data
                })
                .catch((err) => {
                    console.log(err.response)
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
    },
    mounted() {
        this.getLocations();
    },
    computed: {
        
    }
}
</script>

<style scoped lang="scss">
.h-max {
    margin-top: 63px;
    height: calc(100vh - 63px - 72px);
}

.dashboard-content {
    overflow-y: scroll;
    max-height: calc(100vh - 63px - 72px - 130px);
}

.search-box {
    max-width: 500px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-location {
    max-width: 100%;
    overflow-x: auto;
}

.table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.table-hover tbody tr {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.table-hover tbody tr:hover {
    background-color: #f8f9fa; /* Warna abu-abu muda */
}

.input-group-text {
    background-color: #f8f9fa;
    border-right: 0;
}

.form-control {
    border-left: 0;
    border-right: 0;
}

.btn-primary {
    background-color: #FFF200;
    border: none;
    color: #000;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #ffc107;
}
</style>