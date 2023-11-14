import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import EventsChildRoute from '../src/components/EventsChildRoute.vue'
import ReviewsChildRoute from '../src/components/ReviewsChildRoute.vue'
import MountainChatChildRoute from '../src/components/MountainChatChildRoute.vue'
function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account/:accountId',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage'),
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: loadPage('PostDetailsPage')
  },
  {
    path: '/resort/:resortId',
    name: 'Resort',
    component: loadPage('ResortPage'),
    children: [
      {
        path: 'events',
        name: 'Events',
        component: EventsChildRoute
      },
      {
        path: 'reviews',
        name: 'Reviews',
        component: ReviewsChildRoute
      },
      {
        path: 'chat',
        name: 'Chat',
        component: MountainChatChildRoute
      }]
  },
  {
    path: '/resortDetails/:resortId',
    name: 'ResortDetails',
    component: loadPage('ResortDetailsPage'),
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
