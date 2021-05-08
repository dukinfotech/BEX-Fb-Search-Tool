
const routes = [
  {
    path: '/main',
    component: () => import('pages/Index.vue'),
    name: 'main'
  },
  {
    path: '/',
    component: () => import('pages/Login.vue')
  }
]

export default routes
