import { Box, Typography } from "@mui/material";
import type {FC} from "react";
import {TasksListAction} from "./TasksListAction/TasksListAction.tsx";
import {ToDoList} from "./ToDoList/ToDoList.tsx";
import {todoDate} from "../../data/data.ts";

export const TasksList: FC = () =>  {
    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
                width: "100",
                height: "100",
                display: "flex",
                flexDirection:'column',
                alignItems: "center",
                justifyContent: "flex-start",
                bgcolor: '#F8FAFC',

            }}
        >
            <Typography sx={{color: '#3a3a5b'}} variant="h4" >Todos</Typography>

            <TasksListAction/>
            <ToDoList tasksArr={todoDate}/>
        </Box>
    );
}
