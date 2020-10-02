import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FetchData } from '../data-access/request-layer.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MuiTableDetailedComponent(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [DatastreamProperties, setDatastreamProperties] = React.useState({});
  const [ObservationsProperties, setObservationsProperties] = React.useState({});
  const [ObservedPropertyProperties, setObservedPropertyProperties] = React.useState({});
  const [SensorProperties, setSensorProperties] = React.useState({});
  const [ThingProperties, setThingProperties] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {

    const DS = FetchData(`${props.BaseConf.BaseUrl}/Datastreams(${props.id})`).then(ResponseData => {
      setDatastreamProperties(ResponseData)
    })
    const SP = FetchData(`${props.BaseConf.BaseUrl}/Datastreams(${props.id})/Sensor`).then(ResponseData => {
      setSensorProperties(ResponseData)
    })
    const OP = FetchData(`${props.BaseConf.BaseUrl}/Datastreams(${props.id})/Observations`).then(ResponseData => {
      setObservationsProperties(ResponseData.value)
    })
    const OPP = FetchData(`${props.BaseConf.BaseUrl}/Datastreams(${props.id})/ObservedProperty`).then(ResponseData => {
      setObservedPropertyProperties(ResponseData)
    })
    const TP = FetchData(`${props.BaseConf.BaseUrl}/Datastreams(${props.id})/Thing`).then(ResponseData => {
      setThingProperties(ResponseData)
    })

    Promise.all([DS, SP, OP, OPP, TP]).catch(e => {
      console.log(e)
    })
  }, [setThingProperties, setSensorProperties, setObservedPropertyProperties, setObservationsProperties, setDatastreamProperties])
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Datastream" {...a11yProps(0)} />
          <Tab label="Thing" {...a11yProps(1)} />
          <Tab label="ObservedProperty" {...a11yProps(2)} />
          <Tab label="Sensor" {...a11yProps(3)} />
          <Tab label="Observations" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <>
        <p>ID: {DatastreamProperties["@iot.id"]}</p>
        <p>Name: {DatastreamProperties.name}</p>
          <p>Description: {DatastreamProperties.description}</p>
          <p>Observation Type: <a href={DatastreamProperties.observationType} target="_blank">{DatastreamProperties.observationType}</a></p>
          <p>Unit Of Measurement: {JSON.stringify(DatastreamProperties.unitOfMeasurement)}</p>
        </>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
        <p>ID: {ThingProperties["@iot.id"]}</p>
          <p>Name: {ThingProperties.name}</p>
          <p>Description: {ThingProperties.description}</p>
    </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
        <p>ID: {ObservedPropertyProperties["@iot.id"]}</p>
          <p>Name: {ObservedPropertyProperties.name}</p>
          <p>Description: {ObservedPropertyProperties.description}</p>
          <p>Definition: {ObservedPropertyProperties.definition}</p>
        </>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <>
      <p>ID: {SensorProperties["@iot.id"]}</p>
          <p>Name: {SensorProperties.name}</p>
          <p>Description: {SensorProperties.description}</p>
          <p>Metadata: <a href={SensorProperties.metadata} target="_blank">{SensorProperties.metadata}</a></p>
          <p>Encoding Type: {SensorProperties.encodingType}</p>
        </>
      </TabPanel>
      <TabPanel value={value} index={4}>
        {`${props.BaseConf.BaseUrl}/Datastreams(${props.id})/Observations`}
      </TabPanel>
    </div>
  );
}
