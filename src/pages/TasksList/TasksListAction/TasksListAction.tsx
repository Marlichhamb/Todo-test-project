import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    FormControl,
    FormLabel,
    IconButton,
    RadioGroup,
    Tooltip,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {ManageTaskModal} from "../../../components/Modals/manageTaskModal.tsx";
import {type TData, type TStatus, type TTodo} from "../../../types/todo.ts";
import axios from "axios";
import {apiToDoUrl} from "../../../data/api_endpoint.ts";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
//todo

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
//in progress

import DoneAllIcon from '@mui/icons-material/DoneAll';
//done

interface ITasksListActionProps {
    tasks: TTodo[];
    setTasks: Dispatch<SetStateAction<TTodo[]>>
    setSelectedStatus: Dispatch<SetStateAction<TStatus>>
}


export const TasksListAction: FC<ITasksListActionProps>= ({setTasks, setSelectedStatus}) => {

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenCompleted, setIsOpenCompleted] = useState(false);

    const handleOpenCreate = () => {
        setIsOpenCreate(true)
    };

    const handleOpenCompleted = () => {
        setIsOpenCompleted(true)
    };

    const handleCloseCompleted = () => {
        setIsOpenCompleted(false)
    };

    const handleCreateNewTask = ({title, description}:TData) => {
        const newTaskData = {
            title,
            description,
            status: 'todo',
        }
        axios
            .post(apiToDoUrl, newTaskData)
            .then(data => {
                const newTask = data.data as TTodo;
                setTasks((prevState) => [ newTask, ...prevState]);
            }).catch( error => {
                console.error("GETTING DATA ERROR", error);
            }
        )
        setIsOpenCreate(false)
    }

    return (

      <Box sx={{ mb: 2, mt: 2, width: '55%', display: 'flex', justifyContent: 'space-between'}}>
          <Tooltip title="Create a new Note"  placement="top">
              <IconButton sx={{ bgcolor: '#C5DDF6', "&:hover": {backgroundColor: "transparent"} }} onClick={handleOpenCreate} >
                <AddCircleIcon sx = {{fontSize: '35px'}} />
              </IconButton>
          </Tooltip>

          <FormControl sx={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
              <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
              >
                  <ButtonGroup aria-label="Basic button group">

                      <IconButton sx={{"&:hover": {backgroundColor: "transparent"}}} title='To-Do' onClick={() => setSelectedStatus('todo')}>
                          <TaskAltIcon/>
                      </IconButton>
                      <IconButton sx={{"&:hover": {backgroundColor: "transparent"}}} title='In Progress' onClick={() => setSelectedStatus('in_progress')}>
                          <HourglassBottomIcon/>
                      </IconButton>
                      <IconButton sx={{"&:hover": {backgroundColor: "transparent"}}} title='Done' onClick={() => setSelectedStatus('done')}>
                          <DoneAllIcon/>
                      </IconButton>
                      <IconButton sx={{"&:hover": {backgroundColor: "transparent"}}} title='All Tasks' onClick={() => setSelectedStatus('all')}>All</IconButton>
                  </ButtonGroup>

              </RadioGroup>
          </FormControl>

          <Tooltip title="Completed Notes"  placement="top">
              <IconButton sx={{ml: 3, bgcolor: '#C5DDF6', "&:hover": {backgroundColor: "transparent"}}} onClick={handleOpenCompleted}>
                <EventAvailableIcon sx = {{fontSize: '35px'}}/>
              </IconButton>
          </Tooltip>

          <Dialog open={isOpenCompleted} onClose={handleCloseCompleted}>
              <DialogActions>
                  <Button onClick={handleCloseCompleted}>CANCEL</Button>
              </DialogActions>
          </Dialog>

          <ManageTaskModal
              onClickActionButton={handleCreateNewTask}
              modalTitle="Create Note"
              actionButtonName="Create"
              isOpen={isOpenCreate}
              onClickCancel={() => setIsOpenCreate(false)}
          />

      </Box>
  )
}