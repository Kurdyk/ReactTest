import { RouteInfo } from "./type";

export const projectsPath = "/projects";
export const formPath = "/form";
export const rootPath = "/";
export const fruitsPath = "/fruits";
export const buttonPath = "/button";
export const firstComponentPath = "/firstComponent";
export const morpionPath = "/morpion";
export const mapRoute = "/map";
export const accueilPath = "/accueil";
export const authentificationPath = "/auth";
export const logoutPath = "/logout";
export const usersPath = "/users";
export const roadsPath = "/roads";
export const sensorPath = "/sensor/:sensorId";
export const interventionPath = "/interventions";
export const newInterventionPath = "/newIntervention";

export const allRoutes = [
    {linkName: "Welcome page", path: rootPath}, 
    {linkName: "Projects", path: projectsPath}, 
    {linkName: "A form", path: formPath}, 
    {linkName: "Some fruits", path: fruitsPath}, 
    {linkName: "A button", path: buttonPath}, 
    {linkName: "My first component", path: firstComponentPath,}, 
    {linkName: "Morpion", path: morpionPath, }, 
    {linkName: "Map", path: mapRoute, },
    {linkName: "Accueil", path: accueilPath,},
    {linkName: "Authentification", path:authentificationPath, requiredLogin:false,},
    {linkName: "Logout", path:logoutPath, requiredLogin:true,},
    {linkName: "Users", path:usersPath, requiredRole:{key:"key", role:"collectivite"}},
    {linkName: "Roads", path:roadsPath},
    {linkName: "Interventions", path:interventionPath},
] as RouteInfo[];