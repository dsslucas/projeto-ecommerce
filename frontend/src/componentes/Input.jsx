import React from 'react'
import TextField from '@mui/material/TextField';

const input = (props) => {

    function returnInputValue(e) {
        props.returnValue(e)
    }

    return (
        <TextField
            id={props.id}
            label={props.label}
            style={{ paddingBottom: '20px', paddingTop: '20px' }}
            fullWidth
            variant={props.styleInput ? props.styleInput : "standard"}
            multiline={props.multiline}
            minRows={props.minRows}
            onChange={(e) => returnInputValue(e.target.value)}
            type={props.type}
            required
            defaultValue={props.defaultValue}
            error={props.error}
            helperText={props.helperText}
            inputProps={props.inputProps}
        />
    )
}

export default input