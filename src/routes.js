/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import About from "views/About.js";
import Bio from "views/Bio";
import Complaints from "views/Complaints.js";
import Icons from "views/examples/Icons.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Help from "views/Help.js";
import RequestList from "views/RequestList";
import Schools from "views/Schools.js";
import Tables from "views/TutorList";

var routes = [
  {
    path: "/list",
    name: "Tutors",
    icon: "ni ni-badge text-primary",
    component: Tables,
    layout: "/tutee",
  },
  {
    path: "/requests",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: RequestList,
    layout: "/tutor",
  },
  {
    path: "/contact-us",
    name: "Contact",
    icon: "ni ni-email-83 text-orange",
    component: Complaints,
    layout: "/tutee",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },

  {
    path: "/help",
    name: "Help",
    icon: "ni ni-compass-04 text-green",
    component: Help,
    layout: "/tutor",
  },
  {
    path: "/help",
    name: "Help",
    icon: "ni ni-compass-04 text-green",
    component: Help,
    layout: "/tutee",
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-album-2 text-blue",
    component: About,
    layout: "/tutee",
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-album-2 text-blue",
    component: About,
    layout: "/tutor",
  },
  {
    path: "/schools",
    name: "Partner Schools",
    icon: "ni ni-hat-3 text-purple",
    component: Schools,
    layout: "/tutor",
  },
  {
    path: "/schools",
    name: "Partner Schools",
    icon: "ni ni-hat-3 text-purple",
    component: Schools,
    layout: "/tutee",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/tutor",
  },
  {
    path: "/profile/:user",
    name: "Profile",
    icon: "ni ni-tv-2 text-primary",
    component: Bio,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
