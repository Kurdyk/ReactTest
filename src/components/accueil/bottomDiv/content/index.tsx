import React from 'react'
import { BottomDivContentProps } from './type'
import { Box, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon';


const BottomDivContentComponent: React.FC<BottomDivContentProps> = ({text, icon}) => {
  return (
    <Box sx={{display:"flex", flexWrap:"no-wrap", width:"33vw", alignItems:"center", margin:"2px", overflow:"hidden"}}>
                <Typography variant='body1' color="white" sx={{textOverflow: "ellipsis",
                    overflow:"hidden", wordWrap:"break-word", display:"block", lineHeight:"1em", maxHeight:"2em"}}>
                    {text}
                </Typography>
            <SvgIcon component={icon} sx={{ fontSize: 100, overflow:"hidden" }}/>
    </Box>
  )
}

export default BottomDivContentComponent;