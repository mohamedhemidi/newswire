import { useAppSelector } from "hooks/useAppSelector";
import { LoginSection } from "modules/authentication/components/LoginSection";
import { checkAuth } from "modules/authentication/utils/authHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const authenticated = checkAuth();
  const { isLoggedIn } = useAppSelector((state) => state.login) as {
    isLoggedIn: boolean;
  };
  useEffect(() => {
    if (authenticated || isLoggedIn) {
      return navigate("/");
    }
  }, [authenticated, isLoggedIn, navigate]);
  return (
    <main className="main-section">
      <LoginSection />
    </main>
  );
};

export default Login;
