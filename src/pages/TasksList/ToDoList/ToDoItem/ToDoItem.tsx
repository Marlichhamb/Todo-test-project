import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Stack,
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
            <Box sx={{
                overflow: "hidden",
                m: '0 16px',
                display: 'flex',
                mt: 2,
                mb: 2,
                bgcolor: '#F1F5F9',
                borderRadius: 2,
                p: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 6px 10px rgba(0,0,0,0.1)',
                "&:hover": {boxShadow: '0px 4px 0px rgba(0,0,0,0.2)'},
                cursor: 'pointer'
            }}>

                <Typography ml={1}>{id}</Typography>
                <Typography ml={1}>{title}</Typography>
                <Typography ml={1}>{description}</Typography>
                <Typography ml={1}>{status}</Typography>

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