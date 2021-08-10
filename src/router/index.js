import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import PartyEdit from '../components/PartyEdit.vue'
import PartySelect from '../components/PartySelect.vue'
import PartyDetail from '../components/PartyDetail.vue'
import Battle from '../components/Battle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/partyEdit',
    name: 'PartyEdit',
    component: PartyEdit,
    children:[
      {
        path: '/select/:index',
        name: 'select',
        component: PartySelect,
        props: routes => ({
          index: Number(routes.params.index)
        })
      },
      {
        path: '/detail/:index',
        name: 'detail',
        component: PartyDetail,
        props: routes => ({
          index: Number(routes.params.index)
        })
      },
    ]
  },
  {
    path: '/battle',
    name: 'Battle',
    component: Battle
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
