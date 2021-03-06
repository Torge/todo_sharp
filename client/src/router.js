/**
 * Die router.js definiert die Routen zu den Komponenten
 * Es werden auch Api Aktionen ausgeführt bevor die Route
 * betreten wird. z.B. die Projekte werden angefordert bevor
 * man auf die Projekt Liste Seite kommt
*/

import LayoutDefault from '@/layout/LayoutDefault'
import LayoutLogin from '@/layout/LayoutLogin'
import Login from '@/views/Login'
import ProjectCreate from '@/views/ProjectCreate'
import ProjectInsights from '@/views/ProjectInsights'
import ProjectKanban from '@/views/ProjectKanban'
import ProjectList from '@/views/ProjectList'
import TicketCreate from '@/views/TicketCreate'
import TicketDetail from '@/views/TicketDetail'
import TicketEdit from '@/views/TicketEdit'
import UserDetail from '@/views/UserDetail'
import UserList from '@/views/UserList'
import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGuard'
import store from './store/'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: LayoutDefault,
    children: [{
      path: '',
      redirect: '/project/list'
    },
    {
      path: '/project/list',
      name: 'project-list',
      component: ProjectList,
      async beforeEnter (to, from, next) {
        await store.dispatch('project/find')
        next()
      }
    },
    {
      path: '/project/create',
      name: 'project-create',
      component: ProjectCreate,
      async beforeEnter (to, from, next) {
        await store.dispatch('user/find')
        next()
      }
    },
    {
      path: '/project/:projectId',
      redirect: '/project/:projectId/kanban'
    },
    {
      path: '/project/:projectId/kanban',
      name: 'project-kanban',
      component: ProjectKanban,
      async beforeEnter (to, from, next) {
        let project = await store.dispatch('project/get', to.params
          .projectId)
        await store.dispatch('user/get', project.adminId)
        await store.dispatch('ticket/find', {
          projectId: to.params.projectId
        })
        next()
      }
    },
    {
      path: '/user/list',
      name: 'user-list',
      component: UserList,
      async beforeEnter (to, from, next) {
        await store.dispatch('user/find')
        next()
      }
    },
    {
      path: '/user/:userId/detail',
      name: 'user-detail',
      component: UserDetail,
      async beforeEnter (to, from, next) {
        await store.dispatch('user/get', to.params.userId)
        next()
      }
    },
    {
      path: '/project/:projectId/ticket/create',
      name: 'ticket-create',
      component: TicketCreate,
      async beforeEnter (to, from, next) {
        await store.dispatch('project/get', to.params.projectId)
        next()
      }
    },
    {
      path: '/ticket/:ticketId/detail',
      name: 'ticket-detail',
      component: TicketDetail,
      async beforeEnter (to, from, next) {
        let ticket = await store.dispatch('ticket/get', to.params.ticketId)
        await store.dispatch('project/get', ticket.projectId)
        next()
      }
    },
    {

      path: '/ticket/:ticketId/edit',
      name: 'ticket-edit',
      component: TicketEdit,
      async beforeEnter (to, from, next) {
        await store.dispatch('ticket/get', to.params.ticketId)
        next()
      }
    },
    {
      path: '/project/:projectId/insights',
      name: 'project-insights',
      component: ProjectInsights,
      async beforeEnter (to, from, next) {
        await store.dispatch('project/get', to.params.projectId)
        await store.dispatch('ticket/find', {
          projectId: to.params.projectId
        })
        next()
      }
    }
    ]
  },
  {
    path: '/',
    component: LayoutLogin,
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }]
  }
  ]
})
router.beforeEach(authGuard)
export default router
