import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import AddHomeWork from '@/components/AddHomeWork'
import AddTitle from '@/components/AddTitle'
import AddPage from '@/components/AddPage'
import AddTitleForPage from '@/components/AddTitleForPage'
import AddKnowledge from '@/components/AddKnowledge'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/addhomework',
            name: 'addhomework',
            component: AddHomeWork
        },
        {
            path: '/addTitle',
            name: 'addTitle',
            component: AddTitle
        }, {
            path: '/addPage',
            name: 'addPage',
            component: AddPage
        }, {
            path: '/addTitleForPage',
            name: 'addTitleForPage',
            component: AddTitleForPage
        }, {
            path: '/addknowledge',
            name: 'addKnowledge',
            component: AddKnowledge
        }
    ]
})