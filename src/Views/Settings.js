import React from 'react'
import { FetchData } from '../data-access/request-layer'
import ErrorComponent from '../Components/ErrorComponent.js'
import SettingsIcon from '@material-ui/icons/Settings';

export default function SettingsView(props) {
    const [ApiData, setApiData] = React.useState(null)
    const [isError, setIsError] = React.useState(null)

    if (isError)
        return (
            <ErrorComponent />
        )

    return (
        <div>
            <SettingsIcon style={{fontSize: 80}} />
            <p>Settings View is still under development, Choose a different view from navigation panel</p>
        </div>
    )
}
