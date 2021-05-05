import React from 'react'

function LocationWaiting({ locationCheck, setLocationAvailable }) {
    return (
        <div className="locationWaiting">
            {locationCheck ? <div><h1>location Denied</h1>
                <button onClick={() => setLocationAvailable(true)}> Self Entry</button>
            </div>
                : <h1>Location Waiting</h1>}
        </div>
    )
}

export default LocationWaiting
