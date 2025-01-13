import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/DatosGeneralesView',
    name: 'DatosGenerales',
    component: () => import('../views/DatosGeneralesView.vue')
  },

  {
    path: '/DetalleFacturaView',
    name: 'DetalleFactura',
    component: () => import('../views/DetalleFacturaView.vue')
  },

  {
    path: '/FacturasView',
    name: 'Facturas',
    component: () => import('../views/FacturasView.vue')
  },

  {
    path: '/ProductosView',
    name: 'Productos',
    component: () => import('../views/ProductosView.vue')
  },

  {
    path: '/UsuariosView',
    name: 'Usuarios',
    component: () => import('../views/UsuariosView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
