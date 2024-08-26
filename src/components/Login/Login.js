import { useState } from "react"
import Axios from '../utils/Axios'
import {jwtDecode} from 'jwt-decode'
import setAxiosAuthToken from "../utils/setAxiosAuthToken"

function Login({handleUserLogin}) {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleOnSubmit = async (e)=>{
      e.preventDefault()
      try {
        const response = await Axios.post('/api/user/login',
          {
            email: email, password: password
          })
          
          window.localStorage.setItem('jwt', response.data.payload)
          setAxiosAuthToken(response.data.payload)
          const decodedJwt = jwtDecode(response.data.payload)
          console.log(handleUserLogin)
          handleUserLogin({
            email: decodedJwt.email,
            username: decodedJwt.username,
            id: decodedJwt.id
          })
          setEmail("")
            setPassword("")
      } catch (error) {
        console.log(error)
      }
  }


    return (
      <div className="container">
          <div className="form-text">Login</div>
          <div className="form-div">
            <form className="form" onSubmit={handleOnSubmit}>
              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="email">Email</label>
                  <input 
                      type="text" 
                      id="email" 
                      placeholder='Email' 
                      name="email"
                      onChange={(e)=> setEmail(e.target.value)}
                      value={email}
                      />
                </div>
              </div>
              <div className="form-group-block">
                <div className="block-container">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                      onChange = {(e)=> setPassword(e.target.value)}
                      value={password}
                    />
                </div>
              </div>
              <div className="button-container">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
  
  export default Login