import { useState } from "react"

export const useData = () => {
    const [timeScale, setTimeScale] = useState<string>("Jour");

    return ({
        timeScale, 
        setTimeScale
    })
}