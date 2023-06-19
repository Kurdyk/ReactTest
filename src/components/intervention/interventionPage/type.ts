import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";

export type Intervention = {
    interventionId : number,
    roadLocalisation  : string,
    askDate : Date,
    description : string,
    state : "Asked" | "Accepted" | "Outgoing" | "Finished",
    lastModification? : Date,
    report? : string,
    gain? : number,
    actions? : ActionButtonProps[]
};