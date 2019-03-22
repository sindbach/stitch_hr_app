import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
    fontSize: "14px",
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  }
});

function GreenButton(props) {
  const { classes } = props;
  return (
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" 
                color="primary" 
                className={classes.margin}
                onClick={props.onClick}
        >
        {props.title}
        </Button>
      </MuiThemeProvider>
  );
}

GreenButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GreenButton);
