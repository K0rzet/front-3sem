import React from "react";
import { IRouter } from "./router.interface";
import MovieTable from "../../components/table/TestTable";
import AboutUs from "../../components/AboutUs/AboutUs";
import Auth from "../../components/auth/Auth";
import { ABOUT_URL, AUTH_URL, GENERATE_PDF_URL, HOME_URL, MOVIE_EDIT_URL, TABLE_URL } from "./router-constants";
import MovieEdit from "../../components/movie/MovieEdit";
import GeneratePdf from "../../components/GeneratePdf/GeneratePdf";

const Home = React.lazy(async () => await import("../../components/Home/Home"));

export const routerData: IRouter = {
  items: [
    {
      link: HOME_URL,
      name: "Home",
      component: Home,
    },
    {
      link: TABLE_URL,
      name: "Table",
      component: MovieTable,
    },
    {
      link: ABOUT_URL,
      name: "About Us",
      component: AboutUs,
    },
    {
      link: AUTH_URL,
      name: "register",
      component: Auth,
    },
    {
      link: MOVIE_EDIT_URL,
      name: "edit-movie",
      component: MovieEdit,
    },
    {
      link: GENERATE_PDF_URL,
      name: "generate-url",
      component: GeneratePdf,
    },
  ],
};
