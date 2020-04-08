import React from 'react'
import {BaseConfig} from '../Context/BaseConfigContext.js'
import ErrorComponent from '../Components/ErrorComponent.js'
import DefaultBehaviourTable from '../Components/DefaultBehaviourTable'
import Map from '../Components/LeafletMaps'
export default function LocationsView(props){
    // Get Bse Config From App Context
    const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)

    //Initialise State
    const [ApiData, setApiData] = React.useState(null)
    const [isError, setIsError] = React.useState(null)
    const [MapPositionCoordinates, setMapPositionCoordinates] = React.useState([35, 10])
    const [MapZoom, setMapZoom] = React.useState(1.5)
    if(isError)
        return <ErrorComponent error={isError}/>

    return(
        <div>
            <Map MarkerData={ApiData} center={MapPositionCoordinates} zoom={MapZoom}/>
           <DefaultBehaviourTable Component="Locations" BaseConf={BaseConfContext} setApiData={setApiData} setMapCenter={setMapPositionCoordinates} setMapZoom={setMapZoom}/>
        </div>
    )
}