import { useEffect, useState } from 'react'
import HeaderButtons from './HeaderButtons'
import './App.css'
import SearchOptions from './SearchOptions'
import weatherAPI from './helpers/api'
import ConditionDisplay from './ConditionDisplay'
import LocationDisplay from './LocationDisplay'
import DataLineChart from './DataLineChart'






function App() {

  // Stores system of measurement, "metric" or "imperial"
  let [system, setSystem] = useState('metric')

  // Stores name and/or coords of forcast
  let [location, setLocation] = useState(null)

  // Stores an array of weather data 
  let [forcast, setForcast] = useState(null)

  // Stores index of currently displayed day in forcast
  let [day, setDay] = useState(0)

  // Stores which array of weather data the line chart is displaying, "tempData" or "preData"
  let [displayMode, setDisplayMode] = useState('tempData')

  // Stores recieved error
  let [error, setError] = useState(null)

  // Stores loading boolean, toggles loading screen
  let [loading, setLoading] = useState(false)

  // If error set: alert user of error, clear error and cancel any loading
  useEffect(() => {
    if (error) {
      alert(`Error ${error.status}: ${error.msg}`)
      setError(null)
      setLoading(false)
    }

  }, [error])

  // If user changes between metric and imperial system while viewing a forcast: delete forcast, re-request forcast with the new system
  useEffect(() => {
    if (forcast) {
      setForcast(null)
      updateLocation()
    }

  }, [system])

  // Toggle unit systems
  function updateSystem() {
    setSystem(system == 'imperial' ? 'metric' : 'imperial')

  }

  // Deal with an error specifically passed from the api
  function handleAxiosErr(e) {
    setError({
      status: e.response.status,
      msg: e.response.data.message
    })
  }

  // Sets to loading, calls api for location and weather data. Passes data to updateForcast() or handles any errors.
  async function updateLocation(loc = `${location.lat} ${location.lon}`) {

    setLoading(true)
    try {
      let realtime = await weatherAPI.realtime(loc, system)
      let weatherData = await weatherAPI.timeline(loc, system, Intl.DateTimeFormat().resolvedOptions().timeZone)

      // If data has 'response' the api passed an axios error. Send error to Axios error handler to extract the message.
      if (realtime['response']) handleAxiosErr(realtime)
      else if (weatherData['response']) handleAxiosErr(weatherData)
      else {
        // Get location data, set location, pass weather data to updateForcast() for processing
        let { lat, lon, name } = realtime.location
        console.log(weatherData)
        setLocation({ lat, lon, name })
        updateForcast(weatherData)
      }




    } catch (e) {

      // Backup error handling
      setError({
        status: 404,
        msg: 'something went wrong retrieving your data'
      })


    }

  }

  // Processes weather data into an array of objects for react elements to use. Set forcast to array.
  function updateForcast(weatherData) {
    // Base array to work on
    let newForcast = [{}]

    // Initialize object for new day in forcast
    let dayInit = (date) => {
      return ({
        weatherCode: weatherData.data.timelines[0].intervals[dateIdx].values.weatherCodeFullDay,
        tempMax: weatherData.data.timelines[0].intervals[dateIdx].values.temperatureMax,
        tempMin: weatherData.data.timelines[0].intervals[dateIdx].values.temperatureMin,
        date: new Date(date),
        timeStamps: [],
        tempData: [],
        precData: []
      })
    }

    // Formats date obj into timestamps for line chart
    let formatTime = (hours) => {

      return `${hours % 12 === 0 ? 12 : hours % 12}${hours > 12 ? 'PM' : 'AM'}`

    }

    // Idx of current obj or "day" the following for loop should be adding values to in newForcast array.
    let dateIdx = 0
    weatherData.data.timelines[1].intervals.forEach((v, i) => {

      // If no date key in current obj, call dayInit to set base keys/values
      if (!newForcast[dateIdx].hasOwnProperty('date')) {
        newForcast[dateIdx] = dayInit(v.startTime)
      }
      // If a value's date is on a different day than current obj make a new obj. Set dateIdx to this new obj and initialize base keys/values.
      else if (newForcast[dateIdx].date.toLocaleDateString() !== new Date(v.startTime).toLocaleDateString()) {
        newForcast.push({})
        dateIdx++
        newForcast[dateIdx] = dayInit(v.startTime)
      }

      // Format time for the line chart
      let timeStamp = formatTime(new Date(v.startTime).getHours())

      // Pushing new data to arrays in current obj
      newForcast[dateIdx].timeStamps.push(timeStamp)
      newForcast[dateIdx]['precData'].push(v.values.precipitationProbability)
      newForcast[dateIdx]['tempData'].push(v.values.temperature)

      // Forcast for the first day should start at the current hour and end 24 hours later. 
      // If we have hit the following day in our data but do not have enough 24 in forcast of first day (very likely), append this data to the first day as well.
      if ((newForcast[0].timeStamps.length < 24) && (dateIdx != 0)) {
        newForcast[0].timeStamps.push(timeStamp)
        newForcast[0]['precData'].push(v.values.precipitationProbability)
        newForcast[0]['tempData'].push(v.values.temperature)
      }



    })


    // Last day may not have enough data yet worth making a report. Remove from forcast if that's the case.
    if (newForcast[newForcast.length - 1].timeStamps.length < 12) {
      newForcast.pop()
    }

    // Remove loading screen and set the new forcast
    setLoading(false)
    setForcast(newForcast)

  }



  return (
    <>



      <div className='container-fluid fill-height d-flex flex-column'>


        <HeaderButtons light={false} system={system} updateSystem={updateSystem} />

        <div className='row p-3 ps-5 pe-5'>


          {forcast ?
            <>


              <ConditionDisplay system={system} data={forcast[day]} day={day} />
              <div className='col-6 text-end'>
                <div className='row d-flex align-content-end'>
                  <SearchOptions updateLocation={updateLocation} position={'end'} />
                </div>


                <LocationDisplay location={location} date={forcast[day].date} day={day} />
              </div>

            </>

            : <></>
          }






        </div>

        <div className='row flex-fill d-flex align-content-end mb-3'>
          <div className='container-fluid m-0 p-0 h-75'>

            {!forcast ?

              <>
                {loading ?

                  <div className='container-fluid fill-height d-flex flex-column'>
                    <div className='row d-flex align-items-center align-content-center justify-content-center text-center '>

                      <div className='mt-auto mb-auto'>
                        <h1 className='display-1'>Loading</h1>
                        <span class="spinner-grow text-info"></span>
                        <span class="spinner-grow text-info"></span>
                        <span class="spinner-grow text-info"></span>
                      </div>


                    </div>
                  </div>

                  :

                  <div className='container-fluid fill-height d-flex flex-column'>
                    <div className='row d-flex align-items-center align-content-center justify-content-center text-center '>

                      <div className='mt-auto mb-auto'>
                        <img className='w-25 mb-3' src='Powered_by_Tomorrow-White.png' />
                        <SearchOptions updateLocation={updateLocation} position={'center'} />
                      </div>


                    </div>
                  </div>
                }


              </>
              :

              <div className='card clear sharp m-0 h-100'>
                <div className='card-header ms-2 clear'>
                  <div className='btn-group ms-4'>

                    {/* Buttons toggle line chart between showing temperature and precipitation data */}
                    <button className={`btn btn-light ${displayMode != 'tempData' ? '' : 'disabled'}`}
                      onClick={() => setDisplayMode('tempData')}>Temperature</button>
                    <button className={`btn btn-light ${displayMode != 'precData' ? '' : 'disabled'}`}
                      onClick={() => setDisplayMode('precData')}>Precipitation</button>
                  </div>
                </div>

                {/* Line chart for weather data */}
                <DataLineChart data={forcast[day]} mode={displayMode} system={system} />

              </div>
            }







          </div>


          {/* Buttons for switching between days of forcast */}
          {
            forcast ?
              <div className="btn-group m-0 p-0 h-25">
                {forcast.map((v, i) =>
                  <button key={i} type="button" className="btn sharp btn-primary" onClick={() => setDay(i)}>{v.date.toLocaleString('en-US', { weekday: 'long' })}</button>
                )}

              </div>
              :
              <></>
          }


        </div>






      </div >



    </>
  )
}

export default App
