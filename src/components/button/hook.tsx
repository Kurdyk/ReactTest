import { useState } from "react";
import { ButtonComponentItems } from "./type";

export const useData = (text:string): ButtonComponentItems => {

    const [cmpt, setCmpt] = useState<number>(0);

    const handleClick = () => {
        console.log("number of clicks: " + cmpt  + " " + text);
        setCmpt((prev) => prev + 1);
    }


    return {
        clickHandler:handleClick,
        cmpt:cmpt,
    }
};
