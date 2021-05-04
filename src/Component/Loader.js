import React from 'react'
import loaderimage from '../images/loader.png'

function Loader() {
    return (
        <div className="loader">
            <img src={loaderimage} />
            <h1>Loading....</h1>
        </div>
    )
}

export default Loader
