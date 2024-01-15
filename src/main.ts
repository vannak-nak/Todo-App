import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/tailwind.css'
import './registerServiceWorker'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import { Edit, Delete } from '@element-plus/icons-vue'

createApp(App)
  .use(store)
  .use(ElementPlus)
  .use(router)
  .component('Edit', Edit)
  .component('Delete', Delete)
  .mount('#app')
