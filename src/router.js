import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SignUp from './components/SignUp.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true}
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp 
    },
  ]
})


router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        user = data;
      next()
      } 
    }).catch((e) => {
      console.log(e)
    });
    if (!user) {
      next({path:'/'});
    }else {
      next()
    }
  } else {
  next()
  }
})



export default router;