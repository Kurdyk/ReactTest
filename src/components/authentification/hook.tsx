import { useState } from "react";
import { ToggleButtonGroupProps, ToggleButtonProps } from "utils/atoms/buttonGroup/toggleButtonGroup/type";
import { GenericFormComponentProps } from "utils/form/type";

export const useData = () => {

    const [loginDisplay, setLoginDisplay] = useState<string>("flex");
    const [registerDisplay, setRegisterDisplay] = useState<string>("none");
    const [selectedValue, setSelectedValue] = useState<string>("login");

    // Preparing data
    /// Toggle buttons
    const loginToggle = {
        id:1,
        buttonText:"Login",
        value:"login",
    } as ToggleButtonProps;
    
    const registerToggle = {
        id:2,
        buttonText:"Register",
        value:"register",
    } as ToggleButtonProps;

    const toggleGroupProps = {
        toggleButtonPropsList: [loginToggle, registerToggle],
        changeHandler: () => {
            if (loginDisplay === "flex") {
                setLoginDisplay("none");
                setRegisterDisplay("flex");
                setSelectedValue("register");
                document.getElementById("AuthentificationForm")!.style.height = "36%";
                document.getElementById("AuthentificationForm")!.style.minHeight = "301px";
            } else {
                setLoginDisplay("flex");
                setRegisterDisplay("none");
                setSelectedValue("login");
                document.getElementById("AuthentificationForm")!.style.height = "25%";
                document.getElementById("AuthentificationForm")!.style.minHeight = "205px";
            }
        },
        selectedValue:selectedValue,
    } as ToggleButtonGroupProps;

    // Building full data content
    const formContent = {
        toggleButtonsGroupProps: toggleGroupProps, 
        actionButtonGroupProps: undefined, 
        inputGroupProps: undefined,
    } as GenericFormComponentProps;

    return ({
        formContent,
        loginDisplay, 
        registerDisplay,
    })
} 

