import { useEffect, useState } from "react"

export const useData = () => {
    
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            function sleep(ms:number) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            await sleep(10000);
            setLoading(false);
          };
        
          fetchData()
            // make sure to catch any error
            .catch(console.error);;
        }, [loading])

    const action = () => {
        setLoading(true);
    }


    return {loading, action}
}
