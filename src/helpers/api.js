import axios from 'axios';

// Base url of the tomorrow api
const instance = axios.create({
    baseURL: 'https://api.tomorrow.io/v4'
})

// API key from .env file
const apiKey = import.meta.env.VITE_API_KEY






class weatherAPI {


    // Returns realtime weather data from API, for purpose of getting more location data
    static async realtime(location, system) {
        ``
        let error = null
        let res = await instance.get(`/weather/realtime?apikey=${apiKey}&location=${location}&units=${system}`).catch((e) => { error = e })

        // If we catch an error, return the error
        return error ? error : res.data


    }

    // Returns weatherCodes, temperature and precipitation data
    static async timeline(location, system) {
        let error = null

        // Specifying what type of data, units and timesteps of data we need from api
        let data = {
            "location": location,
            "fields": [
                "temperature",
                "temperatureMax",
                "temperatureMin",
                "precipitationProbability",
                "weatherCodeFullDay"
            ],
            "units": system,
            "timesteps": [
                "1h",
                "1d"
            ],
            "startTime": "now",
            "endTime": "nowPlus5d",
            "timezone": "auto"
        }

        let res = await instance.post(`/timelines?apikey=${apiKey}`, data).catch((e) => { error = e })

        // If we catch an error, return the error
        return error ? error : res.data
    }
}


export default weatherAPI