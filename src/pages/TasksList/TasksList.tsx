import { Box, Typography } from "@mui/material";
import {type FC, useState} from "react";
import {TasksListAction} from "./TasksListAction/TasksListAction.tsx";
import {ToDoList} from "./ToDoList/ToDoList.tsx";
import type {TTodo} from "../../types/todo.ts";
export const TasksList: FC = () =>  {
    const [tasks, setTasks] = useState<TTodo[]>([]);


    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
                hv: '100%',
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

            <TasksListAction tasks={tasks} setTasks={setTasks}/>
            <ToDoList tasks={tasks} setTasks={setTasks}/>
        </Box>
    );
}
