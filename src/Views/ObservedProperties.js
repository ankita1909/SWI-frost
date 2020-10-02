import React from 'react'
import {BaseConfig} from '../Context/BaseConfigContext.js'
import ErrorComponent from '../Components/ErrorComponent.js'
import DefaultBehaviourTable from '../Components/DefaultBehaviourTable'

export default function ObservedPropertiesView(props){
    // Get Bse Config From App Context
    const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)

    //Initialise State
    const [isError, setIsError] = React.useState(null)

    if(isError)
        return <ErrorComponent error={isError}/>

    return(
        <div>
           <DefaultBehaviourTable Component="ObservedProperties" BaseConf={BaseConfContext} />
        </div>
    )
}