import React from 'react'
import { useParams, useRouteMatch, useLocation } from 'react-router';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PincodeWise() {
    let { url } = useRouteMatch();
    let { pincode } = useParams();
    let ani = useQuery();
    return (
        <div className="pincodeWise">
            {pincode}
            {ani.get("ani")}
        </div>
    )
}

export default PincodeWise
