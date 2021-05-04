import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    return (
        <div className="infoContainer">
            {/* {data.centers.map(each => (<h1>{each.center_id}</h1>))} */}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name of Center</StyledTableCell>
                            <StyledTableCell align="right">Age Limit</StyledTableCell>
                            <StyledTableCell align="right">Vacine Name</StyledTableCell>
                            <StyledTableCell align="right">Available Dose</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.centers.map((each) => (
                            <StyledTableRow key={each.name}>
                                <StyledTableCell component="th" scope="row">
                                    {each.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[0].min_age_limit}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[0].vaccine}</StyledTableCell>
                                <StyledTableCell align="right">{each.sessions[0].available_capacity}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InfoContainer
