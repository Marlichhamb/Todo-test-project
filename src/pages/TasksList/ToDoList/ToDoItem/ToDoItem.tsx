import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Stack, TextField,
    Typography
} from "@mui/material";
import type {TData, TTodo} from "../../../../types/todo.ts";
import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ManageTaskModal} from "../../../../components/Modals/manageTaskModal.tsx";
import axios from "axios";
import {getAllTasks} from "../../../../data/api_endpoint.ts";
// import TaskAltIcon from '@mui/icons-material/TaskAlt'; //todo
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'; //in progress
// import DoneAllIcon from '@mui/icons-material/DoneAll'; //done

interface ToDoItemProps {
    item: TTodo;
    setTasks: Dispatch<SetStateAction<TTodo[]>>
}
export const ToDoItem: FC<ToDoItemProps> = ({ item: {id, description, title, status}, setTasks}) => {
    // const [ButtonStatus, setButtonStatus] = useState(status)
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [expStatus, setExpStatus] = useState('Status')

    const options = ['todo', 'in_progress', 'done']
    const handleOpenDelete = () => {

        setOpenDelete(true)
    };

    const handleCloseDelete = () => {
        setOpenDelete(false)
    };

    const handleOpenEdit = () => {
        setOpenEdit(true)
    };

    const editData = ({title, description}:TData) => {

        axios
            .put(`${getAllTasks}/${id}`, {
                title,
                description})
            .then(data => {
                const newTask = data.data;
                setTasks(prevState =>
                    prevState.map(task => task.id === newTask.id ? newTask : task)
                );
                console.log( data.data, 'response from server')
                setOpenEdit(false)
            })
    }

    const deleteTask = () => {
        setOpenDelete(false)
        axios
            .delete(`${getAllTasks}/${id}`)
            .then((data) => {
                setTasks(prevState => prevState.filter(task => task.id !== id));
                console.log('this data was removed:', data)
            })
    }

    return (
        <>
            <Box sx={{overflow: "hidden", width: '600px', m: '0 16px', display: 'flex', mt: 2, mb: 2, bgcolor: '#F1F5F9', borderRadius: 2, p: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center', background: '#F1F5F9', borderRadius: '8px', mb: 1, justifyContent: 'left'}}>
                    <Typography sx={{flexBasis: '20px', flexShrink: 0, borderRight: '2px solid #d0d7de', px: 1,}}>
                        {title}
                    </Typography>

                    <Typography sx={{flexBasis: '300px', borderRight: '2px solid #d0d7de',px: 1,}}>
                        {description}
                    </Typography>

                    <Typography sx={{flexBasis: '100px', textAlign: 'left', px: 2,}}>
                        {status}
                    </Typography>

                    <div>
                        {expStatus}
                    </div>


                    <Autocomplete sx={{
                        width: "fit-content"
                    }}
                                  value={expStatus}
                                  onChange={(_event: any, newValue: string | null) => {
                                      // @ts-ignore
                                      setExpStatus(newValue);
                                  }}
                                  renderInput={(params) => <TextField {...params} label="status" />}
                                  options={options}
                    />

                </Box>

                <Stack direction="row" spacing={1}>

                    <IconButton sx={{"&:hover": {backgroundColor: "#a8aaf7"}}} onClick={handleOpenEdit}  >
                        <EditIcon/>
                    </IconButton>
                    <IconButton sx={{"&:hover": {backgroundColor: "#ef8181"}}} onClick={handleOpenDelete}>
                        <DeleteIcon/>
                    </IconButton>

                    <Dialog open={openDelete} onClose={handleCloseDelete}>
                        <DialogActions>
                            <DialogTitle>Delete this Note?</DialogTitle>
                            <Button onClick={handleCloseDelete}>NO</Button>
                            <Button onClick={deleteTask}>YES</Button>

                        </DialogActions>
                    </Dialog>

                    <ManageTaskModal
                        taskData={{title, description}}
                        onClickActionButton={editData}
                        modalTitle="Edit this Note?"
                        actionButtonName="Edit"
                        isOpen={openEdit}
                        onClickCancel={() => setOpenEdit(false)}
                    />
                </Stack>

            </Box>
        </>
    );

}