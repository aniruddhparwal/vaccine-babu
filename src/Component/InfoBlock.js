import { CheckCircleOutlineOutlined, ConfirmationNumberRounded, EmojiPeople, EventAvailable } from '@material-ui/icons'
import React from 'react'

function InfoBlock({ info }) {
    return (
        <div className={`infoBlock  ${info.min_age_limit == "18" ? "green" : "blue"}`}>
            <span><EventAvailable />{info.date}</span>
            <span>{info.available_capacity == 0 ? <CheckCircleOutlineOutlined /> : <div><ConfirmationNumberRounded /> {info.available_capacity}</div>}</span>
            <span>{info.vaccine}</span>
            <span><EmojiPeople /> {info.min_age_limit}+</span>
        </div>
    )
}

export default InfoBlock
