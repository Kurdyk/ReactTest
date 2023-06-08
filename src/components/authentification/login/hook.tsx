import { accueilPath } from "components/routes/const";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButtonProps } from "utils/form/buttonGroup/actionButtonGroup/type";
import { FormInputProps, InputGroupProps } from "utils/form/inputGroup/type";

const url = "http://localhost:4444/login";  // Put url to login route of the authentification server

export const useData = () => {

    const navigate = useNavigate();

    const [mailError, setMailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [mail, setMail] = useState<string>();
    const [password, setPassword] = useState<string>();

    // Preparing data

    /// Action buttons
    const confirmAction = {
        id:1,
        buttonText:"LogIn",
        clickHandler: () => {
            setMailError(false);
            setPasswordError(false);
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

                if (rawResponse.status === 401) {
                    setPasswordError(true);
                    return
                }

                if (rawResponse.status === 404) {
                    setMailError(true);
                    return
                }
                
                // success
                const content = await rawResponse.json();
                sessionStorage.setItem("token", content["token"]);
                navigate(accueilPath);

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
        error:mailError,
        helperText:"Unregisterd user",
    } as FormInputProps;

    const mpdInput = {
        required:true,
        placeholder:"Mot de passe",
        onChange: (input:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPassword(input.target.value);
        },
        type:"password",
        error:passwordError,
        helperText:"Invalid password"
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

