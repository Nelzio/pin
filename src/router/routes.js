
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
      { path: 'playlist', component: () => import('pages/tests/PlayList.vue') },
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
      { path: 'ui', component: () => import('pages/account/LoginUI.vue') },
      { path: 'login', component: () => import('pages/account/LoginEmail.vue') },
      { path: 'create', component: () => import('pages/account/Create.vue') },
      { path: 'resetpwd', component: () => import('pages/account/ResetPassWD.vue') },
      { path: 'resetpwd2', component: () => import('pages/account/ResetPassWDStep2.vue') },
      { path: 'edit', component: () => import('pages/account/ResetProfile.vue') },
    ]
  },
  {
    path: '/help',
    component: () => import('layouts/help/Help.vue'),
    children: [
      { path: '', component: () => import('pages/help/Help.vue') },
      { path: 'home', component: () => import('pages/help/Home.vue') },
      { path: 'vacancies', component: () => import('pages/help/Vacancies.vue') },
      { path: 'stories', component: () => import('pages/help/Stories.vue') },
      { path: 'chat', component: () => import('pages/help/Chat.vue') },
      { path: 'accessibility', component: () => import('pages/help/Accessibility.vue') },
      { path: 'profile', component: () => import('pages/help/Profile.vue') },
      { path: 'settings', component: () => import('pages/help/Settings.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Home.vue') },
      { path: 'companies', component: () => import('pages/admin/Companies.vue') },
      { path: 'users', component: () => import('pages/admin/Users.vue') },
      { path: 'associations', component: () => import('pages/admin/Associations.vue') },
      { path: 'vacancies', component: () => import('pages/admin/Vacancies.vue') },
      { path: 'statistics', component: () => import('pages/admin/Statistics.vue') },
      { path: 'evalvacancies', component: () => import('pages/admin/vacancy/ListVacanciesEval.vue') },
      { path: 'vacancies/vacancy', component: () => import('pages/admin/vacancy/Details.vue') },
      // { path: 'evalvacancies/:idVacancyToEval', component: () => import('pages/admin/vacancy/Details.vue') },

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
