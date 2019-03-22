import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'green',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, position, manager, email, salary) {
  id += 1;
  return { id, name, position, manager, email, salary };
}


function CustomizedTable(props) {
  const rows = [];
  const { classes } = props;
  var i;
  for (i = 0; i < props.data.length; i++) { 
    rows.push(createData(props.data[i]['name'], 
                        props.data[i]['position'],
                        props.data[i]['manager'],
                        props.data[i]['email'],
                        props.data[i]['salary'],));
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell>Role</CustomTableCell>
            <CustomTableCell>Manager</CustomTableCell>
            <CustomTableCell>Email</CustomTableCell>
            <CustomTableCell>Salary</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">{row.name}</CustomTableCell>
                <CustomTableCell>{row.position}</CustomTableCell>
                <CustomTableCell>{row.manager}</CustomTableCell>
                <CustomTableCell>{row.email}</CustomTableCell>                
                <CustomTableCell>{row.salary}</CustomTableCell>                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);