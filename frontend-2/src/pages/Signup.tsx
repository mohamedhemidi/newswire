import { SignupSection } from "modules/authentication/components/SignupSection";
import { checkAuth } from "modules/authentication/utils/authHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const authenticated = checkAuth();
  
  useEffect(() => {
    if (authenticated.loggedIn) {
      return navigate("/");
    }
  }, [authenticated, navigate]);
  return (
    <main className="main-section">
      <SignupSection />
    </main>
  );
};

export default Signup;
