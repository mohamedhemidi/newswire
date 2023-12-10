import { lazy, Suspense } from "react";
import PrivateRoutes from "@Utils/PrivateRoutes";
import { Route, Routes as Switch } from "react-router-dom";
import { Loader } from "@Components/Loader";

const Home = lazy(() => import("@Pages/Home/Home"));
const Article = lazy(() => import("@Pages/Article/Article"));
const Login = lazy(() => import("@Pages/Login/Login"));
const Page404 = lazy(() => import("@Pages/Page404/Page404"));
const Settings = lazy(() => import("@Pages/Settings/Settings"));
const Signup = lazy(() => import("@Pages/Signup/Signup"));
const Layout = lazy(() => import("./Layouts/Layout"));

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
