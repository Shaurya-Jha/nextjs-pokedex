import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 2000,
})

export default axiosInstance