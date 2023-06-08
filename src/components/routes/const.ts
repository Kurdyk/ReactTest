import Greeter from "components/greeter";
import { RouteInfo } from "./type";
import { MOCK_PROJECTS } from "components/project/mockProjects";
import ProjectsListComponent from "components/projectsList";
import ProjectFormComponent from "components/projectForm";
import FruitListComponent from "components/fruitList";
import ButtonComponent from "components/button";
import MyFirstComponent from "components/myFirstComponent.tsx";
import MorpionBoard from "components/childParentCom";
import MapComponent from "components/map";
import AccueilComponent from "components/accueil";
import AuthentificationComponent from "components/authentification";
import LogOutComponent from "components/logout";
import UsersComponent from "components/users";
import { render } from "react-dom";
import { ReactNode } from "react";

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
    {linkName: "Users", path:usersPath, requiredLogin:true,},
] as RouteInfo[];