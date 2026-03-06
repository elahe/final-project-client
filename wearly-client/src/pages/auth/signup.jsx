import axios from 'axios'
import React from 'react'
import { useState } from 'react'

export default function signup() {
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [role,setRole] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async(e)=> {
        e.preventDefault()

        if(!name || !email || !password){
            setErrorMessage("All fields are required (email, password, name)")
            return
        }
        const body ={
            name,
            email,
            password,
            role
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,body)
            console.log("you are registered",response)
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                console.log(error.response.data.errorMessage)
                setErrorMessage(error.response.data.errorMessage) // error coming from the BE
            } else {
                // navigate to error page
            }
        }


    }

    
  return (
    <>
    <form onSubmit={handleSubmit}>
        <label>
            <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
            <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <label>
          Role
          <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="stylist">Stylist</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <button>signup</button>
         {errorMessage && <p>{errorMessage}</p>}

    </form>
        
    </>
  )
}
