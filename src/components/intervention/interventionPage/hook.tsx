import { Intervention } from "./type";
import { useEffect, useState } from "react";
import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";
import ActionButtonGroupComponent from "utils/atoms/buttonGroup/actionButtonGroup";
import dayjs from "dayjs";
import { ExtendedGridColDef } from "utils/SearchableDataGrid/type";

const url = `http://localhost:5000/intervention/all`;

// Updating methods
const postModify = ( async (id:string, action:string) => {
    const postUrl = `http://localhost:5000/intervention/${action}/${id}`;
    
    const rawResponse = await fetch(postUrl, {
        method: 'POST',
        headers:{
            'Content-type':'application/json', 
        },
    });

    if (rawResponse.status !== 200) {
        return
    } else {
        window.location.reload();
    }
    }
)

const castAll = (rawList : Intervention[]): Intervention[] => {
    return rawList.map((rawIntervention, index) => {
        // Actions
        let actions = [] as ActionButtonProps[];
        switch (rawIntervention["state"]) {
            case "Demandée":
                actions = [
                    {
                        id:1, 
                        buttonText:"Accepter",
                        clickHandler: () => {
                            postModify.call(undefined, rawIntervention.interventionId, "accept")},
                    },
                    {
                        id:2, 
                        buttonText:"Refuser",
                        clickHandler: () => {postModify.call(undefined, rawIntervention.interventionId, "refuse")}
                    }
                ];
                break;
            case "En cours":
                actions = [
                    {
                        id:1, 
                        buttonText:"Terminer",
                        clickHandler: () => {postModify.call(undefined, rawIntervention.interventionId, "end")},
                    },
                ]
                break;
            default:
                break;
        }
        rawIntervention["actions"] = actions;
        // Last mododification and related
        let lastStateModification = "";
        let gain = 0;
        let report = "";
        switch (rawIntervention.state) {
            case "En cours":
                lastStateModification = `${rawIntervention.state} le ${rawIntervention.dateValidation}`
                break;
            case "Refusée":
                lastStateModification = `${rawIntervention.state} le ${rawIntervention.dateRefusal}`
                report = rawIntervention.refusalDescription!;
                break;
            case "Terminée":
                lastStateModification = `${rawIntervention.state} le ${rawIntervention.dateSolved}`
                report = rawIntervention.report!;
                gain = rawIntervention.gain!;
                break;
        }
        return {...rawIntervention, actions:actions, id:index, lastStateModification:lastStateModification, report:report, gain:gain};
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
            minWidth: 330,
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
            checkboxeFilter : ["Demandée", "Refusée", "En cours", "Terminée"],
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

        const stateConversion = new Map<number, string>([
            [0, "Demandée"],
            [1, "Refusée"],
            [2, "En cours"],
            [3, "Terminée"],
        ]);

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
                rawIntervention.askDate = dayjs(rawIntervention.askDate).toDate(); // Case to date type
                rawIntervention.state = stateConversion.get(rawIntervention.state);
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