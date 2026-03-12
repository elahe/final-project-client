import { createContext, useEffect, useMemo, useState } from "react";
import service from "../services/config.services";
import { Triangle } from 'react-loader-spinner'

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [loggedUserRole, setLoggedUserRole] = useState(null);
  const [loadingWaitVerifyToken, setLoadingWaitVerifyToken] = useState(true);
  const logout = () => {
    localStorage.removeItem("authToken"); // or whatever your token name is
    setIsLoggedIn(false);
    setLoggedUserId(null);
    setLoggedUserRole(null);
  };
    const passedContext = {
       isLoggedIn,
       setIsLoggedIn,
       loggedUserId,
       setLoggedUserId,
       loggedUserRole,
       setLoggedUserRole,
       logout
    } 
  useEffect(() => {
    verifyTokenReqClient();
  }, []);

  const verifyTokenReqClient = async () => {
  
    try {
      const response = await service.get(`/auth/verify`)  // clientSide ask server to check if the token of the user is correct or not
      console.log(response); // get user payload(info about the user like id email)
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      console.log(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);
      setLoadingWaitVerifyToken(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setLoggedUserRole(null);
      setLoadingWaitVerifyToken(false);
    }
  };
  if (loadingWaitVerifyToken) {
    // warning : should be fixed later
    return (
  <div className="flex justify-center items-center h-screen">
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#078fff"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthWrapper };
