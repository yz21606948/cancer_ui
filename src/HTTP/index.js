import axios from 'axios'

let HTTP = axios.create({
    baseURL: 'http://localhost:8001/api/',
    Authorization: undefined,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default HTTP