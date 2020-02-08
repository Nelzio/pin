
const routes = [
  {
    path: '/welcome',
    component: () => import('layouts/home/Start.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'settings', component: () => import('pages/settings/PageSettings') },
      { path: 'user/:idUser', component: () => import('pages/user/Profile.vue') },
      { path: 'chat/:idReceptor', component: () => import('pages/chat/Chat.vue') },
      { path: 'chat', component: () => import('pages/chat/ChatList.vue') },
      { path: 'tts', component: () => import('pages/tests/TextToSpeach.vue') },
      { path: 'center', component: () => import('pages/tests/OnCenter.vue') },
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/profile/Index.vue') },
      { path: 'vacancies', component: () => import('pages/profile/work/Vacancies.vue') },
      { path: 'candidatures', component: () => import('pages/profile/work/MyCandidatures.vue') },
      { path: 'vacancy/details/:id', component: () => import('pages/profile/work/Details.vue') },
      { path: 'vacancy/edit/:idEdit', component: () => import('pages/profile/work/EditVacancy.vue') },
      { path: 'vacancy/add', component: () => import('pages/profile/work/AddVacancy.vue') },
      { path: 'store/add', component: () => import('pages/profile/store/AddStore.vue') },
      { path: 'store', component: () => import('pages/profile/store/Store.vue') },
      { path: 'store/edit/:idEditStore', component: () => import('pages/profile/store/EditStore.vue') },
      { path: 'store/details/:idPS', component: () => import('pages/profile/store/Details.vue') },
    ]
  },
  {
    path: '/vacancies',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/work/Index.vue') },
      { path: ':idUser', component: () => import('pages/user/Vacancies.vue') },
      { path: 'details/:id', component: () => import('pages/work/Details.vue') }
    ]
  },
  {
    path: '/store',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/store/IndexPage.vue') },
      { path: ':idUser', component: () => import('pages/user/Store.vue') },
      { path: 'details/:id', component: () => import('pages/store/DetailsPage.vue') },
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/Clean.vue'),
    children: [
      { path: '', component: () => import('pages/account/Login.vue') },
      { path: 'login', component: () => import('pages/account/LoginEmail.vue') },
      { path: 'create', component: () => import('pages/account/Create.vue') },
      { path: 'resetpwd', component: () => import('pages/account/ResetPassWD.vue') },
      { path: 'resetpwd2', component: () => import('pages/account/ResetPassWDStep2.vue') },
      { path: 'edit', component: () => import('pages/account/ResetProfile.vue') },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
