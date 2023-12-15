import { lazy, Suspense } from "react";
import PrivateRoutes from "utils/PrivateRoutes";
import { Route, Routes as Switch } from "react-router-dom";
import { Loader } from "components/Loader";

const Home = lazy(() => import("pages/Home/Home"));
const Article = lazy(() => import("pages/Article/Article"));
const Login = lazy(() => import("pages/Login/Login"));
const Page404 = lazy(() => import("pages/Page404/Page404"));
const Settings = lazy(() => import("pages/Settings/Settings"));
const Signup = lazy(() => import("pages/Signup/Signup"));
const Layout = lazy(() => import("./layouts/Layout"));

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
