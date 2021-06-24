import { createApp } from 'vue'
import App from './App.vue'
import { defineAsyncComponent } from 'vue'
const HelloWorld = defineAsyncComponent(() => import("home/HelloWorld"));
const app = createApp(App)
app.component("HelloWorld", HelloWorld);
app.mount('#app')
