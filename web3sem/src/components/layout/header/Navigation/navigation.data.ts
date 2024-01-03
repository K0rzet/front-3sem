import { ABOUT_URL, AUTH_URL, HOME_URL, TABLE_URL } from "../../../../utils/router-storage/router-constants";
import { INavigation } from "./navigation.interface";

export const navigationData: INavigation = {
  items: [
    {
      link: HOME_URL,
      name: "Home",
    },
    {
      link: TABLE_URL,
      name: "Table",
    },
    {
      link: ABOUT_URL,
      name: "About Us",
    },
    {
      link: AUTH_URL,
      name: "Register",
    },
  ],
};
