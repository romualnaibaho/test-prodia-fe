import general from '@/helpers/General'

class BasicMiddleware {
    handle(to, from, next) {
        const loginData = JSON.parse(localStorage.getItem('loginData'))
        const accessToken = general.getCookie('accessToken')

        const isNeedAuth = (to.name !== 'login' || to.name === 'register');
        const isNoNeedAuth = (accessToken && (to.name === 'login' || to.name === 'register'));

        if (loginData && accessToken) {
            if (!loginData.email || loginData.accessToken != accessToken) {
                general.deleteCookies()
                next({ name: 'login' })
            }
        }

        if (!accessToken){ 
            if (isNeedAuth){
                // Jika tidak ada token dan ingin ke halaman yang butuh login, redirect ke login
                next({ name: 'login' })
            }
        }
        else if (isNoNeedAuth) {
            // Jika sudah login dan ingin ke halaman login, redirect ke halaman dashboard
            next({ name: 'dashboard' })
        }
        else if (to.name === 'logout') {
            next()
        }

        return ''
    }
}

export default new BasicMiddleware()