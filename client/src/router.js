import Vue from 'vue'
import Router from 'vue-router'
import LayoutDefault from '@/layout/LayoutDefault'
import LayoutLogin from '@/layout/LayoutLogin'

import Login from '@/views/Login'
import Landing from '@/views/Landing'

import ProjectKanban from '@/views/ProjectKanban'
import ProjectList from '@/views/ProjectList'
import ProjectDetail from '@/views/ProjectDetail'
import ProjectEdit from '@/views/ProjectEdit'

import UserList from '@/views/UserList'
import UserDetail from '@/views/UserDetail'
import UserEdit from '@/views/UserEdit'

import TicketDetail from '@/views/TicketDetail'
import TicketEdit from '@/views/TicketEdit'

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
          name: 'landing',
          component: Landing
        },
        {
          path: '/project/list',
          name: 'project-list',
          component: ProjectList
        },
        {
          path: '/project/:projectId/kanban',
          name: 'project-kanban',
          component: ProjectKanban
        },
        {
          path: '/project/:projectId/detail',
          name: 'project-detail',
          component: ProjectDetail
        },
        {
          path: '/project/:projectId/edit',
          name: 'project-edit',
          component: ProjectEdit
        },
        {
          path: '/user/list',
          name: 'user-list',
          component: UserList
        },
        {
          path: '/user/:userId/detail',
          name: 'user-detail',
          component: UserDetail
        },
        {
          path: '/user/:userId/edit',
          name: 'user-edit',
          component: UserEdit
        },
        {
          path: '/ticket/:ticketId/detail',
          name: 'ticket-detail',
          component: TicketDetail
        },
        {
          path: '/ticket/:ticketId/edit',
          name: 'ticket-edit',
          component: TicketEdit
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
