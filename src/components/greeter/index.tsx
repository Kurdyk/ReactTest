import React from 'react'
import greeterProps from './types';
import { useData } from './hook';
import { Button } from '@mui/material';

const Greeter: React.FC<greeterProps> = ({name}) => {

    const {loading, action} = useData();

    return (
        (!loading)?<Button onClick={action}>Hello</Button> : <div>Hello {name}! Long time no see.</div>
    )
}

export default Greeter;