import React from 'react'
import ErrorComponent from '../Components/ErrorComponent'
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Button } from '@material-ui/core';
import './Dashboard.css'

export default function DashboardView(props) {
    const [ApiData, setApiData] = React.useState(null)
    const [isError, setIsError] = React.useState(null)

    if (isError)
        return (
            <ErrorComponent error={isError}/>
        )

    return (
        <div>
            {/* <DashboardIcon style={{fontSize: 80}} />
            <p>Dashboard View is still under development, Choose a different view from navigation panel</p> */}
            <div className="iframeDiv">
                <a href="http://grafana.hef.tum.de/login" target="_blank"><Button >Go To Grafana</Button></a>
                {/* <span className="iframeContent">
                <iframe width="100%" height="100%" style={{height:800}} frameborder="0" src="http://grafana.hef.tum.de/login"></iframe>
                </span> */}
            </div>
        </div>
    )
}
