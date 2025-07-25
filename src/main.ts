import { Component, createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import components from "./components/UI/index";
import router from "./router/router";
import { createPinia } from "pinia";

const app = createApp(App);

// register ui components
components.forEach((component: Component): void => {
  app.component(component.name!, component);
});

app.use(router).use(createPinia()).mount("#app");
