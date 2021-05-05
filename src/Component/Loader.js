import React from 'react'
import loaderimage from '../images/loader.png'

function Loader({ district }) {
    return (
        <div className="loader">
            <img src={loaderimage} />
            {district ? <h1>Loading....</h1> : <h1>Select Location from dropdown</h1>}
        </div>
    )
}

export default Loader
