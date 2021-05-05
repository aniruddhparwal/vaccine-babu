import React from 'react'
import Lottie from 'react-lottie';
import LocationSearching from './../Lottie Files/LocationSearching.json';
import locationDenied from './../Lottie Files/LocationDenied.json'

function LocationWaiting({ locationCheck, setLocationAvailable }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LocationSearching,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const deniedOptions = {
        loop: true,
        autoplay: true,
        animationData: locationDenied,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="locationWaiting">
            {locationCheck ? <div className="locationWaiting__denied">
                <Lottie
                    className="locationWaiting__denied--denied"
                    options={deniedOptions}
                    height={200}
                    width={200}
                />
                <h1>location Denied</h1>
                <button onClick={() => setLocationAvailable(true)}> Self Entry</button>
            </div>
                : <div className="locationWaiting__wait">
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                    <h1>Waiting for location</h1></div>}
        </div>
    )
}

export default LocationWaiting
