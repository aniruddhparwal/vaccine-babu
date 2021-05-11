import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfoBlock from './InfoBlock';
import { HomeWork } from '@material-ui/icons';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function InfoContainer({ data }) {
    const [noCenter, setNoCenter] = useState(true)
    const classes = useStyles();
    // var from = data.centers[0].sessions[0].date.split("-")
    // var f = new Date(from[2], from[1] - 1, from[0])
    // console.log(f, "Date")

    useEffect(() => {
        setNoCenter(true)
        console.log(data, "Data")

        if (data) {
            data.centers.map(center => {
                if (center.sessions.length !== 0) {
                    setNoCenter(false)
                }
            })
        }
    }, [data])
    return (
        <div className="infoContainer">
            <div className="infoContainer__table">
                <div className="infoContainer__table--body">
                    {data && data.centers.map(center => {
                        if (center.sessions.length !== 0) {
                            return (<div key={center.name} className="infoContainer__table--bodyEntry">
                                <div className="infoContainer__table--body--name">
                                    <div className="infoContainer__table--body--name--name">
                                        <HomeWork /> {center.name} <div className={`${center.fee_type == "Free" ? "free" : "paid"}`}> {center.fee_type}</div>
                                    </div>
                                    <div className="infoContainer__table--body--name--address">
                                        {center.address} , {center.pincode}
                                    </div>
                                </div>
                                <div className="infoContainer__table--body--availabilty">{
                                    center.sessions.map(session => (<InfoBlock key={session.session_id} info={session} />))
                                }
                                </div>
                            </div>)
                        }
                    })}
                </div>
                {noCenter && <h1>No Center Avaliable</h1>}
            </div>
        </div >
    )
}

export default InfoContainer
