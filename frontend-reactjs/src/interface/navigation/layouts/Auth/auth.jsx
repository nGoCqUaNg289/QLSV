
import React from 'react';
// @material-ui/icons
import { Dashboard, Warning } from "@material-ui/icons";

//loadable
import loadable from 'react-loadable';
import { LoadingComponent } from 'interface/components'

const Home = loadable({ loader: () => import('interface/screens/auth/home'), loading: LoadingComponent });
const ForgotPassword = loadable({ loader: () => import('interface/screens/auth/forgot-password'), loading: LoadingComponent });
const Login = loadable({ loader: () => import('interface/screens/auth/login'), loading: LoadingComponent });
const Register = loadable({ loader: () => import('interface/screens/auth/register'), loading: LoadingComponent });

const Page401 = loadable({ loader: () => import('interface/screens/error/401'), loading: LoadingComponent });
const Page404 = loadable({ loader: () => import('interface/screens/error/404'), loading: LoadingComponent });
const Page500 = loadable({ loader: () => import('interface/screens/error/500'), loading: LoadingComponent });

const authRoutes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: Home
  },
  {
    path: "/login",
    sidebarName: "Login",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: Login
  },
  {
    path: "/register",
    sidebarName: "Register",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: Register
  },
  {
    path: "/forgot-password",
    sidebarName: "ForgotPassword",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: ForgotPassword
  },
  {
    path: "/401",
    sidebarName: "401",
    navbarName: "401",
    icon: Warning,
    component: Page401
  },
  {
    path: "/404",
    sidebarName: "404",
    navbarName: "404",
    icon: Warning,
    component: Page404
  },
  {
    path: "/500",
    sidebarName: "500",
    navbarName: "500",
    icon: Warning,
    component: Page500
  },
  { redirect: true, path: "*", to: "/home", navbarName: "Redirect" }
];

export default authRoutes;
