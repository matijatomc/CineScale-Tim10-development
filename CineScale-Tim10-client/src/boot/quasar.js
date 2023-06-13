import { Notify } from 'quasar'

export default ({ app }) => {
  // ... other configurations

  app.config.globalProperties.$q = {
    ...app.config.globalProperties.$q,
    notify: Notify.create
  }
}
