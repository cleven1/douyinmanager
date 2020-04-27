import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import User from '@/components/user/User'
import Video from '@/components/video/Video'
import Search from '@/components/search/Search'
import Note from '@/components/note/Note'
import Empty from '@/components/empty/Empty'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: Video,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/note',
      name: 'note',
      component: Note,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/empty',
      name: 'empty',
      component: Empty
    }
  ]
})
