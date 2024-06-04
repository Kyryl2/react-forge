import { lazy } from "react";

export const easyLazyPage = (str) => {
  return lazy(() => import(`../pages/${str}/${str}.jsx`));
};
export const easyLazyComponent = (str) => {
  return lazy(() => import(`../components/${str}/${str}.jsx`));
};
