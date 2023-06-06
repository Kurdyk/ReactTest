import { AllColumnsDefinition } from "utils/searchableTable/type"

const url = "http://localhost:5555/users";

export const useData = () => {

    console.log("starting useData")

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
        }
    ] as AllColumnsDefinition;

    const requestUsers = (async () => {
        const rawResponse = await fetch(url, {
            method: 'GET',
            headers:{
              'Content-type':'application/json', 
              "token":sessionStorage.getItem("token")!,
            }})
        
        const content = await rawResponse.json();
        const userData = content["content"]
        console.log(userData);

        if (rawResponse.status !== 200) {
            return;
        }
        
        return userData;
    });

    const users = requestUsers();

    return {
        columns,
    }
}