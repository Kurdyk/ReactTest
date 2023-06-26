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

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [roadName, setRoadName] = useState<string>("")

    const [mailError, setMailError] = useState<boolean>(false);
    const [roadError, setRoadError] = useState<boolean>(false);
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Form content
    useEffect(() => {
        fetchRoadsOption(setRoads);
        setIsLoading(false);
    }, [])

    const verifyMail = (input : string) => {
        return  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input)
    }

    const formContent = {
        inputsPropsList: [ 
        {
            required: true,
            error: roadError,
            helperText : "Required",
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
            onChange: (event) => {
                console.log(event.target.value)
                setRoadError(false);
                setRoadName(event.target.value);
            }
        },
        {
            required: true,
            error: descriptionError,
            helperText : "Required",
            placeholder: "Description *",
            onChange: (event) => {
                setDescriptionError(false);
                setDescription(event.target.value);
            }
        },
        {
            required: true,
            error: firstNameError,
            helperText : "Required",
            placeholder: "Prénom *",
            onChange: (event) => {
                setFirstNameError(false);
                setFirstName(event.target.value);
            }
        },
        {
            required: true,
            error: lastNameError,
            helperText : "Required",
            placeholder: "Nom *",
            onChange: (event) => {
                setLastNameError(false);
                setLastName(event.target.value);
            }
        },
        {
            error : mailError,
            required: true,
            placeholder: "Mail *",
            helperText: "Mail invalide",
            onChange : (event) => {
                setMail(event.target.value);
                setMailError(false);
            }
        },
       ],

        inputLabel: "Demande d'intervention"
    } as InputGroupProps

    const handleClick = (async () => {

        console.log(roadName);
        if (roadName === "") {
            setRoadError(true);
            return;
        }

        if (description === "") {
            setRoadError(true);
            return;
        }
        if (firstName === "") {
            setRoadError(true);
            return;
        }

        if (lastName === "") {
            setRoadError(true);
            return;
        }

        if (!verifyMail(mail)) {
            setMailError(true);
            return
        }

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