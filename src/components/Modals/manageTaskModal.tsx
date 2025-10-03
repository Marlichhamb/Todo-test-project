import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

import {type ChangeEvent, type FC, useState} from "react";

import type {TData} from "../../types/todo.ts";

interface ManageTaskModalProps {
    taskData?: TData;
    modalTitle: string;
    actionButtonName: string;
    isOpen: boolean;
    onClickCancel: () => void;
    onClickActionButton: ({title, description}: TData) => void;
}

export const ManageTaskModal: FC<ManageTaskModalProps> = ({ taskData, modalTitle, actionButtonName, isOpen, onClickCancel, onClickActionButton}) => {
    const [title, setTitle] = useState(taskData?.title || "")
    const [description, setDescription] = useState(taskData?.description || "")

    const handleChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleActionClick = () => {
        onClickActionButton({ title, description });
        setTitle("");
        setDescription("");
    };



    return (
        <Dialog
            open={isOpen}
            PaperProps={{
                sx: {
                    width: "300px",
                    height: "300px",
                    backgroundColor: "#ffffff",
                    color: "#1f2a3d",
                    borderRadius: 3,
                    boxShadow: "0 0 20px rgba(0,0,0,0.8)",
                    p: 2,
                },
            }}
        >
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent dividers>
                <TextField
                    value={title}
                    onChange={handleChangeTitle}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#696868",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#000000",
                        },
                    }}
                />
                <TextField
                    value={description}
                    onChange={handleChangeDescription}
                    margin="dense"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#696868",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#000000",
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickCancel} color="inherit">
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleActionClick}>
                    {actionButtonName}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
