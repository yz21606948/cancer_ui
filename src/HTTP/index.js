import axios from 'axios'

let HTTP = axios.create({
    process.env.VUE_APP_ROOT_API + '/api/',
    Authorization: undefined,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default HTTP