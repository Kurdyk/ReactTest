import { useState } from 'react'
import { ButtonProp } from './type';

const ButtonComponent: React.FC<ButtonProp>  = ({text}) => {

    const [cmpt, setCmpt] = useState<number>(0);

    const handleClick = () => {
        console.log("number of clicks: " + cmpt  + " " + text);
        setCmpt((prev) => prev + 1);
    }

    return (
        <button onClick={handleClick}> Click me for the {cmpt + 1} th time.</button>
    )
}

export default ButtonComponent;