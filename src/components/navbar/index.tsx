import { NavBarProps } from './type'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const NavBar:React.FC<NavBarProps> = ({listRoutes}) => {
    const navigate = useNavigate();
    
  return (
    <Box sx = {{backgroundColor:"#cc9bcc", display:"flex", flexWrap:"wrap"}}>
        <Box sx={{margin:"auto", display:"inline-flex", height:"40px", marginLeft:"10px", marginTop:"2px"}}>
            <img src="/logo192.png" alt="react logo"/>
            <Typography color="primary" sx={{margin:"auto", marginLeft:"5px"}}>A test React project</Typography> 
        </Box>
        <Box sx = {{display:"flex", float:"right", justifyContent:"center", margin:"4px"}}> 
            {listRoutes.map(({path, linkName}) => {
                return <Button color="primary" key={path} onClick={ () => {
                    navigate(path);
                }}> {linkName}</Button>
            })}
        </Box>
    </Box>
  ) 
}

export default NavBar