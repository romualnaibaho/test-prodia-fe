const Logout = () => import(/* webpackChunkName: "auth", webpackPrefetch: true */ '@/views/pages/Auth/Logout.vue')

const authRouter = [
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
]
  
export default authRouter