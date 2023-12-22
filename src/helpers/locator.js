


// Use built-in geolocation api to get user location.
const getCurrentLocation = (dataHandler, errHandler) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(dataHandler, errHandler)
    } else {
        errHandler({ code: -1, message: "Geolocation is not supported by this browser." });
    }
}



export default getCurrentLocation