import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useData = () => {

    const navigate = useNavigate();

    const useLoad = () => {
        return useEffect(() => {
            sessionStorage.clear();
            document.getElementById("button_auth")!.style.setProperty("display", "block", "important")
            document.getElementById("button_logout")!.style.setProperty("display", "none", "important")
            navigate("/accueil");
        }, [])
    }

    return useLoad;
};