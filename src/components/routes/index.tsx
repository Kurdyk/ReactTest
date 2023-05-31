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
import { accueilPath, mapRoute } from './const'
import MapComponent from 'components/map'
import AccueilComponent from 'components/accueil'

const AllRoutes: React.FC = () => {
  return (
    <Box id="routeBox" sx={{display:"flex", height:"100%", width:"100%"}}>
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
        </Routes>
    </Box>
  )
}

export default AllRoutes