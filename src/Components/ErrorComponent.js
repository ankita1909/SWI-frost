import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function ErrorComponent(props) {
	return (
		<div style={{margin: 10}} >
			<ErrorOutlineIcon style={{fontSize: 35}} /><br/>
			<span style={{color: 'red'}}>{props.error}</span>
		</div>
	)
}