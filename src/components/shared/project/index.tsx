import React, { useState } from 'react';
import { Box, Button, ListItemButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ProjectForm from 'components/projectForm';
import { ProjectCardProps } from './type';

const ProjectCard: React.FC<ProjectCardProps> = ({project, }) => {

    const {id, imageUrl, name, description, budget} = project;
    const [display, setDisplay] = useState("none");
    
    return (

    <div className="ProjectCard">
        <ListItemButton key={id} sx={{display: "flex", flexDirection: "column"}}>
            <img src={imageUrl} alt={name} /> 
            <Typography variant='h5'>
                {name}
            </Typography>
            <Typography> 
                {description}
            </Typography>
            <Typography variant='h6'> 
                Budget: {budget} €
            </Typography>
            <Button variant="outlined" onClick = {() => {
                if (display === "block") {
                    setDisplay("none");
                }
                else {
                    setDisplay("block");
                }}} >
                <EditIcon />
                Edit
            </Button>
            <Box sx={{display:display}}>
                <ProjectForm display={display} />
            </Box>
        </ListItemButton>
    </div>
    )
}

export default ProjectCard;