import { Box } from '@mui/material'
import React from 'react'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import BottomDivContentComponent from './content';

const BottomDivComponent: React.FC = () => {
  return (
    <Box id="bottomDivAccueil" sx={{zIndex:"1", minHeight:"15vh", display:"flex", flexDirection:"row",
        justifyContent:"space-between", width:"100%", backgroundColor:"#4287f5", alignItems:"center",
        alignSelf:"flex-end", marginBottom:"2.9%", flexWrap:"wrap"}}>

        <BottomDivContentComponent text={"Plus de 30 collectivités françaises ont adopté Road Life"}
            icon={PersonOutlineOutlinedIcon}/>
        <BottomDivContentComponent text={"100% des routes que nous monitorons ne dépassent pas les 70% d'usure"} 
            icon={SpeedOutlinedIcon}/>
        <BottomDivContentComponent text={"Préparez des interventions dès la reception d'alerte sur le taux d'usure de vos routes"}
            icon={HistoryOutlinedIcon}/>

    </Box>
  )
}

export default BottomDivComponent