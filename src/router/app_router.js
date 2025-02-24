const Login = () => import(/* webpackChunkName: "login" */ '@/views/pages/Auth/Login.vue')
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/pages/Dashboard/Dashboard.vue')

const appRouter = [
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: {
            layout: 'login-layout'
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    }
]

export default appRouter