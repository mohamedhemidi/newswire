import { Article } from "@Pages/Article";
import { Home } from "@Pages/Home";
import { Login } from "@Pages/Login";
import Page404 from "@Pages/Page404/Page404";
import { Settings } from "@Pages/Settings";
import { Signup } from "@Pages/Signup";
import PrivateRoutes from "@Utils/PrivateRoutes";
import { Route, Routes as Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Switch>
  );
};

export default Routes;
