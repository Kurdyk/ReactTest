import { ButtonProp } from './type';
import { useData } from "./hook";
import { Button } from '@mui/material';

const ButtonComponent: React.FC<ButtonProp>  = ({text}) => {

    const {
        clickHandler,
        cmpt,
    } = useData(text);
    
    return (
        <Button id="ButtonPageButton" variant="outlined" onClick={clickHandler}> Click me for the {cmpt + 1} th time.</Button>
    )
}

export default ButtonComponent;
