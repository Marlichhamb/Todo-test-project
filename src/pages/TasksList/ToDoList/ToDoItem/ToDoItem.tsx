import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle, Divider,
    TextField,
    Typography
} from "@mui/material";
import type {TData, TStatus, TTodo} from "../../../../types/todo.ts";
import {type Dispatch, type FC, type SetStateAction, useState} from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ManageTaskModal} from "../../../../components/Modals/manageTaskModal.tsx";
import axios from "axios";
import {apiToDoUrl} from "../../../../data/api_endpoint.ts";
// import TaskAltIcon from '@mui/icons-material/TaskAlt'; //todo
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'; //in progress
// import DoneAllIcon from '@mui/icons-material/DoneAll'; //done

interface ToDoItemProps {
    item: TTodo;
    setTasks: Dispatch<SetStateAction<TTodo[]>>
    selectedStatus: TStatus

}
export const ToDoItem: FC<ToDoItemProps> = ({ item: {id, description, title, status}, setTasks}) => {
    // const [ButtonStatus, setButtonStatus] = useState(status)
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    // const [expStatus, setExpStatus] = useState(selectedStatus)

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
            .put(`${apiToDoUrl}/${id}`, {
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
            .delete(`${apiToDoUrl}/${id}`)
            .then((data) => {
                setTasks(prevState => prevState.filter(task => task.id !== id));
                console.log('this data was removed:', data)
            })
    }

    const changeStatus = (status: string) => {
        axios
            .put(`${apiToDoUrl}/${id}`, {
               status})
            .then(data => {
                const newStatus = data.data;
                setTasks(prevState =>
                    prevState.map(task => task.id === newStatus.id ? newStatus : task)
                );
                console.log( data.data, 'response from server')
            })
    }


    return (
        <>
            <Box sx={{overflow: "hidden", width: '600px', m: '0 16px', display: 'flex', mt: 2, mb: 2, bgcolor: '#F1F5F9', borderRadius: 2, p: 1, alignItems: 'center', justifyContent: 'space-between'}}>

                    <Box sx={{width: 60}}>
                    <Typography fontSize={12}>
                        {title}
                    </Typography>
                    </Box>

                    <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: "red", mx: 2 }}/>

                     <Box sx={{width: 150}}>
                    <Typography fontSize={12}>
                        {description}
                    </Typography>
                     </Box>

                    <Divider orientation="vertical" variant="middle" flexItem sx={{ borderColor: "red", mx: 2 }} />

                     <Box>
                         <Autocomplete

                             sx={{
                             "& .MuiInputBase-root": {
                                 minWidth: 150,
                                 height: '36px',
                                 borderRadius: '10px',
                             },

                         }}
                             disableClearable
                             value={status}
                             onChange={(_event: any, newValue: string | null) => {
                                 if(newValue !== null) {

                                changeStatus(newValue)

                                 }
                             }
                         }
                             renderInput={(params) => <TextField {...params} />}
                             options={options}/>
                     </Box>

                    <Box>
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
                    </Box>
                </Box>

        </>
    );

}