import { Box } from '@mui/material'
import AccueilComponent from 'components/accueil'
import AuthentificationComponent from 'components/authentification'
import ButtonComponent from 'components/button'
import MorpionBoard from 'components/childParentCom'
import FruitListComponent from 'components/fruitList'
import Greeter from 'components/greeter'
import LogOutComponent from 'components/logout'
import MapComponent from 'components/map'
import MyFirstComponent from 'components/myFirstComponent'
import { MOCK_PROJECTS } from 'components/shared/project/mockProjects'
import ProjectFormComponent from 'components/projectForm'
import ProjectsListComponent from 'components/projectsList'
import UsersComponent from 'components/users'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginProtectionComponent from 'utils/loginProtection'
import { mapRoute, accueilPath, authentificationPath, logoutPath, usersPath, roadsPath, sensorPath, interventionPath } from './const'
import RoadComponent from 'components/roads'
import SensorComponent from 'components/sensor'
import InterventionListComposant from 'components/intervention/interventionPage'

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
            <Route path={usersPath} element={<LoginProtectionComponent children={<UsersComponent />} />} />
            <Route path={roadsPath} element={<RoadComponent />} /> 
            <Route path={sensorPath} element={<SensorComponent/>} />
            <Route path={interventionPath} element={<InterventionListComposant/>} />
            {/* {
                allRoutes.map(({path, requiredLogin, elememt}) => {
                    console.log(path, requiredLogin)
                    if (requiredLogin) {
                        return <Route path={path} element={<LoginProtectionComponent children={elememt} />} />
                    } else {
                        return <Route path={path} element={elememt} />
                    }
                })
            } */}
        </Routes>
    </Box>
  )
}

export default AllRoutes;