import { useEffect, useState } from "react";
import ActionButtonGroupComponent from "utils/form/buttonGroup/actionButtonGroup";
import { AllColumnsDefinition, FullData, IdentifiedRowData, RowData } from "utils/searchableTable/type"

const url = "http://localhost:5555/users";

// utils
const castToRowData = (userString:string):RowData => {
    const replaceRegex = /{|}| |"/g;
    const filtered = userString.replaceAll(replaceRegex, "");
    const fieldSeparated = filtered.split(",");
    var result = [] as RowData;
    fieldSeparated.forEach((keyValue) => {
        const newRow = {
            key: keyValue.split(":")[0],
            value: keyValue.split(":")[1],
        };
        result.push(newRow);
    })

    const actions = {
        key:"actions",
        value: <ActionButtonGroupComponent actionButtonPropsList={[
                {
                    id:1, 
                    buttonText:"Modification",
                    clickHandler: () => {}
                },
                {
                    id:2, 
                    buttonText:"Suppresion",
                    clickHandler: () => {}
                },
            ]} />
    }

    result.push(actions);
    return result;
}

const castAll = (rawData:string[]):FullData => {
    return rawData.map((userString, index) => {
        return {id:index, data:castToRowData(userString)} as IdentifiedRowData;
    })
}

// UseData
export const useData = () => {

    // Columns
    const columns = [
        {
            key:"prenom",
            header:"Prénom",
        },
        {
            key:"nom",
            header:"Nom",
        },
        {
            key:"mail",
            header:"Mail",
        },
        {
            key:"role",
            header:"Rôle",
        },
        {
            key:"actions",
            header:"Possible actions",
            width:"20%",
        }
    ] as AllColumnsDefinition;

    // Rows
    const [users, setUsers] = useState<FullData>([]);

    useEffect(() => {
        const requestUsers = (async () => {
            const rawResponse = await fetch(url, {
                method: 'GET',
                headers:{
                  'Content-type':'application/json', 
                  "token":sessionStorage.getItem("token")!,
                }})
            
            if (rawResponse.status !== 200) {
                const error = await rawResponse.json()
                console.log(error["message"])
                return;
            }
            
            const content = await rawResponse.json();
            const userData = content["content"]
            return userData;
        });
    
        
        requestUsers().then((response) => {
            const castUsers = castAll(response);
            setUsers(castUsers);
        });
    
    }, []);
    
    return {
        columns,
        users,
    }
}