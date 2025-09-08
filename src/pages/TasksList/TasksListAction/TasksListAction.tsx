import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    IconButton, Tooltip,
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {ManageTaskModal} from "../../../components/Modals/manageTaskModal.tsx";
import {ToDoList} from "../ToDoList/ToDoList.tsx";
import type {TData, TTodo} from "../../../types/todo.ts";
import axios from "axios";
import {getAllTasks} from "../../../data/api_endpoint.ts";

interface ITasksListActionProps {
    tasks: TTodo[];
    setTasks: Dispatch<SetStateAction<TTodo[]>>
}

export const TasksListAction: FC<ITasksListActionProps>= ({setTasks, tasks}) => {

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
            createdAt: new Date().getDate(),
        }
        axios
            .post(getAllTasks, newTaskData)
            .then(data => {
                const newTask = data.data as TTodo;
                setTasks([...tasks, newTask])
            }).catch( error => {
                console.error("GETTING DATA ERROR", error);
            }
        )
        setIsOpenCreate(false)
    }

    return (

      <Box sx={{ mb: 2, mt: 2, width:'250px', display: 'flex', justifyContent: 'space-between'}}>
          <Tooltip title="Create a new Note"  placement="top">
              <IconButton sx={{ bgcolor: '#C5DDF6'}} onClick={handleOpenCreate} >
                <AddCircleIcon sx = {{fontSize: '35px'}} />
              </IconButton>
          </Tooltip>
          <Tooltip title="Completed Notes"  placement="top">
              <IconButton sx={{ml: 3, bgcolor: '#C5DDF6'}} onClick={handleOpenCompleted}>
                <EventAvailableIcon sx = {{fontSize: '35px'}}/>
              </IconButton>
          </Tooltip>

          <Dialog open={isOpenCompleted} onClose={handleCloseCompleted}>
              <DialogActions>
                  <ToDoList tasks={tasks} setTasks={setTasks}/>
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