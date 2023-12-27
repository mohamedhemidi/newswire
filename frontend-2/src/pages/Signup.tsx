import { checkAuth } from "modules/authentication/utils/authHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const authenticated = checkAuth();
  useEffect(() => {
    if (authenticated) {
      return navigate("/");
    }
  }, [authenticated, navigate]);
  return <div>Signup</div>;
};

export default Signup;
