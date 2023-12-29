import React from "react";
import { IRouter } from "./router.interface";
import MovieTable from "../../components/table/TestTable";
import AboutUs from "../../components/AboutUs/AboutUs";
import Auth from "../../components/auth/Auth";

const Home = React.lazy(() => import("../../components/Home/Home"));

export const routerData: IRouter = {
  items: [
    {
      link: "/",
      name: "Home",
      component: Home,
    },
    {
      link: "/table",
      name: "Table",
      component: MovieTable,
    },
    {
      link: "/about-us",
      name: "About Us",
      component: AboutUs,
    },
    {
      link: "/register",
      name: "register",
      component: Auth,
    },
  ],
};
