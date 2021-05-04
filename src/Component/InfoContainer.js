import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfoBlock from './InfoBlock';


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
    const classes = useStyles();
    var from = data.centers[0].sessions[0].date.split("-")
    var f = new Date(from[2], from[1] - 1, from[0])
    console.log(f, "Date")
    console.log(data, "Data")
    return (
        <div className="infoContainer">
            {/* {data.centers.map(each => (<h1>{each.center_id}</h1>))} */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell>Name of Center</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate()}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 1}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 2}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 3}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 4}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 5}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${f.getDate() + 6}-${f.getMonth()}-${f.getFullYear()}`}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.centers.map((each) => (
                            <StyledTableRow key={each.name}>
                                <StyledTableCell component="th" scope="row">
                                    {each.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[0] ? <InfoBlock info={each.sessions[0]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[1] ? <InfoBlock info={each.sessions[1]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[2] ? <InfoBlock info={each.sessions[2]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[3] ? <InfoBlock info={each.sessions[3]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[4] ? <InfoBlock info={each.sessions[4]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[5] ? <InfoBlock info={each.sessions[5]} /> : <>NAN</>}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[6] ? <InfoBlock info={each.sessions[6]} /> : <>NAN</>}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default InfoContainer
