import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '../components/HomePage.vue'
import Game from '../components/Game.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: Game },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router