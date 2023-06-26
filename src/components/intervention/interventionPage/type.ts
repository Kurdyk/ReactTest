import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";

export type Intervention = {
    interventionId : string,
    roadLocalisation  : string,
    askDate : Date,
    description : string,
    state : "Demandée" | "Refusée" | "En cours" | "Terminée",
    lastModification? : Date,
    report? : string,
    gain? : number,
    actions? : ActionButtonProps[]
};