import React, { useState } from 'react';
import { Box, Button, ListItemButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ProjectForm from 'components/projectForm';
import { ProjectCardProps } from './type';

const ProjectCard: React.FC<ProjectCardProps> = ({project, }) => {

    const {id, imageUrl, name, description, budget} = project;
    const [display, setDisplay] = useState("none");
    const [height, setHeight] = useState("50%");
    
    return (<Box sx={{display:"flex", flexBasis:"column", width: "30%", height:height}}>
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
                    setHeight("50%");
                }
                else {
                    setDisplay("block");
                    setHeight("70%");
                }}} >
                <EditIcon />
                Edit
            </Button>
            <Box sx={{display:display}}>
                <ProjectForm display={display} />
            </Box>
        </ListItemButton>
        </Box>)
}

export default ProjectCard;