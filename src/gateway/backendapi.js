import axios from 'axios'

export default axios.create({
    // baseURL: 'https://churchplusv3coreapi.azurewebsites.net/',
    // baseURL: 'https://unionfaith.azurewebsites.net/',
    baseURL: 'https://churchplusapi3v.azurewebsites.net/',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    }
})