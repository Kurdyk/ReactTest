import React from 'react'
import { BottomDivContentProps } from './type'
import { Box, Typography } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon';


const FooterContentComponent: React.FC<BottomDivContentProps> = ({text, icon}) => {
  return (
    <Box sx={{display:"flex", flexWrap:"no-wrap", width:"30vw", 
                alignItems:"center", overflow:"hidden"}}>
                <Typography variant='body1' color="white" sx={{textOverflow: "ellipsis",
                 wordWrap:"break-word", display:"block", lineHeight:"1em", maxHeight:"7em"}}>
                    {text}
                </Typography>
            <SvgIcon component={icon} sx={{ fontSize: 100, overflow:"hidden" }}/>
    </Box>
  )
}

export default FooterContentComponent;