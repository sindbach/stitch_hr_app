import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from "@material-ui/icons/Menu";
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: green,
      secondary: {
          main:"#fff"
      }
    },
  });

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>

        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="secondary"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
              color="secondary"
              noWrap
            >
              MongoDB Stitch Example
            </Typography>
            <div className={classes.grow} />

          </Toolbar>
        </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);