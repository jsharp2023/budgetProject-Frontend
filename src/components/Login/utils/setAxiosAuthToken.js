import Axios from './Axios'

const setAxiosAuthToken = (jwtToken) => {
    if(jwtToken){
        console.log('hello')
        Axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    }else{
        console.log('8')
        delete Axios.defaults.headers.common['Authorization']
    }
}


export default setAxiosAuthToken