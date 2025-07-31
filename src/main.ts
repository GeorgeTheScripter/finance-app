import { Component, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import components from "./components/UI/index";
import router from "./router/router";
import { createPinia } from "pinia";
import Vue3ColorPicker from "vue3-colorpicker";
import { initializeApp } from "firebase/app";
import "vue3-colorpicker/style.css";

const firebaseConfig = {
  apiKey: "AIzaSyCwl6j-SZv-Ki-UEmGnrP1g2l8QCpwKIZk",
  authDomain: "finance-app-90b01.firebaseapp.com",
  projectId: "finance-app-90b01",
  storageBucket: "finance-app-90b01.firebasestorage.app",
  messagingSenderId: "513214211578",
  appId: "1:513214211578:web:2b45953f5b58f2a02d3043",
};

initializeApp(firebaseConfig);

const app = createApp(App);

// register ui components
components.forEach((component: Component): void => {
  app.component(component.name!, component);
});

app.use(router).use(createPinia()).use(Vue3ColorPicker).mount("#app");
