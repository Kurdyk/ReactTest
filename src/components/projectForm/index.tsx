import { Box, Button, FormGroup, FormHelperText, Input, InputLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { RandomColor } from './utils';
import { ProjectFormProps } from './type';

const ProjectFormComponent: React.FC<ProjectFormProps> = ({display}) => {
    const [projectName, setProjectName] = useState("");
    const [colorName, setColorName] = useState("#FFF");
    const [description, setDescription] = useState("");
    const [colorDescription, setColorDescription] = useState("#FFF");
    const [budget, setBudget] = useState("");
    const [colorBudget, setColorBudget] = useState("#FFF");

    useEffect(() => {
        setColorDescription(RandomColor());
    }, [description])

    useEffect(() => {
        setColorName(RandomColor());
    }, [projectName])

    useEffect(() => {
        setColorBudget(RandomColor());
    }, [budget])
  
    return (
    <Box sx={{marginTop:"20px", display:{display} , flexDirection:"column"}}>
        <FormGroup sx={{display:"flex"}}>
            <InputLabel htmlFor="formProjectName">A new project</InputLabel>
            <Input required placeholder="Project name" value={projectName} id="formProjectName" aria-describedby="formProjectName" onChange={(input) => {
                setProjectName(input.target.value);
            }} sx={{backgroundColor : colorName}}/>
            <FormHelperText id="formProjectNameHelper">Give it a beautiful name</FormHelperText>

            <Input required placeholder="Description" value={description} id="formDescription" aria-describedby="formDescription" onChange={(input) => {
                setDescription(input.target.value);
            }} sx={{backgroundColor : colorDescription}}/>
            <FormHelperText id="formBudgetHelper">Give us a budget</FormHelperText>

            <Input required placeholder="Budget" value={budget} id="formBudget" aria-describedby="formBudget" onChange={(input) => {
                setBudget(input.target.value);
            }} sx={{backgroundColor : colorBudget}}/>
            <FormHelperText id="formBudgetHelper">Give us a budget</FormHelperText>

        </FormGroup>

        <Button variant="outlined" onClick={() => {
            setProjectName("");
            setDescription("");
            setBudget("");
        }}>
            Cancel
        </Button>

        <Button variant="outlined" onClick={() => {
            let exit = false;
            if (projectName.length === 0) {
                document.getElementById("formProjectName")!.style.color = "red";
                exit = true;
            }
            if (description.length === 0) {
                document.getElementById("formDescription")!.style.color = "red";
                exit = true;
            }
            if (budget.length === 0) {
                document.getElementById("formBudget")!.style.color = "red";
                exit = true;
            }
            if (exit) return;
            // Do stuff with form info otherwise
        }}>
            Save
        </Button>
    </Box>
  )
}

export default ProjectFormComponent