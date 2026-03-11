import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import service from '../../services/config.services'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [name,setName] =useState("")
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [role,setRole] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async(e)=> {
        e.preventDefault()

        if(!name || !email || !password || !role){
            setErrorMessage("All fields are required (email, password, username)")
            return
        }
        const body ={
            name,
            email,
            password,
            role
        }

        try {
            const response = await service.post(`/auth/signup`,body)
            console.log("you are registered",response)
            navigate("/login")
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Signup
        </h2>

        <label className="block">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block text-gray-600">
          Role
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="stylist">select</option>
            <option value="stylist">Stylist</option>
            <option value="customer">Customer</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Signup
        </button>

        {errorMessage && (
          <>
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>

            <span className="block text-center">
              <Link
                to={`/login`}
                className="text-blue-500 hover:underline font-medium"
              >
                Login
              </Link>
            </span>
          </>
        )}
      </form>
    </div>
  </>
)
}
