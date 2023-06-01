import { ProjectsListProps } from './type'
import { Box, List, Typography } from '@mui/material'
import ProjectCard from 'components/project';


const ProjectsListComponent: React.FC<ProjectsListProps> = ({projectsList}) => {
    return (
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Typography variant='h3' sx={{marginLeft: "20px", marginBottom:"10px", marginTop:"10px"}}>Our projects</Typography>
            <List component="nav" sx={{display: "flex", flexDirection: "row", alignItems:"stretch", flexWrap:"wrap", justifyContent:"center"}}>
                { projectsList.map((project) => {
                    return <ProjectCard project={project} key={project.id}/>; 
                    }
                    )}
            </List>
        </Box>
    );
}

export default ProjectsListComponent;