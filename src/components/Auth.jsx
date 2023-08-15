import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../style/auth.css";

const cookies = new Cookies();
export const Auth = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="auth">
        <div className="chatApp">
          <h1>SpaceChat</h1>
        </div>
        <p> Sign in with Google to continue</p>
        <button onClick={signInWithGoogle}>Sign In</button>
      </div>
    </>
  );
};
