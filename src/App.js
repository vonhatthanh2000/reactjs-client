import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/userStore";

function App() {
  const setAuthData = useStore((state) => state.setAuthData);

  return (
    <div className="App">
      <h1>Welcome</h1>
      <GoogleOAuthProvider clientId="764611206424-jp41753hn12gb0r0ruih2431hkbp9j4g.apps.googleusercontent.com">
        <GoogleLogin
          useOneTap={true}
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            const { data } = await axios
              .post("http://localhost:3001/auth/google/login", {
                credential: credentialResponse.credential,
                clientId: credentialResponse.clientId,
              })
              .then(function (response) {
                console.log(response);
              });
            localStorage.setItem("AuthData", JSON.stringify(data));
            setAuthData(data);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
