import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Reacomment = (resolve) => {
    import ('../components/recommend/recommend').then((module) => {
        resolve(module)
    })
}

const Singer = (resolve) => {
    import ('../components/singer/singer').then((module) => {
        resolve(module)
    })
}

const Rank = (resolve) => {
    import ('../components/rank/rank').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import ('../components/search/search').then((module) => {
        resolve(module)
    })
}

const SingerDetail = (resolve) => {
    import ('../components/singer-detail/singer-detail').then((module) => {
        resolve(module)
    })
}

const Disc = (resolve) => {
    import ('../components/disc/disc').then((module) => {
        resolve(module)
    })
}

const rankList = (resolve) => {
    import ('../components/top-list/top-list').then((module) => {
        resolve(module)
    })
}

const User = (resolve) => {
    import ('../components/user-center/user-center').then((module) => {
        resolve(module)
    })
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: "/recommend",
            component: Reacomment,
            children: [{
                path: ':id',
                component: Disc
            }]
        },
        {
            path: "/singer",
            component: Singer,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        },
        {
            path: "/rank",
            component: Rank,
            children: [{
                path: ':id',
                component: rankList
            }]
        },
        {
            path: "/search",
            component: Search,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        },
        {
            path: '/user',
            component: User
        },
        {
            path: "/",
            redirect: "/recommend"
        }
    ]
})