import {
  FilterIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  NotificationIcon,
  SettingsIcon,
  SignupIcon,
} from "assets/icons";

export const NavLinks = [
  {
    title: "Home",
    icon: <HomeIcon />,
    auth: false,
    path: "/",
  },
  {
    title: "Login",
    icon: <LoginIcon />,
    auth: false,
    path: "/login",
  },
  {
    title: "Signup",
    icon: <SignupIcon />,
    auth: false,
    path: "/signup",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    auth: true,
    path: "/settings",
  },
  {
    title: "Notification",
    icon: <NotificationIcon />,
    auth: true,
    path: null,
    action: "notification",
  },

  {
    title: "Logout",
    icon: <LogoutIcon />,
    auth: true,
    path: null,
    action: "logout",
  },
];

export const constantLinks = [
  {
    title: "Advanced Search",
    icon: <FilterIcon />,
    auth: false,
    path: null,
    action: "advancedSearch",
  },
];
