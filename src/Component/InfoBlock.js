import React from 'react'

function InfoBlock({ info }) {
    return (
        <div className="infoBlock">
            <span>{info.available_capacity}</span>
            <span>{info.vaccine}</span>
            <span>Age {info.min_age_limit}+</span>
        </div>
    )
}

export default InfoBlock
