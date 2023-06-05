import { useState } from "react";
import { ActionButtonProps } from "utils/form/buttonGroup/actionButtonGroup/type";
import { FormInputProps, InputGroupProps } from "utils/form/inputGroup/type";

const url = "http://localhost:4444/login";

export const useData = () => {

    const [mail, setMail] = useState<string>();
    const [password, setPassword] = useState<string>();

    // Preparing data

    /// Action buttons
    const confirmAction = {
        id:1,
        buttonText:"LogIn",
        clickHandler: () => {
            (async () => {

                const rawResponse = await fetch(url, {
                  method: 'POST',
                  headers:{
                    'Content-type':'application/json', 
                  },
                  body: JSON.stringify({
                    "mail":mail,
                    "password":password,
                  })
                });

                if (await rawResponse.status !== 200) {
                    alert("Bad credidentials");
                    return
                }

                const content = await rawResponse.json();
                sessionStorage.setItem("token", content["token"]);
              })();
        },
    } as ActionButtonProps;

    const actionGroupProps = {
        actionButtonPropsList: [confirmAction]
    }

    /// Input 
    const mailInput = {
        required:true,
        placeholder:"Mail",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setMail(input.target.value)
        },
    } as FormInputProps;

    const mpdInput = {
        required:true,
        placeholder:"Mot de passe",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPassword(input.target.value);
        },
    } as FormInputProps;

    const inputGroupProps = {
        inputsPropsList: [mailInput, mpdInput],
        inputLabel: "LogIn",
    } as InputGroupProps;

    // Building full data content
    const loginContent = {
        actionButtonGroupProps: actionGroupProps, 
        inputGroupProps: inputGroupProps,
    };

    return ({
        loginContent,
    })
} 

