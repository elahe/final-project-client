import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";


const AuthContext = createContext()

function AuthWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [loggedUserRole, setLoggedUserRole] = useState(null)
    const [loadingWaitVerifyToken, setLoadingWaitVerifyToken]= useState(true)
    const passedContext = {
       isLoggedIn,
       setIsLoggedIn,
       loggedUserId,
       setLoggedUserId,
       loggedUserRole,
       setLoggedUserRole
    }
    useEffect(()=>{
        verifyTokenReqClient()
    },[])

    const verifyTokenReqClient = async()=>{

      const token = localStorage.getItem("authToken")
      console.log(token)


      // if (!token) {
      //   setIsLoggedIn(false)
      //   return
      // }
        try {
          const response = await service.get(`/auth/verify`, {
            headers: {
              authorization: `Bearer ${token}`
            }
          })

            // const response = await service.get(`/auth/verify`)  // clientSide ask server to check if the token of the user is correct or not 
            console.log(response) // get user payload(info about the user like id email)
            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            console.log(response.data.payload._id)
            setLoggedUserRole(response.data.payload.role)
            setLoadingWaitVerifyToken(false)
        } catch (error) {
            console.log(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setLoggedUserRole(null)
            setLoadingWaitVerifyToken(false)
        }
    }
  if(loadingWaitVerifyToken){   // warning : should be fixed later
    return <h2>...Waiting the verification of the user</h2>
  }
  return(
    <AuthContext.Provider value={passedContext}>
        {props.children}
    </AuthContext.Provider>
  )


}
export {
  AuthContext,
  AuthWrapper
}