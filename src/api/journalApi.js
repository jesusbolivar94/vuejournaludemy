import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-7aab7-default-rtdb.firebaseio.com'
})

export default journalApi