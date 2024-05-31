import { lazy } from "react";

export const easyLazy = (str) => {
  return lazy(() => import(`/pages/${str}/${str}.jsx`));
};
