
const routes = [
  {
    path: '/',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'settings', component: () => import('pages/settings/PageSettings') },
      { path: 'search', component: () => import('pages/Search.vue') },
      { path: 'user/:idUser', component: () => import('pages/user/Profile.vue') },
      { path: 'tts', component: () => import('pages/tests/TextToSpeach.vue') },
      { path: 'center', component: () => import('pages/tests/OnCenter.vue') },
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/profile/Index.vue') },
      { path: 'edit', component: () => import('pages/profile/EditProfile.vue') },
      { path: 'vacancies', component: () => import('pages/profile/work/Vacancies.vue') },
      { path: 'candidatures', component: () => import('pages/profile/work/MyCandidatures.vue') },
      { path: 'vacancy/details/:id', component: () => import('pages/profile/work/Details.vue') },
      { path: 'vacancy/edit/:idEdit', component: () => import('pages/profile/work/EditVacancy.vue') },
      { path: 'vacancy/add', component: () => import('pages/profile/work/AddVacancy.vue') },
      { path: 'vacancy/details/employee', component: () => import('pages/profile/work/EmployeeProfile.vue') },
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
      { path: 'details/:id', component: () => import('pages/work/Details.vue') }
    ]
  },
  {
    path: '/store',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/store/IndexPage.vue') },
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
  {
    path: '/company',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: 'employees', component: () => import('pages/company/Employees.vue') },
      { path: 'employee', component: () => import('pages/company/Employee.vue') },
      { path: 'interviews', component: () => import('pages/company/Interviews.vue') },
      { path: 'vacancies', component: () => import('pages/company/Vacancies.vue') },
      { path: 'vacancy', component: () => import('pages/company/VacancyDetail.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
