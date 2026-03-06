import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
export default function Login() {
        const navigate = useNavigate()
        const [email,setEmail] =useState("")
        const [password,setPassword] =useState("")
        const [errorMessage, setErrorMessage] = useState(null)
        

        const {setIsLoggedIn, setLoggedUserId, setLoggedUserRole} =useContext(AuthContext)

        const handleSubmit = async(e)=> {
            e.preventDefault()
    
            if(!email || !password){
                setErrorMessage("All fields are required (email, password)")
                return
            }
            const body ={
                email,
                password
            }
    
            try {
                const response = await service.post(`/auth/login`,body)
                console.log("you are loggedIn",response)
                //navigate(/products)

                localStorage.setItem("authToken", response.data.authToken)
                 // update the context states
                setIsLoggedIn(true)
                setLoggedUserId(response.data.payload._id)
                setLoggedUserRole(response.data.payload.role)
            } catch (error) {
                console.log(error)
                if (error.response.status === 400) {
                    console.log(error.response.data.errorMessage)
                    setErrorMessage(error.response.data.errorMessage) // error coming from the BE
                } else {
                    // navigate to error page
                    navigate("/not-found")
                }
            }
    
    
        }
    
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button type='submit'>login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    </>
  )
}
