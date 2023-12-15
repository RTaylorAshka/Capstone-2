import getCurrentLocation from './locator';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.tomorrow.io/v4/weather'
})

const apiKey = import.meta.env.VITE_API_KEY

let currLocation = null
const dataHandler = (d) => {
    currLocation = `${d.coords.latitude}%20${d.coords.longitude}`
}

const errHandler = (e) => {
    console.log(e)
    return null
}

getCurrentLocation(dataHandler, errHandler)


class weatherAPI {

    static async realtimeWeather() {
        console.log(currLocation)
        if (currLocation) console.log(currLocation)



    }
}


export default weatherAPI