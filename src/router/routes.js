
const routes = [
  {
    path: '/',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/settings', component: () => import('pages/settings/PageSettings') },
      { path: 'search', component: () => import('pages/Search.vue') },
      { path: 'profile', component: () => import('pages/profile/Index.vue') }
    ]
  },
  {
    path: '/work',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/work/Index.vue') },
      { path: 'details', component: () => import('pages/work/Details.vue') }
    ]
  },
  {
    path: '/store',
    component: () => import('layouts/home/Base.vue'),
    children: [
      { path: '', component: () => import('pages/store/IndexPage.vue') },
      { path: 'details', component: () => import('pages/store/DetailsPage.vue') },
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/Clean.vue'),
    children: [
      { path: '', component: () => import('pages/account/Login.vue') },
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
