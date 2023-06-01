import React from 'react'
import {slide as Menu} from "react-burger-menu";
import { NavBarProps } from '../type';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const BurgerMenuComponent: React.FC<NavBarProps> = ({listRoutes}) => {
    const navigate = useNavigate();
    return (
        <Menu right>
            {listRoutes.map(({path, linkName}) => {
                    return <Button variant="outlined" color="primary" key={path} onClick={ () => {
                        navigate(path);
                    }} className="NavButton"> {linkName}</Button>
                })}
        </Menu>
    );
}

export default BurgerMenuComponent