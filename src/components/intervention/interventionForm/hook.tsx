import { List, ListItem, Typography } from "@mui/material";
import { Road } from "components/roads/type";
import { useState, useEffect } from "react";
import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type"
import { InputGroupProps } from "utils/atoms/inputGroup/type";

const postUrl = "http://localhost:5000/intervention/new_intervention";
const roadUrl = "http://localhost:5555/roads";

const fetchRoadsOption = (async (dispatcher:React.Dispatch<React.SetStateAction<Road[]>>) => {

    const rawResponse = await fetch(roadUrl, {
        method: 'GET',
        headers:{
        'Content-type':'application/json', 
        },
    });

    if (rawResponse.status !== 200) {
        return
    }
    
    // success
    const content = await rawResponse.json();
    const roads = content["content"].map((road:string) => {
        return JSON.parse(road)
    })
    dispatcher.apply(undefined, [roads]);
})

export const useData = () => {

    const [roads, setRoads] = useState<Road[]>([]);
    const [firstName, setFirstName] = useState<String>("");
    const [lastName, setLastName] = useState<String>("");
    const [mail, setMail] = useState<String>("");
    const [description, setDescription] = useState<string>("");
    const [roadName, setRoadName] = useState<string>("")
    const [mailError, setMailError] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // Form content
    useEffect(() => {
        fetchRoadsOption(setRoads);
        setIsLoading(false);
    }, [])

    const formContent = {
        inputsPropsList: [ {
            required: true,
            placeholder: "Route",
            autocompeInfo: {
                options: roads.sort((a, b) => a.city.localeCompare(b.city)),
                groupBy: (road) => {return road.city},
                getOptionLabel: (road) => {return road.street},
                renderGroup : (params) => (<List key={params.key}>
                    <Typography variant="h6">{params.group}</Typography>
                    <ListItem>{params.children}</ListItem>
                </List>)
            },
            onChange: (event) => {setRoadName(event.target.value)}
        },
        {
            required: true,
            placeholder: "Description *",
            onChange: (event) => {setDescription(event.target.value)}
        },
        {
            required: true,
            placeholder: "Prénom *",
            onChange: (event) => {setFirstName(event.target.value)}
        },
        {
            required: true,
            placeholder: "Nom *",
            onChange: (event) => {setLastName(event.target.value)}
        },
        {
            error : mailError,
            required: true,
            placeholder: "Mail *",
            onChange : (event) => {
                setMail(event.target.value)
                setMailError(false);}
        },
       ],

        inputLabel: "Demande d'intervention"
    } as InputGroupProps

    const handleClick = (async () => {

        const rawResponse = await fetch(postUrl, {
            method: 'POST',
            headers:{
                'Content-type':'application/json', 
            },
            body: JSON.stringify({
            "firstName" : firstName,
            "lastName" : lastName,
            "mail":mail,
            "description" : description,
            "roadName" : roadName,
            })
        });

        if (rawResponse.status !== 200) {
            return
        }
        
        // success
        alert("Request accepted")
    })

    const publishButton = {
            id:1,
            buttonText:"Valider et envoyer",
            clickHandler: handleClick,
            type:"submit",
    } as ActionButtonProps;

    return {
        formContent,
        publishButton,
        isLoading,
        roads
    }

}