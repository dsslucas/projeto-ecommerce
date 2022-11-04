import React from 'react'
import Box from '@mui/material/Box';

export default props => {
    return (
        <Box
            component="span"
            sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                alignItems: 'center'
            }}
        >
            {props.number}
        </Box>
    )
}