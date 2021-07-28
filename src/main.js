import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';

import Checkbox from 'primevue/checkbox';
import axios from "./gateway/backendapi";
// import Nprogress from 'nprogress';


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'   



// NProgress.configure({ showSpinner: false });
axios.interceptors.request.use((config) => {
    if (typeof window === 'undefined') return config;
    const checkinToken =  localStorage.getItem('checkinToken');

    if (checkinToken) {
      config.headers.Authorization = `Bearer ${checkinToken}`;
    }
    // config.headers.Authorization = `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`
    // /*eslint no-undef: "warn"*/
    // NProgress.start()
    return config;
  })
  

  const app = createApp(App)
  
  app.use(ConfirmationService).use(router).use(ToastService).use(PrimeVue).mount('#app')


app.component('Dialog', Dialog);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);

app.component("Checkbox", Checkbox);


