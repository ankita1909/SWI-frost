import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ErrorComponent from './ErrorComponent.js'
import CustomLoader from './Loader'
import {FetchData} from '../data-access/request-layer'
const LocationFields = ["name", "description"]


export default function DetailsPopover(props) {
    const classes = useStyles()
    const [PopoverContent, setPopoverContent] = React.useState(null)
    const [IsError, setIsError] = React.useState(false)
    const [IsLoading, setIsLoading] = React.useState(true)
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    React.useEffect(() => {
        const GetData = async () => {
            setIsError(false)
            await FetchData(props.DataUrl).then(response => {
                setPopoverContent(response)
                if(response.location && response.location.coordinates.length){
                    props.setMapZoom(5)
                    props.setMapCenter(response.location.coordinates)
                }
            }).catch(e => {
                setIsError(e.message)
            }).finally(() => {
                setIsLoading(false)
            })
        }
        GetData()
    }, [props.DataUrl, setIsError, setIsLoading, setPopoverContent])

    if(IsError)
        return <ErrorComponent error={IsError} />

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                   {PopoverContent 
                            ? <>
                            <Typography className={classes.typography}>{PopoverContent.name}</Typography>
                            <Typography className={classes.typography}>{PopoverContent.description}</Typography>
                            </> : <CustomLoader />
                }
            </Popover>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

