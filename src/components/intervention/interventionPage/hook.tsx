import { Intervention } from "./type";
import { useEffect, useState } from "react";
import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";
import ActionButtonGroupComponent from "utils/atoms/buttonGroup/actionButtonGroup";
import dayjs from "dayjs";
import { ExtendedGridColDef } from "utils/SearchableDataGrid/type";

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
            minWidth: 150,
            align: "center",
            headerAlign: "center",
            flex:1,
        },
        {
            field:"roadLocalisation",
            headerName:"Route",
            minWidth: 150,
            align: "center",
            headerAlign: "center",
            flex:1,
        },
        {
            field:"askDate",
            type: "date",
            headerName:"Date de demande",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
            title: "Selection de la date de demande:",
            id : "DatePicker"
        },
        {
            field:"description",
            headerName:"Description",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"state",
            headerName:"Etat",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
            checkboxeFilter : ["Asked", "Accepted", "Outgoing", "Finished"],
            title : "Selection de l'état:",
            id : "StatePicker"
        },
        {
            field:"actions",
            headerName:"Actions",
            minWidth: 280,
            align: "center",
            renderCell: (param) => {
                const props = param.value as ActionButtonProps[];
                return <ActionButtonGroupComponent actionButtonPropsList={props} />
            },
            flex:1,
            headerAlign: "center",
        },
        {
            field:"lastStateModification",
            headerName:"Dernière modification",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"report",
            headerName:"Compte rendu",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        {
            field:"gain",
            headerName:"Gain score",
            minWidth: 150,
            align: "center",
            flex:1,
            headerAlign: "center",
        },
        
    ] as ExtendedGridColDef[];
    
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
            return intervertionData.map((rawIntervention:any) => {
                rawIntervention.askDate = dayjs(rawIntervention.askDate).toDate();
                return rawIntervention;
            }) ;
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