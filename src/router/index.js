import { createMemoryHistory, createRouter } from 'vue-router'

import HomePage from '../components/HomePage.vue'
import Game from '../components/Game.vue'
import history from '../components/history.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/game', component: Game },
  { path: '/history', component: history }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router