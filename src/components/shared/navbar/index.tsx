import { NavBarProps } from './type'
import { Box, Typography } from '@mui/material'
import BurgerMenuComponent from './burgerMenu';

const NavBar:React.FC<NavBarProps> = ({listRoutes}) => {
    
  return (
    <Box id="NavBarWrapper" sx={{backgroundColor:"secondary.main"}}>
        <Box id="LeftWrapper">
            <img src="/logo192.png" alt="react logo"/>
            <Typography id="NavBarTitle" color="white">A test React project</Typography> 
        </Box>
        <Box id="BurgerWrapper">
            <BurgerMenuComponent listRoutes={listRoutes} />
        </Box>
    </Box>
  ) 
}

export default NavBar