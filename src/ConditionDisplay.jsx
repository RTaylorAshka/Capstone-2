import weatherCodes from "./helpers/weatherCodes"

// Displays current temp or min/max temps and weather code
function ConditionDisplay({ system, data, day }) {

    let tempSymbol = system == 'imperial' ? '°F' : '°C'
    return (
        <div className='col-6'>

            {day == 0 ?
                <span className='display-1'>{`${data.tempData[0]}${tempSymbol}`}</span>
                :
                <span className='display-3'>{`${data.tempMax}${tempSymbol} ⇅ ${data.tempMin}${tempSymbol}`}</span>}
            <h1 className='display-6'>{weatherCodes.weatherCodeFullDay[data.weatherCode]}</h1>
        </div>
    )
}

export default ConditionDisplay