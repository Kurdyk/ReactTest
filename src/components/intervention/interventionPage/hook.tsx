import { GridColDef } from "@mui/x-data-grid";
import { Intervention } from "./type";
import { useEffect, useState } from "react";
import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";

const url = `http://localhost:5000/intervention/all`;

const castAll = (rawList : Intervention[]): Intervention[] => {
    return rawList.map((rawIntervention, index) => {
        let actions = undefined;
        switch (rawIntervention["state"]) {
            case "Asked":
                actions = [
                    {
                        id:1, 
                        buttonText:"Accepter",
                        clickHandler: () => {},
                    },
                    {
                        id:2, 
                        buttonText:"Refuser",
                        clickHandler: () => {}
                    }
                ] as ActionButtonProps[];
                rawIntervention["actions"] = actions;
                break;
            case "Outgoing":
                actions = [
                    {
                        id:1, 
                        buttonText:"Terminer",
                        clickHandler: () => {},
                    },
                ]
                rawIntervention["actions"] = actions;
                break;
            default:    
                break;
        }
        return {...rawIntervention, actions:actions, id:index};
    })
}

export const useData = () => {

    // Loading
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // Columns
    const columns = [
        {
            field:"interventionId",
            headerName:"ID",
            width: 150,
            align: "center",
            headerAlign: "center",
            flex:1,
        },
        {
            field:"roadLocalisation",
            headerName:"Route",
            width: 150,
            align: "center",
            headerAlign: "center",
            flex:1,
        },
        {
            field:"askDate",
            headerName:"Date de demande",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"description",
            headerName:"Description",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"state",
            headerName:"Etat",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"lastStateModification",
            headerName:"Dernière modification",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"report",
            headerName:"Compte rendu",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"gain",
            headerName:"Gain score",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"actions",
            headerName:"Actions",
            width: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
    ] as GridColDef[];
    
    // Rows
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    
    useEffect(() => {
        const requestRoads = (async () => {
            const rawResponse = await fetch(url, {
                method: 'GET',
                headers:{
                  'Content-type':'application/json', 
                }})
            
            if (rawResponse.status !== 200) {
                const error = await rawResponse.json()
                console.log(error["message"])
                return;
            }
            
            const content = await rawResponse.json();
            const intervertionData = content["content"]
            return intervertionData;
        });
    
        requestRoads().then((response) => {
            const castInterventions = castAll(response);
            setInterventions(castInterventions);
            setIsLoading(false);
        });
    
    }, []);

    return {
        interventions,
        columns,
        isLoading,
    }
}