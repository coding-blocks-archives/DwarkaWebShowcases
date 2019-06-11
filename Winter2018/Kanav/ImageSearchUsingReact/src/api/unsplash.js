import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers:{
        Authorization: 'Client-ID 05b8e2aace543400ff422c53ca191f415a57e6bc2ea8a3242cf76fb327517252'
    }
})