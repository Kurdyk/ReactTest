import { ProjectsListProps } from './type'
import { Box, List, Typography } from '@mui/material'
import ProjectCard from 'components/shared/project';


const ProjectsListComponent: React.FC<ProjectsListProps> = ({projectsList}) => {
    return (
        <Box id="ProjectsListWarpper">
            <Typography id="ProjectsTitle" variant='h3'>Our projects</Typography>
            <List id="ProjectsList" component="nav">
                { projectsList.map((project) => {
                    return <ProjectCard project={project} key={project.id}/>; 
                    }
                    )}
            </List>
        </Box>
    );
}

export default ProjectsListComponent;