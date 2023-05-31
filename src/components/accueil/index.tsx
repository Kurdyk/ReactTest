import { Box, Typography } from '@mui/material'
import React from 'react'
import AccueilMapComponent from './accueilMap'
import BottomDivComponent from './bottomDiv'

const AccueilComponent: React.FC = () => {
  return (
    <Box id="accueilContener" sx={{width:"100%", height:"100%", display:"flex", flexDirection:"column"}}>
        <Box id="accueilMapAndTitleContainer" sx={{height:"85%"}}>
            <Box id="acceuilMapConteneur" sx={{zIndex:"-1", width:"100%", height:"85%", position:"absolute"}}>
                <AccueilMapComponent />
            </Box>
            <Box id="AccueilTextContener" sx={{width:"100%", height:"85%", 
            display:"flex", position:"absolute", flexDirection:"column", justifyContent:"center"}}>
                <Typography variant='h6' sx={{zIndex:"1", width:"100%", textAlign:"center"}} color="black">Mieux vaut prévenir que guérir</Typography>
                <Typography variant='h1' sx={{zIndex:"1", width:"100%", textAlign:"center"}} color="black">Road life</Typography>
            </Box>
        </Box>

        <BottomDivComponent />

    </Box>
  )
}

export default AccueilComponent;