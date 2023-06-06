import { useState } from "react";
import { redirect } from "react-router-dom";
import { ActionButtonProps } from "utils/form/buttonGroup/actionButtonGroup/type";
import { FormInputProps, InputGroupProps } from "utils/form/inputGroup/type";

const url = "http://localhost:4444/register";

export const useData = () => {

    const [mail, setMail] = useState<string>();
    const [mailError, setMailError] = useState<boolean>(false);
    const [nom, setNom] = useState<string>();
    const [prenom, setPrenom] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordError, setPasswordError] = useState<boolean>(false);


    // Preparing data
    
    /// Action buttons
    const confirmAction = {
        id:1,
        buttonText:"Confirm",
        clickHandler: () => {
            (async () => {

                const rawResponse = await fetch(url, {
                  method: 'POST',
                  headers:{
                    'Content-type':'application/json', 
                  },
                  body: JSON.stringify({
                    "prenom":prenom,
                    "nom":nom,
                    "mail":mail,
                    "password":password,
                  })
                });

                if (rawResponse.status !== 200) {
                    alert("Bad credidentials");
                    return
                }

                const content = await rawResponse.json();
                sessionStorage.setItem("token", content["token"]);
                redirect("/accueil");
                document.getElementById("button_auth")!.style.setProperty("display", "none", "important")
                document.getElementById("button_logout")!.style.setProperty("display", "block", "important")

              })();
            console.log(mail, nom, prenom, password);
        },
    } as ActionButtonProps;

    const actionGroupProps = {
        actionButtonPropsList: [confirmAction]
    }

    /// Input 
    const prenomInput = {
        required:true,
        placeholder:"Prénom",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPrenom(input.target.value);
        },
    } as FormInputProps;

    const nomInput = {
        required:true,
        placeholder:"Nom",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setNom(input.target.value);
        },
    } as FormInputProps;

    const mailInput = {
        required:true,
        placeholder:"Mail",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setMail(input.target.value)
        },
    } as FormInputProps;

    const mpdInput = {
        required:true,
        placeholder:"Mot de passe avec au minimum une minuscule, une majuscule, un chiffre et un caractère spécial",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPassword(input.target.value);
        },
        type:"password",
    } as FormInputProps;

    const inputGroupProps = {
        inputsPropsList: [prenomInput, nomInput, mailInput, mpdInput],
        inputLabel: "Register",
    } as InputGroupProps;

    // Building full data content
    const registerContent = {
        actionButtonGroupProps: actionGroupProps, 
        inputGroupProps: inputGroupProps,
    };

    return ({
        registerContent,
    });
} 

