import React from 'react'
import { useParams, useRouteMatch } from 'react-router';

function StateList() {
    let { url } = useRouteMatch();
    let { state, district } = useParams();
    return (
        <div className="stateList">
            {state}
            {url}
            {district}
        </div>
    )
}

export default StateList
