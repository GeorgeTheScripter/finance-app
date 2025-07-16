import { Component } from "vue";

export type AppPage = Component & {
  path: string;
  name: string;
};
