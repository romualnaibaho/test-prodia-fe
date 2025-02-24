<template>
    <div class="container h-max py-4">

        <div class="mb-2 text-left">
            <span 
                @click="$router.push({ name: 'dashboard' })"
                class="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center"
            >
            <i class="fas fa-arrow-left text-sm mr-2"></i>
                Kembali
            </span>
        </div>

        <div v-if="location" class="card shadow-sm p-4">
            <h2 class="mb-3">{{ location.name }}, {{ location.country }}</h2>
            <p><strong>Longitude:</strong> {{ location.longitude }} | <strong>Latitude:</strong> {{ location.latitude }}</p>
            
            <h4 class="mt-4">Kondisi Cuaca</h4>
            <div class="table-responsive">
                <table class="table table-hover table-bordered mt-3">
                    <thead class="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Cuaca</th>
                            <th>Deskripsi</th>
                            <th>Suhu (K)</th>
                            <th>Terasa Seperti (K)</th>
                            <th>Kelembaban (%)</th>
                            <th>Kecepatan Angin (m/s)</th>
                            <th>Tingkat Awan (%)</th>
                            <th>Matahari Terbit</th>
                            <th>Matahari Terbenam</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(condition, index) in location.weather_conditions" :key="condition.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ condition.main }}</td>
                            <td>{{ condition.description }}</td>
                            <td>{{ condition.weather_data.temperature }}</td>
                            <td>{{ condition.weather_data.feels_like }}</td>
                            <td>{{ condition.weather_data.humidity }}</td>
                            <td>{{ condition.wind_data.speed }}</td>
                            <td>{{ condition.cloud_data.cloudiness }}</td>
                            <td>{{ formatTime(condition.sys_info.sunrise) }}</td>
                            <td>{{ formatTime(condition.sys_info.sunset) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <p><strong>Data belum tersedia.</strong></p>
        </div>
    </div>
</template>
  
<script>
/* import components */

/* import api */
import dashboard from '@/helpers/api_call/Dashboard';

export default {
    name: 'detail',
    data() {
        return {
            location: null,
            locationId: -1,
            alertMsg: "",
            alertType: "error"
        }
    },
    methods: {
        errorHandling(responseMsg) {
            this.alertMsg = responseMsg
            this.alertType = 'error'
            window.scrollTo(0, 0)

            setTimeout(() => {
                this.alertMsg = ''
            }, 5000)
        },
        getDetailLoc() {
            this.isLoading = true

            dashboard.getDetailLocation(this.locationId)
                .then((res) => {
                    const data = res.data.data

                    this.location = data
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
        formatTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString();
        }
    },
    mounted() {
        this.locationId = this.$route.params.id;
        this.getDetailLoc();
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

.card {
    overflow-y: scroll;
    border-radius: 10px;
    max-height: calc(100vh - 63px - 72px - 75px);
}

table {
    font-size: 14px;
}

th, td {
    text-align: center;
    vertical-align: middle;
}
</style>