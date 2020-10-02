// Import React Base
import React from 'react'
import PropTypes from 'prop-types'

// Import Router DOM
import { Route, Redirect } from "react-router-dom";

// Import Mui Components
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

// Impoer App Components
import CustomLoader from '../Components/Loader.js'
import {FetchData} from '../data-access/request-layer.js'
import {BaseConfig} from '../Context/BaseConfigContext.js'

// Default Function to export from this file
const ServerAddressInput = props => {
	// Create class object of css styles
	const classes = useStyles()

	// Get Bse Config From App Context
	const {BaseConfContext, setBaseConfContext} = React.useContext(BaseConfig)

	// Define States
	const [ServerDetails, setServerDetails] = React.useState(null)
	const [ServerAddressInput, setServerAddressInput] = React.useState({
		Value : "",
		Error : false,
		HelperText : "Ex: 127.0.0.1:1234/FROST-Server/v1.0",
		Label: "Server Address"
	})
	const [IsProcessing, setIsProcessing] = React.useState(false)

	// URL Regex which will be used to verify if the frost server URL is a valid URL
	const ValidURLRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

	// Check App Contect if a base URL is already present ( User Already Logged in )
	if (BaseConfContext != null && BaseConfContext.hasOwnProperty("BaseUrl")) {
		return <Redirect
              to={{
                pathname: "/Dashboard",
                state: {
                  from: props.location
                }
              }}
            />
	}

	// Main Function to verify server address entered by user and Set base URL in App Context
	// Users Will be redirected to /Dashboard Route after verification
	const checkFrostConnection = async address => {
		try{
			// Add http for if its not there in URL
			if(!address.includes('http'))
				address = `http://${address}`

			// GET the Address Entered
			await FetchData(address).then(ResponseData => {
				// Check if The Response Contains an array 'value' ( Default response object from Frost Server )
				if(ResponseData.hasOwnProperty("value") && typeof(ResponseData.value) == 'object' ){
					ResponseData.value.map(e => {
						if(!e.hasOwnProperty("url"))
							throw `Unable to find URL for ${e.name}`
						// Save the base Config into Local Storage and set App Context
						let convertedData = ResponseData.value.reduce((a,c) => {
							a[c.name] = c.url
							return a
						}, {})
						localStorage.setItem('frostServerBaseConfig', JSON.stringify({BaseUrl : address,ApiUrls : convertedData}))
						setBaseConfContext({BaseUrl : address, ApiUrls : convertedData})
					})
				}else throw "Frost Server Is Not Running on the URL Provided"
			}).catch(e => {
				// Display the error
				setServerAddressInput({...ServerAddressInput, Error:true, Label: "Error", "HelperText" : e})
			}).finally(() => {
				// Disable Loader Component and Enable Back Button
				setIsProcessing(false)
			})
		}catch(e){
			throw e
		}
	}

	// Store input changes into Component State
	const handleServerAddressInputChange = event => {
		setServerAddressInput({...ServerAddressInput, Value:event.target.value})
	}

	// Handle Establish Connection button Click
	const handleConnectionClick = event => {
		try{
			// Restore to default options of Textinput ( Useful in case if there were previous errors )
			setServerAddressInput({...ServerAddressInput, Error:false, Label: "Server Address", "HelperText" : "Ex: 127.0.0.1:1234/FROST-Server/v1.0"})
			// Verify URL
			if(ValidURLRegex.test(ServerAddressInput.Value)){
				// Show Loader Component and Disable Establish Connection Button
				setIsProcessing(!IsProcessing)
				checkFrostConnection(ServerAddressInput.Value)

			}
			else{
				throw "Please Enter A Valid URL"
			}
		}catch(e){
				setServerAddressInput({...ServerAddressInput, Error:true, Label: "Error", "HelperText" : e.message ? e.message : e})
		}
	}

	return (
		<React.Fragment>
	      <CssBaseline />
	      <Container maxWidth="sm">

	      	{props.location.state && props.location.state.from.pathname ? <p style={{color: '#309afc', textAlign: 'center'}}>{`You need to specify Frost server details to access content at ${props.location.state.from.pathname}`}</p> : ""}
	        <Paper elevation={7} className={classes.paper}>
		        <Typography component="div">Enter the base URL of desired Frost Server</Typography>
		        <TextField error={ServerAddressInput.Error} className={classes.textInput} helperText={ServerAddressInput.HelperText} onChange={handleServerAddressInputChange} id="server-address" value={ServerAddressInput.Value} label={ServerAddressInput.Label} variant="outlined" /><br/>
				<Button disabled={IsProcessing} variant="contained" color="primary" onClick={handleConnectionClick} className={classes.button} endIcon={!IsProcessing ? <SendIcon /> : <CustomLoader />}>{!IsProcessing ? "Establish Connection" : ""}</Button>
	      	</Paper>
	      </Container>
	    </React.Fragment>
	)
}

ServerAddressInput.propTypes = {

}

// CSS styles Config
const useStyles = makeStyles((theme) => ({
  root: {
  	backgroundColor: '#888'
  },
  paper: {
  	// margin: theme.spacing(1),
  	textAlign: 'center',
  	paddingTop: 20,
  	paddingBottom: 20
  },
  textInput: {
  	margin: theme.spacing(1),
  	width: 300,
  },
  button: {
    margin: theme.spacing(1),
    float: 'right',
    width: 300
  },
}));

export default ServerAddressInput

