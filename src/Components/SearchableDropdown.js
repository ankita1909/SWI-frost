import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchableDropdown(props) {
  return (
    <Autocomplete
    disableClearable
      id={props.id}
      options={props.options}
      getOptionLabel={(option) => option.name}
      style={{margin:5 }}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} label={props.label} variant="standard" />}
    />
  );
}