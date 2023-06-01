import { NavBarProps } from './type'
import { Box, Typography } from '@mui/material'
import BurgerMenuComponent from './burgerMenu';

const NavBar:React.FC<NavBarProps> = ({listRoutes}) => {
    
  return (
    <Box sx = {{backgroundColor:"secondary.main", display:"flex", flexWrap:"no-wrap"}}>
        <Box sx={{margin:"auto", display:"inline-flex", height:"40px", marginLeft:"10px", marginTop:"2px"}}>
            <img src="/logo192.png" alt="react logo"/>
            <Typography color="white" sx={{margin:"auto", marginLeft:"1vw"}}>A test React project</Typography> 
        </Box>
        <Box sx={{height:"40px"}}>
            <BurgerMenuComponent listRoutes={listRoutes} />
        </Box>
    </Box>
  ) 
}

export default NavBar