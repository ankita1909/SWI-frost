import React from 'react'
import {BaseConfig} from '../Context/BaseConfigContext.js'
import ErrorComponent from '../Components/ErrorComponent.js'
import {FetchData} from '../data-access/request-layer.js'
import DefaultMaterialTable from '../Components/material-table'
import MultilineChartIcon from '@material-ui/icons/MultilineChart';

export default function MultiDatastreamView(props){
    // Get Bse Config From App Context
    const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)

    //Initialise State
    const [ApiData, setApiData] = React.useState(null)
    const [isError, setIsError] = React.useState(null)
    React.useEffect(() => {
        const getData = () => {
            FetchData(BaseConfContext.ApiUrls.MultiDatastreams).then(ResponseData => {
                setApiData(ResponseData)
            }).catch(e => setIsError(e.message ? e.message : e))
        }
        getData()
    }, [setApiData, setIsError])

    if(isError)
        return <ErrorComponent />
    return(
        <div>
        <MultilineChartIcon style={{fontSize: 80}} />
            <p>MultiDatastreams View is still under development, Choose a different view from navigation panel</p>
        </div>
    )
}