import {jwtDecode} from 'jwt-decode'

const checkIfUserIsAuth = () => {
    //check if token exists
    //if does, check exp
    //if exp, return false
    //else true
    const jwt = window.localStorage.getItem('jwt')//grabs from local storage
    const currentUser = jwt ? jwtDecode(jwt) : null//decodes if exist
    if(currentUser && currentUser.exp > (Date.now()/1000)){
        return true
    }else{
        return false
    }
}

export default checkIfUserIsAuth