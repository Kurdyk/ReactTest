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
import { mapRoute, accueilPath, authentificationPath, logoutPath, usersPath, roadsPath, sensorPath, interventionPath, projectsPath, formPath, fruitsPath, buttonPath, rootPath, firstComponentPath, morpionPath, newInterventionPath } from './const'
import RoadComponent from 'components/roads'
import SensorComponent from 'components/sensor'
import InterventionListComposant from 'components/intervention/interventionPage'
import NewInterventionForm from 'components/intervention/interventionForm'
import RoleProtectionComponent from 'utils/roleProtection'
import NoMatch from 'components/noMatch'

const AllRoutes: React.FC = () => {
  return (
    <Box id="routeBox">
        <Routes>
            <Route path={projectsPath} element={<ProjectsListComponent projectsList={MOCK_PROJECTS} />} />
            <Route path={formPath} element={ <ProjectFormComponent display='block'/>} />
            <Route path={fruitsPath} element={ <FruitListComponent fruitList={[{"name" : "apple"}, {"name": "banana"}, {"name": "kiwi"}]} />} />
            <Route path={buttonPath} element={<ButtonComponent text="Click me some more!" />} />
            <Route path={rootPath} element={<Greeter name={"toto"} /> } />   
            <Route path={firstComponentPath} element={<MyFirstComponent />} />
            <Route path={morpionPath} element={<MorpionBoard />} />
            <Route path={mapRoute} element={<MapComponent />} />
            <Route path={accueilPath} element={<AccueilComponent/>} />
            <Route path={authentificationPath} element={<AuthentificationComponent />} />
            <Route path={logoutPath} element={<LogOutComponent />} />
            <Route path={usersPath} element={<RoleProtectionComponent children={<UsersComponent />} key={'role'} role={'collectivite'} />} />
            <Route path={roadsPath} element={<RoadComponent />} /> 
            <Route path={sensorPath} element={<SensorComponent/>} />
            <Route path={interventionPath} element={<InterventionListComposant/>} />
            <Route path={newInterventionPath} element={<NewInterventionForm />}/>
            <Route path='*' element={<NoMatch/>} />
        </Routes>
    </Box>
  )
}

export default AllRoutes;