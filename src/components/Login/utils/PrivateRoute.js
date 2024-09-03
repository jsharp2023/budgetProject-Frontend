import checkIfUserIsAuth from "./utils/checkIfUserIsAuth"
import {Navigate} from 'react-router-dom'

function PrivateRoute({children}){
   if(checkIfUserIsAuth()){
    return children
   }else{
    //force somebody to sign in
    return <Navigate to={'/login'}/>
   }
}

export default PrivateRoute