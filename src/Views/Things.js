import React from 'react'
import { BaseConfig } from '../Context/BaseConfigContext.js'
import ErrorComponent from '../Components/ErrorComponent.js'
import DefaultBehaviourTable from '../Components/DefaultBehaviourTable'
import CustomizedModal from '../Components/MuiModal'
import SearchableDropdown from '../Components/SearchableDropdown'
import Button from '@material-ui/core/Button';
import { FetchData, PostData } from '../data-access/request-layer'
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';

function ThingsView(props) {
  // Get Bse Config From App Context
  const { BaseConfContext, setBaseConfContext } = React.useContext(BaseConfig)

  //Initialise State
  const [ApiData, setApiData] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const [ObservedPrpertyData, setObservedPrpertyData] = React.useState(null)
  const [ConnectSensorFormData, setConnectSensorFormData] = React.useState({
    "name": "",
    "description": "",
    "observationType": "",
    "unitOfMeasurement": {
      "symbol": "",
      "name": "",
      "definition": ""
    },
    "Thing": {
      "@iot.id": ""
    },
    "ObservedProperty": {
      "@iot.id": ""
    },
    "Sensor": {
      "@iot.id": ""
    }
  })
  const [SearchableDropdownData, setSearchableDropdownData] = React.useState({
    Sensor: [],
    ObservedProperty: [],
    Thing: ApiData,
    unitOfMeasurement:[]
  })
  const [ConnectSensorModal, setConnectSensorModal] = React.useState({
    open: false
  })

  const handleConnectSensorModalClose = () => {
    setConnectSensorModal({ ...ConnectSensorModal, open: false })
  }

  const handleConnectSensorModalOpen = () => {
    setConnectSensorModal({ ...ConnectSensorModal, open: true })
  }

  const handleConnectSensor = () => {

    PostData(BaseConfContext.ApiUrls.Datastreams, ConnectSensorFormData).then(response => {
      props.enqueueSnackbar(`Success`, {
        variant: 'success',
      })
    }).catch(e => {
      props.enqueueSnackbar(`Error: ${e}`, {
        variant: 'error',
      })
    }).finally(() => {
      setConnectSensorModal({ ...ConnectSensorModal, open: false })
    })
  }

  const getObservedProperties = id => {
    FetchData(`${BaseConfContext.BaseUrl}/Sensors(${id})/Datastreams`).then(ResponseData => {
      const ObservedPropertyData = ResponseData.value
      setSearchableDropdownData({ ...SearchableDropdownData, ObservedProperty: ObservedPropertyData })
    }).catch(e => setIsError(e.message ? e.message : e + "While calling ObservedProperty Api"))
  }

//   const getSensors = id => {
//     FetchData(`${BaseConfContext.ApiUrls.Sensors}?$count=true`).then(ResponseData => {
//       setSearchableDropdownData({ ...SearchableDropdownData, Sensor: ResponseData.value })
//     }).catch(e => setIsError(e.message ? e.message : e +"While calling Sensor Api"))
// }

React.useEffect(() => {
  const getData = () => {
    FetchData(`${BaseConfContext.ApiUrls.Sensors}?$count=true`).then(ResponseData => {
      setSearchableDropdownData({ ...SearchableDropdownData, Sensor: ResponseData.value })
    }).catch(e => setIsError(e.message ? e.message : e +"While calling Sensor Api"))
  }
  getData()
}, [setSearchableDropdownData, setIsError])

  if (isError)
    return <ErrorComponent error={isError} />

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: 4, marginTop: -4 }}>
        <Button disabled={!ApiData} variant="contained" color="primary" onClick={handleConnectSensorModalOpen}>
          Connect A Sensor
        </Button>
      </div>
      <CustomizedModal open={ConnectSensorModal.open} title="Connect A Sensor" handleClose={handleConnectSensorModalClose}
        children={<>
          <SearchableDropdown
            style={{ display: 'inline-block' }}
            id="choose-sensor"
            options={ApiData}
            label="Choose A Thing"
            // value={ConnectSensorFormData.Thing["@iot.id"]}
            onChange={(event, newValue) => {
              // getSensors()
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                Thing: {
                  "@iot.id": newValue["@iot.id"]
                }
              })
            }}
          />
          <SearchableDropdown
            style={{ display: 'inline-block' }}
            id="choose-sensor"
            options={SearchableDropdownData.Sensor}
            label="Choose A Sensor"
            value={ConnectSensorFormData.Sensor["@iot.id"]}
            onChange={(event, newValue) => {
              getObservedProperties(newValue["@iot.id"])
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                Sensor: {
                  "@iot.id": newValue["@iot.id"]
                }
              })
            }}
          />
          <SearchableDropdown
            id="choose-obs-prop"
            options={SearchableDropdownData.ObservedProperty}
            label="Choose an Onserved Property"
            value={ConnectSensorFormData.ObservedProperty["@iot.id"]}
            onChange={(event, newValue) => {
              setSearchableDropdownData({
                ...SearchableDropdownData,
                unitOfMeasurement: [newValue.unitOfMeasurement, {name : "Enter Manually"}]
              })
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                ObservedProperty: {
                  "@iot.id": newValue["@iot.id"]
                }
              })
            }}
          />
          <SearchableDropdown
            id="choose-unit-mesurement"
            options={SearchableDropdownData.unitOfMeasurement}
            label="Choose the unit of measurement"
            value={ConnectSensorFormData.unitOfMeasurement.name}
            onChange={(e, newValue) => {
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                unitOfMeasurement: {
                  ...ConnectSensorFormData.unitOfMeasurement,
                  name: newValue.name
                }
              })
            }}
          />
          <SearchableDropdown
            id="choose-obs-type"
            options={[{ name: "Category Observation" }, { name: "Count Observation" }, { name: "Truth Observation" }, { name: "Measurement" }, { name: "Observation" }]}
            label="Select Observation Type"
            value={ConnectSensorFormData.observationType.name}
            onChange={(event, newValue) => {
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                observationType: newValue.name
              })
            }}
          />
          <TextField value={ConnectSensorFormData.name}
            onChange={(e) => {
              setConnectSensorFormData({
                ...ConnectSensorFormData,
                name: e.target.value
              })
            }} id="connectsensor-name" style={{ width: '100%', margin: 4 }} label="Name" variant="standard" />
          <TextField value={ConnectSensorFormData.description} onChange={(e) => {
            setConnectSensorFormData({
              ...ConnectSensorFormData,
              description: e.target.value
            })
          }} id="connectsensor-description" style={{ width: '100%', margin: 4 }} label="Description" variant="standard" />
        </>
        }
        footer={
          <>
            <Button autoFocus onClick={(e) => { window.location.href = "/Sensors" }} color="primary">
              Add New Sensor
                  </Button>
            <Button autoFocus onClick={handleConnectSensor} color="primary">
              Connect This Sensor
                  </Button>
          </>
        }
      />
      <DefaultBehaviourTable Component="Things" BaseConf={BaseConfContext} setApiData={setApiData} />
    </div>
  )
}

export default withSnackbar(ThingsView)