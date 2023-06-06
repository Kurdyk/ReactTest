import { Box } from '@mui/material'
import ButtonComponent from 'components/button'
import MorpionBoard from 'components/childParentCom'
import FruitListComponent from 'components/fruitList'
import Greeter from 'components/greeter'
import MyFirstComponent from 'components/myFirstComponent.tsx'
import { MOCK_PROJECTS } from 'components/project/mockProjects'
import ProjectFormComponent from 'components/projectForm'
import ProjectsListComponent from 'components/projectsList'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { accueilPath, authentificationPath, logoutPath, mapRoute, usersPath } from './const'
import MapComponent from 'components/map'
import AccueilComponent from 'components/accueil'
import AuthentificationComponent from 'components/authentification'
import LogOutComponent from 'components/logout'
import UsersComponent from 'components/users'

const AllRoutes: React.FC = () => {
  return (
    <Box id="routeBox">
        <Routes>
            <Route path="/projects" element={<ProjectsListComponent projectsList={MOCK_PROJECTS} />} />
            <Route path="/form" element={ <ProjectFormComponent display='block'/>} />
            <Route path="/fruits" element={ <FruitListComponent fruitList={[{"name" : "apple"}, {"name": "banana"}, {"name": "kiwi"}]} />} />
            <Route path="/button" element={<ButtonComponent text="Click me some more!" />} />
            <Route path="/" element={<Greeter name={"toto"} /> } />   
            <Route path="/firstComponent" element={<MyFirstComponent />} />
            <Route path="/morpion" element={<MorpionBoard />} />
            <Route path={mapRoute} element={<MapComponent />} />
            <Route path={accueilPath} element={<AccueilComponent/>} />
            <Route path={authentificationPath} element={<AuthentificationComponent />} />
            <Route path={logoutPath} element={<LogOutComponent />} />
            <Route path={usersPath} element={<UsersComponent />} />
        </Routes>
    </Box>
  )
}

export default AllRoutes;