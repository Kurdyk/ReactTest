import { ProjectsListProps } from './type'
import { Box, List, ThemeProvider, Typography } from '@mui/material'
import ProjectCard from 'components/project';
import muiTheme from 'theme';


const ProjectsListComponent: React.FC<ProjectsListProps> = ({projectsList}) => {
    return (
        <ThemeProvider theme={muiTheme}>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                <Typography variant='h3' sx={{marginLeft: "20px", marginBottom:"10px", marginTop:"10px"}}>Our projects</Typography>
                <List component="nav" sx={{display: "flex", flexDirection: "row", alignItems:"stretch", flexWrap:"wrap", justifyContent:"center"}}>
                    { projectsList.map((project) => {
                        return <ProjectCard project={project} key={project.id}/>; 
                        }
                        )}
                </List>
            </Box>
        </ThemeProvider>
    );
}

export default ProjectsListComponent;