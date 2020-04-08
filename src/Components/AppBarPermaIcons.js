import React from 'react';
import clsx from 'clsx';

// Import Mui Components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

//Import Navbar Icons
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorageIcon from '@material-ui/icons/Storage';
import SettingsIcon from '@material-ui/icons/Settings';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TimelineIcon from '@material-ui/icons/Timeline';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';

// Import Router
import {Link} from "react-router-dom";

// Import Context
import {BaseConfig} from '../Context/BaseConfigContext.js'

const drawerWidth = 240;

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
  	localStorage.removeItem("frostServerBaseConfig")
  	setBaseConfContext(null)

  }

  const handleEditMode = () => {
    setBaseConfContext({
      ...BaseConfContext,
      editMode: !BaseConfContext.editMode
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Frost Server Manager
          </Typography>
          {/* {BaseConfContext ? <Button color="inherit" style={{float: 'right'}} onClick={handleLogOut}>Logout</Button> : ""}
          {BaseConfContext ? <Button color="inherit" style={{float: 'right'}} onClick={handleEditMode}>Toggle Edit Mode</Button> : ""} */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
        <img src="https://www.tum.de/fileadmin/_processed_/3/2/csm_logo-tum_35fd07f043.png" alt="logo" width="160" height="55"/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {NavBarOptions.map((data, index) => (
            data.Name == "Logout" ?
              <>
              <ListItem onClick={handleLogOut} button key={data.Name}>
              <ListItemIcon>{data.Icon}</ListItemIcon>
              <ListItemText primary={data.Name} />
            </ListItem>
              </>
            : data.Name == "Toggle Edit Mode" ?
            <>
            <ListItem onClick={handleEditMode} button key={data.Name}>
              <ListItemIcon>{data.Icon}</ListItemIcon>
              <ListItemText primary={data.Name} />
            </ListItem>
            </> 
            :<Link to={data.Route} style={{textDecoration: 'none', color: '#000'}} >
            <ListItem button key={data.Name}>
              <ListItemIcon>{data.Icon}</ListItemIcon>
              <ListItemText primary={data.Name} />
            </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link to={"/Settings"} style={{textDecoration: 'none', color: '#000'}} >
            <ListItem button key={"Settings"}>
              <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
	      {props.children}
	  </main>
    </div>
  );
}


const NavBarOptions = [{
  Name : "Dashboard",
  Icon : <DashboardIcon />,
  Route : "/Dashboard"
},{
  Name : "Things",
  Icon : <FeaturedPlayListIcon />,
  Route : "/Things"
},{
	Name : "Sensors",
	Icon : <TouchAppIcon />,
	Route : "/Sensors"
},{
	Name : "Datastreams",
	Icon : <StorageIcon />,
	Route : "/Datastreams"
},{
	Name : "Obsevation",
	Icon : <PlaylistAddCheckIcon />,
	Route : "/Observations"
},{
	Name : "Location",
	Icon : <LocationOnIcon />,
	Route : "/Locations"
},{
	Name : "MultiDatastreams",
	Icon : <MultilineChartIcon />,
	Route : "/MultiDatastreams"
},
// {
// 	Name : "FeaturesOfInterest",
// 	Icon : <PermIdentityIcon />,
// 	Route : ""
// },
{
	Name : "HistoricalLocations",
	Icon : <TimelineIcon />,
	Route : "/HistoricalLocations"
},{
	Name : "ObservedProperties",
	Icon : <FormatAlignRightIcon />,
	Route : "/ObservedProperties"
},{
	Name : "Toggle Edit Mode",
	Icon : <EditIcon />,
},{
	Name : "Logout",
	Icon : <ExitToAppIcon />,
}
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));