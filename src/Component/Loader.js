import React from 'react'
import loaderimage from '../images/loader.png'
import Lottie from 'react-lottie';
import CovidVaccine from './../Lottie Files/covidVaccine.json';

function Loader({ district }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: CovidVaccine,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="loader">
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
            {/* <img src={loaderimage} /> */}
            {district ? <h1>Loading....</h1> : <h1>Select Location from dropdown</h1>}
        </div>
    )
}

export default Loader
