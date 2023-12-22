
// Displays Location/Date info
function LocationDisplay({ location, date, day }) {

    // Formatting date
    const dateFormat = {
        weekday: 'long',
        hour: 'numeric',
        hour12: true,
    }


    return (
        <div className='row d-flex align-content-end'>
            <h1 className='display-6 float-end cutoff' data-bs-toggle="tooltip" data-bs-placement="bottom" title={location['name'] || (location.lat, location.lon)}>
                {location['name'] || (location.lat, location.lon)}</h1>
            {day == 0 ?
                <p className='float-end'>{date.toLocaleString('en-US', dateFormat)}</p> :
                <></>}

        </div>
    )
}

export default LocationDisplay