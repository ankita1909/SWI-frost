import React from 'react'
import ErrorComponent from './ErrorComponent.js'
import {FetchData} from '../data-access/request-layer.js'
import DefaultMaterialTable from './material-table'
import {TableColumnsToDisplay} from '../data-access/TableColumns'
import CustomLoader from './Loader'
import DetailsPopover from './Popover'

export default function DefaultBehaviourTable(props) {
	const [ApiData, setApiData] = React.useState(null)
    const [isError, setIsError] = React.useState(null)
    const [MuiTableData, setMuiTableData] = React.useState({
        Columns : [],
        Rows: []
    })
	const [ShowDetailsPopover, setDetailsPopover] = React.useState(null);
    const [DetailsPopoverDataUrl, setDetailsPopoverDataUrl] = React.useState(null)

    const handleDetailsPopoverClick = (event, dataUrl) => {
        setDetailsPopoverDataUrl(dataUrl)
        setDetailsPopover(event.currentTarget);
    };

    const handleDetailsPopoverClose = () => {
        setDetailsPopover(null);
        if(props.setMapZoom)
            props.setMapZoom(1.5)
        if(props.setMapCenter)
            props.setMapCenter([35, 10])
    };

    React.useEffect(() => {
        const getData = () => {
            FetchData(props.BaseConf.ApiUrls[props.Component]).then(ResponseData => {
                setApiData(ResponseData.value)
                if(props.setApiData)
                    props.setApiData(ResponseData.value)
                let tColumns = TableColumnsToDisplay[props.Component].reduce((a, c) => {
                    if (c == "@iot.selfLink")
                        a.push({ title: c.toUpperCase(), field: c.replace(/ /g, ""), render: rowData => <a style={{cursor:'pointer'}} target="_blank" onClick={e => handleDetailsPopoverClick(e, rowData['@iot.selfLink'])}>View</a>, })
                    else a.push({ title: c.toUpperCase(), field: c.replace(/ /g, "") })
                    return a
                }, [])
                let tRows = ResponseData.value.reduce((a, c) => {
                let curr = {}
                Object.keys(c).map(e => {
                    try{
                        if (TableColumnsToDisplay[props.Component].includes(e))
                        if (c[e] != null && typeof (c[e]) == "object") {
                            let Val = Object.keys(c[e]).reduce((a, b) => {
                                a += b.toString() + ": " + c[e][b].toString() + ", "
                                return a
                            }, "")
                            curr[e] = Val
                        }
                        else
                            curr[e] = c[e]
                    }catch(e) {
                        console.error(e)
                    }
                    })
                    a.push(curr)
                    return a
                }, [])
                setMuiTableData({Columns: tColumns, Rows: tRows})
            }).catch(e => setIsError(e.message ? e.message : e))
        }
        getData()
    }, [setApiData, setIsError])

    if(isError)
        return <ErrorComponent error={isError}/>

    return(
        <div>
            {MuiTableData.Columns.length
                ? <React.Fragment>
                    <DefaultMaterialTable BaseConf={props.BaseConf} title={props.Component} columns={MuiTableData.Columns} data={MuiTableData.Rows} />
                   	<DetailsPopover anchorEl={ShowDetailsPopover} handleClick={handleDetailsPopoverClick} handleClose={handleDetailsPopoverClose} DataUrl={DetailsPopoverDataUrl} setMapCenter={props.setMapCenter} setMapZoom={props.setMapZoom}/>
                  </React.Fragment>
                : <CustomLoader />}        
        </div>
    )
}