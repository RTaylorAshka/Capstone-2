import SearchModal from "./SearchModal"
import getCurrentLocation from "./helpers/locator"
import weatherAPI from "./helpers/api"
import { useEffect, useState } from "react"

function SearchOptions({ updateLocation, position, forcast }) {
    // Stores current location
    let [curr, setCurr] = useState(null)

    // Stores status of finding current location
    let [status, setStatus] = useState('Searching...')

    // Called if geolocation API successfully gets location data
    const dataHandler = (d) => {
        let newCoords = `${d.coords.latitude} ${d.coords.longitude}`
        setCurr(newCoords)
        setStatus('Current location')

    }

    // Called if geolocation API fails to get location data
    const errHandler = (e) => {
        console.log(e)
        setCurr(null)
        setStatus('Location not found')


    }

    // Call geolocation API on loading
    useEffect(() => {
        getCurrentLocation(dataHandler, errHandler)
    }, [])


    // Get value of search and send to app to get weather data of location
    function handleSubmit(e) {
        e.preventDefault()
        let newLocation = document.getElementById('location-input').value
        updateLocation(newLocation)
    }

    // Toggle search bar
    function collapse() {
        setTimeout(() => {

            document.getElementById('search-toggle').dispatchEvent(new Event('click'))
        }, 1000)

    }


    return (

        <ul className={`list-group list-group-horizontal clear sharp justify-content-${position}`}>

            <li className="list-group-item clear p-0 clamp-height">

                <form onSubmit={handleSubmit}>
                    <button className="btn text-light" id='search-toggle' type="button" data-bs-toggle="collapse" data-bs-target="#search"  >
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </button>
                    <div className="collapse collapse-horizontal clp" id='search' >
                        <input id="location-input" type="text" className=' ' placeholder='Search Locations' onBlur={collapse} />

                        <a href="javascript:;" className='ms-2 text-info' data-bs-toggle="modal" data-bs-target="#formatModal">
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </a>
                    </div>
                </form>


                <SearchModal />




            </li>
            <li className="list-group-item clear p-0 ">
                <button className='btn text-light' onClick={() => { if (curr) updateLocation(curr) }}>
                    <span className="material-symbols-outlined ">
                        my_location
                    </span>
                    <span className='align-top ps-1 '>{status}</span>
                </button>
            </li>
        </ul>

    )
}

export default SearchOptions