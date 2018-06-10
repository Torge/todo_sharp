import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'

import LayoutDefault from '@/layout/LayoutDefault'
import LayoutLogin from '@/layout/LayoutLogin'

import Login from '@/views/Login'

import ProjectKanban from '@/views/ProjectKanban'
import ProjectList from '@/views/ProjectList'
import ProjectDetail from '@/views/ProjectDetail'
import ProjectEdit from '@/views/ProjectEdit'
import ProjectCreate from '@/views/ProjectCreate'

import UserList from '@/views/UserList'
import UserDetail from '@/views/UserDetail'
import UserEdit from '@/views/UserEdit'

import TicketDetail from '@/views/TicketDetail'
import TicketEdit from '@/views/TicketEdit'
import TicketCreate from '@/views/TicketCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LayoutDefault,
      children: [
        {
          path: '',
          redirect: '/project/list'
        },
        {
          path: '/project/list',
          name: 'project-list',
          component: ProjectList,
          async beforeEnter (to, form, next) {
            await store.dispatch('project/find')
            next()
          }
        },
        {
          path: '/project/create',
          name: 'project-create',
          component: ProjectCreate,
          async beforeEnter (to, form, next) {
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
          async beforeEnter (to, form, next) {
            await store.dispatch('project/get', to.params.projectId)
            await store.dispatch('ticket/find', {projectId: to.params.projectId})
            next()
          }
        },
        {
          path: '/project/:projectId/detail',
          name: 'project-detail',
          component: ProjectDetail,
          async beforeEnter (to, form, next) {
            await store.dispatch('project/get', to.params.projectId)
            await store.dispatch('ticket/find', {project: to.params.projectId})
            next()
          }
        },
        {
          path: '/project/:projectId/edit',
          name: 'project-edit',
          component: ProjectEdit,
          async beforeEnter (to, form, next) {
            await store.dispatch('project/get', to.params.projectId)
            next()
          }
        },
        {
          path: '/user/list',
          name: 'user-list',
          component: UserList,
          async beforeEnter (to, form, next) {
            await store.dispatch('user/find')
            next()
          }
        },
        {
          path: '/user/:userId/detail',
          name: 'user-detail',
          component: UserDetail,
          async beforeEnter (to, form, next) {
            await store.dispatch('user/get', to.params.userId)
            next()
          }
        },
        {
          path: '/user/:userId/edit',
          name: 'user-edit',
          component: UserEdit,
          async beforeEnter (to, form, next) {
            await store.dispatch('user/get', to.params.userId)
            next()
          }
        },
        {
          path: '/ticket/create',
          name: 'ticket-create',
          component: TicketCreate
        },
        {
          path: '/ticket/:ticketId/detail',
          name: 'ticket-detail',
          component: TicketDetail,
          async beforeEnter (to, form, next) {
            await store.dispatch('ticket/get', to.params.ticketId)
            next()
          }
        },
        {
          path: '/ticket/:ticketId/edit',
          name: 'ticket-edit',
          component: TicketEdit,
          async beforeEnter (to, form, next) {
            await store.dispatch('ticket/get', to.params.ticketId)
            next()
          }
        }
      ]
    },
    {
      path: '/',
      component: LayoutLogin,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        }
      ]
    }
  ]
})
