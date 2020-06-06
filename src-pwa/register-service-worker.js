import { register } from 'register-service-worker'
import { Notify } from 'quasar'

register(process.env.SERVICE_WORKER_FILE, {
  ready (registration) {
    console.log('Service worker is active.')
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (registration) {
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('New content is available; please refresh.')
    Notify.create({
      message: i18n.t('messages.update_available'),
      icon: 'cloud_download',
      closeBtn: i18n.t('labels.update'),
      timeout: 10000,
      onDismiss () {
        location.reload(true)
      }
    })
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})