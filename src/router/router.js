import Vue from 'vue'
import Router from 'vue-router'

/** middleware */
import BasicMiddleware from './middleware/BasicMiddleware'

/* import your routes module below this line */
import authRouter from './auth_router'
import appRouter from './app_router'

Vue.use(Router)

let routes = []

routes = routes.concat(
    appRouter,
    authRouter,
    /* place your routes module above this line */
    {
        path: '*',
        name: '404-not-found',
        component: () => import('@/views/pages/error/404.vue')
    }
)

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to) {
      if (to.meta.noScrollTop) {
        return null
      }
      return { x: 0, y: 0 }
    }
  })

router.beforeEach((to, from, next) => {
    // basic middleware checking
    BasicMiddleware.handle(to, from, next)

    next();
})

export default router