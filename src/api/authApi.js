import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyBFhtclvCt1wr4R1I-GOJcy5DDV1xh2vLg'
    }
})

export default authApi