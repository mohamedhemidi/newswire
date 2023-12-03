import { Home } from "@Pages/Home";
import { Route, Routes as Switch } from "react-router-dom";


const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={""} />
      <Route path="/login" element={""} />
      <Route path="/signup" element={""} />
    </Switch>
  );
};

export default Routes;
