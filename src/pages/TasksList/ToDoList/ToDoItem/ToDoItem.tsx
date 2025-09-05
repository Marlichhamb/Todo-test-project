import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import type {TTodo} from "../../../../types/todo.ts";
import {type FC, useState} from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import TaskAltIcon from '@mui/icons-material/TaskAlt'; //todo
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'; //in progress
// import DoneAllIcon from '@mui/icons-material/DoneAll'; //done



interface ToDoItemProps {
    item: TTodo;
}


export const ToDoItem: FC<ToDoItemProps> = ({ item: {id, description, title, status, createdAt}}) => {
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

    const handleCloseEdit = () => {
        setOpenEdit(false)
    };

    return (
        <>
            <Box sx={{
                m: '0 16px',
                display: 'flex',
                mt: 2,
                mb: 2,
                bgcolor: '#F1F5F9',
                borderRadius: 2,
                p: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 2px 6px rgba(0,0,0,0.1)'
            }}>

                <Stack direction="row" spacing={1}>

                    <IconButton aria-label="check">
                        <CheckBoxOutlineBlankIcon/>
                    </IconButton>

                </Stack>

                <Typography ml={1}>{id}</Typography>
                <Typography ml={1}>{title}</Typography>
                <Typography ml={1}>{description}</Typography>
                <Typography ml={1}>{status}</Typography>
                <Typography ml={1}>{createdAt}</Typography>

                <Stack direction="row" spacing={1}>
                    <IconButton sx={{"&:hover": {backgroundColor: "#a8aaf7"}}} onClick={handleOpenEdit} >
                        <EditIcon/>
                    </IconButton>
                    <IconButton sx={{"&:hover": {backgroundColor: "#ef8181"}}} onClick={handleOpenDelete}>
                        <DeleteIcon/>
                    </IconButton>


                    <Dialog open={openDelete} onClose={handleCloseDelete}>
                        <DialogActions>
                            <DialogTitle>Delete this Note?</DialogTitle>
                            <Button onClick={handleCloseDelete}>NO</Button>
                            <Button onClick={handleCloseDelete}>YES</Button>

                        </DialogActions>
                    </Dialog>


                    <Dialog open={openEdit} onClose={handleCloseEdit}>
                        <DialogTitle>Edit this Note</DialogTitle>
                        <DialogContent>
                            <TextField placeholder="Your changes"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEdit}>Cancel</Button>
                            <Button>Edit</Button>
                        </DialogActions>
                    </Dialog>




                </Stack>

            </Box>
        </>
    );

}